import { timingSafeEqual } from 'crypto'

/**
 * Password hashing and verification using PBKDF2
 * Compatible with Edge Runtime (uses Web Crypto API)
 *
 * Security features:
 * - 100,000 iterations of PBKDF2
 * - SHA-256 hash function
 * - 16-byte random salt per password
 * - Timing-safe comparison to prevent timing attacks
 */

const ITERATIONS = 100000
const HASH_ALGORITHM = 'SHA-256'
const SALT_LENGTH = 16
const KEY_LENGTH = 256 // bits

/**
 * Hash a password using PBKDF2
 *
 * @param password - Plain text password to hash
 * @returns Base64 encoded string containing salt + hash
 *
 * @example
 * const hash = await hashPassword('my-secure-password')
 * // Store hash in environment variable or database
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  // Generate random salt
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))

  // Import password as key
  const key = await crypto.subtle.importKey('raw', data, { name: 'PBKDF2' }, false, ['deriveBits'])

  // Derive hash
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: HASH_ALGORITHM,
    },
    key,
    KEY_LENGTH
  )

  // Combine salt + hash
  const hashArray = new Uint8Array(derivedBits)
  const combined = new Uint8Array(salt.length + hashArray.length)
  combined.set(salt)
  combined.set(hashArray, salt.length)

  return Buffer.from(combined).toString('base64')
}

/**
 * Verify a password against a stored hash
 * Uses timing-safe comparison to prevent timing attacks
 *
 * @param password - Plain text password to verify
 * @param storedHash - Base64 encoded hash from hashPassword()
 * @returns true if password matches, false otherwise
 *
 * @example
 * const isValid = await verifyPassword('user-input', process.env.ADMIN_PASSWORD_HASH)
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Decode stored hash
    const combined = Buffer.from(storedHash, 'base64')

    // Extract salt and hash
    const salt = combined.subarray(0, SALT_LENGTH)
    const storedHashBytes = combined.subarray(SALT_LENGTH)

    // Verify lengths are correct
    if (salt.length !== SALT_LENGTH || storedHashBytes.length !== KEY_LENGTH / 8) {
      return false
    }

    // Derive hash from provided password
    const encoder = new TextEncoder()
    const data = encoder.encode(password)

    const key = await crypto.subtle.importKey('raw', data, { name: 'PBKDF2' }, false, ['deriveBits'])

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: ITERATIONS,
        hash: HASH_ALGORITHM,
      },
      key,
      KEY_LENGTH
    )

    const computedHash = Buffer.from(new Uint8Array(derivedBits))

    // Timing-safe comparison
    if (computedHash.length !== storedHashBytes.length) {
      return false
    }

    return timingSafeEqual(computedHash, storedHashBytes)
  } catch (error) {
    // Log error for debugging but don't expose details
    console.error('Password verification error:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

/**
 * Generate a secure random string for session secrets
 *
 * @param length - Length of the string (default: 32)
 * @returns Random hex string
 */
export function generateSecureSecret(length: number = 32): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length))
  return Buffer.from(bytes).toString('hex')
}
