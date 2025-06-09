import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { hostname, pathname } = req.nextUrl;

  const subdomain = hostname.split('.')[0];
  const baseSubdomain = subdomain.replace(/^staging-/, '');

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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
