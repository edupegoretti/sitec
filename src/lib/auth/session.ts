import { cookies } from 'next/headers'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

/**
 * Session management using JWT tokens stored in HTTP-only cookies
 *
 * Security features:
 * - HTTP-only cookies (prevents XSS attacks)
 * - Secure flag in production (HTTPS only)
 * - SameSite=Strict (prevents CSRF attacks)
 * - JWT with HS256 signing
 * - 8-hour session duration
 */

// Session configuration
const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION_HOURS = 8
const SESSION_DURATION_MS = SESSION_DURATION_HOURS * 60 * 60 * 1000

// Get secret from environment or use fallback (will fail validation in production)
function getSessionSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    console.warn('ADMIN_SESSION_SECRET not configured - sessions will not work correctly')
    return new TextEncoder().encode('fallback-secret-do-not-use-in-production')
  }
  return new TextEncoder().encode(secret)
}

// Session payload type
export interface SessionPayload extends JWTPayload {
  authenticated: true
  createdAt: number
}

/**
 * Create a new session token
 *
 * @returns JWT token string
 */
export async function createSession(): Promise<string> {
  const payload: SessionPayload = {
    authenticated: true,
    createdAt: Date.now(),
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_HOURS}h`)
    .sign(getSessionSecret())

  return token
}

/**
 * Verify a session token
 *
 * @param token - JWT token to verify
 * @returns Session payload if valid, null otherwise
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret())

    // Validate payload structure
    if (payload.authenticated !== true || typeof payload.createdAt !== 'number') {
      return null
    }

    return payload as SessionPayload
  } catch (error) {
    // Token is invalid or expired
    if (process.env.NODE_ENV === 'development') {
      console.debug('Session verification failed:', error instanceof Error ? error.message : 'Unknown error')
    }
    return null
  }
}

/**
 * Set session cookie with secure options
 *
 * @param token - JWT token to store in cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION_MS / 1000, // Convert to seconds
    path: '/',
  })
}

/**
 * Clear the session cookie (logout)
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
}

/**
 * Get the current session from cookies
 *
 * @returns Session payload if authenticated, null otherwise
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) {
    return null
  }

  return verifySession(token)
}

/**
 * Check if user is authenticated (convenience function)
 *
 * @returns true if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}

/**
 * Get session cookie name (for middleware)
 */
export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME
}
