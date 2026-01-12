'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimationControls } from 'framer-motion'

interface RevOpsFunnelProps {
  className?: string
  animated?: boolean
  theme?: 'light' | 'dark'
}

const STAGES = [
  {
    id: 'sessions',
    label: 'Visitantes',
    color: '#22C55E',
    description: 'Pessoas que acessam seu site',
  },
  {
    id: 'leads',
    label: 'Leads',
    color: '#3B82F6',
    description: 'Contatos que deixaram informações',
  },
  {
    id: 'mqls',
    label: 'Interessados',
    color: '#F59E0B',
    description: 'Demonstraram interesse real',
  },
  {
    id: 'sqls',
    label: 'Qualificados',
    color: '#EF4444',
    description: 'Prontos para uma proposta',
  },
  {
    id: 'opps',
    label: 'Negociações',
    color: '#635BFF',
    description: 'Em conversa comercial ativa',
    labelSize: 13,
  },
]

const REVENUE_SEGMENTS = [
  {
    id: 'nrr',
    label: 'Pontual',
    shortLabel: 'Pontual',
    angle: -60,
    color: '#A78BFA',
    pillWidth: 68,
    description: 'Projetos únicos de implementação',
  },
  {
    id: 'arr',
    label: 'Recorrente',
    shortLabel: 'Recorrente',
    angle: 60,
    color: '#34D399',
    pillWidth: 86,
    description: 'Mensalidades previsíveis',
  },
  {
    id: 'usage',
    label: 'Por uso',
    shortLabel: 'Por uso',
    angle: 180,
    color: '#60A5FA',
    pillWidth: 68,
    description: 'Licenças e integrações extras',
  },
]

const ONBOARDING = {
  label: 'Ativação',
  line1: 'Ativação',
  line2: 'do cliente',
  description: 'Cliente começa a usar o Bitrix24 e gerar receita',
}

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Particle component for data flow animation
function FlowingParticle({
  delay,
  duration,
  startX,
  startY,
  endX,
  endY,
  color,
}: {
  delay: number
  duration: number
  startX: number
  startY: number
  endX: number
  endY: number
  color: string
}) {
  return (
    <motion.circle
      r="4"
      fill={color}
      filter="url(#glow-particle)"
      initial={{ cx: startX, cy: startY, opacity: 0 }}
      animate={{
        cx: [startX, endX],
        cy: [startY, endY],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        ease: 'linear',
      }}
    />
  )
}

