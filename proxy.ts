import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { jwtVerify } from 'jose';

// =============================================================================
// ROUTE CONFIGURATION
// =============================================================================

const PUBLIC_ROUTES = ['/sign-in', '/not-found'];
const AUTH_ROUTES = ['/sign-in']; // Redirect to dashboard if already logged in
const PROTECTED_PREFIX = '/test4'; // Prefix for protected routes (e.g. /dashboard)

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? 'admin_auth_token';
const AUTH_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? 'fallback-secret-change-in-production'
);

// =============================================================================
// TOKEN VERIFICATION
// =============================================================================

async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, AUTH_SECRET);
    return true;
  } catch {
    return false;
  }
}

// =============================================================================
// MIDDLEWARE
// =============================================================================

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = pathname.startsWith(PROTECTED_PREFIX);

  // 1. Verify token validity
  const isAuthenticated = token ? await verifyToken(token) : false;

  // 2. Authenticated user trying to access auth pages (e.g. /sign-in)
  //    → Redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Unauthenticated user trying to access protected routes
  //    → Redirect to sign-in with a callbackUrl
  if (isProtectedRoute && !isAuthenticated) {
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
