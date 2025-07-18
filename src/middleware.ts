import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Skip middleware for public API endpoints completely
  const pathname = request.nextUrl.pathname;
  
  if (pathname.startsWith('/api/sync') || 
      pathname.startsWith('/api/admin') || 
      pathname.startsWith('/api/cron')) {
    return NextResponse.next();
  }
  
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Public API routes are handled explicitly in middleware function
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}