import { NextRequest, NextResponse } from 'next/server';

const getForwardedHeaders = (headers: Headers) => {
   const forwardedHeaders = new Headers(headers);
   forwardedHeaders.delete('content-encoding');
   forwardedHeaders.delete('content-length');
   return forwardedHeaders;
};

/**
 * Parse a Set-Cookie header value into its cookie value (handles `=` in JWT padding).
 */
function extractCookieValue(setCookieHeader: string, name: string): string {
   const prefix = `${name}=`;
   const match = setCookieHeader.split(/;\s*/).find((part) => part.startsWith(prefix));
   return match ? match.slice(prefix.length) : '';
}

// Refresh mutex — prevents concurrent refresh calls from racing
let refreshPromise: Promise<{ accessToken: string; refreshToken: string } | null> | null = null;

function doRefresh(backendUrl: string, refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
   if (!refreshPromise) {
      refreshPromise = (async () => {
         try {
            const refreshResponse = await fetch(`${backendUrl}/api/auth/refresh`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  Cookie: `refreshToken=${refreshToken}`,
                  'X-Client-Type': 'web',
               },
            });

            if (!refreshResponse.ok) return null;

            const cookiesArray = refreshResponse.headers.getSetCookie();
            if (!cookiesArray || cookiesArray.length === 0) return null;

            let newAccessToken = '';
            let newRefreshToken = '';

            for (const c of cookiesArray) {
               const trimmed = c.trim();
               if (trimmed.startsWith('accessToken=')) {
                  newAccessToken = extractCookieValue(trimmed, 'accessToken');
               } else if (trimmed.startsWith('refreshToken=')) {
                  newRefreshToken = extractCookieValue(trimmed, 'refreshToken');
               }
            }

            if (!newAccessToken && !newRefreshToken) return null;
            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
         } catch {
            return null;
         } finally {
            // Release mutex after a short debounce to batch rapid-fire calls
            setTimeout(() => {
               refreshPromise = null;
            }, 500);
         }
      })();
   }
   return refreshPromise;
}

function setTokenCookies(response: NextResponse, tokens: { accessToken: string; refreshToken: string }, isProd: boolean) {
   if (tokens.refreshToken) {
      response.cookies.set('refreshToken', tokens.refreshToken, {
         httpOnly: true,
         secure: isProd,
         sameSite: 'lax',
         path: '/',
         maxAge: 60 * 60 * 24 * 7,
      });
   }
   if (tokens.accessToken) {
      response.cookies.set('accessToken', tokens.accessToken, {
         httpOnly: true,
         secure: isProd,
         sameSite: 'lax',
         path: '/',
         maxAge: 15 * 60,
      });
   }
}

