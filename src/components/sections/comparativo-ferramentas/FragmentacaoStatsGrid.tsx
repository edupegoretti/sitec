'use client'

import { motion } from 'framer-motion'
import {
  Stack,
  CurrencyCircleDollar,
  TrendUp,
  ArrowsClockwise,
  Clock,
  Copy,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { FRAGMENTACAO_STATS } from '@/lib/comparativoFerramentas'
import { useCountUp } from '@/hooks/useCountUp'

// Icon mapping
const iconMap: Record<string, React.ComponentType<IconProps>> = {
  Stack,
  CurrencyCircleDollar,
  TrendUp,
  ArrowsClockwise,
  Clock,
  Copy,
}

// Helper to parse stat values
function parseStatValue(stat: string): {
  numeric: number | null
  prefix: string
  suffix: string
} {
  const numericMatch = stat.match(/([\d.,]+)/)
  if (!numericMatch) {
    return { numeric: null, prefix: '', suffix: stat }
  }

  const numericStr = numericMatch[1]
  const numericValue = parseFloat(numericStr.replace(/\./g, '').replace(',', '.'))

  const prefixEnd = stat.indexOf(numericMatch[0])
  const prefix = stat.substring(0, prefixEnd).trim()

  const suffixStart = prefixEnd + numericMatch[0].length
  const suffix = stat.substring(suffixStart).trim()

  return { numeric: numericValue, prefix, suffix }
}

// Animated stat display component
function AnimatedStat({ stat }: { stat: string }) {
  const { numeric, prefix, suffix } = parseStatValue(stat)
  const { ref, value: animatedValue } = useCountUp(numeric || 0, { delay: 300 })

  if (numeric === null) {
    return <>{stat}</>
  }

  return (
    <span ref={ref}>
      {prefix && `${prefix} `}
      {Math.round(animatedValue).toLocaleString('pt-BR')}
      {suffix && `${suffix}`}
    </span>
  )
}

interface FragmentacaoStatsGridProps {
  className?: string
}

export function FragmentacaoStatsGrid({ className = '' }: FragmentacaoStatsGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {FRAGMENTACAO_STATS.map((item, index) => {
        const Icon = iconMap[item.icon]

        return (
          <Reveal key={item.id} delay={index * 0.1}>
            <motion.div
              className="group relative bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 shadow-card hover:shadow-card-hover transition-all duration-300 ease-out-expo"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon */}
              <div className="mb-4 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                <Icon size={24} weight="duotone" className="text-brand group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Stat */}
              <div className="mb-2">
                <p className="text-4xl sm:text-5xl font-bold text-gray-900 leading-none">
                  <AnimatedStat stat={item.stat} />
                </p>
              </div>

              {/* Label */}
              <p className="text-sm font-medium text-gray-700 leading-snug mb-3">
                {item.label}
              </p>

              {/* Fonte */}
              <p className="text-xs text-gray-400">
                Fonte: {item.fonte}
              </p>

              {/* Hover gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-brand/0 to-brand/0 group-hover:from-brand/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          </Reveal>
        )
      })}
    </div>
  )
}
