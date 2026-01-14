// Sanity environment variables - optional for builds without CMS
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// Helper to check if Sanity is configured
export const isSanityConfigured = Boolean(projectId)

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

export const studioTitle = process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE ?? 'Zopu — Conteúdo'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zopu.com.br'
