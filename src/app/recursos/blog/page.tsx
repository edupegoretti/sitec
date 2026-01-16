import type { Metadata } from 'next'

import { sanityFetch } from '@/sanity/lib/fetch'
import { postsIndexQuery, themesWithCountQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { BlogPageClient } from '@/components/blog/BlogPageClient'
import type { PostCardData } from '@/components/blog/PostCard'
import type { PostFormat } from '@/sanity/lib/labels'

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

type SanityPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  format: PostFormat
  coverImage?: { asset?: { _ref: string }; alt?: string }
  primaryTheme?: { title: string; slug: string } | null
  authors?: { name: string; slug: string; image?: unknown }[]
}

type Theme = {
  _id: string
  title: string
  slug: string
  count?: number
}

function getAuthorImageUrl(image: unknown): string | undefined {
  if (!image || typeof image !== 'object') return undefined
  const img = image as { asset?: { _ref?: string } }
  if (!img.asset?._ref) return undefined
  try {
    return urlForImage(image).width(64).height(64).fit('crop').url()
  } catch {
    return undefined
  }
}

export default async function BlogPage() {
  const [rawPosts, themes] = await Promise.all([
    sanityFetch<SanityPost[]>({ query: postsIndexQuery, tags: ['post'] }),
    sanityFetch<Theme[]>({ query: themesWithCountQuery, tags: ['theme'] }),
  ])

  const posts: PostCardData[] = rawPosts.map((post) => ({
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    format: post.format,
    coverImageUrl: post.coverImage?.asset
      ? urlForImage(post.coverImage).width(1200).height(675).fit('crop').url()
      : null,
    coverImageAlt: post.coverImage?.alt ?? post.title,
    primaryTheme: post.primaryTheme,
    authors: post.authors?.map((a) => ({
      name: a.name,
      slug: a.slug,
      imageUrl: getAuthorImageUrl(a.image),
    })),
  }))

  const topics = themes.map((t) => ({
    _id: t._id,
    slug: t.slug,
    title: t.title,
    count: t.count,
  }))

  return <BlogPageClient posts={posts} topics={topics} />
}
