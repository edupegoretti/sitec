'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

type Category = {
  slug: string
  title: string
  count?: number
}

type Props = {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
  totalCount?: number
  className?: string
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  totalCount,
  className,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return

    setShowLeftFade(el.scrollLeft > 0)
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const allCategories = [
    { slug: null, title: 'Todos', count: totalCount },
    ...categories,
  ]

  return (
    <div className={cn('relative', className)}>
      {/* Left fade gradient */}
      {showLeftFade && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      )}

      {/* Right fade gradient */}
      {showRightFade && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allCategories.map((category) => {
          const isActive = activeCategory === category.slug
          return (
            <button
              key={category.slug ?? 'all'}
              onClick={() => onCategoryChange(category.slug)}
              className={cn(
                'flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'bg-brand text-white shadow-button scale-105'
                  : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
              )}
            >
              {category.title}
              {typeof category.count === 'number' && (
                <span
                  className={cn(
                    'ml-1.5 text-xs',
                    isActive ? 'opacity-80' : 'opacity-60'
                  )}
                >
                  ({category.count})
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
