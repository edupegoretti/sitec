import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { RESOURCE_PERSONAS } from '@/lib/resources/personas'
import { getWebinarItems, getZopucastItems } from '@/lib/resources/library'
import { PostCard, type PostCardData } from '@/components/blog/PostCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { latestPostsQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Recursos | Conteúdos abertos | Zopu',
  description:
    'Hub de conteúdos abertos da Zopu: Zopucast, Webinars Bitrix24 e metodologias. Tudo para você tirar o Bitrix24 do básico, com contexto e processo.',
  alternates: {
    canonical: '/recursos',
  },
  openGraph: {
    title: 'Recursos | Conteúdos abertos',
    description:
      'Zopucast, Webinars Bitrix24 e metodologias. Conteúdos abertos para você tirar o Bitrix24 do básico com contexto e processo.',
  },
}

export const revalidate = 3600

export default async function RecursosPage() {
  const [zopucastItems, webinarItems, latestPosts] = await Promise.all([
    getZopucastItems(),
    getWebinarItems(),
    sanityFetch<PostCardData[]>({ query: latestPostsQuery, params: { limit: 3 }, tags: ['post'] }),
  ])
  const latestZopucast = zopucastItems.slice(0, 3)
  const latestWebinar = webinarItems[0]

  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Recursos</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Conteúdos abertos para você operar melhor
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Zopucast, Webinars e materiais de metodologia — para você sair do “CRM como cadastro” e chegar em
                previsibilidade, adoção e governança.
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
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Ver Blog
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Últimos conteúdos */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="flex items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <Reveal>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Comece pelos mais recentes</h2>
                <p className="text-gray-600">
                  Um atalho para entender como pensamos (e como aplicamos Bitrix24 no mundo real).
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="hidden sm:block">
              <Link
                href="/recursos/biblioteca/zopucast"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
              >
                Ver tudo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

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

          {latestPosts.length ? (
            <div className="mt-14">
              <Reveal>
                <div className="flex items-end justify-between gap-6 mb-8">
                  <div className="max-w-2xl">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Últimos posts do blog</h3>
                    <p className="text-gray-600">Guias e artigos para operar com método (e avançar na decisão).</p>
                  </div>
                  <Link
                    href="/blog"
                    className="hidden sm:inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
                  >
                    Ver blog
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <Reveal key={post._id}>
                    <PostCard post={post} />
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}

          {latestWebinar && (
            <div className="mt-10">
              <Reveal>
                <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-white p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">Webinars Bitrix24</p>
                      <h3 className="text-xl font-bold text-gray-900">{latestWebinar.title}</h3>
                      <p className="text-gray-600 mt-2 max-w-2xl">
                        Sessões abertas para ver Bitrix24 em ação, com contexto de processo e adoção.
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
        </Container>
      </section>

      {/* Navegação por persona */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Reveal>
              <Badge className="mb-4">Comece pelo seu desafio</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Escolha o que mais parece com você</h2>
              <p className="text-gray-600 mt-3">
                Conteúdos organizados pelas dores e promessas do nosso posicionamento.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESOURCE_PERSONAS.map((persona) => (
              <Reveal key={persona.id}>
                <Link
                  href={`/recursos/para/${persona.id}`}
                  className="group block h-full rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
                >
                  <p className="text-xs font-semibold text-gray-500">{persona.label}</p>
                  <p className="mt-3 text-sm text-gray-700">
                    <span className="font-semibold">Dor:</span> “{persona.dor}”
                  </p>
                  <p className="mt-3 text-sm text-gray-700">
                    <span className="font-semibold">Promessa:</span> {persona.promessa}
                  </p>
                  <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                    Ver conteúdos
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Acesso rápido */}
      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Reveal>
              <Badge className="mb-4">Acesso rápido</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Biblioteca</h2>
              <p className="text-gray-600 mt-3">Vídeos e materiais organizados por tipo de conteúdo.</p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal>
              <Link
                href="/recursos/biblioteca/zopucast"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-brand transition-colors">Zopucast</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Conversas e episódios sequenciais sobre CRM, operação e adoção (YouTube + Spotify).
                </p>
                <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                  Abrir
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </p>
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <Link
                href="/recursos/biblioteca/webinars-bitrix24"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-brand transition-colors">Webinars Bitrix24</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Aulas e sessões abertas com demonstrações e perguntas reais.
                </p>
                <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                  Abrir
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </p>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href="/recursos/biblioteca/metodologias"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-brand transition-colors">Metodologias</h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Vídeos curtos e diretos: frameworks, playbooks e decisões de implementação.
                </p>
                <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                  Abrir
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </p>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  )
}
