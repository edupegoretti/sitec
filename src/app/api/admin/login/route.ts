import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/auth/password'
import { createSession, setSessionCookie } from '@/lib/auth/session'
import { rateLimit } from '@/lib/rate-limit'

/**
 * Admin login endpoint
 *
 * POST /api/admin/login
 * Body: { password: string }
 *
 * Security features:
 * - Rate limiting (5 attempts per minute per IP)
 * - PBKDF2 password verification with timing-safe comparison
 * - Artificial delay on failed attempts (prevents timing attacks)
 * - HTTP-only session cookie
 */

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

// Rate limit configuration: 5 requests per minute
const RATE_LIMIT_CONFIG = {
  windowMs: 60000, // 1 minute
  maxRequests: 5,
}

// Artificial delay range for failed attempts (1-1.5 seconds)
const MIN_DELAY_MS = 1000
const MAX_DELAY_MS = 1500

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }
  return 'unknown'
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  // Check rate limit
  const rateLimitResult = rateLimit(`admin-login:${ip}`, RATE_LIMIT_CONFIG)

  if (!rateLimitResult.success) {
    const retryAfter = Math.ceil(rateLimitResult.resetIn / 1000)
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde um momento.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(retryAfter),
        },
      }
    )
  }

  try {
    const body = await request.json()
    const { password } = body

    // Validate input
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Senha obrigatoria' }, { status: 400 })
    }

    // Check if password hash is configured
    if (!ADMIN_PASSWORD_HASH) {
      console.error('[Admin Login] ADMIN_PASSWORD_HASH not configured')
      return NextResponse.json({ error: 'Configuracao invalida do servidor' }, { status: 500 })
    }

    // Verify password
    const isValid = await verifyPassword(password, ADMIN_PASSWORD_HASH)

    if (!isValid) {
      // Add artificial delay to prevent timing attacks
      const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)
      await new Promise((resolve) => setTimeout(resolve, delay))

      console.log(`[Admin Login] Failed attempt from IP: ${ip}`)
      return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    // Create session and set cookie
    const token = await createSession()
    await setSessionCookie(token)

    console.log(`[Admin Login] Successful login from IP: ${ip}`)

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    )
  } catch (error) {
    console.error('[Admin Login] Error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
