'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { PostCard, type PostCardData } from './PostCard'
import { cn } from '@/lib/utils'

type Topic = {
  slug: string
  title: string
  count?: number
}

type Props = {
  topics: Topic[]
  popularPosts?: PostCardData[]
  onTopicClick?: (slug: string) => void
  className?: string
}

export function BlogSidebar({ topics, popularPosts, onTopicClick, className }: Props) {
  return (
    <aside className={cn('space-y-8', className)}>
      {/* Tópicos */}
      {topics.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
            Por tópico
          </h3>
          <ul className="space-y-1">
            {topics.map((topic) => (
              <li key={topic.slug}>
                {onTopicClick ? (
                  <button
                    onClick={() => onTopicClick(topic.slug)}
                    className="w-full flex items-center justify-between py-3 px-4 -mx-4 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {topic.title}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-400 group-hover:text-brand">
                      {topic.count !== undefined && topic.count}
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={`/recursos/tema/${topic.slug}`}
                    className="flex items-center justify-between py-3 px-4 -mx-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {topic.title}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-400 group-hover:text-brand">
                      {topic.count !== undefined && topic.count}
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Posts Populares */}
      {popularPosts && popularPosts.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">
            Mais lidos
          </h3>
          <div>
            {popularPosts.slice(0, 3).map((post) => (
              <PostCard key={post._id} post={post} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
