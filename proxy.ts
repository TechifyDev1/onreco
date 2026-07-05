import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const isProd = process.env.NODE_ENV === 'production';

  // 1. Authentication Pipeline Forwarder (Direct Proxy)
  if (path.includes('/auth/login') || path.includes('/auth/register')) {
    console.log(`[Proxy] Forwarding auth request: ${path}`);
    const backendAuthUrl = `http://localhost:8080${path}${url.search}`;
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

    console.log(`[Proxy] Auth response: ${authResponse.status} for ${path}`);

    const responseText = await authResponse.text();

    return new NextResponse(responseText, {
      status: authResponse.status,
      headers: new Headers(authResponse.headers),
    });
  }

  // Allow static authentication page layouts to render locally
  if (path === '/login' || path === '/register') {
    return NextResponse.next();
  }

  // 2. Protect UI Views (/app) - Guard without forwarding to Spring Boot
  if (path.startsWith('/app')) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const accessToken = request.cookies.get('accessToken')?.value;

    console.log(`[Proxy] Routing view request: ${path}`);

    // If no session exists, instantly bounce them to login (Zero-flicker guard)
    if (!refreshToken) {
      console.log(`[Proxy] No refresh token found. Redirecting to /login`);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('refreshToken');
      response.cookies.delete('accessToken');
      return response;
    }

    const shouldRefresh = !accessToken;
    if (shouldRefresh) {
      console.log(`[Proxy] Access token is missing or expired. Attempting preemptive token refresh...`);
      try {
        const refreshResponse = await fetch(
          `http://localhost:8080/api/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Cookie: `refreshToken=${refreshToken}`,
              'X-Client-Type': 'web',
            },
          }
        );

        if (refreshResponse.ok) {
          const cookiesArray = refreshResponse.headers.getSetCookie();
          let newAccessToken = '';
          let newRefreshToken = '';

          if (cookiesArray && cookiesArray.length > 0) {
            const refreshStr = cookiesArray.find((c) =>
              c.trim().startsWith('refreshToken=')
            );
            const accessStr = cookiesArray.find((c) =>
              c.trim().startsWith('accessToken=')
            );

            if (refreshStr)
              newRefreshToken = refreshStr.split(';')[0].split('=')[1];
            if (accessStr)
              newAccessToken = accessStr.split(';')[0].split('=')[1];
          }

          console.log(`[Proxy] Preemptive token refresh successful. Updating cookies.`);

          // Modify request headers so downstream Server Components receive updated cookies
          const requestHeaders = new Headers(request.headers);
          const cookieStrings: string[] = [];
          if (newAccessToken) cookieStrings.push(`accessToken=${newAccessToken}`);
          if (newRefreshToken) cookieStrings.push(`refreshToken=${newRefreshToken}`);
          if (cookieStrings.length > 0) {
            requestHeaders.set('Cookie', cookieStrings.join('; '));
          }

          const finalResponse = NextResponse.next({
            request: {
              headers: requestHeaders,
            }
          });

          // Set cookies on response so the browser gets them
          if (newRefreshToken) {
            finalResponse.cookies.set('refreshToken', newRefreshToken, {
              httpOnly: true,
              secure: isProd,
              sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60 * 24 * 7,
            });
          }

          if (newAccessToken) {
            finalResponse.cookies.set('accessToken', newAccessToken, {
              httpOnly: true,
              secure: isProd,
              sameSite: 'lax',
              path: '/',
              maxAge: 0.5 * 60,
            });
          }

          return finalResponse;
        } else {
          console.error(`[Proxy] Preemptive token refresh failed (Status: ${refreshResponse.status}). Redirecting to /login.`);
          const errorResponse = NextResponse.redirect(new URL('/login', request.url));
          errorResponse.cookies.delete('refreshToken');
          errorResponse.cookies.delete('accessToken');
          return errorResponse;
        }
      } catch (error) {
        console.error(`[Proxy] Error during preemptive token refresh:`, error);
      }
    }

    return NextResponse.next();
  }

  // 3. Core Secured Backend Data Pathways (/api)
  if (path.startsWith('/api')) {
    const targetUrl = `http://localhost:8080${path}${url.search}`;
    console.log(`[Proxy] Forwarding API request: ${request.method} ${path}`);

    const requestHeaders = new Headers(request.headers);
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // Forward tokens down to Spring Boot
    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    const cookieStrings: string[] = [];
    if (accessToken) cookieStrings.push(`accessToken=${accessToken}`);
    if (refreshToken) cookieStrings.push(`refreshToken=${refreshToken}`);
    if (cookieStrings.length > 0) {
      requestHeaders.set('Cookie', cookieStrings.join('; '));
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

    console.log(`[Proxy] API response: ${response.status} for ${path}`);

    // 4. Automatic Token Rotation Engine (401 Handling)
    if (
      response.status === 401 &&
      refreshToken &&
      !path.includes('/auth/refresh')
    ) {
      console.log(`[Proxy] API returned 401 for ${path}. Attempting token rotation...`);
      try {
        const refreshResponse = await fetch(
          `http://localhost:8080/api/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Cookie: `refreshToken=${refreshToken}`,
              'X-Client-Type': 'web',
            },
          }
        );

        console.log(`[Proxy] Token refresh backend response: ${refreshResponse.status}`);

        if (refreshResponse.ok) {
          const cookiesArray = refreshResponse.headers.getSetCookie();
          let newAccessToken = '';
          let newRefreshToken = '';

          if (cookiesArray && cookiesArray.length > 0) {
            const refreshStr = cookiesArray.find((c) =>
              c.trim().startsWith('refreshToken=')
            );
            const accessStr = cookiesArray.find((c) =>
              c.trim().startsWith('accessToken=')
            );

            if (refreshStr)
              newRefreshToken = refreshStr.split(';')[0].split('=')[1];
            if (accessStr)
              newAccessToken = accessStr.split(';')[0].split('=')[1];
          }

          console.log(`[Proxy] Token refresh successful. Extracted newAccessToken: ${!!newAccessToken}, newRefreshToken: ${!!newRefreshToken}`);

          // Build retry headers
          const retryHeaders = new Headers(request.headers);
          if (newAccessToken) {
            retryHeaders.set('Authorization', `Bearer ${newAccessToken}`);
          }

          const retryCookies: string[] = [];
          if (newAccessToken)
            retryCookies.push(`accessToken=${newAccessToken}`);
          if (newRefreshToken)
            retryCookies.push(`refreshToken=${newRefreshToken}`);
          if (retryCookies.length > 0) {
            retryHeaders.set('Cookie', retryCookies.join('; '));
          }

          console.log(`[Proxy] Retrying original API request: ${path}`);

          // Retry the original query
          const retriedResponse = await fetch(targetUrl, {
            method: request.method,
            headers: retryHeaders,
            body: body,
          });

          console.log(`[Proxy] Retry API response status: ${retriedResponse.status}`);

          const finalResponse = new NextResponse(retriedResponse.body, {
            status: retriedResponse.status,
            headers: new Headers(retriedResponse.headers),
          });

          // Save the fresh tokens down into the browser cookies container
          if (newRefreshToken) {
            finalResponse.cookies.set('refreshToken', newRefreshToken, {
              httpOnly: true,
              secure: isProd,
              sameSite: 'lax',
              path: '/',
              maxAge: 60 * 60 * 24 * 7,
            });
          }

          if (newAccessToken) {
            finalResponse.cookies.set('accessToken', newAccessToken, {
              httpOnly: true,
              secure: isProd,
              sameSite: 'lax',
              path: '/',
              maxAge: 0.5 * 60,
            });
          }

          return finalResponse;
        } else {
          console.error(`[Proxy] Token refresh failed for API route (Status: ${refreshResponse.status}). Returning 401 Unauthorized.`);
          const errorResponse = new NextResponse(
            JSON.stringify({ message: 'Session expired' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            }
          );
          errorResponse.cookies.delete('refreshToken');
          errorResponse.cookies.delete('accessToken');
          return errorResponse;
        }
      } catch (error) {
        console.error('[Proxy] Error during token rotation:', error);
      }
    }

    return new NextResponse(response.body, {
      status: response.status,
      headers: new Headers(response.headers),
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
