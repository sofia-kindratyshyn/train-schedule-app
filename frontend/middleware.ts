//import { NextResponse } from 'next/server';
//import type { NextRequest } from 'next/server';

//const privateRoutes = ['/profile', '/notes', '/trains'];
//const publicRoutes = ['/sign-in', '/sign-up'];

//export function middleware(request: NextRequest) {
  //const { pathname } = request.nextUrl;

 // const accessToken = request.cookies.get('accessToken')?.value;
 // const refreshToken = request.cookies.get('refreshToken')?.value;

  //const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  //const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

 // if (isPrivateRoute && !accessToken) {
   // return NextResponse.redirect(new URL('/sign-in', request.url));
 // }

 // if (isPublicRoute && accessToken) {
 //   return NextResponse.redirect(new URL('/', request.url));
//  }

//  return NextResponse.next();
//}

//export const config = {
 // matcher: ['/profile/:path*', '/trains/:path*', '/sign-in', '/sign-up'],
//};
