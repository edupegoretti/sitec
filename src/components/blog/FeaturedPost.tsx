'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

import { Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'
import { calculateReadingTime, formatRelativeDate, getTopicColors } from '@/lib/blog-utils'
import { FORMAT_LABEL } from '@/sanity/lib/labels'
import type { PostCardData } from './PostCard'

type Props = {
  post: PostCardData | null
  basePath?: string
}

export function FeaturedPost({ post, basePath = '/recursos/blog' }: Props) {
  if (!post) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Primeiro artigo em breve</h3>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Estamos preparando conteúdo de qualidade para você.
        </p>
      </div>
    )
  }

  const readingTime = calculateReadingTime(post.excerpt)
  const relativeDate = formatRelativeDate(post.publishedAt)
  const topicColors = getTopicColors(post.primaryTheme?.slug)
  const authorName = post.authors?.[0]?.name

  return (
    <Reveal>
      <Link href={`${basePath}/${post.slug}`} className="group block">
        <article className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
          <div className="grid lg:grid-cols-2">
            {/* Imagem */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] bg-gray-100 overflow-hidden">
              {post.coverImageUrl ? (
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt || post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-brand/10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-lg">
                    <span className="text-4xl">📄</span>
                  </div>
                </div>
              )}

              {/* Badge destaque */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm text-sm font-semibold text-gray-900 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  Destaque
                </span>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Meta superior */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {post.primaryTheme && (
                  <span
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-semibold',
                      topicColors.bg,
                      topicColors.text
                    )}
                  >
                    {post.primaryTheme.title}
                  </span>
                )}
                <span className="text-sm text-gray-500">{FORMAT_LABEL[post.format]}</span>
              </div>

              {/* Título */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-brand transition-colors duration-300">
                {post.title}
              </h2>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-6 text-lg text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              {/* Meta inferior */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readingTime} min de leitura
                </span>
                <span>{relativeDate}</span>
                {authorName && <span className="font-medium text-gray-700">por {authorName}</span>}
              </div>

              {/* CTA sutil */}
              <div className="mt-8">
                <span className="inline-flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all duration-300">
                  Ler artigo
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  )
}
