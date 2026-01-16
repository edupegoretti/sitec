import Link from 'next/link'
import { Search, FileText, Rocket, TrendingUp, Target, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PostStage } from '@/sanity/lib/labels'

type StageCount = {
  slug: PostStage
  label: string
  description: string
  count: number
}

type Props = {
  stages: StageCount[]
  className?: string
}

const STAGE_CONFIG: Record<PostStage, { icon: typeof Search; color: string; gradient: string }> = {
  diagnostico: {
    icon: Search,
    color: 'text-blue-600',
    gradient: 'from-blue-50 to-blue-100/50',
  },
  estruturacao: {
    icon: FileText,
    color: 'text-amber-600',
    gradient: 'from-amber-50 to-amber-100/50',
  },
  implementacao: {
    icon: Rocket,
    color: 'text-violet-600',
    gradient: 'from-violet-50 to-violet-100/50',
  },
  otimizacao: {
    icon: TrendingUp,
    color: 'text-emerald-600',
    gradient: 'from-emerald-50 to-emerald-100/50',
  },
  decisao: {
    icon: Target,
    color: 'text-red-600',
    gradient: 'from-red-50 to-red-100/50',
  },
}

const STAGE_LABELS: Record<PostStage, string> = {
  diagnostico: 'Diagnostico',
  estruturacao: 'Estruturacao',
  implementacao: 'Implementacao',
  otimizacao: 'Otimizacao',
  decisao: 'Decisao',
}

const STAGE_DESCRIPTIONS: Record<PostStage, string> = {
  diagnostico: 'Entenda onde voce esta',
  estruturacao: 'Defina o processo ideal',
  implementacao: 'Execute com consistencia',
  otimizacao: 'Melhore continuamente',
  decisao: 'Tome decisoes melhores',
}

export function StageJourney({ stages, className }: Props) {
  const orderedStages: PostStage[] = ['diagnostico', 'estruturacao', 'implementacao', 'otimizacao', 'decisao']

  const stageData = orderedStages.map((slug) => {
    const found = stages.find((s) => s.slug === slug)
    return {
      slug,
      label: STAGE_LABELS[slug],
      description: STAGE_DESCRIPTIONS[slug],
      count: found?.count ?? 0,
    }
  })

  return (
    <div className={cn('rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 lg:p-10', className)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Explore por estagio da jornada
        </h2>
        <p className="text-gray-600">
          Encontre conteudo para cada fase da sua operacao de receita
        </p>
      </div>

      {/* Desktop: Horizontal cards with connectors */}
      <div className="hidden lg:flex items-center justify-between gap-2">
        {stageData.map((stage, index) => {
          const config = STAGE_CONFIG[stage.slug]
          const Icon = config.icon

          return (
            <div key={stage.slug} className="flex items-center">
              <Link
                href={`/recursos/estagio/${stage.slug}`}
                className={cn(
                  'group flex-1 rounded-2xl border border-gray-200 bg-gradient-to-br p-6 text-center transition-all duration-300 hover:border-brand hover:shadow-lg hover:-translate-y-1',
                  config.gradient
                )}
              >
                <div className={cn('w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3', config.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-brand transition-colors">
                  {stage.label}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {stage.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {stage.count} {stage.count === 1 ? 'post' : 'posts'}
                </p>
              </Link>

              {/* Connector */}
              {index < stageData.length - 1 && (
                <ChevronRight className="w-5 h-5 text-gray-300 mx-1 flex-shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile/Tablet: Vertical list or horizontal scroll */}
      <div className="lg:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {stageData.map((stage, index) => {
            const config = STAGE_CONFIG[stage.slug]
            const Icon = config.icon

            return (
              <Link
                key={stage.slug}
                href={`/recursos/estagio/${stage.slug}`}
                className={cn(
                  'group flex-shrink-0 w-40 snap-start rounded-2xl border border-gray-200 bg-gradient-to-br p-4 text-center transition-all duration-300 hover:border-brand hover:shadow-lg',
                  config.gradient
                )}
              >
                <div className={cn('w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-2', config.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 group-hover:text-brand transition-colors">
                  {stage.label}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {stage.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {stage.count} posts
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
