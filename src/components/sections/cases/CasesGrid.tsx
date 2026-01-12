'use client'

import {
  TrendUp,
  TrendDown,
  Factory,
  Heart,
  Briefcase,
  AirplaneTilt,
  ShoppingCart,
  ShieldCheck,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { ZOPU_CASES } from '@/lib/constants'

type PhosphorIcon = React.ComponentType<IconProps>

const SETOR_ICONS: Record<string, PhosphorIcon> = {
  Indústria: Factory,
  Saúde: Heart,
  Serviços: Briefcase,
  Turismo: AirplaneTilt,
  Varejo: ShoppingCart,
  SST: ShieldCheck,
}

export function CasesGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ZOPU_CASES.map((caseItem, index) => {
        const Icon = SETOR_ICONS[caseItem.setor] || Factory
        const isPositive =
          caseItem.metricaPrincipal.startsWith('+') ||
          caseItem.metricaPrincipal.includes('x')
        const isReduction =
          caseItem.metricaPrincipal.startsWith('-') ||
          caseItem.metricaPrincipal === '0%'

        return (
          <Reveal key={caseItem.setor} delay={index * 0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Icon size={24} weight="duotone" className="text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {caseItem.setor}
                  </p>
                  <p className="text-sm text-gray-500">
                    {caseItem.metricaLabel}
                  </p>
                </div>
              </div>

              {/* Métrica Principal */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  {isReduction && (
                    <TrendDown size={32} weight="duotone" className="text-green-500" />
                  )}
                  {isPositive && (
                    <TrendUp size={32} weight="duotone" className="text-green-500" />
                  )}
                  <span className="text-4xl font-bold text-gray-900">
                    {caseItem.metricaPrincipal}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{caseItem.descricao}</p>
              </div>

              {/* Antes/Depois */}
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Antes
                    </p>
                    <p className="text-lg font-semibold text-red-500">
                      {caseItem.antes}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Depois
                    </p>
                    <p className="text-lg font-semibold text-green-500">
                      {caseItem.depois}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
