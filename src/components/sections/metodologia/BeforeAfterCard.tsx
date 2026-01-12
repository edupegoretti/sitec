'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BeforeAfterCardProps {
  type: 'before' | 'after'
  titulo: string
  descricao: string
}

export function BeforeAfterCard({ type, titulo, descricao }: BeforeAfterCardProps) {
  const isBefore = type === 'before'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'rounded-2xl p-5 transition-all duration-300 ease-out-expo hover:-translate-y-1',
        isBefore
          ? 'bg-white border border-red-200/80 hover:border-red-300 shadow-sm hover:shadow-card-hover'
          : 'bg-white border border-green-200/80 hover:border-green-300 shadow-sm hover:shadow-card-hover'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
            isBefore ? 'bg-red-100' : 'bg-green-100'
          )}
        >
          {isBefore ? (
            <X className="w-4 h-4 text-red-600" />
          ) : (
            <Check className="w-4 h-4 text-green-600" />
          )}
        </div>
        <div>
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-wide mb-1',
              isBefore ? 'text-red-600' : 'text-green-600'
            )}
          >
            {isBefore ? 'Antes' : 'Depois'}
          </p>
          <p
            className={cn(
              'font-semibold mb-1',
              isBefore ? 'text-red-900' : 'text-green-900'
            )}
          >
            {titulo}
          </p>
          <p className={cn('text-sm leading-relaxed', isBefore ? 'text-red-700' : 'text-green-700')}>
            {descricao}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
