import { useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type FunnelStage } from '@/content/revenuePerformanceMap'

interface FunnelSvgProps {
  stages: FunnelStage[]
  activeStageId?: string | null
  onStageHover: (id: string | null) => void
  onStageOpen: (id: string) => void
  onStageLeave: (id: string) => void
}

const FUNNEL_COLORS = [
  '#6366f1', // V1 - Indigo
  '#4f46e5', // V2 - Indigo Darker
  '#3b82f6', // V3 - Blue
  '#0ea5e9', // V4 - Sky
  '#06b6d4', // V5 - Cyan
  '#14b8a6', // V6 - Teal
]

export function FunnelSvg({
  stages,
  activeStageId,
  onStageHover,
  onStageOpen,
  onStageLeave,
}: FunnelSvgProps) {
  // Tight ViewBox to minimize wasted space
  const viewBoxWidth = 600
  const viewBoxHeight = 320
  const centerY = 140
  const funnelHeight = 200

  const funnel = {
    left: 10,
    right: 590, // Nearly edge to edge
  }

  const sectionWidth = (funnel.right - funnel.left) / stages.length

  const getStagePath = (index: number) => {
    const progressStart = index / stages.length
    const progressEnd = (index + 1) / stages.length
    const taper = 0.6

    const hStart = funnelHeight * (1 - (progressStart * taper))
    const hEnd = funnelHeight * (1 - (progressEnd * taper))

    const x1 = funnel.left + (index * sectionWidth)
    const x2 = funnel.left + ((index + 1) * sectionWidth)

    const y1Top = centerY - hStart / 2
    const y1Bottom = centerY + hStart / 2
    const y2Top = centerY - hEnd / 2
    const y2Bottom = centerY + hEnd / 2

    return {
      d: `M ${x1} ${y1Top} L ${x2} ${y2Top} L ${x2} ${y2Bottom} L ${x1} ${y1Bottom} Z`,
      center: { x: (x1 + x2) / 2, y: centerY },
      bounds: { x1, x2, y1Top, y2Top, y1Bottom, y2Bottom }
    }
  }

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="glass-volume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="20%" stopColor="white" stopOpacity="0.1" />
            <stop offset="50%" stopColor="white" stopOpacity="0.0" />
            <stop offset="80%" stopColor="black" stopOpacity="0.1" />
            <stop offset="100%" stopColor="black" stopOpacity="0.3" />
          </linearGradient>

          <filter id="StageGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {stages.map((stage, index) => {
          const shape = getStagePath(index)
          const isActive = activeStageId === stage.id
          const color = FUNNEL_COLORS[index]

          return (
            <motion.g
              key={stage.id}
              initial={false}
              animate={isActive ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => onStageHover(stage.id)}
              onMouseLeave={() => onStageLeave(stage.id)}
              onClick={() => onStageOpen(stage.id)}
              className="cursor-pointer"
              style={{ transformOrigin: `${shape.center.x}px ${centerY}px` }}
            >
              <path
                d={shape.d}
                fill={color}
                fillOpacity={isActive ? 1 : 0.85}
                stroke={isActive ? "white" : "transparent"}
                strokeWidth={isActive ? 2 : 0}
              />

              <path d={shape.d} fill="url(#glass-volume)" className="pointer-events-none" />

              <text
                x={shape.center.x}
                y={centerY}
                dy="1"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontWeight="900"
                fontSize={index === stages.length - 1 ? 24 : 18}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  opacity: isActive ? 1 : 0.95
                }}
                className="pointer-events-none select-none"
              >
                {stage.metricId}
              </text>

              <g className="pointer-events-none">
                <motion.line
                  x1={shape.center.x}
                  y1={shape.bounds.y1Bottom + 5}
                  x2={shape.center.x}
                  y2={shape.bounds.y1Bottom + 25}
                  stroke="white"
                  strokeWidth="1"
                  strokeOpacity={isActive ? 0.6 : 0.2}
                  animate={{ height: isActive ? 30 : 20 }}
                />
                <text
                  x={shape.center.x}
                  y={shape.bounds.y1Bottom + 40}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight={isActive ? 700 : 500}
                  opacity={isActive ? 1 : 0.7}
                >
                  {stage.shortLabel}
                </text>
              </g>

            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
