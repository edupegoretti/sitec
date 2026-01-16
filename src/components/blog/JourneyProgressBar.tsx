'use client'

import { Search, FileText, Rocket, TrendingUp, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PostStage } from '@/sanity/lib/labels'

type StageCounts = {
  diagnostico: number
  estruturacao: number
  implementacao: number
  otimizacao: number
  decisao: number
}

type Props = {
  activeStage: PostStage | null
  stageCounts: StageCounts
  onStageClick: (stage: PostStage | null) => void
  className?: string
}

const STAGES: {
  slug: PostStage
  label: string
  shortLabel: string
  icon: typeof Search
  color: string
  bgColor: string
}[] = [
  {
    slug: 'diagnostico',
    label: 'Diagnóstico',
    shortLabel: 'Entender',
    icon: Search,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    slug: 'estruturacao',
    label: 'Estruturação',
    shortLabel: 'Planejar',
    icon: FileText,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    slug: 'implementacao',
    label: 'Implementação',
    shortLabel: 'Executar',
    icon: Rocket,
    color: 'text-violet-600',
    bgColor: 'bg-violet-100',
  },
  {
    slug: 'otimizacao',
    label: 'Otimização',
    shortLabel: 'Melhorar',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    slug: 'decisao',
    label: 'Decisão',
    shortLabel: 'Escolher',
    icon: Target,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
]

export function JourneyProgressBar({ activeStage, stageCounts, onStageClick, className }: Props) {
  return (
    <div className={cn('rounded-2xl border border-gray-200 bg-white p-4 sm:p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Onde você está na jornada?</h2>
        {activeStage && (
          <button
            onClick={() => onStageClick(null)}
            className="text-xs text-gray-500 hover:text-brand transition-colors"
          >
            Limpar filtro
          </button>
        )}
      </div>

      {/* Desktop: Full bar */}
      <div className="hidden md:flex items-center justify-between gap-1">
        {STAGES.map((stage, index) => {
          const Icon = stage.icon
          const count = stageCounts[stage.slug]
          const isActive = activeStage === stage.slug

          return (
            <div key={stage.slug} className="flex items-center flex-1">
              <button
                onClick={() => onStageClick(isActive ? null : stage.slug)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-brand text-white shadow-card'
                    : 'hover:bg-gray-50 hover:shadow-sm'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                    isActive ? 'bg-white/20' : stage.bgColor
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive ? 'text-white' : stage.color)} />
                </div>
                <div className="text-center">
                  <p className={cn('text-sm font-semibold', isActive ? 'text-white' : 'text-gray-900')}>
                    {stage.label}
                  </p>
                  <p className={cn('text-xs', isActive ? 'text-white/70' : 'text-gray-500')}>
                    {stage.shortLabel} • {count}
                  </p>
                </div>
              </button>

              {/* Connector */}
              {index < STAGES.length - 1 && (
                <div className="w-4 h-0.5 bg-gray-200 flex-shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {STAGES.map((stage) => {
          const Icon = stage.icon
          const count = stageCounts[stage.slug]
          const isActive = activeStage === stage.slug

          return (
            <button
              key={stage.slug}
              onClick={() => onStageClick(isActive ? null : stage.slug)}
              className={cn(
                'flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-brand text-white shadow-card'
                  : 'bg-gray-50 hover:bg-gray-100'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive ? 'text-white' : stage.color)} />
              <span className={cn('text-sm font-medium whitespace-nowrap', isActive ? 'text-white' : 'text-gray-700')}>
                {stage.label}
              </span>
              <span className={cn('text-xs', isActive ? 'text-white/70' : 'text-gray-400')}>
                ({count})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
