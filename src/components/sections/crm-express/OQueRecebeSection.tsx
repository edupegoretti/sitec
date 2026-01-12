'use client'

import { Check, WhatsappLogo, Funnel, Robot, ChartLineUp, GraduationCap, Headset } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const ENTREGAS = [
  {
    icon: Funnel,
    titulo: 'Pipeline de vendas visual',
    descricao: 'Arraste e solte deals entre etapas. Veja tudo num Kanban.',
  },
  {
    icon: WhatsappLogo,
    titulo: 'WhatsApp no CRM',
    descricao: 'Histórico de conversas centralizado. Nunca mais perde contexto.',
  },
  {
    icon: Robot,
    titulo: 'Follow-up automático',
    descricao: 'Lembretes e tarefas criados sozinhos. Vendedor não esquece.',
  },
  {
    icon: ChartLineUp,
    titulo: 'Dashboard de métricas',
    descricao: 'Conversão, tempo médio, performance por vendedor. Tudo visível.',
  },
  {
    icon: GraduationCap,
    titulo: 'Treinamento do time',
    descricao: 'Certificação pela Fluidz. Por função: vendedor, SDR, gestor.',
  },
  {
    icon: Headset,
    titulo: '30 dias de suporte',
    descricao: 'Acompanhamento pós-go-live. Ajustes e otimizações inclusos.',
  },
]

export function OQueRecebeSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Escopo fechado
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                O que você recebe em 30 dias
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sem surpresas. Sem escopo que cresce. Tudo definido antes de começar.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ENTREGAS.map((entrega, index) => {
              const Icon = entrega.icon
              return (
                <Reveal key={index} delay={0.05 * index}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 h-full hover:shadow-lg hover:border-brand/20 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                        <Icon size={20} weight="duotone" className="text-brand" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {entrega.titulo}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {entrega.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* O que NÃO está incluso */}
          <Reveal delay={0.3}>
            <div className="mt-8 p-5 bg-white rounded-2xl border border-gray-200">
              <p className="font-semibold text-gray-900 mb-3">
                Transparência: o que não está incluso
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="px-3 py-1 bg-gray-100 rounded-full">Licenças Bitrix24 (cobradas à parte)</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Integrações com ERPs</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Customizações além do escopo</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Migração de dados de outros CRMs</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
