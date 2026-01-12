import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { RESOURCE_PERSONAS } from '@/lib/resources/personas'

export const metadata: Metadata = {
  title: 'Recursos por desafio | Zopu',
  description: 'Conteúdos abertos organizados por dores e desafios: CEO, Diretor Comercial, Marketing e Operações.',
  alternates: {
    canonical: '/recursos/para',
  },
}

export default function RecursosPorPersonaPage() {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Recursos</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Comece pelo seu desafio</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Escolha o caminho que mais parece com a sua dor. A biblioteca e o blog vão se organizar cada vez mais em
                torno disso.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
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
                    Abrir
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Reveal>
              <Link
                href="/recursos"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-hover transition-colors"
              >
                Voltar para Recursos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  )
}

