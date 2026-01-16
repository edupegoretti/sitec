'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Users,
  Calendar,
  Target,
  ShieldCheck,
} from 'lucide-react'

interface PerguntaItem {
  pergunta: string
  icon: React.ElementType
}

const PERGUNTAS: PerguntaItem[] = [
  {
    pergunta: 'Como vocês garantem que meu time vai usar?',
    icon: Users,
  },
  {
    pergunta: 'O que acontece depois do go-live?',
    icon: Calendar,
  },
  {
    pergunta: 'Qual é a entrega concreta em 7, 15, 30 dias?',
    icon: Target,
  },
  {
    pergunta: 'Se não funcionar, o que vocês fazem?',
    icon: ShieldCheck,
  },
]

interface ComparacaoItem {
  micreiro: string
  zopu: string
}

const COMPARACOES: ComparacaoItem[] = [
  {
    micreiro: 'Entrega configuração',
    zopu: 'Entrega operação funcionando',
  },
  {
    micreiro: 'Suporte por ticket',
    zopu: 'Acompanhamento até funcionar',
  },
  {
    micreiro: 'Treinamento genérico',
    zopu: 'Treinamento por função (Fluidz)',
  },
  {
    micreiro: 'Projeto encerra no go-live',
    zopu: 'Projeto encerra quando time voa sozinho',
  },
]

export function ReguaEscolhaSection() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 via-white to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge variant="info" className="mb-6">
                Como escolher
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                O que perguntar antes de{' '}
                <span className="text-brand">contratar um parceiro</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A diferença entre CRM que funciona e CRM que morre não está na ferramenta.
                Está em <strong className="text-gray-900">quem implementa</strong> — e no que entrega além da configuração.
              </p>
            </Reveal>
          </div>

          {/* Comparação Visual: Micreiro vs Zopu */}
          <Reveal delay={0.25}>
            <div className="mb-16">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Card Micreiro */}
                <div className="relative p-6 sm:p-8 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      <XCircle className="w-3.5 h-3.5 text-gray-400" />
                      Implementador comum
                    </span>
                  </div>

                  <div className="mt-4 space-y-4">
                    {COMPARACOES.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-gray-100 flex items-center justify-center">
                          <XCircle className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <span className="text-gray-600 text-sm leading-relaxed">
                          {item.micreiro}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Zopu */}
                <div className="relative p-6 sm:p-8 bg-linear-to-br from-brand/5 via-white to-brand/5 rounded-2xl border-2 border-brand/20 shadow-lg shadow-brand/5">
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Zopu
                    </span>
                  </div>

                  <div className="mt-4 space-y-4">
                    {COMPARACOES.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-brand/10 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand" />
                        </div>
                        <span className="text-gray-900 text-sm leading-relaxed font-medium">
                          {item.zopu}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Perguntas que você deveria fazer */}
          <Reveal delay={0.3}>
            <div className="mb-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-brand" />
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Checklist de avaliação
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Perguntas que você deveria fazer
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {PERGUNTAS.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Reveal key={index} delay={0.35 + index * 0.06}>
                      <div className="group relative p-5 bg-white rounded-2xl border border-gray-200/80 hover:border-brand/30 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          {/* Icon container */}
                          <div className="shrink-0 w-10 h-10 bg-linear-to-br from-brand/10 to-brand/5 rounded-xl flex items-center justify-center group-hover:from-brand/20 group-hover:to-brand/10 transition-colors duration-300">
                            <Icon className="w-5 h-5 text-brand" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 font-medium leading-snug">
                              "{item.pergunta}"
                            </p>
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-4 h-4 text-brand" />
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.5}>
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Quer ver como respondemos cada uma dessas perguntas?
              </p>
              <a
                href="#plano-adocao"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                Ver plano de 30 dias
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
