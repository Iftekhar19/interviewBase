;
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/sign-in' || path === '/sign-up' || path === "/verifyEmail" || path === "/resetPassLink" || path === "/resetPass";
    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        // Authenticated user trying to access public path, redirect to dashboard
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (!isPublicPath && !token) {
        // Unauthenticated user trying to access protected path, redirect to login
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    // Allow request to proceed
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    
    "/sign-in",
    '/sign-up',
    '/profile',
    '/verifyEmail',
    '/resetPass',
    '/resetPassLink',
    '/dashboard'
  ],
}