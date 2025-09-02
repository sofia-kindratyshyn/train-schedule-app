import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value

  if ((pathname.startsWith('/trains') || pathname.startsWith('/profile')) && !accessToken) {
    return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, request.url))
  }

  if ((pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/trains/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
}
