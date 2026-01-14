function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const projectId = requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID')
export const dataset = requireEnv('NEXT_PUBLIC_SANITY_DATASET')

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

export const studioTitle = process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE ?? 'Zopu — Conteúdo'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zopu.com.br'
