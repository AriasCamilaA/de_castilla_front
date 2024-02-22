import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token')?.value;

  // Redireccionar a home si hay token en /login
  if (request.nextUrl.pathname === '/login') {
    if (token) {
      console.log('Usuario ya autenticado, redirigiendo a home');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Permitir el acceso a /login si no hay token
    return NextResponse.next();
  }
  // Redireccionar a home si hay token en /register
  if (request.nextUrl.pathname === '/register') {
    if (token) {
      console.log('Usuario ya autenticado, redirigiendo a home');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Permitir el acceso a /login si no hay token
    return NextResponse.next();
  }
  // Redireccionar a home si hay token en /
  if (request.nextUrl.pathname === '/') {
    if (token) {
      console.log('Usuario ya autenticado, redirigiendo a home');
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    // Permitir el acceso a /login si no hay token
    return NextResponse.next();
  }

  // Denegar acceso a /admin si no hay token
//   if (request.nextUrl.pathname === '/admin/**') {
    if (!token) {
      console.log('Acceso denegado, redirigiendo a login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Permitir el acceso a /admin si hay token
    return NextResponse.next();
//   }

  // Permitir el resto de las rutas
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login/:path*', 
    '/register/:path*',
    '/admin/:path*'
],
};
