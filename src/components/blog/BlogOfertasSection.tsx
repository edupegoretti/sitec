'use client'

import Link from 'next/link'
import { Zap, Rocket, Building2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

const OFERTAS = [
  {
    id: 'crm-express',
    nome: 'CRM Express',
    prazo: '30 dias',
    description: 'Estruture vendas rapidamente com processo e adoção garantida.',
    href: '/crm-express',
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200 hover:border-amber-400',
  },
  {
    id: 'revops-launch',
    nome: 'RevOps Launch',
    prazo: '60 dias',
    description: 'Marketing, vendas e CS integrados em uma operação fluida.',
    href: '/revopslaunch',
    icon: Rocket,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200 hover:border-violet-400',
  },
  {
    id: 'enterprise',
    nome: 'Enterprise',
    prazo: '90+ dias',
    description: 'Implementação completa com governança e escala para grandes times.',
    href: '/bitrix24-enterprise',
    icon: Building2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200 hover:border-emerald-400',
  },
]

export function BlogOfertasSection({ className }: Props) {
  return (
    <section className={cn('py-12 sm:py-16 bg-gray-50', className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Próximo passo? Escolha seu ritmo
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Cada operação tem seu momento. Encontre o escopo ideal para sua empresa.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {OFERTAS.map((oferta) => {
            const Icon = oferta.icon
            return (
              <Link
                key={oferta.id}
                href={oferta.href}
                className={cn(
                  'group relative flex flex-col p-6 rounded-2xl bg-white border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-card',
                  oferta.border
                )}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', oferta.bg)}>
                  <Icon className={cn('w-6 h-6', oferta.color)} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 group-hover:text-brand transition-colors">
                    {oferta.nome}
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full">
                    {oferta.prazo}
                  </span>
                </div>

                <p className="text-sm text-gray-600 flex-1">
                  {oferta.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-brand font-medium text-sm transition-all group-hover:gap-3">
                  <span>Conhecer solução</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
