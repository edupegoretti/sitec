import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { getWebinarItems, getZopucastItems } from '@/lib/resources/library'
import { isResourcePersonaId, RESOURCE_PERSONAS } from '@/lib/resources/personas'
import { sanityFetch } from '@/sanity/lib/fetch'
import { postsByPersonaQuery } from '@/sanity/lib/queries'
import { PostCard, type PostCardData } from '@/components/blog/PostCard'

type PageProps = {
  params: Promise<{ persona: string }>
}

export const revalidate = 3600

function getPersona(personaId: string) {
  if (!isResourcePersonaId(personaId)) return null
  return RESOURCE_PERSONAS.find((p) => p.id === personaId) ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { persona: personaId } = await params
  const persona = getPersona(personaId)
  if (!persona) return {}

  return {
    title: `Recursos para ${persona.label} | Zopu`,
    description: `Conteúdos abertos para quem sente: “${persona.dor}”.`,
    alternates: {
      canonical: `/recursos/para/${persona.id}`,
    },
    openGraph: {
      title: `Recursos para ${persona.label}`,
      description: `Conteúdos abertos para quem sente: “${persona.dor}”.`,
    },
  }
}

export default async function RecursosPersonaDetailPage({ params }: PageProps) {
  const { persona: personaId } = await params
  const persona = getPersona(personaId)
  if (!persona) notFound()

  const [zopucastItems, webinarItems, blogPosts] = await Promise.all([
    getZopucastItems(),
    getWebinarItems(),
    sanityFetch<PostCardData[]>({ query: postsByPersonaQuery, params: { persona: persona.id }, tags: ['post'] }),
  ])
  const latestZopucast = zopucastItems.slice(0, 3)
  const latestWebinar = webinarItems[0]

  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">{persona.label}</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{persona.promessa}</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Se você sente “{persona.dor}”, comece por estes conteúdos e avance para a biblioteca completa.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/recursos/biblioteca"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Ir para a Biblioteca
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/recursos/para"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Ver outros desafios
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {blogPosts.length ? (
              <div className="mb-14">
                <Reveal>
                  <div className="flex items-end justify-between gap-6 mb-10">
                    <div className="max-w-2xl">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Guia rápido (Blog)</h2>
                      <p className="text-gray-600">
                        Conteúdos recomendados para avançar com clareza no seu desafio.
                      </p>
                    </div>
                    <Link
                      href="/recursos/blog"
                      className="hidden sm:inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
                    >
                      Ver todos
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-6">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Reveal key={post._id}>
                      <PostCard post={post} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : null}

            <Reveal>
              <div className="flex items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Comece pelo Zopucast</h2>
                  <p className="text-gray-600">Episódios mais recentes da série (YouTube + Spotify).</p>
                </div>
                <Link
                  href="/recursos/biblioteca/zopucast"
                  className="hidden sm:inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
                >
                  Ver tudo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {latestZopucast.map((item) => (
                <Reveal key={item.id}>
                  <Link
                    href={item.href}
                    className="group block h-full rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <div
                        className="absolute inset-0 bg-center bg-cover"
                        style={{ backgroundImage: `url(${item.thumbnail})` }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                        <PlayCircle className="w-5 h-5" />
                        <span className="text-xs font-semibold">Zopucast</span>
                      </div>
                      {item.dateLabel && (
                        <div className="absolute bottom-3 right-3 text-xs text-white/90 font-medium">
                          {item.dateLabel}
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 leading-snug group-hover:text-brand transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-600 inline-flex items-center gap-2">
                        Abrir episódio
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {latestWebinar && (
              <div className="mt-10">
                <Reveal>
                  <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">Webinars Bitrix24</p>
                        <h3 className="text-xl font-bold text-gray-900">{latestWebinar.title}</h3>
                        <p className="text-gray-600 mt-2 max-w-2xl">
                          Para ver Bitrix24 em ação e comparar abordagens com calma.
                        </p>
                      </div>
                      <Link
                        href="/recursos/biblioteca/webinars-bitrix24"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors shrink-0"
                      >
                        Ver webinars
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  )
}