export function RevOpsFunnel({ className = '', animated = true, theme = 'dark' }: RevOpsFunnelProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)
  const [hoveredRevenue, setHoveredRevenue] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const pathControls = useAnimationControls()

  const shouldAnimate = animated && isInView
  const isDark = theme === 'dark'
  const stageFillStart = isDark ? 0.2 : 0.12
  const stageFillEnd = isDark ? 0.32 : 0.2

  // Trigger path drawing animation
  useEffect(() => {
    if (shouldAnimate) {
      pathControls.start('visible')
    }
  }, [shouldAnimate, pathControls])

  // Premium color palette
  const strokeColor = isDark ? 'rgba(100, 116, 139, 0.4)' : '#64748B'
  const strokeColorLight = isDark ? 'rgba(100, 116, 139, 0.2)' : '#94A3B8'

  // ViewBox dimensions - optimized proportions
  const viewBoxWidth = 960
  const viewBoxHeight = 280

  // Vertical center line for perfect alignment
  const centerY = viewBoxHeight / 2

  // Funnel dimensions - perfectly centered
  const funnelHeight = 180
  const funnel = {
    left: 28,
    right: 520,
    height: funnelHeight,
    topY: centerY - funnelHeight / 2,
    bottomY: centerY + funnelHeight / 2,
  }

  const funnelWidth = funnel.right - funnel.left
  const sectionWidth = funnelWidth / 5

  // Calculate section bounds with smooth taper
  const getSectionBounds = (index: number) => {
    const taperFactor = 0.42
    const leftTaper = (index / 5) * taperFactor
    const rightTaper = ((index + 1) / 5) * taperFactor

    const leftHeight = funnel.height * (1 - leftTaper * 0.5)
    const rightHeight = funnel.height * (1 - rightTaper * 0.5)

    return {
      x1: funnel.left + index * sectionWidth,
      x2: funnel.left + (index + 1) * sectionWidth,
      y1Top: centerY - leftHeight / 2,
      y1Bottom: centerY + leftHeight / 2,
      y2Top: centerY - rightHeight / 2,
      y2Bottom: centerY + rightHeight / 2,
      centerY,
    }
  }

  // Revenue circle - perfectly centered vertically
  const revenue = {
    cx: 825,
    cy: centerY,
    outerR: 115,
    innerR: 50,
  }

  // Onboarding box - centered vertically
  const onboardingHeight = 80
  const onboarding = {
    x: 565,
    y: centerY - onboardingHeight / 2,
    width: 100,
    height: onboardingHeight,
    radius: 12,
  }

  const hoveredStageData = STAGES.find(s => s.id === hoveredStage)
  const hoveredRevenueData = REVENUE_SEGMENTS.find(s => s.id === hoveredRevenue)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* CSS for continuous animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .rotate-slow {
          animation: rotate-slow 25s linear infinite;
          transform-origin: ${revenue.cx}px ${revenue.cy}px;
        }
      `}</style>

      <div className="relative hidden md:block pb-12">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-auto"
          aria-label="Diagrama RevOps: Funil de receita conectado aos tipos de receita"
        >
          <defs>
          {/* Premium glow filters */}
          <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-particle" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glow-revenue" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="shadow-card" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
          </filter>

          {/* Stage gradients with solid backgrounds */}
          {STAGES.map((stage) => (
            <linearGradient key={`grad-${stage.id}`} id={`gradient-${stage.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={stage.color} stopOpacity={stageFillStart} />
              <stop offset="100%" stopColor={stage.color} stopOpacity={stageFillEnd} />
            </linearGradient>
          ))}

          {/* Revenue center gradient */}
          <radialGradient id="revenue-center-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.15" />
          </radialGradient>

          {/* Animated gradient ring */}
          <linearGradient id="revenue-ring-gradient">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.6" />
            <stop offset="33%" stopColor="#A78BFA" stopOpacity="0.6" />
            <stop offset="66%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.6" />
          </linearGradient>
          </defs>

          {/* ========== BACKGROUND AMBIENT GLOW ========== */}

        {/* Subtle ambient glow for funnel area */}
        <motion.ellipse
          cx={(funnel.left + funnel.right) / 2}
          cy={centerY}
          rx={funnelWidth / 2}
          ry={funnel.height / 2}
          fill="url(#gradient-sessions)"
          opacity={0.12}
          className="pulse-glow"
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 0.12 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Revenue circle ambient glow */}
        <motion.circle
          cx={revenue.cx}
          cy={revenue.cy}
          r={revenue.outerR + 25}
          fill="#10B981"
          opacity={0.08}
          className="pulse-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { opacity: 0.08, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        />

        {/* ========== FUNNEL SECTIONS WITH ROUNDED CARDS ========== */}

          {STAGES.map((stage, index) => {
            const bounds = getSectionBounds(index)
            const isHovered = hoveredStage === stage.id
            const cardWidth = sectionWidth - 10
            const cardHeight = (bounds.y1Bottom - bounds.y1Top + bounds.y2Bottom - bounds.y2Top) / 2 - 20
            const cardX = bounds.x1 + 5
            const cardY = bounds.centerY - cardHeight / 2
            const cardRadius = 10
            const labelSize = stage.labelSize ?? 16

            return (
              <g key={stage.id}>
                {/* Rounded card background */}
                <motion.rect
                  x={cardX}
                  y={cardY}
                  width={cardWidth}
                  height={cardHeight}
                  rx={cardRadius}
                  ry={cardRadius}
                  fill={`url(#gradient-${stage.id})`}
                  stroke={stage.color}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeOpacity={isHovered ? 0.9 : 0.4}
                  filter={isHovered ? 'url(#glow-soft)' : undefined}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={shouldAnimate ? {
                    opacity: 1,
                    scale: isHovered ? 1.03 : 1,
                  } : { opacity: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    ease: customEase,
                    scale: { duration: 0.2 }
                  }}
                  style={{
                    transformOrigin: `${cardX + cardWidth / 2}px ${cardY + cardHeight / 2}px`,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                />

                {/* Stage label - centered */}
                <motion.text
                  x={cardX + cardWidth / 2}
                  y={cardY + cardHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={stage.color}
                  fontSize={labelSize}
                  fontWeight="700"
                  letterSpacing="0.01em"
                  style={{
                    pointerEvents: 'none',
                    textShadow: '0 2px 6px rgba(0,0,0,0.65)',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={shouldAnimate ? {
                    opacity: 1,
                    y: 0,
                  } : { opacity: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.4,
                  }}
                >
                  {stage.label}
                </motion.text>
              </g>
            )
          })}

        {/* Funnel outline - matches card boundaries exactly */}
        {(() => {
          // Calculate the actual right-side height based on the taper formula
          const taperFactor = 0.42
          const rightTaper = taperFactor // at index 5 (rightmost edge)
          const rightHeight = funnel.height * (1 - rightTaper * 0.5)
          const rightTopY = centerY - rightHeight / 2
          const rightBottomY = centerY + rightHeight / 2

          return (
            <motion.path
              d={`
                M${funnel.left + 10},${funnel.topY}
                Q${funnel.left},${funnel.topY} ${funnel.left},${funnel.topY + 10}
                L${funnel.left},${funnel.bottomY - 10}
                Q${funnel.left},${funnel.bottomY} ${funnel.left + 10},${funnel.bottomY}
                L${funnel.right - 10},${rightBottomY}
                Q${funnel.right},${rightBottomY} ${funnel.right},${rightBottomY - 8}
                L${funnel.right},${rightTopY + 8}
                Q${funnel.right},${rightTopY} ${funnel.right - 10},${rightTopY}
                Z
              `}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={shouldAnimate ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.2, ease: customEase }}
            />
          )
        })()}

        {/* ========== FLOWING PARTICLES ========== */}

        {shouldAnimate && (
          <g>
            {[...Array(6)].map((_, i) => {
              const stageIndex = i % 5
              const bounds = getSectionBounds(stageIndex)
              const nextBounds = getSectionBounds(Math.min(stageIndex + 1, 4))
              return (
                <FlowingParticle
                  key={`particle-${i}`}
                  delay={2.5 + i * 0.5}
                  duration={1.8 + Math.random() * 0.4}
                  startX={bounds.x1 + 30}
                  startY={bounds.centerY + (Math.random() - 0.5) * 40}
                  endX={nextBounds.x2 - 30}
                  endY={bounds.centerY + (Math.random() - 0.5) * 30}
                  color={STAGES[stageIndex].color}
                />
              )
            })}
          </g>
        )}

        {/* ========== CONNECTION TO ONBOARDING ========== */}

        <motion.g
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {/* Connection line from funnel to onboarding */}
          <motion.path
            d={`M${funnel.right + 12},${centerY} L${onboarding.x - 12},${centerY}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5,4"
            initial={{ pathLength: 0 }}
            animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: customEase }}
          />

          {/* Onboarding box - premium card */}
          <motion.rect
            x={onboarding.x}
            y={onboarding.y}
            width={onboarding.width}
            height={onboarding.height}
            rx={onboarding.radius}
            ry={onboarding.radius}
            fill={isDark ? '#1E293B' : '#F8FAFC'}
            stroke={strokeColor}
            strokeWidth="2"
            filter="url(#shadow-card)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 1.4, duration: 0.5, ease: customEase }}
          />

          {/* Onboarding text - centered in box */}
          <motion.text
            x={onboarding.x + onboarding.width / 2}
            y={centerY - 10}
            textAnchor="middle"
            fill={isDark ? '#E2E8F0' : '#1E293B'}
            fontSize="13"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          >
            {ONBOARDING.line1}
          </motion.text>
          <motion.text
            x={onboarding.x + onboarding.width / 2}
            y={centerY + 10}
            textAnchor="middle"
            fill={isDark ? '#E2E8F0' : '#1E293B'}
            fontSize="13"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.65, duration: 0.4 }}
          >
            {ONBOARDING.line2}
          </motion.text>
        </motion.g>

        {/* ========== CONNECTION TO REVENUE ========== */}

        <motion.path
          d={`M${onboarding.x + onboarding.width + 12},${centerY} L${revenue.cx - revenue.outerR - 12},${centerY}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="5,4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        />

        {/* ========== REVENUE CIRCLE ========== */}

        <motion.g
          initial={{ scale: 0.5, opacity: 0 }}
          animate={shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: customEase }}
          style={{ transformOrigin: `${revenue.cx}px ${revenue.cy}px` }}
        >
          {/* Outer circle - premium style */}
          <circle
            cx={revenue.cx}
            cy={revenue.cy}
            r={revenue.outerR}
            fill={isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(248, 250, 252, 0.8)'}
            stroke={strokeColor}
            strokeWidth="2"
          />

          {/* Animated rotating ring */}
          <circle
            cx={revenue.cx}
            cy={revenue.cy}
            r={revenue.outerR - 6}
            fill="none"
            stroke="url(#revenue-ring-gradient)"
            strokeWidth="2"
            strokeDasharray="15,25"
            className="rotate-slow"
          />

          {/* Revenue segment dividers */}
          {REVENUE_SEGMENTS.map((segment, i) => {
            const angleRad = (segment.angle * Math.PI) / 180
            const startX = revenue.cx + Math.cos(angleRad) * (revenue.innerR + 8)
            const startY = revenue.cy + Math.sin(angleRad) * (revenue.innerR + 8)
            const endX = revenue.cx + Math.cos(angleRad) * (revenue.outerR - 8)
            const endY = revenue.cy + Math.sin(angleRad) * (revenue.outerR - 8)

            return (
              <motion.line
                key={segment.id}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={strokeColorLight}
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: 2.1 + i * 0.1, duration: 0.4 }}
              />
            )
          })}

          {/* Revenue segment labels - positioned inside segments */}
          {REVENUE_SEGMENTS.map((segment, i) => {
            const angleRad = (segment.angle * Math.PI) / 180
            const labelR = (revenue.innerR + revenue.outerR) / 2 + 6
            const x = revenue.cx + Math.cos(angleRad) * labelR
            const y = revenue.cy + Math.sin(angleRad) * labelR
            const isHovered = hoveredRevenue === segment.id
            const pillWidth = segment.pillWidth ?? 48
            const pillHeight = 26

            return (
              <motion.g
                key={`label-${segment.id}`}
                onMouseEnter={() => setHoveredRevenue(segment.id)}
                onMouseLeave={() => setHoveredRevenue(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Background pill for label */}
                <motion.rect
                  x={x - pillWidth / 2}
                  y={y - pillHeight / 2}
                  width={pillWidth}
                  height={pillHeight}
                  rx={pillHeight / 2}
                  fill={isHovered ? segment.color : (isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.95)')}
                  stroke={segment.color}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeOpacity={isHovered ? 1 : 0.5}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                  transition={{ delay: 2.3 + i * 0.1, duration: 0.4 }}
                />
                <motion.text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHovered ? '#FFFFFF' : segment.color}
                  fontSize="12"
                  fontWeight="700"
                  initial={{ opacity: 0 }}
                  animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 2.4 + i * 0.1, duration: 0.4 }}
                  style={{ pointerEvents: 'none' }}
                >
                  {segment.shortLabel}
                </motion.text>
              </motion.g>
            )
          })}

          {/* Center circle with glow */}
          <motion.circle
            cx={revenue.cx}
            cy={revenue.cy}
            r={revenue.innerR}
            fill="url(#revenue-center-gradient)"
            stroke="#10B981"
            strokeWidth="3"
            filter="url(#glow-revenue)"
            initial={{ scale: 0 }}
            animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 2.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: `${revenue.cx}px ${revenue.cy}px` }}
          />

          {/* Revenue text - proportional to circle */}
          <motion.text
            x={revenue.cx}
            y={revenue.cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#FFFFFF"
            fontSize="20"
            fontWeight="800"
            letterSpacing="0.02em"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ delay: 2.4, duration: 0.4 }}
            style={{
              transformOrigin: `${revenue.cx}px ${revenue.cy}px`,
              textShadow: '0 2px 6px rgba(0,0,0,0.6), 0 0 30px rgba(16, 185, 129, 0.7)',
            }}
          >
            Receita
          </motion.text>
        </motion.g>
        </svg>

        {/* Premium Tooltip - Funnel stages */}
        {hoveredStage && hoveredStageData && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none z-10"
          >
            <div
              className="px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-lg border"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.92) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.96) 100%)',
                borderColor: `${hoveredStageData.color}50`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px ${hoveredStageData.color}20`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: hoveredStageData.color,
                    boxShadow: `0 0 8px ${hoveredStageData.color}80`,
                  }}
                />
                <span className={`text-sm font-medium whitespace-nowrap ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {hoveredStageData.label} — {hoveredStageData.description}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Premium Tooltip - Revenue segments */}
        {hoveredRevenue && hoveredRevenueData && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none z-10"
          >
            <div
              className="px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-lg border"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.92) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 250, 252, 0.96) 100%)',
                borderColor: `${hoveredRevenueData.color}50`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px ${hoveredRevenueData.color}20`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: hoveredRevenueData.color,
                    boxShadow: `0 0 8px ${hoveredRevenueData.color}80`,
                  }}
                />
                <span className={`text-sm font-medium whitespace-nowrap ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {hoveredRevenueData.label} — {hoveredRevenueData.description}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="md:hidden space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Funil RevOps</p>
          <div className="mt-4 space-y-3">
            {STAGES.map((stage) => (
              <div key={`mobile-stage-${stage.id}`} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                <div>
                  <p className="text-sm font-semibold text-slate-100">{stage.label}</p>
                  <p className="text-xs text-slate-400">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{ONBOARDING.label}</p>
          <p className="mt-2 text-sm text-slate-200">{ONBOARDING.description}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Tipos de receita</p>
          <div className="mt-3 space-y-3">
            {REVENUE_SEGMENTS.map((segment) => (
              <div key={`mobile-revenue-${segment.id}`} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
                <div>
                  <p className="text-sm font-semibold text-slate-100">{segment.label}</p>
                  <p className="text-xs text-slate-400">{segment.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Etapas do funil</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {STAGES.map((stage) => (
              <div key={`legend-stage-${stage.id}`} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                <div>
                  <p className="text-sm font-semibold text-slate-100">{stage.label}</p>
                  <p className="text-xs text-slate-400">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-100">{ONBOARDING.label}</p>
                <p className="text-xs text-slate-400">{ONBOARDING.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">Tipos de receita</p>
          <div className="mt-4 space-y-3">
            {REVENUE_SEGMENTS.map((segment) => (
              <div key={`legend-revenue-${segment.id}`} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
                <div>
                  <p className="text-sm font-semibold text-slate-100">{segment.label}</p>
                  <p className="text-xs text-slate-400">{segment.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
