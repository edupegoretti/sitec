'use client'

import { Clock, UsersThree, ShoppingCart, Headphones, Check, Package, ChartBar, GraduationCap, Lifebuoy } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const MODULOS = [
  {
    icon: UsersThree,
    titulo: 'Módulo de Leads',
    descricao: 'Capture e qualifique leads automaticamente com formulários integrados e distribuição inteligente.',
    features: ['Formulários de captura', 'Qualificação por score', 'Distribuição automática'],
  },
  {
    icon: ShoppingCart,
    titulo: 'Módulo de Vendas',
    descricao: 'Pipeline visual drag-and-drop com automações de follow-up e métricas em tempo real.',
    features: ['Pipeline visual', 'Automações de follow-up', 'Métricas de conversão'],
  },
  {
    icon: Headphones,
    titulo: 'Contact Center',
    descricao: 'WhatsApp Business oficial, e-mail e telefonia VoIP integrados em um só lugar.',
    features: ['WhatsApp integrado', 'E-mail centralizado', 'Telefonia VoIP'],
  },
]

const EXTRAS = [
  { icon: ChartBar, label: 'Dashboard com métricas essenciais' },
  { icon: GraduationCap, label: 'Treinamento via plataforma Fluidz' },
  { icon: Lifebuoy, label: '30 dias de acompanhamento pós-go-live' },
]

export function InclusoSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #635BFF 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <Container className="relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 text-brand rounded-lg text-sm font-medium mb-4">
                <Clock size={16} weight="duotone" />
                Pronto para usar
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                O que está incluso
              </h2>
              <p className="text-lg text-gray-600">
                Três módulos essenciais para sua operação comercial
              </p>
            </div>
          </Reveal>

          {/* Módulos em grid - padrão de cards do projeto */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {MODULOS.map((modulo, index) => {
              const Icon = modulo.icon
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="group h-full flex flex-col p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-card-hover hover:border-brand/20 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-all duration-300">
                        <Icon size={28} weight="duotone" className="text-brand" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {modulo.titulo}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {modulo.descricao}
                    </p>
                    <div className="mt-auto space-y-2">
                      {modulo.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check size={14} weight="bold" className="text-success shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Também incluso - card único padrão do projeto */}
          <Reveal delay={0.3}>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <Package size={24} weight="duotone" className="text-brand" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Também incluso no pacote
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {EXTRAS.map((extra, index) => {
                  const Icon = extra.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                        <Icon size={16} weight="duotone" className="text-brand" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{extra.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
