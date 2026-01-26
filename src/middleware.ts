import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for route protection
 *
 * Protects:
 * - /admin/* routes (except /admin/login)
 * - /api/admin/* routes (except /api/admin/login)
 *
 * Security features:
 * - Checks for session cookie presence
 * - Redirects to login for page routes
 * - Returns 401 for API routes
 */

const SESSION_COOKIE_NAME = 'admin_session'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is an admin route that needs protection
  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value

  if (!sessionToken) {
    // No session - redirect pages to login, return 401 for APIs
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Redirect to login with return URL
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Session exists - allow request
  // Note: Full session validation happens in API routes
  // Middleware can't do async operations for JWT verification
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match admin pages
    '/admin/:path*',
    // Match admin API routes
    '/api/admin/:path*',
  ],
}
