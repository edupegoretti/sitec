import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { PostCard, type PostCardData } from '@/components/blog/PostCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { interestBySlugQuery, interestSlugsQuery, interestsQuery, postsByInterestQuery } from '@/sanity/lib/queries'

export const revalidate = 1800

export async function generateStaticParams() {
  const interests = await sanityFetch<Array<{ slug: string }>>({
    query: interestSlugsQuery,
    tags: ['interest'],
  })
  return interests.map((interest) => ({ slug: interest.slug }))
}

type PageProps = {
  params: Promise<{ slug: string }>
}

type Interest = {
  _id: string
  title: string
  slug: string
  description?: string
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const interest = await sanityFetch<Interest | null>({
    query: interestBySlugQuery,
    params: { slug },
    tags: ['interest'],
  })
  if (!interest) return {}

  const title = `${interest.title} | Recursos | Zopu`
  const description =
    interest.description ??
    `Conteúdos sobre ${interest.title}: decisões práticas para melhorar processo, adoção e governança no Bitrix24.`

  return {
    title,
    description,
    alternates: {
      canonical: `/recursos/interesse/${interest.slug}`,
    },
    openGraph: {
      title,
      description,
    },
  }
}

export default async function RecursosInteressePage({ params }: PageProps) {
  const { slug } = await params

  const [interest, posts, allInterests] = await Promise.all([
    sanityFetch<Interest | null>({ query: interestBySlugQuery, params: { slug }, tags: ['interest'] }),
    sanityFetch<PostCardData[]>({ query: postsByInterestQuery, params: { slug }, tags: ['post'] }),
    sanityFetch<Interest[]>({ query: interestsQuery, tags: ['interest'] }),
  ])

  if (!interest) notFound()

  const otherInterests = allInterests.filter((t) => t.slug !== interest.slug).slice(0, 10)

  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <nav className="text-sm text-gray-500">
                <Link href="/recursos" className="hover:text-gray-700 transition-colors">
                  Recursos
                </Link>
                <span className="mx-2">/</span>
                <Link href="/recursos/interesse" className="hover:text-gray-700 transition-colors">
                  Interesses
                </Link>
              </nav>
            </Reveal>

            <Reveal delay={0.1}>
              <Badge className="mt-6">Interesse</Badge>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900">{interest.title}</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                {interest.description ??
                  'Conteúdos organizados por dor/objetivo para você aplicar imediatamente e avançar na jornada.'}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/recursos/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Ver todos os posts
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/recursos/tema"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Navegar por tema
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-lg font-bold text-gray-900">Ainda não há posts neste interesse</p>
                <p className="text-gray-600 mt-2">Publique posts com este interesse no Studio.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Reveal key={post._id}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            )}

            {otherInterests.length ? (
              <div className="mt-14">
                <Reveal>
                  <div className="flex items-center justify-between gap-6">
                    <h2 className="text-xl font-bold text-gray-900">Outros interesses</h2>
                    <Link
                      href="/recursos/interesse"
                      className="text-sm text-brand font-semibold hover:text-brand-hover transition-colors"
                    >
                      Ver todos
                    </Link>
                  </div>
                </Reveal>
                <div className="mt-6 flex flex-wrap gap-2">
                  {otherInterests.map((t) => (
                    <Link
                      key={t._id}
                      href={`/recursos/interesse/${t.slug}`}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {t.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </main>
  )
}

