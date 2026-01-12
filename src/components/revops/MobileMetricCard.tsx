'use client'

import { CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { BRIDGE_STAGE, type FunnelStage, type FlywheelMetric } from '@/content/revenuePerformanceMap'

type StageInfo = FunnelStage | FlywheelMetric | typeof BRIDGE_STAGE

interface MobileMetricCardProps {
  stage: StageInfo
  variant?: 'funnel' | 'flywheel' | 'bridge'
  /** Custom color for chromatic journey (overrides variant) */
  color?: string
  onTap: () => void
}

const variantStyles = {
  funnel: {
    badge: 'bg-brand/20 text-brand',
    border: 'border-brand/30 hover:border-brand/50',
    arrow: 'text-brand',
  },
  flywheel: {
    badge: 'bg-success/20 text-success',
    border: 'border-success/30 hover:border-success/50',
    arrow: 'text-success',
  },
  bridge: {
    badge: 'bg-white/20 text-white',
    border: 'border-white/30 hover:border-white/50',
    arrow: 'text-white',
  },
}

export function MobileMetricCard({ stage, variant = 'funnel', color, onTap }: MobileMetricCardProps) {
  const styles = variantStyles[variant]

  // Custom color styles (when color prop is provided)
  const customStyles = color
    ? {
        badge: `bg-[${color}]/20`,
        badgeText: { color },
        border: `border-[${color}]/30 hover:border-[${color}]/50`,
        arrow: { color },
      }
    : null

  return (
    <button
      type="button"
      onClick={onTap}
      className={cn(
        'w-full flex items-center gap-4 rounded-2xl border bg-white/5 backdrop-blur-sm p-4',
        'transition-all duration-200 motion-reduce:transition-none',
        'hover:bg-white/10 active:scale-[0.98]',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        'min-h-14', // Touch target 56px > 44px recomendado
        customStyles ? '' : styles.border
      )}
      style={
        customStyles
          ? {
              borderColor: `${color}4D`, // 30% opacity
            }
          : undefined
      }
    >
      {/* Badge com ID da métrica */}
      <span
        className={cn(
          'shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold',
          customStyles ? '' : styles.badge
        )}
        style={
          customStyles
            ? {
                backgroundColor: `${color}33`, // 20% opacity
                color,
              }
            : undefined
        }
      >
        {stage.metricId}
      </span>

      {/* Label e definição resumida */}
      <div className="flex-1 text-left min-w-0">
        <p className="font-semibold text-white text-sm truncate">
          {stage.label}
        </p>
        <p className="text-xs text-white/60 truncate mt-0.5">
          {stage.definition}
        </p>
      </div>

      {/* Seta indicando ação */}
      <CaretRight
        size={20}
        weight="duotone"
        className={cn('shrink-0', customStyles ? '' : styles.arrow)}
        style={customStyles ? { color } : undefined}
      />
    </button>
  )
}
