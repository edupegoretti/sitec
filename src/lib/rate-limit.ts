/**
 * In-memory rate limiter for serverless environments
 * Resets on cold start, which is acceptable for login protection
 */

type RateLimitRecord = {
  count: number
  resetTime: number
}

type RateLimitConfig = {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

type RateLimitResult = {
  success: boolean
  remaining: number
  resetIn: number
}

// In-memory store for rate limit records
const rateLimitMap = new Map<string, RateLimitRecord>()

// Cleanup interval - remove expired entries periodically
const CLEANUP_PROBABILITY = 0.01 // 1% chance per request

function cleanupExpiredEntries(): void {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }
}

/**
 * Check and update rate limit for a given identifier
 *
 * @param identifier - Unique identifier (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Object with success status, remaining requests, and reset time
 *
 * @example
 * const result = rateLimit(`login:${ip}`, { windowMs: 60000, maxRequests: 5 })
 * if (!result.success) {
 *   return new Response('Too many requests', { status: 429 })
 * }
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 5 }
): RateLimitResult {
  const now = Date.now()

  // Probabilistic cleanup to avoid memory leaks
  if (Math.random() < CLEANUP_PROBABILITY) {
    cleanupExpiredEntries()
  }

  const record = rateLimitMap.get(identifier)

  // No existing record or expired record - create new one
  if (!record || record.resetTime < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    }
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    }
  }

  // Increment counter
  record.count++
  return {
    success: true,
    remaining: config.maxRequests - record.count,
    resetIn: record.resetTime - now,
  }
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or manual reset
 */
export function resetRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier)
}

/**
 * Get current rate limit status without incrementing
 */
export function getRateLimitStatus(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 5 }
): RateLimitResult {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || record.resetTime < now) {
    return {
      success: true,
      remaining: config.maxRequests,
      resetIn: 0,
    }
  }

  return {
    success: record.count < config.maxRequests,
    remaining: Math.max(0, config.maxRequests - record.count),
    resetIn: record.resetTime - now,
  }
}
