'use client'

import { motion } from 'framer-motion'
import { ArrowsClockwise, Briefcase, Pulse, type IconProps } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { BusinessModel, BusinessModelId } from '@/content/revenuePerformanceMap'

interface RevenueModelTabsProps {
  models: readonly BusinessModel[]
  activeModel: BusinessModelId
  onModelChange: (modelId: BusinessModelId) => void
}

type PhosphorIcon = React.ComponentType<IconProps>

const MODEL_ICONS: Record<BusinessModelId, PhosphorIcon> = {
  recorrencia: ArrowsClockwise,
  servicos: Briefcase,
  uso: Pulse,
}

export function RevenueModelTabs({
  models,
  activeModel,
  onModelChange,
}: RevenueModelTabsProps) {
  return (
    <div className="relative">
      {/* Desktop: Tabs centralizadas com animação */}
      <div className="hidden sm:flex justify-center gap-2">
        {models.map((model) => {
          const isActive = model.id === activeModel
          const Icon = MODEL_ICONS[model.id]

          return (
            <button
              key={model.id}
              type="button"
              onClick={() => onModelChange(model.id)}
              className={cn(
                'relative px-5 py-3 rounded-2xl font-medium min-h-[48px]',
                'transition-all duration-200 motion-reduce:transition-none',
                'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                isActive
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
              )}
            >
              {/* Background animado */}
              {isActive && (
                <motion.div
                  layoutId="activeModelTab"
                  className="absolute inset-0 bg-[#635BFF] rounded-2xl shadow-lg shadow-[#635BFF]/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Conteúdo */}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={16} weight="duotone" />
                {model.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Mobile: Scroll horizontal com snap */}
      <div className="sm:hidden relative">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {models.map((model) => {
            const isActive = model.id === activeModel
            const Icon = MODEL_ICONS[model.id]

            return (
              <button
                key={model.id}
                type="button"
                onClick={() => onModelChange(model.id)}
                className={cn(
                  'relative shrink-0 px-4 py-2.5 rounded-xl font-medium text-sm min-h-[44px]',
                  'transition-all duration-200 motion-reduce:transition-none snap-start',
                  'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                  isActive
                    ? 'bg-[#635BFF] text-white shadow-lg shadow-[#635BFF]/30'
                    : 'bg-white/10 text-white/70'
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} weight="duotone" />
                  {model.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {models.map((model) => (
            <button
              key={model.id}
              type="button"
              onClick={() => onModelChange(model.id)}
              aria-label={`Selecionar ${model.label}`}
              className={cn(
                'h-2 rounded-full transition-all duration-200 motion-reduce:transition-none',
                'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                model.id === activeModel
                  ? 'bg-[#635BFF] w-6'
                  : 'bg-white/30 w-2 hover:bg-white/50'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
