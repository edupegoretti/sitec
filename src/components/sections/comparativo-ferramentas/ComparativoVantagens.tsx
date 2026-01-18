'use client'

import { motion } from 'framer-motion'
import {
  CurrencyCircleDollar,
  Robot,
  Database,
  GitBranch,
  type IconProps,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { DIFERENCIAIS_BITRIX24 } from '@/lib/comparativoFerramentas'

// Icon mapping
const iconMap: Record<string, React.ComponentType<IconProps>> = {
  CurrencyCircleDollar,
  Robot,
  Database,
  GitBranch,
}

// Color mapping for each diferencial - cores acessíveis e consistentes com Zopu
const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  'dados-centralizados': {
    bg: 'from-blue-50 to-blue-100/50',
    icon: 'text-blue-600',
    border: 'border-blue-200/50',
  },
  'automacao-cross-funcional': {
    bg: 'from-indigo-50 to-indigo-100/50',
    icon: 'text-indigo-600',
    border: 'border-indigo-200/50',
  },
  'ia-inclusa': {
    bg: 'from-emerald-50 to-emerald-100/50',
    icon: 'text-emerald-600',
    border: 'border-emerald-200/50',
  },
  'preco-fixo-reais': {
    bg: 'from-brand/5 to-brand/10',
    icon: 'text-brand',
    border: 'border-brand/20',
  },
}

interface ComparativoVantagensProps {
  className?: string
}

export function ComparativoVantagens({ className = '' }: ComparativoVantagensProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {DIFERENCIAIS_BITRIX24.map((item, index) => {
        const Icon = iconMap[item.icone]
        const colors = colorMap[item.id]

        return (
          <Reveal key={item.id} delay={index * 0.1}>
            <motion.div
              className={`group relative bg-linear-to-br ${colors.bg} rounded-2xl p-6 border ${colors.border} shadow-card hover:shadow-card-hover transition-all duration-300 ease-out-expo h-full`}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon */}
              <div className="mb-4 w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                <Icon size={28} weight="duotone" className={`${colors.icon} group-hover:scale-110 transition-transform duration-300`} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.titulo}</h3>

              {/* Description */}
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {item.descricao}
              </p>
            </motion.div>
          </Reveal>
        )
      })}
    </div>
  )
}
