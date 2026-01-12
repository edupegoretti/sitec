'use client'

import { ArrowRight, Sparkles, Target, Trophy } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { ZOPU_STATS } from '@/lib/constants'

const ICP_SEGMENTS = [
  {
    id: 'novato',
    icon: Sparkles,
    eyebrow: 'Descobrindo',
    title: 'Novo no Bitrix24?',
    description: 'Entenda por que 15 milhões de empresas escolheram essa plataforma — e como ela pode transformar sua operação.',
    href: '/por-que-bitrix24',
    cta: 'Explorar a plataforma',
    gradient: 'from-blue-500 to-cyan-400',
    bgHover: 'hover:bg-blue-50/50',
    featured: false,
  },
  {
    id: 'conhecedor',
    icon: Target,
    eyebrow: 'Buscando parceiro',
    title: 'Precisa de implementação?',
    description: 'Você conhece o Bitrix24, mas sabe que sem estratégia vira só mais uma ferramenta. Nós entendemos seu segmento.',
    href: '/por-que-zopu',
    cta: 'Conhecer nossa abordagem',
    gradient: 'from-brand to-purple-400',
    bgHover: 'hover:bg-purple-50/50',
    featured: true,
  },
  {
    id: 'decisor',
    icon: Trophy,
    eyebrow: 'Comparando',
    title: 'Avaliando parceiros?',
    description: `${ZOPU_STATS.retencao} de retenção. SLA ${ZOPU_STATS.tempoResposta}. Metodologia focada no seu mercado. Compare os números.`,
    href: '/zopu-vs-outros-parceiros',
    cta: 'Ver comparativo',
    gradient: 'from-emerald-500 to-teal-400',
    bgHover: 'hover:bg-emerald-50/50',
    featured: false,
  },
] as const

export function ICPSegmentSection() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container>
        {/* Header minimalista */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Em que momento você está?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Cada jornada é única. Escolha o caminho que faz sentido para você.
          </p>
        </div>

        {/* Cards com design diferenciado */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ICP_SEGMENTS.map((segment) => {
            const Icon = segment.icon

            return (
              <Link
                key={segment.id}
                href={segment.href}
                className={`
                  group relative flex flex-col p-8 rounded-2xl border border-gray-100
                  bg-white transition-all duration-300
                  ${segment.bgHover}
                  hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50
                  ${segment.featured ? 'ring-2 ring-brand/20 border-brand/20' : ''}
                `}
              >
                {/* Featured badge */}
                {segment.featured && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                    Mais escolhido
                  </div>
                )}

                {/* Icon com gradient */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-6
                  bg-linear-to-br ${segment.gradient}
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Eyebrow */}
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  {segment.eyebrow}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {segment.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed grow mb-6">
                  {segment.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all duration-200">
                  <span>{segment.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
