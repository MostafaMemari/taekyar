import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getCookie } from './utils/cookie'
import { COOKIE_NAMES } from './libs/constants'

const guestOnlyRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password']

export async function middleware(request: NextRequest) {
  const token = (await getCookie(COOKIE_NAMES.ACCESS_TOKEN)) && (await getCookie(COOKIE_NAMES.REFRESH_TOKEN))
  const { pathname } = request.nextUrl

  const isGuestRoute = guestOnlyRoutes.some(route => pathname.startsWith(route))
  const isPublicFile = /\.(.*)$/.test(pathname)
  const isApiRoute = pathname.startsWith('/api')

  if (isPublicFile || isApiRoute) {
    return NextResponse.next()
  }

  if (!token && !isGuestRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (token && isGuestRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*']
}
