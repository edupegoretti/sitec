import { draftMode } from 'next/headers'

import { client } from './client'

type SanityFetchOptions<QueryResponse> = {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate = 60 * 30,
}: SanityFetchOptions<QueryResponse>): Promise<QueryResponse> {
  const { isEnabled } = await draftMode()

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
