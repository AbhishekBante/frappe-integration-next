
import {type NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

     const currentUser = request.cookies.get('userInfo')?.value
//  console.log("Current User: ",currentUser);
 
    if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
      return Response.redirect(new URL('/dashboard', request.url))
    }
   
    if (!currentUser && !request.nextUrl.pathname.startsWith('/')) {
      return Response.redirect(new URL('/', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}