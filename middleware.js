import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  'your-super-secret-jwt-key-min-32-characters-long'
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/login' ||
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/auth/logout') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }


  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;

   
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    try {
     
      await jwtVerify(token, JWT_SECRET);
 
      return NextResponse.next();
    } catch (error) {
     
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      
      const response = NextResponse.redirect(url);
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};