'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'

import { Badge } from '@/components/shared'
import { cn } from '@/lib/utils'
import { formatPtBrDate } from '@/lib/date'
import { FORMAT_LABEL, STAGE_LABEL, type PostFormat, type PostStage } from '@/sanity/lib/labels'

export type PostSearchItem = {
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
  authors?: { name: string; slug: string }[]
}

function stageVariant(stage: PostStage): 'default' | 'success' | 'warning' | 'info' | 'danger' {
  switch (stage) {
    case 'diagnostico':
      return 'info'
    case 'estruturacao':
      return 'warning'
    case 'implementacao':
      return 'default'
    case 'otimizacao':
      return 'success'
    case 'decisao':
      return 'danger'
  }
}

const STAGE_FILTERS: Array<{ label: string; value: PostStage | 'all' }> = [
  { label: 'Todos os estágios', value: 'all' },
  { label: STAGE_LABEL.diagnostico, value: 'diagnostico' },
  { label: STAGE_LABEL.estruturacao, value: 'estruturacao' },
  { label: STAGE_LABEL.implementacao, value: 'implementacao' },
  { label: STAGE_LABEL.otimizacao, value: 'otimizacao' },
  { label: STAGE_LABEL.decisao, value: 'decisao' },
]

const FORMAT_FILTERS: Array<{ label: string; value: PostFormat | 'all' }> = [
  { label: 'Todos os formatos', value: 'all' },
  { label: FORMAT_LABEL.artigo, value: 'artigo' },
  { label: FORMAT_LABEL.guia, value: 'guia' },
  { label: FORMAT_LABEL.playbook, value: 'playbook' },
  { label: FORMAT_LABEL.template, value: 'template' },
  { label: FORMAT_LABEL.caso, value: 'caso' },
  { label: FORMAT_LABEL.comparativo, value: 'comparativo' },
]

export function PostSearchGrid({
  items,
  searchPlaceholder = 'Buscar por título…',
  emptyTitle = 'Nada por aqui (ainda)',
  emptyDescription = 'Tente buscar outro termo.',
}: {
  items: PostSearchItem[]
  searchPlaceholder?: string
  emptyTitle?: string
  emptyDescription?: string
}) {
  const [query, setQuery] = useState('')
  const [stage, setStage] = useState<PostStage | 'all'>('all')
  const [format, setFormat] = useState<PostFormat | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      const matchesQuery = !q || item.title.toLowerCase().includes(q) || item.excerpt?.toLowerCase().includes(q)
      const matchesStage = stage === 'all' || item.stage === stage
      const matchesFormat = format === 'all' || item.format === format
      return matchesQuery && matchesStage && matchesFormat
    })
  }, [items, query, stage, format])

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as PostStage | 'all')}
              className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {STAGE_FILTERS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as PostFormat | 'all')}
              className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand/30"
            >
              {FORMAT_FILTERS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-500 shrink-0">
          {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-lg font-bold text-gray-900">{emptyTitle}</p>
          <p className="text-gray-600 mt-2">{emptyDescription}</p>
        </div>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post._id}
              href={`/recursos/blog/${post.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200/40"
            >
              <div className="relative aspect-[16/9] bg-linear-to-br from-gray-100 to-gray-200">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : null}
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2">
                  <Badge variant={stageVariant(post.stage)} size="sm">
                    {STAGE_LABEL[post.stage]}
                  </Badge>
                  <Badge variant="dark" size="sm">
                    {FORMAT_LABEL[post.format]}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3 text-xs font-medium text-white/90">
                  {formatPtBrDate(post.publishedAt)}
                </div>
              </div>

              <div className="p-5">
                {post.primaryTheme?.title ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand/80">
                    {post.primaryTheme.title}
                  </p>
                ) : null}
                <h3 className={cn('mt-2 font-bold text-gray-900 leading-snug transition-colors group-hover:text-brand')}>
                  {post.title}
                </h3>
                {post.excerpt ? (
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                ) : null}
                {post.authors?.length ? (
                  <p className="mt-4 text-xs text-gray-500">{post.authors.map((a) => a.name).join(', ')}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

