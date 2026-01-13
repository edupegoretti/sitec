'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { CheckCircle, MessageSquare, BarChart3, Target, RefreshCw } from 'lucide-react'

const MUDANCAS = [
  {
    icon: Target,
    titulo: 'Pipeline com critérios claros',
    descricao: 'Cada etapa tem definição de entrada, saída e tempo máximo.',
  },
  {
    icon: MessageSquare,
    titulo: 'WhatsApp integrado',
    descricao: 'Histórico, responsável e SLA — dentro do CRM, não no celular pessoal.',
  },
  {
    icon: BarChart3,
    titulo: 'Forecast confiável',
    descricao: 'Números que a gestão pode usar para tomar decisão.',
  },
  {
    icon: RefreshCw,
    titulo: 'Rotina que se sustenta',
    descricao: 'Adoção acompanhada por 30–90 dias para virar hábito.',
  },
] as const

export function EstadoDesejadoSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-brand/4 rounded-full -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-brand/4 rounded-full translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                Resultado
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Bitrix24 como{' '}
                <span className="text-brand">fonte única da verdade.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                É isso que muda quando a operação tem arquitetura — não só ferramenta.
              </p>
            </Reveal>
          </div>

          {/* Grid 2x2 */}
          <Reveal delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-5">
              {MUDANCAS.map((mudanca, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gradient-to-br from-brand-light/50 to-white rounded-2xl border border-brand/10 hover:border-brand/30 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/10 group-hover:bg-brand/15 flex items-center justify-center mb-4 transition-colors">
                    <mudanca.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{mudanca.titulo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{mudanca.descricao}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Bottom message */}
          <Reveal delay={0.4}>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-brand-light border border-brand/20 rounded-2xl">
                <CheckCircle className="w-5 h-5 text-brand" />
                <p className="text-gray-700">
                  <strong className="text-brand">Esse é o estado desejado.</strong> E é isso
                  que o Fluidsales™ entrega.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
