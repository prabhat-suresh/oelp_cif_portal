import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
      console.log("HERE");
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
      console.log("THEREEEEE");
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
    '/',
    '/profile',
    '/login',
    '/signup', '/pendingRequests', '/equipments'
  ]
}