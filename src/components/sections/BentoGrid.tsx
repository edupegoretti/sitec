'use client'

import { cn } from '@/lib/utils'
import { Reveal } from '@/components/shared'
import {
  Sparkles,
  MessageSquare,
  LayoutGrid,
  Workflow,
  Bot,
  Plug,
} from 'lucide-react'

interface Feature {
  readonly id: string
  readonly nome: string
  readonly descricao: string
  readonly detalhes?: string
  readonly tags?: readonly string[]
  readonly destaque?: boolean
}

interface BentoGridProps {
  features: readonly Feature[]
  className?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  crm: Sparkles,
  comunicacao: MessageSquare,
  projetos: LayoutGrid,
  automacao: Workflow,
  ia: Bot,
  integracao: Plug,
}

export function BentoGrid({ features, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6',
        className
      )}
    >
      {features.map((feature, index) => {
        const IconComponent = iconMap[feature.id] || Sparkles

        if (feature.destaque) {
          return (
            <Reveal key={feature.id} delay={index * 0.1}>
              <div className="bg-bg-dark rounded-2xl p-8 text-white md:col-span-2 h-full shadow-elevated">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-sm font-medium text-purple-400 uppercase tracking-wide">
                    {feature.nome}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full">
                    Destaque
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.descricao}</h3>
                {feature.detalhes && (
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.detalhes}
                  </p>
                )}
                {feature.tags && feature.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          )
        }

        return (
          <Reveal key={feature.id} delay={index * 0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1 h-full">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
                <IconComponent className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.nome}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {feature.descricao}
              </p>
              {feature.tags && feature.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
