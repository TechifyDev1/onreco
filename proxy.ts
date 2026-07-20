import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const isProd = process.env.NODE_ENV === 'production';

  // 1. Authentication Pipeline Forwarder (Direct Proxy)
  if (path.includes('/auth/login') || path.includes('/auth/register') || path.includes('/auth/logout')) {
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

    const responseText = await authResponse.text();

    const nextResponse = new NextResponse(responseText, {
      status: authResponse.status,
      headers: new Headers(authResponse.headers),
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
              maxAge: 15 * 60,
            });
          }

          return finalResponse;
        } else {
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

  // 3. API Data Forwarding (/api) — thin proxy with 401 retry
  if (path.startsWith('/api')) {
    const targetUrl = `http://localhost:8080${path}${url.search}`;
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
      try {
        const refreshResponse = await fetch(`http://localhost:8080/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `refreshToken=${refreshToken}`,
            'X-Client-Type': 'web',
          },
        });

        if (refreshResponse.ok) {
          const cookiesArray = refreshResponse.headers.getSetCookie();
          let newAccessToken = '';
          let newRefreshToken = '';

          if (cookiesArray && cookiesArray.length > 0) {
            const refreshStr = cookiesArray.find((c) => c.trim().startsWith('refreshToken='));
            const accessStr = cookiesArray.find((c) => c.trim().startsWith('accessToken='));
            if (refreshStr) newRefreshToken = refreshStr.split(';')[0].split('=')[1];
            if (accessStr) newAccessToken = accessStr.split(';')[0].split('=')[1];
          }

          const retryHeaders = new Headers(request.headers);
          if (newAccessToken) retryHeaders.set('Authorization', `Bearer ${newAccessToken}`);

          const retryCookies: string[] = [];
          if (newAccessToken) retryCookies.push(`accessToken=${newAccessToken}`);
          if (newRefreshToken) retryCookies.push(`refreshToken=${newRefreshToken}`);
          if (retryCookies.length > 0) retryHeaders.set('Cookie', retryCookies.join('; '));

          response = await fetch(targetUrl, {
            method: request.method,
            headers: retryHeaders,
            body: body,
          });
        }
      } catch (error) {
        console.error('[Proxy] Token refresh failed:', error);
      }
    }

    const finalResponse = new NextResponse(response.body, {
      status: response.status,
      headers: new Headers(response.headers),
    });

    // Persist rotated tokens to browser cookies
    if (response.status === 200 && response.headers.getSetCookie) {
      const cookiesArray = response.headers.getSetCookie();
      if (cookiesArray && cookiesArray.length > 0) {
        const refreshStr = cookiesArray.find((c) => c.trim().startsWith('refreshToken='));
        const accessStr = cookiesArray.find((c) => c.trim().startsWith('accessToken='));
        if (refreshStr) {
          const val = refreshStr.split(';')[0].split('=')[1];
          finalResponse.cookies.set('refreshToken', val, {
            httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7,
          });
        }
        if (accessStr) {
          const val = accessStr.split(';')[0].split('=')[1];
          finalResponse.cookies.set('accessToken', val, {
            httpOnly: true, secure: isProd, sameSite: 'lax', path: '/', maxAge: 15 * 60,
          });
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
