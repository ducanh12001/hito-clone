import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/signup/verify',
  '/signup/info',
  '/signup/store',
  '/signup/complete',
  '/forgot-password',
  '/two-factor-auth',
];

export default auth((req) => {
  const { hostname, pathname } = req.nextUrl;
  const session = req.auth;

  const subdomain = hostname.split('.')[0];
  const baseSubdomain = subdomain.replace(/^staging-/, '');

  const isAuthRoute =
    AUTH_ROUTES.includes(pathname) || pathname.includes('/api/auth');

  if (!session && !isAuthRoute) {
    const signInUrl = new URL('/login', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url);

    return NextResponse.redirect(signInUrl);
  }

  if (session && !isAuthRoute) {
    const userDomain = session.user.domain;

    switch (baseSubdomain) {
      case 'console':
        if (userDomain !== 'console') {
          return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        break;
      case 'kanri':
        if (userDomain !== 'kanri') {
          return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        break;
      default:
        // FIX: User domain cho phép tất cả user
        break;
    }
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  switch (baseSubdomain) {
    case 'console':
      return NextResponse.rewrite(new URL(`/console${pathname}`, req.url));
    case 'kanri':
      return NextResponse.rewrite(new URL(`/kanri${pathname}`, req.url));
    default:
      return NextResponse.rewrite(new URL(`/user${pathname}`, req.url));
  }
});

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
