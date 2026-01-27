import type { PostCardData } from '@/components/blog/PostCard'
import type { PostFormat } from '@/sanity/lib/labels'
import { urlForImage } from '@/sanity/lib/image'

/**
 * Raw post shape returned by GROQ queries using `postCardFields`.
 * `coverImage` is a Sanity image object, not a URL string.
 */
export type SanityRawPost = {
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

/** Transform a raw Sanity post (with coverImage object) into PostCardData (with coverImageUrl string). */
export function toPostCardData(post: SanityRawPost): PostCardData {
  return {
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
  }
}

/** Transform an array of raw Sanity posts into PostCardData[]. */
export function toPostCardDataList(posts: SanityRawPost[]): PostCardData[] {
  return posts.map(toPostCardData)
}
