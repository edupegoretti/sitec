import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { PostCard, type PostCardData } from '@/components/blog/PostCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { postsByStageQuery } from '@/sanity/lib/queries'
import { STAGE_LABEL, type PostStage } from '@/sanity/lib/labels'

export const revalidate = 1800

const STAGES: readonly PostStage[] = ['diagnostico', 'estruturacao', 'implementacao', 'otimizacao', 'decisao'] as const

export async function generateStaticParams() {
  return STAGES.map((stage) => ({ stage }))
}

type PageProps = {
  params: Promise<{ stage: string }>
}

function isStage(value: string): value is PostStage {
  return (STAGES as readonly string[]).includes(value)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stage } = await params
  if (!isStage(stage)) return {}

  const title = `${STAGE_LABEL[stage]} | Recursos | Zopu`
  const description = `Conteúdos para o estágio de ${STAGE_LABEL[stage]}: clareza, método e próximos passos.`

  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: { title, description },
  }
}

export default async function RecursosEstagioPage({ params }: PageProps) {
  const { stage } = await params
  if (!isStage(stage)) notFound()

  const posts = await sanityFetch<PostCardData[]>({ query: postsByStageQuery, params: { stage }, tags: ['post'] })

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
                <Link href="/recursos/estagio" className="hover:text-gray-700 transition-colors">
                  Estágios
                </Link>
              </nav>
            </Reveal>

            <Reveal delay={0.1}>
              <Badge className="mt-6">Estágio</Badge>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900">{STAGE_LABEL[stage]}</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                Conteúdos para avançar com método e tirar decisões do improviso.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Ver todos os posts
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/recursos/interesse"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Navegar por interesse
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
                <p className="text-lg font-bold text-gray-900">Ainda não há posts neste estágio</p>
                <p className="text-gray-600 mt-2">Publique posts com este estágio no Studio.</p>
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
          </div>
        </Container>
      </section>
    </main>
  )
}

