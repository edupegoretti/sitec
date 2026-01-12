'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ResourceItem, ResourceType } from '@/lib/resources/library'

function typeLabel(type: ResourceType): string {
  switch (type) {
    case 'zopucast':
      return 'Zopucast'
    case 'webinar':
      return 'Webinar'
    case 'metodologia':
      return 'Metodologia'
  }
}

export function ResourceGrid({
  items,
  searchPlaceholder = 'Buscar por título…',
  emptyTitle = 'Nada por aqui (ainda)',
  emptyDescription = 'Tente buscar outro termo.',
}: {
  items: ResourceItem[]
  searchPlaceholder?: string
  emptyTitle?: string
  emptyDescription?: string
}) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => item.title.toLowerCase().includes(q))
  }, [items, query])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative max-w-xl w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <p className="text-sm text-gray-500">
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
          {filtered.map((item) => (
            <Link
              key={`${item.type}:${item.id}`}
              href={item.href}
              className="group block h-full rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-video bg-gray-100 relative">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs text-white font-semibold">
                  {typeLabel(item.type)}
                </div>
                {item.dateLabel && (
                  <div className="absolute bottom-3 right-3 text-xs text-white/90 font-medium">{item.dateLabel}</div>
                )}
              </div>
              <div className="p-5">
                <h3 className={cn('font-bold text-gray-900 leading-snug group-hover:text-brand transition-colors')}>
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
