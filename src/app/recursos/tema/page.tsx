import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { sanityFetch } from '@/sanity/lib/fetch'
import { themesQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Temas | Recursos | Zopu',
  description: 'Explore conteúdos por tema: modelo operacional, CRM, vendas, RevOps, CS e governança.',
  robots: { index: false, follow: true },
}

export const revalidate = 3600

type Theme = {
  _id: string
  title: string
  slug: string
  description?: string
}

export default async function RecursosTemasPage() {
  const themes = await sanityFetch<Theme[]>({ query: themesQuery, tags: ['theme'] })

  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Recursos</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Temas</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Os temas organizam o conhecimento. Use para estudar com profundidade e evoluir a jornada de decisão.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Voltar para o Blog
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {themes.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-lg font-bold text-gray-900">Nenhum tema publicado</p>
                <p className="text-gray-600 mt-2">Crie temas no Studio para habilitar a navegação.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => (
                  <Reveal key={theme._id}>
                    <Link
                      href={`/recursos/tema/${theme.slug}`}
                      className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
                    >
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand transition-colors">
                        {theme.title}
                      </h2>
                      {theme.description ? (
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{theme.description}</p>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                          Ver conteúdos relacionados
                        </p>
                      )}
                      <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                        Abrir
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </p>
                    </Link>
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

