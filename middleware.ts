// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setCookie } from 'cookies-next'

export function middleware (request: NextRequest) {
    // ignoring api routes and static files
    const res = NextResponse.next();
    if(!request.nextUrl.pathname.includes('/api') && !request.nextUrl.pathname.includes('/_next')&& !request.nextUrl.pathname.includes('.')) {
        res.cookies.set('currentUrl', request.nextUrl.pathname)
    }
    return res
}

// Supports both a single string value or an array of matchers
export const config = {
}