'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapTrifold, GitBranch, Database, Target, Users, ChartBar } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { durations, easings } from '@/lib/motion'

// Icon mapping
const ICON_MAP: Record<string, React.ElementType> = {
  Map: MapTrifold,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3: ChartBar,
}

// Grid positions for 6 pilars (3x2 layout)
const GRID_POSITIONS = [
  { row: 0, col: 0 }, // Jornada
  { row: 0, col: 1 }, // Processos
  { row: 0, col: 2 }, // Dados
  { row: 1, col: 0 }, // ICP
  { row: 1, col: 1 }, // Adocao
  { row: 1, col: 2 }, // Metricas
] as const

// Connections between pilars (index pairs)
const CONNECTIONS = [
  { from: 0, to: 1 }, // Jornada -> Processos
  { from: 1, to: 2 }, // Processos -> Dados
  { from: 0, to: 3 }, // Jornada -> ICP
  { from: 1, to: 4 }, // Processos -> Adocao
  { from: 2, to: 5 }, // Dados -> Metricas
  { from: 3, to: 4 }, // ICP -> Adocao
  { from: 4, to: 5 }, // Adocao -> Metricas
] as const

interface Pilar {
  id: string
  numero: string
  nome: string
  headline: string
  icon: string
  cor: string
}

interface PilaresConnectedGridProps {
  pilares: readonly Pilar[]
  activeId: string
  onPilarClick?: (id: string) => void
  className?: string
}

export function PilaresConnectedGrid({
  pilares,
  activeId,
  onPilarClick,
  className,
}: PilaresConnectedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])

  const activeIndex = pilares.findIndex((p) => p.id === activeId)

  // Calculate center positions for SVG lines
  useEffect(() => {
    if (!containerRef.current) return

    const updatePositions = () => {
      const container = containerRef.current
      if (!container) return

      const icons = container.querySelectorAll('[data-pilar-icon]')
      const containerRect = container.getBoundingClientRect()
      const newPositions: { x: number; y: number }[] = []

      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect()
        newPositions.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        })
      })

      setPositions(newPositions)
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => window.removeEventListener('resize', updatePositions)
  }, [isInView])

  // Get connected pilars for active one
  const getConnectedIndices = (index: number): number[] => {
    const connected: number[] = []
    CONNECTIONS.forEach(({ from, to }) => {
      if (from === index) connected.push(to)
      if (to === index) connected.push(from)
    })
    return connected
  }

  const connectedIndices = getConnectedIndices(activeIndex)

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full max-w-lg mx-auto', className)}
    >
      {/* SVG Connections Layer */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradient for active connections */}
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={pilares[activeIndex]?.cor || '#635BFF'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={pilares[activeIndex]?.cor || '#635BFF'} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Draw connection lines */}
        {positions.length === 6 &&
          CONNECTIONS.map(({ from, to }, i) => {
            const isActive =
              (from === activeIndex || to === activeIndex) &&
              connectedIndices.includes(from === activeIndex ? to : from)

            const fromPos = positions[from]
            const toPos = positions[to]

            if (!fromPos || !toPos) return null

            return (
              <motion.line
                key={`connection-${i}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={isActive ? 'url(#activeGradient)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? '0' : '4 4'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isInView ? 1 : 0,
                  opacity: isInView ? 1 : 0,
                }}
                transition={{
                  pathLength: {
                    duration: durations.slow,
                    delay: i * 0.1,
                    ease: easings.premium,
                  },
                  opacity: { duration: durations.fast },
                }}
              />
            )
          })}
      </svg>

      {/* Icons Grid */}
      <div className="grid grid-cols-3 gap-8 sm:gap-12 relative z-10">
        {pilares.map((pilar, index) => {
          const Icon = ICON_MAP[pilar.icon] || MapTrifold
          const isActive = pilar.id === activeId
          const isConnected = connectedIndices.includes(index)

          return (
            <motion.button
              key={pilar.id}
              data-pilar-icon
              onClick={() => onPilarClick?.(pilar.id)}
              className={cn(
                'relative flex flex-col items-center gap-3 p-4 rounded-2xl',
                'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                isActive && 'scale-110',
                !isActive && !isConnected && 'opacity-40'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{
                delay: index * 0.1,
                duration: durations.medium,
                ease: easings.premium,
              }}
              whileHover={{ scale: isActive ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon container */}
              <div
                className={cn(
                  'relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center',
                  'transition-all duration-300'
                )}
                style={{
                  backgroundColor: isActive || isConnected ? `${pilar.cor}20` : 'rgba(255,255,255,0.05)',
                  boxShadow: isActive ? `0 8px 32px ${pilar.cor}40` : 'none',
                }}
              >
                {/* Glow effect for active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ backgroundColor: pilar.cor }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: durations.fast }}
                    />
                  )}
                </AnimatePresence>

                <Icon
                  className={cn(
                    'relative z-10 w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300',
                    isActive ? 'text-white' : isConnected ? 'text-gray-300' : 'text-gray-500'
                  )}
                  weight={isActive ? 'fill' : 'duotone'}
                  style={{ color: !isActive && isConnected ? pilar.cor : undefined }}
                />

                {/* Number badge */}
                <div
                  className={cn(
                    'absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center',
                    'text-xs font-bold transition-all duration-300',
                    isActive
                      ? 'bg-white text-gray-900'
                      : 'bg-white/10 text-gray-500'
                  )}
                >
                  {pilar.numero}
                </div>
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-sm font-medium text-center transition-colors duration-300',
                  isActive ? 'text-white' : isConnected ? 'text-gray-300' : 'text-gray-500'
                )}
              >
                {pilar.nome.split(' ')[0]}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Active pilar highlight text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: durations.fast }}
        >
          <p className="text-sm text-gray-400">
            Conecta com:{' '}
            {connectedIndices.map((idx, i) => (
              <span key={pilares[idx].id}>
                <span style={{ color: pilares[idx].cor }}>{pilares[idx].nome.split(' ')[0]}</span>
                {i < connectedIndices.length - 1 && ', '}
              </span>
            ))}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
