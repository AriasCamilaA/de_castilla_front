import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token')?.value;
  const rol = cookiesStore.get('rol')?.value;

  // Redireccionar a home si hay token en /login
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
    if (token) {
      console.log('Usuario ya autenticado, redirigiendo a home');
      if(rol==1){
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      else if(rol==2){
        return NextResponse.redirect(new URL('/cliente', request.url));
      }
      else if(rol==3){
        return NextResponse.redirect(new URL('/empleado', request.url));
      }
    }
    // Permitir el acceso a /login si no hay token
    return NextResponse.next();
  }

  // PERMISOS SEGUN ROL
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (rol == 2) {
      console.log('Usuario no autorizado en /admin, redirigiendo a /cliente');
      return NextResponse.redirect(new URL('/cliente', request.url));
    } 
    else if(rol == 3){
      console.log('Usuario no autorizado en /admin, redirigiendo a /empleado');
      return NextResponse.redirect(new URL('/empleado', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/cliente')) {
    if (rol == 1) {
      console.log('Usuario no autorizado en /cliente, redirigiendo a /admin');
      return NextResponse.redirect(new URL('/admin', request.url));
    } 
    else if(rol == 3){
      console.log('Usuario no autorizado en /cliente, redirigiendo a /empleado');
      return NextResponse.redirect(new URL('/empleado', request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith('/empleado')) {
    if (rol == 1) {
      console.log('Usuario no autorizado en /empleado, redirigiendo a /admin');
      return NextResponse.redirect(new URL('/admin', request.url));
    } 
    else if(rol == 2){
      console.log('Usuario no autorizado en /empleado, redirigiendo a /cliente');
      return NextResponse.redirect(new URL('/cliente', request.url));
    }
  }
  // Denegar acceso si no hay token
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
    '/admin/:path*',
    '/empleado/:path*',
    '/cliente/:path*'
],
};
