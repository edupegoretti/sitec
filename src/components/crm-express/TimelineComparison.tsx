'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Check, X, Clock, Lightning } from '@phosphor-icons/react'

interface TimelineComparisonProps {
  className?: string
}

const TRADICIONAL_FASES = [
  { fase: 'Descoberta e requisitos', duracao: '4-6 semanas' },
  { fase: 'Desenvolvimento e customização', duracao: '8-12 semanas' },
  { fase: 'Testes e homologação', duracao: '4-6 semanas' },
  { fase: 'Treinamento e go-live', duracao: '4-6 semanas' },
]

const EXPRESS_FASES = [
  { fase: 'Diagnóstico rápido', duracao: '1-2 semanas' },
  { fase: 'Configuração do CRM', duracao: '2-3 semanas' },
  { fase: 'Treinamento na Fluidz', duracao: '1 semana' },
  { fase: 'Go-live + acompanhamento', duracao: '+30 dias' },
]

export function TimelineComparison({ className }: TimelineComparisonProps) {
  return (
    <section className={`py-16 sm:py-24 lg:py-32 bg-[#FAFAFC] overflow-hidden relative ${className || ''}`}>
      {/* Decorative blurred elements */}
      <div className="absolute top-32 right-0 w-80 h-80 bg-brand/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-success/3 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Badge className="mb-4">Comparativo de tempo</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              De 6 meses para até 30 dias.{' '}
              <span className="text-brand">Sem atalhos.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Enquanto implementações tradicionais consomem semestres,
              o CRM Express entrega valor em semanas.
            </p>
          </Reveal>
        </div>

        {/* Estatística principal */}
        <Reveal delay={0.3}>
          <div className="mb-10 sm:mb-14">
            <div className="flex items-baseline gap-4 justify-center flex-wrap">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-brand tabular-nums">
                6×
              </span>
              <span className="text-xl sm:text-2xl text-gray-700 max-w-sm text-center sm:text-left font-medium">
                mais rápido que implementação tradicional
              </span>
            </div>
          </div>
        </Reveal>

        {/* Grid de 2 colunas: Tradicional vs Express - ALTO CONTRASTE */}
        <Reveal delay={0.4}>
          <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elevated-hover">
            {/* Coluna Tradicional - FUNDO ESCURO */}
            <div className="bg-bg-dark p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Clock size={20} weight="duotone" className="text-white/60" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Implementação tradicional
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    ~180 dias
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {TRADICIONAL_FASES.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={14} weight="bold" className="text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white leading-relaxed">
                        {item.fase}
                      </p>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {item.duracao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-gray-400 text-sm">
                  Reuniões intermináveis, escopo que cresce, custos que explodem.
                </p>
              </div>
            </div>

            {/* Coluna Express - FUNDO BRANCO COM ACCENT */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 border-l-4 border-success">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Lightning size={20} weight="duotone" className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-success uppercase tracking-wider font-semibold">
                    CRM Express
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Até 30 dias
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {EXPRESS_FASES.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} weight="bold" className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 leading-relaxed font-medium">
                        {item.fase}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.duracao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-gray-900 font-semibold">
                  Setup focado, escopo fechado, resultado mensurável.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Barra de stats */}
        <Reveal delay={0.5}>
          <div className="mt-14 sm:mt-20">
            <div className="bg-brand rounded-3xl p-6 sm:p-8 lg:p-10 shadow-elevated shadow-brand/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { numero: '75%', label: 'menos tempo' },
                  { numero: '~5', label: 'meses economizados' },
                  { numero: '100%', label: 'escopo fechado' },
                  { numero: '30d', label: 'suporte pós-go-live' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-white">
                      {item.numero}
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
