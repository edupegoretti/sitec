'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { GitBranch, Database, Users } from 'lucide-react'

const PILARES = [
  {
    icon: GitBranch,
    titulo: 'Processo',
    descricao:
      'Funil, critérios, SLAs e playbooks. Cada vendedor vende do mesmo jeito (com variações controladas).',
    cor: 'brand',
  },
  {
    icon: Database,
    titulo: 'Dados',
    descricao:
      'Governança de campos, fontes, integrações e dashboards. Número que o CFO/CEO confia.',
    cor: 'amber',
  },
  {
    icon: Users,
    titulo: 'Adoção',
    descricao:
      'Treinamento por função + acompanhamento pós go-live (porque CRM morre depois da consultoria).',
    cor: 'emerald',
  },
] as const

const corClasses = {
  brand: {
    bg: 'bg-brand/10',
    hover: 'group-hover:bg-brand/20',
    icon: 'text-brand',
    border: 'border-brand/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    hover: 'group-hover:bg-amber-500/20',
    icon: 'text-amber-500',
    border: 'border-amber-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    hover: 'group-hover:bg-emerald-500/20',
    icon: 'text-emerald-500',
    border: 'border-emerald-500/20',
  },
} as const

export function NovaCategoriaSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand/4 rounded-full -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-emerald-500/4 rounded-full translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">A nova categoria</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Zopu = <span className="text-brand">Governança de Receita</span> no Bitrix24.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Não é "projeto de CRM". É colocar sua operação comercial para rodar com{' '}
                <strong className="text-gray-900">
                  regras, dados, rotina e WhatsApp sob governança
                </strong>{' '}
                — sustentados por um parceiro que não some.
              </p>
            </Reveal>
          </div>

          {/* Pilares cards */}
          <Reveal delay={0.3}>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {PILARES.map((pilar, index) => {
                const cores = corClasses[pilar.cor as keyof typeof corClasses]
                return (
                  <div
                    key={index}
                    className={`group p-6 sm:p-8 bg-white rounded-2xl border ${cores.border} hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${cores.bg} ${cores.hover} flex items-center justify-center mb-5 transition-colors`}
                    >
                      <pilar.icon className={`w-7 h-7 ${cores.icon}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{pilar.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{pilar.descricao}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>

          {/* Bottom line */}
          <Reveal delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                Ativar CRM é fácil. Difícil é manter uso e número confiável 90 dias depois.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
