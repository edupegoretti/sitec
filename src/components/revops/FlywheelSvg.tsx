import { type FlywheelMetric } from '@/content/revenuePerformanceMap'
import { motion, AnimatePresence } from 'framer-motion'

interface FlywheelSvgProps {
  metrics: FlywheelMetric[]
  activeStageId?: string | null
  onStageHover: (id: string | null) => void
  onStageOpen: (id: string) => void
  onStageLeave: (id: string) => void
}

const FLYWHEEL_COLORS = [
  '#14b8a6', // V7 - Teal
  '#10b981', // V8 - Emerald
  '#06b6d4', // V9 - Cyan
  '#3b82f6', // V10 - Blue
  '#f59e0b', // V11 - Amber
  '#ef4444', // V12 - Red
  '#8b5cf6', // V13 - Violet
]

export function FlywheelSvg({
  metrics,
  activeStageId,
  onStageHover,
  onStageOpen,
  onStageLeave,
}: FlywheelSvgProps) {
  // Tight ViewBox
  // The wheel has outerRadius 110. Center at 120 so it fits in 240x240 box with some padding.
  const size = 300
  const center = size / 2
  const outerRadius = 110
  const innerRadius = 50
  const step = (Math.PI * 2) / metrics.length

  const describeArc = (
    rInner: number,
    rOuter: number,
    startAngle: number,
    endAngle: number
  ) => {
    const gap = 0.02
    startAngle += gap
    endAngle -= gap

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

    const p1x = center + rOuter * Math.cos(startAngle)
    const p1y = center + rOuter * Math.sin(startAngle)
    const p2x = center + rOuter * Math.cos(endAngle)
    const p2y = center + rOuter * Math.sin(endAngle)

    const p3x = center + rInner * Math.cos(endAngle)
    const p3y = center + rInner * Math.sin(endAngle)
    const p4x = center + rInner * Math.cos(startAngle)
    const p4y = center + rInner * Math.sin(startAngle)

    return `M ${p1x} ${p1y} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2x} ${p2y} L ${p3x} ${p3y} A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4x} ${p4y} Z`
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg
        viewBox={`80 30 220 240`} // Tight horizontal clip to remove left padding
        className="w-full h-auto max-w-sm"
        style={{ filter: 'drop-shadow(0px 10px 30px rgba(0,0,0,0.3))' }}
      >
        <defs>
          <linearGradient id="flywheel-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <circle cx={center} cy={center} r={outerRadius + 20} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

        <g className="origin-center animate-[spin_60s_linear_infinite]">
          <circle cx={center} cy={center} r={outerRadius + 5} fill="none" stroke="url(#flywheel-glass)" strokeWidth="2" strokeDasharray="20 40" opacity="0.5" />
        </g>

        {metrics.map((metric, index) => {
          const offset = Math.PI
          const startAngle = offset + (index * step)
          const endAngle = offset + ((index + 1) * step)

          const path = describeArc(innerRadius, outerRadius, startAngle, endAngle)
          const isActive = activeStageId === metric.id
          const color = FLYWHEEL_COLORS[index % FLYWHEEL_COLORS.length]

          const midAngle = (startAngle + endAngle) / 2
          const labelR = (innerRadius + outerRadius) / 2
          const textX = center + labelR * Math.cos(midAngle)
          const textY = center + labelR * Math.sin(midAngle)

          return (
            <motion.g
              key={metric.id}
              initial={false}
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="cursor-pointer origin-center"
              onMouseEnter={() => onStageHover(metric.id)}
              onMouseLeave={() => onStageLeave(metric.id)}
              onClick={() => onStageOpen(metric.id)}
            >
              <path
                d={path}
                fill={color}
                fillOpacity={isActive ? 0.9 : 0.7}
                stroke="white"
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.8 : 0.2}
              />
              <path d={path} fill="url(#flywheel-glass)" className="pointer-events-none" />

              <text
                x={textX}
                y={textY}
                dy="1"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontWeight="700"
                fontSize="14"
                className="pointer-events-none select-none"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
              >
                {metric.metricId}
              </text>
            </motion.g>
          )
        })}

        <g className="cursor-default select-none">
          <circle cx={center} cy={center} r={innerRadius - 5} fill="#0d1f2d" stroke="#10b981" strokeWidth="2" />
          <text x={center} y={center - 3} textAnchor="middle" fill="#10b981" fontWeight="800" fontSize="16">NRR</text>
          <text x={center} y={center + 12} textAnchor="middle" fill="white" fontSize="10" opacity="0.6">ENGINE</text>
        </g>
      </svg>
    </div>
  )
}
