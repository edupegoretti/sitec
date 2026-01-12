'use client'

import { motion } from 'framer-motion'
import { METODOLOGIA_ZOPU } from '@/lib/constants'

type Pilar = (typeof METODOLOGIA_ZOPU.pilares)[number]

interface PilarTimelineProps {
  pilares: readonly Pilar[]
  activeIndex: number
  onSelect: (index: number) => void
  loadingProgress?: number
  isAutoPlaying?: boolean
}

export function PilarTimeline({ pilares, activeIndex, onSelect, loadingProgress = 0, isAutoPlaying = false }: PilarTimelineProps) {
  // Calcula o progresso considerando o loading entre pilares
  const segmentWidth = 100 / (pilares.length - 1)
  const baseProgress = activeIndex * segmentWidth
  const isLastPilar = activeIndex === pilares.length - 1
  const currentProgress = isLastPilar ? 100 : baseProgress + (loadingProgress * segmentWidth)

  return (
    <div className="relative py-8">
      {/* Linha de fundo */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

      {/* Linha de progresso animada */}
      <motion.div
        className="absolute top-1/2 left-0 h-0.5 bg-linear-to-r from-brand to-[#8B5CF6] -translate-y-1/2"
        initial={{ width: '0%' }}
        animate={{ width: `${currentProgress}%` }}
        transition={isAutoPlaying ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Pontos */}
      <div className="relative flex justify-between">
        {pilares.map((pilar, index) => {
          const isActive = index === activeIndex
          const isCompleted = index < activeIndex

          return (
            <button
              key={pilar.id}
              onClick={() => onSelect(index)}
              className="relative flex flex-col items-center group focus:outline-none"
              aria-label={`Ver ${pilar.nome}`}
            >
              {/* Ponto */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-linear-to-br from-brand to-[#8B5CF6] shadow-lg shadow-purple-500/40'
                    : isCompleted
                      ? 'bg-brand'
                      : 'bg-white border-2 border-gray-300 group-hover:border-brand'
                }`}
                animate={{
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className={`text-sm font-bold ${
                    isActive || isCompleted ? 'text-white' : 'text-gray-400 group-hover:text-brand'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {/* Label */}
              <motion.span
                className={`absolute -bottom-8 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-brand'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <span className="hidden sm:inline">{pilar.nome}</span>
                <span className="sm:hidden">{index + 1}</span>
              </motion.span>

              {/* Indicador de ativo (glow) */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 w-10 h-10 rounded-full bg-brand/20"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
