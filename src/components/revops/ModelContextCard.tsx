'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowsClockwise, Briefcase, Pulse, type IconProps } from '@phosphor-icons/react'
import { BUSINESS_MODEL_DETAILS, type BusinessModelId } from '@/content/revenuePerformanceMap'

interface ModelContextCardProps {
  model: BusinessModelId
}

type PhosphorIcon = React.ComponentType<IconProps>

const MODEL_ICONS: Record<BusinessModelId, PhosphorIcon> = {
  recorrencia: ArrowsClockwise,
  servicos: Briefcase,
  uso: Pulse,
}

export function ModelContextCard({ model }: ModelContextCardProps) {
  const details = BUSINESS_MODEL_DETAILS[model]
  const Icon = MODEL_ICONS[model]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={model}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5"
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 p-2 rounded-xl bg-brand/20">
            <Icon size={20} weight="duotone" className="text-brand" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-white/90 leading-relaxed">
              {details.description}
            </p>

            <p className="text-xs text-white/60 mt-2">
              <span className="font-semibold text-success">Focus:</span>{' '}
              {details.flywheelFocus}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {details.examples.map((example) => (
                <span
                  key={example}
                  className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-lg"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