export async function proxy(request: NextRequest) {
   const url = request.nextUrl;
   const path = url.pathname;
   const isProd = process.env.NODE_ENV === 'production';
   const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

   // 1. Authentication Pipeline Forwarder (Direct Proxy)
   if (path.includes('/auth/login') || path.includes('/auth/register') || path.includes('/auth/logout')) {
      const backendAuthUrl = `${backendUrl}${path}${url.search}`;
      const requestHeaders = new Headers(request.headers);

      let body: any = null;
      if (request.method !== 'GET' && request.method !== 'HEAD') {
         body = await request.text();
      }

      const authResponse = await fetch(backendAuthUrl, {
         method: request.method,
         headers: requestHeaders,
         body: body,
      });

      const responseText = await authResponse.text();

      const nextResponse = new NextResponse(responseText, {
         status: authResponse.status,
         headers: getForwardedHeaders(authResponse.headers),
      });

      // Clear auth cookies on logout
      if (path.includes('/auth/logout')) {
         nextResponse.cookies.delete('accessToken');
         nextResponse.cookies.delete('refreshToken');
      }

      return nextResponse;
   }

   // Allow static authentication page layouts to render locally
   if (path === '/login' || path === '/register') {
      const refreshToken = request.cookies.get('refreshToken')?.value;
      if (refreshToken) {
         return NextResponse.redirect(new URL('/app', request.url));
      }
      return NextResponse.next();
   }
   if (path.startsWith('/verify-email')) {
      return NextResponse.next();
   }

   // 2. Protect UI Views (/app) - Guard without forwarding to Spring Boot
   if (path.startsWith('/app')) {
      const refreshToken = request.cookies.get('refreshToken')?.value;
      const accessToken = request.cookies.get('accessToken')?.value;

      // If no session exists, instantly bounce them to login (Zero-flicker guard)
      if (!refreshToken) {
         const response = NextResponse.redirect(new URL('/login', request.url));
         response.cookies.delete('refreshToken');
         response.cookies.delete('accessToken');
         return response;
      }

      const shouldRefresh = !accessToken;
      if (shouldRefresh) {
         const tokens = await doRefresh(backendUrl, refreshToken);

         if (tokens) {
            const requestHeaders = new Headers(request.headers);
            const cookieStrings: string[] = [];
            if (tokens.accessToken) cookieStrings.push(`accessToken=${tokens.accessToken}`);
            if (tokens.refreshToken) cookieStrings.push(`refreshToken=${tokens.refreshToken}`);
            if (cookieStrings.length > 0) {
               requestHeaders.set('Cookie', cookieStrings.join('; '));
            }

            const finalResponse = NextResponse.next({
               request: { headers: requestHeaders },
            });
            setTokenCookies(finalResponse, tokens, isProd);
            return finalResponse;
         } else {
            // Refresh failed — redirect to login and clear session
            const errorResponse = NextResponse.redirect(new URL('/login', request.url));
            errorResponse.cookies.delete('refreshToken');
            errorResponse.cookies.delete('accessToken');
            return errorResponse;
         }
      }

      return NextResponse.next();
   }

   // 3. API Data Forwarding (/api) — thin proxy with 401 retry
   if (path.startsWith('/api')) {
      const targetUrl = `${backendUrl}${path}${url.search}`;
      const requestHeaders = new Headers(request.headers);
      const accessToken = request.cookies.get('accessToken')?.value;
      const refreshToken = request.cookies.get('refreshToken')?.value;

      if (accessToken) {
         requestHeaders.set('Authorization', `Bearer ${accessToken}`);
      }

      let body: any = null;
      if (request.method !== 'GET' && request.method !== 'HEAD') {
         body = await request.text();
      }

      let response = await fetch(targetUrl, {
         method: request.method,
         headers: requestHeaders,
         body: body,
      });

      // 401 → try token refresh + retry once
      if (response.status === 401 && refreshToken && !path.includes('/auth/refresh')) {
         const tokens = await doRefresh(backendUrl, refreshToken);

         if (tokens && tokens.accessToken) {
            const retryHeaders = new Headers(request.headers);
            retryHeaders.set('Authorization', `Bearer ${tokens.accessToken}`);

            const retryCookies: string[] = [];
            retryCookies.push(`accessToken=${tokens.accessToken}`);
            if (tokens.refreshToken) retryCookies.push(`refreshToken=${tokens.refreshToken}`);
            retryHeaders.set('Cookie', retryCookies.join('; '));

            response = await fetch(targetUrl, {
               method: request.method,
               headers: retryHeaders,
               body: body,
            });

            // Persist the new tokens to browser cookies regardless of retry outcome
            const finalResponse = new NextResponse(response.body, {
               status: response.status,
               headers: getForwardedHeaders(response.headers),
            });
            setTokenCookies(finalResponse, tokens, isProd);
            return finalResponse;
         }
         // Refresh failed — return the original 401
      }

      const finalResponse = new NextResponse(response.body, {
         status: response.status,
         headers: getForwardedHeaders(response.headers),
      });

      // Persist rotated tokens from normal 200 responses
      if (response.status === 200 && response.headers.getSetCookie) {
         const cookiesArray = response.headers.getSetCookie();
         if (cookiesArray && cookiesArray.length > 0) {
            let newAccessToken = '';
            let newRefreshToken = '';
            for (const c of cookiesArray) {
               const trimmed = c.trim();
               if (trimmed.startsWith('accessToken=')) {
                  newAccessToken = extractCookieValue(trimmed, 'accessToken');
               } else if (trimmed.startsWith('refreshToken=')) {
                  newRefreshToken = extractCookieValue(trimmed, 'refreshToken');
               }
            }
            if (newAccessToken || newRefreshToken) {
               setTokenCookies(finalResponse, { accessToken: newAccessToken, refreshToken: newRefreshToken }, isProd);
            }
         }
      }

      return finalResponse;
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
