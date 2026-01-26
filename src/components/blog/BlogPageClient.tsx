'use client'

import { useState, useMemo, useRef } from 'react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

import { BlogSearch } from './BlogSearch'
import { IntentFilter } from './IntentFilter'
import { FeaturedPost } from './FeaturedPost'
import { TopicNav } from './TopicNav'
import { PostCard, PostCardEmptyState, type PostCardData } from './PostCard'
import { BlogSidebar } from './BlogSidebar'
import { SoftCTA } from './SoftCTA'
import { type PostIntent, INTENT_FORMATS } from '@/sanity/lib/labels'

type Topic = {
  _id: string
  slug: string
  title: string
  count?: number
}

type Props = {
  posts: PostCardData[]
  topics: Topic[]
  basePath?: string
}

export function BlogPageClient({ posts, topics, basePath = '/recursos/blog' }: Props) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  const [activeIntent, setActiveIntent] = useState<PostIntent | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const contentRef = useRef<HTMLElement>(null)

  // Filtrar por busca, tópico E intenção
  const filteredPosts = useMemo(() => {
    let result = posts

    // Filtro por intenção (formato)
    if (activeIntent) {
      const allowedFormats = INTENT_FORMATS[activeIntent]
      result = result.filter((p) => allowedFormats.includes(p.format))
    }

    // Filtro por tópico
    if (activeTopic) {
      result = result.filter((p) => p.primaryTheme?.slug === activeTopic)
    }

    // Filtro por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt?.toLowerCase().includes(query) ||
          p.primaryTheme?.title.toLowerCase().includes(query)
      )
    }

    return result
  }, [posts, activeTopic, activeIntent, searchQuery])

  // Featured = primeiro post filtrado
  const featuredPost = filteredPosts[0] || null
  const remainingPosts = filteredPosts.slice(1)

  // Posts para sidebar (sempre os mais recentes globais)
  const sidebarPosts = posts.slice(1, 4)

  // Contagem real por tópico
  const topicsWithRealCount = useMemo(() => {
    return topics.map((topic) => ({
      ...topic,
      count: posts.filter((p) => p.primaryTheme?.slug === topic.slug).length,
    }))
  }, [topics, posts])

  // Contagem por intenção
  const intentCounts = useMemo(() => {
    return {
      aprender: posts.filter((p) => INTENT_FORMATS.aprender.includes(p.format)).length,
      aplicar: posts.filter((p) => INTENT_FORMATS.aplicar.includes(p.format)).length,
      decidir: posts.filter((p) => INTENT_FORMATS.decidir.includes(p.format)).length,
    }
  }, [posts])

  const handleTopicChange = (slug: string | null) => {
    setActiveTopic(slug)
    setSearchQuery('')
  }

  const handleIntentChange = (intent: PostIntent | null) => {
    setActiveIntent(intent)
    setSearchQuery('')
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    if (query) {
      setActiveTopic(null)
      setActiveIntent(null)
    }
  }

  const clearFilters = () => {
    setActiveTopic(null)
    setActiveIntent(null)
    setSearchQuery('')
  }

  const hasActiveFilters = activeTopic !== null || activeIntent !== null || searchQuery.trim() !== ''

  return (
    <main className="pt-20 lg:pt-24 bg-white">
      {/* Header: Busca + Filtros */}
      <section className="py-8 sm:py-10 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Busca */}
            <Reveal>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                O que você quer aprender?
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <BlogSearch
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar por vendas, automação, CRM..."
                className="max-w-xl mx-auto mb-8"
              />
            </Reveal>

            {/* Filtro por Intenção */}
            <Reveal delay={0.15}>
              <div className="flex justify-center">
                <IntentFilter
                  activeIntent={activeIntent}
                  onIntentChange={handleIntentChange}
                  counts={intentCounts}
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Navegação por Tópico - Sticky */}
      <section className="py-4 border-y border-gray-100 bg-white/95 backdrop-blur-sm sticky top-16 z-40">
        <Container>
          <TopicNav
            topics={topicsWithRealCount}
            activeTopic={activeTopic}
            onTopicChange={handleTopicChange}
            totalCount={posts.length}
          />
        </Container>
      </section>

      {/* Conteúdo Principal */}
      <section ref={contentRef}>
        {/* Indicador de filtros ativos */}
        {hasActiveFilters && (
          <div className="py-4 bg-gray-50 border-b border-gray-100">
            <Container>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {filteredPosts.length === 0
                    ? 'Nenhum resultado'
                    : filteredPosts.length === 1
                      ? '1 resultado'
                      : `${filteredPosts.length} resultados`}
                  {searchQuery && (
                    <span className="text-gray-400">
                      {' '}
                      para "<span className="text-gray-700">{searchQuery}</span>"
                    </span>
                  )}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-brand hover:text-brand-hover font-medium transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            </Container>
          </div>
        )}

        {/* Featured Post */}
        {featuredPost ? (
          <div className="py-12 sm:py-16">
            <Container>
              <FeaturedPost post={featuredPost} basePath={basePath} />
            </Container>
          </div>
        ) : (
          <div className="py-16 sm:py-20">
            <Container>
              <PostCardEmptyState />
            </Container>
          </div>
        )}

        {/* Grid de Posts + Sidebar */}
        {remainingPosts.length > 0 && (
          <div className="py-12 sm:py-16 bg-gray-50/50">
            <Container>
              <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
                <div>
                  <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                    {remainingPosts.map((post, index) => (
                      <Reveal key={post._id} delay={index * 0.03}>
                        <PostCard post={post} basePath={basePath} />
                      </Reveal>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="sticky top-36">
                    <BlogSidebar
                      topics={topicsWithRealCount}
                      popularPosts={sidebarPosts}
                      onTopicClick={handleTopicChange}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {/* Sidebar mobile */}
        {remainingPosts.length === 0 && featuredPost && (
          <div className="py-8 bg-gray-50/50 lg:hidden">
            <Container>
              <BlogSidebar
                topics={topicsWithRealCount}
                popularPosts={sidebarPosts}
                onTopicClick={handleTopicChange}
              />
            </Container>
          </div>
        )}
      </section>

      {/* Convite Suave */}
      <section className="py-16 sm:py-20">
        <Container>
          <SoftCTA />
        </Container>
      </section>
    </main>
  )
}
