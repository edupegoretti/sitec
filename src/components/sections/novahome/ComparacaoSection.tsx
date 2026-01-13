'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Compass, Users, Shield, Rocket } from 'lucide-react'

const PILARES = [
  {
    icon: Compass,
    titulo: 'Processo antes de sistema',
    descricao: 'Mapeamos seu funil, critérios de qualificação e handoffs antes de tocar no Bitrix24. Tecnologia sem processo é só custo.',
    destaque: 'Diagnóstico de 2 semanas',
  },
  {
    icon: Users,
    titulo: 'Adoção por função',
    descricao: 'Cada pessoa aprende o que precisa para o dia a dia dela. Vendedor não faz curso de admin. Gestor não aprende a cadastrar produto.',
    destaque: 'Trilhas Fluidz por papel',
  },
  {
    icon: Shield,
    titulo: 'Sustentação contínua',
    descricao: 'CRM não é projeto com data de fim. É infraestrutura. Por isso existe contrato de manutenção, SLA de suporte e revisões trimestrais.',
    destaque: 'Contrato de sustentação',
  },
  {
    icon: Rocket,
    titulo: 'Evolução com o negócio',
    descricao: 'Time cresceu? Processo mudou? Lançou produto novo? O CRM acompanha. Sem retrabalho, sem começar do zero.',
    destaque: 'Governança evolutiva',
  },
] as const

export function ComparacaoSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/3 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">Arquitetura de Receita</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Não é só implementar CRM.{' '}
                <span className="text-brand">É construir a base que sustenta crescimento.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Arquitetura de Receita é a estrutura que conecta processo, tecnologia e pessoas
                para que a operação comercial funcione — hoje e quando o negócio escalar.
              </p>
            </Reveal>
          </div>

          {/* Pilares - Grid 2x2 */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {PILARES.map((pilar, index) => {
              const Icon = pilar.icon
              return (
                <Reveal key={index} delay={0.2 + index * 0.1}>
                  <div className="group p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-brand/30 hover:bg-white hover:shadow-lg transition-all duration-300">
                    {/* Icon + Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand/15 transition-colors">
                        <Icon className="w-6 h-6 text-brand" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{pilar.titulo}</h3>
                        <span className="text-xs font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                          {pilar.destaque}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {pilar.descricao}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Bottom insight */}
          <Reveal delay={0.6}>
            <div className="mt-12 text-center">
              <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
                Quando esses quatro pilares estão no lugar, CRM deixa de ser
                "mais um sistema" e vira{' '}
                <span className="font-medium text-gray-700">infraestrutura de receita previsível.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
