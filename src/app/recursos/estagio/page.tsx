import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { STAGE_LABEL, type PostStage } from '@/sanity/lib/labels'

export const metadata: Metadata = {
  title: 'Estágios | Recursos | Zopu',
  description: 'Navegue por estágio da jornada: diagnóstico, estruturação, implementação, otimização e decisão.',
  robots: { index: false, follow: true },
}

const STAGES: Array<{ stage: PostStage; description: string }> = [
  {
    stage: 'diagnostico',
    description: 'Entenda o problema real, avalie maturidade e identifique gargalos.',
  },
  {
    stage: 'estruturacao',
    description: 'Defina modelo operacional: responsabilidades, rituais, campos e governança.',
  },
  {
    stage: 'implementacao',
    description: 'Configure com método: pipeline, automações, integração e adoção do time.',
  },
  {
    stage: 'otimizacao',
    description: 'Melhore previsibilidade: qualidade do dado, relatórios e rotinas de gestão.',
  },
  {
    stage: 'decisao',
    description: 'Compare abordagens e tome decisões seguras sobre Bitrix24 e o projeto.',
  },
]

export default function RecursosEstagiosPage() {
  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Recursos</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Estágios da jornada</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Navegue por onde você está agora — e avance com clareza para o próximo passo.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Ver o Blog
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STAGES.map((item, index) => (
              <Reveal key={item.stage} delay={index * 0.03}>
                <Link
                  href={`/recursos/estagio/${item.stage}`}
                  className="group block rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/40 transition-all duration-300"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Estágio</p>
                  <h2 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-brand transition-colors">
                    {STAGE_LABEL[item.stage]}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  <p className="mt-4 text-sm text-brand font-semibold inline-flex items-center gap-2">
                    Abrir
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}

