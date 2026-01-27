import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { PostCard } from '@/components/blog/PostCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { seriesBySlugQuery, seriesSlugsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { toPostCardDataList, type SanityRawPost } from '@/sanity/lib/transforms'

export const revalidate = 1800

export async function generateStaticParams() {
  const seriesList = await sanityFetch<Array<{ slug: string }>>({
    query: seriesSlugsQuery,
    tags: ['series'],
  })
  return seriesList.map((series) => ({ slug: series.slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

type Series = {
  _id: string
  title: string
  slug: string
  description?: string
  heroImage?: any
  posts?: SanityRawPost[]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const series = await sanityFetch<Series | null>({ query: seriesBySlugQuery, params: { slug }, tags: ['series'] })
  if (!series) return {}

  const title = `${series.title} | Série | Zopu`
  const description = series.description ?? `Série de conteúdos: ${series.title}.`

  return {
    title,
    description,
    alternates: { canonical: `/recursos/series/${series.slug}` },
    openGraph: { title, description },
  }
}

export default async function SeriePage({ params }: PageProps) {
  const { slug } = await params
  const series = await sanityFetch<Series | null>({ query: seriesBySlugQuery, params: { slug }, tags: ['series', 'post'] })

  if (!series) notFound()

  const posts = toPostCardDataList(series.posts ?? [])
  const heroUrl = series.heroImage ? urlForImage(series.heroImage).width(1600).height(840).fit('crop').url() : null

  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <nav className="text-sm text-gray-500">
                <Link href="/recursos" className="hover:text-gray-700 transition-colors">
                  Recursos
                </Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-gray-700 transition-colors">
                  Blog
                </Link>
              </nav>
            </Reveal>

            <Reveal delay={0.1}>
              <Badge className="mt-6">Série</Badge>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900">{series.title}</h1>
            </Reveal>
            {series.description ? (
              <Reveal delay={0.2}>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl">{series.description}</p>
              </Reveal>
            ) : null}

            {heroUrl ? (
              <Reveal delay={0.25}>
                <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className="relative aspect-[16/9]">
                    <Image src={heroUrl} alt={series.title} fill className="object-cover" sizes="100vw" />
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.28}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Ver todos os posts
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/recursos/estagio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Navegar por estágio
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {posts.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Reveal key={post._id}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-lg font-bold text-gray-900">Série sem posts</p>
                <p className="text-gray-600 mt-2">Adicione posts nesta série pelo Studio.</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  )
}

