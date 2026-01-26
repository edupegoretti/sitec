/**
 * Script to generate a password hash for admin authentication
 *
 * Usage:
 *   npx tsx scripts/generate-password-hash.ts "your-secure-password"
 *
 * The output hash should be added to your .env.local file as:
 *   ADMIN_PASSWORD_HASH=<generated-hash>
 */

// PBKDF2 settings (must match src/lib/auth/password.ts)
const ITERATIONS = 100000
const HASH_ALGORITHM = 'SHA-256'
const SALT_LENGTH = 16
const KEY_LENGTH = 256 // bits

async function hashPassword(password: string): Promise<string> {
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

async function main() {
  const password = process.argv[2]

  if (!password) {
    console.error('Usage: npx tsx scripts/generate-password-hash.ts "your-password"')
    console.error('')
    console.error('Example:')
    console.error('  npx tsx scripts/generate-password-hash.ts "minha-senha-segura"')
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('Error: Password should be at least 8 characters long')
    process.exit(1)
  }

  console.log('')
  console.log('Generating password hash...')
  console.log('')

  const hash = await hashPassword(password)

  console.log('Add this to your .env.local file:')
  console.log('')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  console.log('')
  console.log('Also generate a session secret:')
  console.log('')
  console.log('ADMIN_SESSION_SECRET=' + Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('hex'))
  console.log('')
}

main().catch(console.error)
