import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (req.nextUrl.pathname === '/login' && req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = '/';

      return NextResponse.redirect(url.toString());
    }

    if (req.nextUrl.pathname === '/manage' && !req.nextauth.token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';

      return NextResponse.redirect(url.toString());
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  },
);

export const config = { matcher: ['/login', '/manage'] };
