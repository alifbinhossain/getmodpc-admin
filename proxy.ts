import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// =============================================================================
// ROUTE CONFIGURATION
// =============================================================================

const PUBLIC_ROUTES = [
  '/sign-in',
  '/not-found',
  '/reset-password',
  '/forgot-password',
];
const AUTH_ROUTES = ['/sign-in', '/reset-password', '/forgot-password']; // Redirect to dashboard if already logged in

// =============================================================================
// MIDDLEWARE
// =============================================================================

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie
  const token = request.cookies.get('accessToken')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Unauthenticated user trying to access protected routes
  //    → Redirect to sign-in with a callbackUrl
  if (!isPublicRoute && !token) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 4. Add security headers to all responses
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

// =============================================================================
// MATCHER — which routes middleware applies to
// =============================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
