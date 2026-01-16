import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { formatPtBrDate } from '@/lib/date'
import type { PostFormat, PostStage } from '@/sanity/lib/labels'

type PostCardAuthor = {
  name: string
  slug: string
  image?: string | null
}

export type FeaturedPostData = {
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
  post: FeaturedPostData
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

function AuthorAvatar({ author }: { author: PostCardAuthor }) {
  if (author.image) {
    return (
      <Image
        src={author.image}
        alt={author.name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover"
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
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-white font-semibold text-sm">
      {initials}
    </div>
  )
}

export function FeaturedPostHero({ post, className }: Props) {
  const readingTime = getReadingTime(post.wordCount)
  const relativeDate = formatRelativeDate(post.publishedAt)
  const categoryColors = getCategoryColors(post.primaryTheme?.slug)
  const firstAuthor = post.authors?.[0]

  return (
    <Link
      href={`/recursos/blog/${post.slug}`}
      className={cn(
        'group block rounded-3xl border border-gray-200 bg-white overflow-hidden transition-all duration-500 hover:shadow-elevated',
        className
      )}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative aspect-[16/9] md:aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200">
          {post.coverImageUrl && (
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          )}
          {/* Gradient overlay on the right edge for desktop */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
          {/* Gradient overlay on bottom for mobile */}
          <div className="md:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-10 flex flex-col justify-center">
          {post.primaryTheme && (
            <span
              className={cn(
                'inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold mb-4',
                categoryColors.bg,
                categoryColors.text
              )}
            >
              {post.primaryTheme.title}
            </span>
          )}

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight transition-colors group-hover:text-brand">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="mt-4 text-gray-600 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex items-center gap-4">
            {firstAuthor && (
              <div className="flex items-center gap-3">
                <AuthorAvatar author={firstAuthor} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {firstAuthor.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {readingTime} de leitura • {relativeDate}
                  </span>
                </div>
              </div>
            )}
            {!firstAuthor && (
              <span className="text-sm text-gray-500">
                {readingTime} de leitura • {relativeDate}
              </span>
            )}
          </div>

          <div className="mt-6">
            <span className="inline-flex items-center gap-2 text-brand font-semibold transition-all group-hover:gap-3">
              Ler artigo completo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
