import type { Metadata } from 'next'

import { sanityFetch } from '@/sanity/lib/fetch'
import { postsIndexQuery, themesWithCountQuery } from '@/sanity/lib/queries'
import { BlogPageClient } from '@/components/blog/BlogPageClient'
import { toPostCardDataList, type SanityRawPost } from '@/sanity/lib/transforms'

export const metadata: Metadata = {
  title: 'Blog | Zopu',
  description:
    'Artigos práticos sobre Bitrix24, vendas, automação e como tirar resultados reais do seu CRM.',
  alternates: { canonical: '/recursos/blog' },
  openGraph: {
    title: 'Blog | Zopu',
    description:
      'Artigos práticos sobre Bitrix24, vendas, automação e como tirar resultados reais do seu CRM.',
  },
}

export const revalidate = 1800

type Theme = {
  _id: string
  title: string
  slug: string
  count?: number
}

export default async function BlogPage() {
  const [rawPosts, themes] = await Promise.all([
    sanityFetch<SanityRawPost[]>({ query: postsIndexQuery, tags: ['post'] }),
    sanityFetch<Theme[]>({ query: themesWithCountQuery, tags: ['theme'] }),
  ])

  const posts = toPostCardDataList(rawPosts)

  const topics = themes.map((t) => ({
    _id: t._id,
    slug: t.slug,
    title: t.title,
    count: t.count,
  }))

  return <BlogPageClient posts={posts} topics={topics} />
}
