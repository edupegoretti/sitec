'use client'

import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { formatPtBrDate } from '@/lib/date'
import type { PostFormat, PostStage } from '@/sanity/lib/labels'

type PostCardAuthor = {
  name: string
  slug: string
  image?: string | null
}

export type PostCardEnhancedData = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  stage: PostStage
  format: PostFormat
  coverImageUrl?: string | null
  coverImageAlt?: string | null
  primaryTheme?: { title: string; slug: string } | null
  authors?: PostCardAuthor[]
  wordCount?: number
}

type Props = {
  post: PostCardEnhancedData
  variant?: 'default' | 'compact' | 'horizontal'
  className?: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  vendas: { bg: 'bg-amber-100', text: 'text-amber-800' },
  marketing: { bg: 'bg-blue-100', text: 'text-blue-800' },
  operacoes: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
  clientes: { bg: 'bg-pink-100', text: 'text-pink-800' },
  dados: { bg: 'bg-violet-100', text: 'text-violet-800' },
  tecnologia: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
  gestao: { bg: 'bg-red-100', text: 'text-red-800' },
  processos: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  automacao: { bg: 'bg-orange-100', text: 'text-orange-800' },
  integracao: { bg: 'bg-teal-100', text: 'text-teal-800' },
}

function getReadingTime(wordCount?: number): string {
  if (!wordCount || wordCount === 0) return '3 min'
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min`
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoje'
  if (diffDays === 1) return 'Ontem'
  if (diffDays < 7) return `há ${diffDays} dias`
  if (diffDays < 14) return 'há 1 semana'
  if (diffDays < 30) return `há ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 60) return 'há 1 mês'
  if (diffDays < 365) return `há ${Math.floor(diffDays / 30)} meses`
  return formatPtBrDate(dateString)
}

function getCategoryColors(slug?: string): { bg: string; text: string } {
  if (!slug) return { bg: 'bg-gray-100', text: 'text-gray-700' }
  const normalized = slug.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return CATEGORY_COLORS[normalized] || { bg: 'bg-brand-light', text: 'text-brand' }
}

function AuthorAvatar({ author, size = 'sm' }: { author: PostCardAuthor; size?: 'sm' | 'md' }) {
  const sizeClasses = size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'

  if (author.image) {
    return (
      <Image
        src={author.image}
        alt={author.name}
        width={size === 'sm' ? 24 : 32}
        height={size === 'sm' ? 24 : 32}
        className={cn(sizeClasses, 'rounded-full object-cover')}
      />
    )
  }

  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className={cn(
        sizeClasses,
        'rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-white font-semibold'
      )}
    >
      {initials}
    </div>
  )
}

export function PostCardEnhanced({ post, variant = 'default', className }: Props) {
  const readingTime = getReadingTime(post.wordCount)
  const relativeDate = formatRelativeDate(post.publishedAt)
  const categoryColors = getCategoryColors(post.primaryTheme?.slug)
  const firstAuthor = post.authors?.[0]

  if (variant === 'compact') {
    return (
      <Link
        href={`/recursos/blog/${post.slug}`}
        className={cn(
          'group flex items-start gap-3 py-3 transition-colors hover:bg-gray-50 rounded-lg px-2 -mx-2',
          className
        )}
      >
        {post.coverImageUrl && (
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-brand transition-colors">
            {post.title}
          </h4>
          <p className="mt-1 text-xs text-gray-500">
            {readingTime} de leitura • {relativeDate}
          </p>
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/recursos/blog/${post.slug}`}
        className={cn(
          'group flex gap-4 p-4 rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated',
          className
        )}
      >
        {post.coverImageUrl && (
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          {post.primaryTheme && (
            <span
              className={cn(
                'inline-flex self-start px-2 py-0.5 rounded-full text-xs font-semibold',
                categoryColors.bg,
                categoryColors.text
              )}
            >
              {post.primaryTheme.title}
            </span>
          )}
          <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-brand transition-colors">
            {post.title}
          </h4>
          <p className="text-xs text-gray-500">
            {readingTime} de leitura • {relativeDate}
          </p>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/recursos/blog/${post.slug}`}
      className={cn(
        'group block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-elevated',
        className
      )}
    >
      <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200">
        {post.coverImageUrl && (
          <Image
            src={post.coverImageUrl}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {post.primaryTheme && (
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm',
                categoryColors.bg,
                categoryColors.text
              )}
            >
              {post.primaryTheme.title}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 transition-colors group-hover:text-brand">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {firstAuthor && <AuthorAvatar author={firstAuthor} size="sm" />}
            <span className="text-xs text-gray-600">
              {firstAuthor?.name || 'Zopu'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{readingTime}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{relativeDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
