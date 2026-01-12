'use client'

import Link from 'next/link'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Check, X, ArrowRight, Lightning, Stack, Buildings } from '@phosphor-icons/react'
import { ZOPU_LINKS } from '@/lib/constants'

const solutions = [
  {
    id: 'crm-express',
    name: 'CRM Express',
    subtitle: 'Foco em vendas',
    prazo: 'Até 30 dias',
    para: 'PMEs que precisam vender melhor, rápido',
    href: '/crm-express',
    icon: Lightning,
    recommended: false,
    features: {
      'Pipeline de vendas': true,
      'WhatsApp integrado': true,
      'Automações básicas': true,
      'Treinamento Fluidz': true,
      'Pós-vendas estruturado': false,
      'Governança de dados': false,
      'Integrações complexas': false,
      'Multi-país/unidade': false,
    },
  },
  {
    id: 'revops-launch',
    name: 'RevOps Launch™',
    subtitle: 'Operação completa',
    prazo: 'Até 60 dias',
    para: 'Empresas prontas para RevOps',
    href: '/revopslaunch',
    icon: Stack,
    recommended: true,
    features: {
      'Pipeline de vendas': true,
      'WhatsApp integrado': true,
      'Automações básicas': true,
      'Treinamento Fluidz': true,
      'Pós-vendas estruturado': true,
      'Governança de dados': true,
      'Integrações complexas': false,
      'Multi-país/unidade': false,
    },
  },
  {
    id: 'enterprise',
    name: 'Mapa de Performance de Receita',
    subtitle: 'Maturidade e governança',
    prazo: 'Sob medida',
    para: 'Enterprise com alta complexidade',
    href: '/mapadeperformance',
    icon: Buildings,
    recommended: false,
    features: {
      'Pipeline de vendas': true,
      'WhatsApp integrado': true,
      'Automações básicas': true,
      'Treinamento Fluidz': true,
      'Pós-vendas estruturado': true,
      'Governança de dados': true,
      'Integrações complexas': true,
      'Multi-país/unidade': true,
    },
  },
]

const featureLabels = [
  'Pipeline de vendas',
  'WhatsApp integrado',
  'Automações básicas',
  'Treinamento Fluidz',
  'Pós-vendas estruturado',
  'Governança de dados',
  'Integrações complexas',
  'Multi-país/unidade',
]

export function ComparativoSolucoes() {
  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFC]">
      <Container>
        <div className="text-center mb-12">
          <Reveal>
            <Badge className="mb-4">Compare as soluções</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Qual implementação é ideal para você?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cada empresa tem um momento diferente. Escolha a implementação que
              faz sentido para o seu cenário atual.
            </p>
          </Reveal>
        </div>

        {/* Desktop Table */}
        <Reveal delay={0.2}>
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 bg-gray-50 w-1/4">
                    <span className="text-sm font-medium text-gray-500">Funcionalidades</span>
                  </th>
                  {solutions.map((solution) => {
                    const Icon = solution.icon
                    return (
                      <th
                        key={solution.id}
                        className={`p-6 text-center relative ${
                          solution.recommended ? 'bg-brand/5' : 'bg-gray-50'
                        }`}
                      >
                        {solution.recommended && (
                          <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                              Recomendado
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            solution.recommended ? 'bg-brand/10' : 'bg-gray-100'
                          }`}>
                            <Icon size={24} weight="duotone" className={solution.recommended ? 'text-brand' : 'text-gray-600'} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{solution.name}</h3>
                            <p className="text-sm text-gray-500">{solution.subtitle}</p>
                          </div>
                          <span className={`text-sm font-medium ${solution.recommended ? 'text-brand' : 'text-gray-600'}`}>
                            {solution.prazo}
                          </span>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {featureLabels.map((feature, index) => (
                  <tr key={feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="p-4 text-sm text-gray-700 font-medium border-r border-gray-100">
                      {feature}
                    </td>
                    {solutions.map((solution) => (
                      <td
                        key={`${solution.id}-${feature}`}
                        className={`p-4 text-center ${solution.recommended ? 'bg-brand/5' : ''}`}
                      >
                        {solution.features[feature as keyof typeof solution.features] ? (
                          <Check size={20} weight="bold" className="text-green-500 mx-auto" />
                        ) : (
                          <X size={20} weight="bold" className="text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-gray-200">
                  <td className="p-6"></td>
                  {solutions.map((solution) => (
                    <td key={`cta-${solution.id}`} className={`p-6 text-center ${solution.recommended ? 'bg-brand/5' : ''}`}>
                      <Link
                        href={solution.href}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                          solution.recommended
                            ? 'bg-brand text-white hover:bg-brand-hover'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Ver detalhes
                        <ArrowRight size={18} />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <Reveal key={solution.id} delay={0.1 * index}>
                <div className={`rounded-2xl border p-6 ${
                  solution.recommended
                    ? 'border-brand/30 bg-brand/5'
                    : 'border-gray-200 bg-white'
                }`}>
                  {solution.recommended && (
                    <span className="inline-block px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full mb-4">
                      Recomendado
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      solution.recommended ? 'bg-brand/10' : 'bg-gray-100'
                    }`}>
                      <Icon size={24} weight="duotone" className={solution.recommended ? 'text-brand' : 'text-gray-600'} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{solution.name}</h3>
                      <p className="text-sm text-gray-500">{solution.prazo}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{solution.para}</p>

                  <div className="space-y-2 mb-6">
                    {featureLabels.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        {solution.features[feature as keyof typeof solution.features] ? (
                          <Check size={16} weight="bold" className="text-green-500" />
                        ) : (
                          <X size={16} weight="bold" className="text-gray-300" />
                        )}
                        <span className={solution.features[feature as keyof typeof solution.features] ? 'text-gray-700' : 'text-gray-400'}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={solution.href}
                    className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                      solution.recommended
                        ? 'bg-brand text-white hover:bg-brand-hover'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Ver detalhes
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* CTA */}
        <Reveal delay={0.4}>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Não tem certeza? Nosso especialista ajuda você a decidir.
            </p>
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
            >
              Falar com especialista
              <ArrowRight size={18} />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
