import { draftMode } from 'next/headers'

import { client } from './client'
import { isSanityConfigured } from './env'

type SanityFetchOptions<QueryResponse> = {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number
}

/**
 * Fetch data from Sanity CMS with proper type safety
 * Returns the query response or null/empty array when Sanity is not configured
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate = 60 * 30,
}: SanityFetchOptions<QueryResponse>): Promise<QueryResponse> {
  // Return appropriate default when Sanity is not configured
  if (!isSanityConfigured || !client) {
    // Check if query expects a single result (uses [0] pattern) or array
    const isSingleResult = query.includes('[0]')
    return (isSingleResult ? null : []) as QueryResponse
  }

  let isEnabled = false
  try {
    const draft = await draftMode()
    isEnabled = draft.isEnabled
  } catch {
    // draftMode() can fail during static generation, default to false
  }

  if (isEnabled) {
    const token = process.env.SANITY_API_READ_TOKEN

    return client
      .withConfig({
        token,
        useCdn: false,
        perspective: token ? 'previewDrafts' : 'published',
      })
      .fetch(query, params, { cache: 'no-store' })
  }

  return client.fetch(query, params, { next: { revalidate, tags } })
}
