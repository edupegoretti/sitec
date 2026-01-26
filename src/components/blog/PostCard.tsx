'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { calculateReadingTime, formatRelativeDate, getTopicColors } from '@/lib/blog-utils'
import { FORMAT_LABEL, type PostFormat } from '@/sanity/lib/labels'

export type PostCardData = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  format: PostFormat
  coverImageUrl?: string | null
  coverImageAlt?: string | null
  primaryTheme?: { title: string; slug: string } | null
  authors?: { name: string; slug: string; imageUrl?: string }[]
}

type Props = {
  post: PostCardData
  variant?: 'default' | 'compact'
  priority?: boolean
  basePath?: string
}

export function PostCard({ post, variant = 'default', priority = false, basePath = '/recursos/blog' }: Props) {
  const readingTime = calculateReadingTime(post.excerpt)
  const relativeDate = formatRelativeDate(post.publishedAt)
  const topicColors = getTopicColors(post.primaryTheme?.slug)
  const authorName = post.authors?.[0]?.name

  // Variante Compact (sidebar)
  if (variant === 'compact') {
    return (
      <Link
        href={`${basePath}/${post.slug}`}
        className="group flex gap-4 py-4 border-b border-gray-100 last:border-0"
      >
        {post.coverImageUrl && (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="80px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-brand transition-colors">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{readingTime} min</span>
            <span>·</span>
            <span>{relativeDate}</span>
          </div>
        </div>
      </Link>
    )
  }

  // Variante Default (grid)
  return (
    <Link href={`${basePath}/${post.slug}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1">
        {/* Imagem */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
          )}

          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Tempo de leitura */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-700 shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min
            </span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Tópico + Formato */}
          <div className="flex items-center gap-2 mb-3">
            {post.primaryTheme && (
              <span
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-semibold',
                  topicColors.bg,
                  topicColors.text
                )}
              >
                {post.primaryTheme.title}
              </span>
            )}
            <span className="text-xs text-gray-400">{FORMAT_LABEL[post.format]}</span>
          </div>

          {/* Título */}
          <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            {authorName && <span className="font-medium text-gray-700">{authorName}</span>}
            <span>{relativeDate}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Empty state
export function PostCardEmptyState() {
  return (
    <div className="col-span-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">📝</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Nenhum conteúdo ainda</h3>
      <p className="text-gray-600 mt-2">Novos artigos em breve.</p>
    </div>
  )
}
