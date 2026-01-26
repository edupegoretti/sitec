import { NextResponse } from 'next/server'
import { clearSessionCookie, getSession } from '@/lib/auth/session'

/**
 * Admin logout endpoint
 *
 * POST /api/admin/logout
 *
 * Clears the session cookie and invalidates the session
 */

export async function POST() {
  try {
    // Check if user was logged in (for logging purposes)
    const session = await getSession()
    const wasLoggedIn = session !== null

    // Clear the session cookie
    await clearSessionCookie()

    if (wasLoggedIn) {
      console.log('[Admin Logout] User logged out successfully')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Admin Logout] Error:', error instanceof Error ? error.message : 'Unknown error')
    // Still clear cookie even if there's an error
    await clearSessionCookie()
    return NextResponse.json({ success: true })
  }
}
