import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { PostSearchGrid } from '@/components/blog/PostSearchGrid'
import { sanityFetch } from '@/sanity/lib/fetch'
import { interestsQuery, postsIndexQuery, themesQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Blog | Zopu',
  description:
    'Artigos e guias práticos sobre Bitrix24, CRM e operação de receita — com foco em adoção, processo e governança.',
  alternates: {
    canonical: '/recursos/blog',
  },
  openGraph: {
    title: 'Blog | Zopu',
    description:
      'Artigos e guias práticos sobre Bitrix24, CRM e operação de receita — com foco em adoção, processo e governança.',
  },
}

export const revalidate = 1800

type Theme = { _id: string; title: string; slug: string; description?: string }
type Interest = { _id: string; title: string; slug: string; description?: string }

type PostCard = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  stage: any
  format: any
  coverImage?: any
  primaryTheme?: { title: string; slug: string } | null
  authors?: { name: string; slug: string }[]
}

export default async function RecursosBlogPage() {
  const [posts, themes, interests] = await Promise.all([
    sanityFetch<PostCard[]>({ query: postsIndexQuery, tags: ['post'] }),
    sanityFetch<Theme[]>({ query: themesQuery, tags: ['theme'] }),
    sanityFetch<Interest[]>({ query: interestsQuery, tags: ['interest'] }),
  ])

  const postItems = posts.map((post) => ({
    ...post,
    coverImageUrl: post.coverImage ? urlForImage(post.coverImage).width(1200).height(675).fit('crop').url() : null,
    coverImageAlt: post.coverImage?.alt ?? post.title,
  }))

  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Blog</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Artigos e guias</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Conteúdos para tirar o Bitrix24 do “CRM como cadastro” e chegar em processo, governança e previsibilidade.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/recursos/biblioteca"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Explorar a Biblioteca agora
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/recursos"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Voltar para Recursos
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 mb-12">
              <Reveal>
                <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white via-gray-50 to-white p-6 sm:p-8 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Por tema</p>
                  <h2 className="mt-3 text-2xl font-bold text-gray-900">Escolha um caminho</h2>
                  <p className="mt-3 text-gray-600">
                    Temas são os “capítulos” do conhecimento. Interesses são as dores específicas.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {themes.slice(0, 10).map((theme) => (
                      <Link
                        key={theme._id}
                        href={`/recursos/tema/${theme.slug}`}
                        className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        {theme.title}
                      </Link>
                    ))}
                    {themes.length > 10 ? (
                      <Link
                        href="/recursos/tema"
                        className="inline-flex items-center rounded-full border border-brand/25 bg-brand/5 px-3 py-1.5 text-sm font-semibold text-brand hover:bg-brand/10 transition-colors"
                      >
                        Ver todos →
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-white via-gray-50 to-white p-6 sm:p-8 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Por interesse</p>
                  <h2 className="mt-3 text-2xl font-bold text-gray-900">Encontre pela sua dor</h2>
                  <p className="mt-3 text-gray-600">
                    Ideal para quem quer uma resposta rápida (e prática) para um problema real.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {interests.slice(0, 10).map((interest) => (
                      <Link
                        key={interest._id}
                        href={`/recursos/interesse/${interest.slug}`}
                        className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        {interest.title}
                      </Link>
                    ))}
                    {interests.length > 10 ? (
                      <Link
                        href="/recursos/interesse"
                        className="inline-flex items-center rounded-full border border-brand/25 bg-brand/5 px-3 py-1.5 text-sm font-semibold text-brand hover:bg-brand/10 transition-colors"
                      >
                        Ver todos →
                      </Link>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Artigos e guias</h2>
                  <p className="text-gray-600">
                    Conteúdo aberto, direto ao ponto, com foco em adoção, processo e governança.
                  </p>
                </div>
                <Link
                  href="/recursos/biblioteca/zopucast"
                  className="hidden sm:inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
                >
                  Prefere vídeo? Zopucast
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-10">
              <PostSearchGrid
                items={postItems as any}
                emptyTitle="Nenhum post encontrado"
                emptyDescription="Tente outro termo ou filtre por estágio e formato."
              />
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
