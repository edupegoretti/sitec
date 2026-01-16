import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, projectId, isSanityConfigured } from './env'

// Only create client if Sanity is configured
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      // Disable visual editing to suppress connection warning
      stega: { enabled: false },
    })
  : null

