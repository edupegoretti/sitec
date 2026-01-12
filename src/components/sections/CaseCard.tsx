'use client'

import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared'
import { ArrowRight } from 'lucide-react'

interface Case {
  readonly setor: string
  readonly metricaPrincipal: string
  readonly metricaLabel: string
  readonly descricao: string
  readonly antes: string
  readonly depois: string
}

interface CaseCardProps {
  caseData: Case
  className?: string
}

export function CaseCard({ caseData, className }: CaseCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-200/80 hover:border-gray-300 overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1 group h-full flex flex-col',
        className
      )}
    >
      {/* Header com setor */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200/80 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {caseData.setor}
        </span>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand group-hover:translate-x-1 transition-all duration-300 ease-out-expo" />
      </div>

      {/* Conteúdo */}
      <div className="p-6 grow flex flex-col">
        {/* Métrica principal */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold text-brand">
            {caseData.metricaPrincipal}
          </span>
          <span className="text-lg text-gray-600">{caseData.metricaLabel}</span>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed grow">
          {caseData.descricao}
        </p>

        {/* Antes/Depois */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-red-50 rounded-xl text-center">
            <div className="text-xs text-red-600 font-medium uppercase tracking-wide mb-1">
              Antes
            </div>
            <div className="text-xl font-bold text-red-700">
              {caseData.antes}
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <div className="text-xs text-green-600 font-medium uppercase tracking-wide mb-1">
              Depois
            </div>
            <div className="text-xl font-bold text-green-700">
              {caseData.depois}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CaseGridProps {
  cases: readonly Case[]
  className?: string
}

export function CaseGrid({ cases, className }: CaseGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
        className
      )}
    >
      {cases.map((caseData, index) => (
        <Reveal key={caseData.setor} delay={index * 0.1}>
          <CaseCard caseData={caseData} />
        </Reveal>
      ))}
    </div>
  )
}
