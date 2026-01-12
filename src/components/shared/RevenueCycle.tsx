'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimationControls } from 'framer-motion'
import { Users, Handshake, Heart, TrendUp } from '@phosphor-icons/react'

interface RevenueCycleProps {
  className?: string
  theme?: 'light' | 'dark'
}

const CYCLE_STAGES = [
  {
    id: 'atrair',
    label: 'Atrair',
    question: 'De onde vêm seus clientes?',
    examples: ['Indicações', 'Eventos', 'Prospecção', 'Redes sociais'],
    color: '#22C55E',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    angle: -120,
  },
  {
    id: 'converter',
    label: 'Converter',
    question: 'Como você fecha vendas?',
    examples: ['Reuniões', 'Propostas', 'Follow-up', 'Negociação'],
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    angle: 0,
  },
  {
    id: 'reter',
    label: 'Reter',
    question: 'Clientes voltam a comprar?',
    examples: ['Suporte', 'Renovações', 'Upsell', 'Indicações'],
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    angle: 120,
  },
]

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Partícula fluindo entre estágios usando animateMotion nativo do SVG
function FlowingParticle({
  delay,
  duration,
  path,
  color,
  id,
}: {
  delay: number
  duration: number
  path: string
  color: string
  id: string
}) {
  return (
    <circle r="4" fill={color} filter="url(#particle-glow)" opacity="0">
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
        path={path}
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
    </circle>
  )
}

export function RevenueCycle({ className = '', theme = 'dark' }: RevenueCycleProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const controls = useAnimationControls()

  const shouldAnimate = isInView
  const isDark = theme === 'dark'

  useEffect(() => {
    if (shouldAnimate) {
      controls.start('visible')
    }
  }, [shouldAnimate, controls])

  // Dimensões do SVG
  const viewBoxWidth = 800
  const viewBoxHeight = 400
  const centerX = viewBoxWidth / 2
  const centerY = viewBoxHeight / 2

  // Raios dos elementos
  const orbitRadius = 140
  const nodeRadius = 55
  const centerRadius = 50

  // Calcular posições dos nós
  const getNodePosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: centerX + Math.cos(rad) * orbitRadius,
      y: centerY + Math.sin(rad) * orbitRadius,
    }
  }

  // Gerar path curvo entre dois pontos
  const getCurvePath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2
    const dx = to.x - from.x
    const dy = to.y - from.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    // Control point perpendicular to the line
    const perpX = -dy / dist * 30
    const perpY = dx / dist * 30

    const ctrlX = midX + perpX
    const ctrlY = midY + perpY

    return `M ${from.x} ${from.y} Q ${ctrlX} ${ctrlY} ${to.x} ${to.y}`
  }

  const hoveredData = CYCLE_STAGES.find(s => s.id === hoveredStage)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* CSS para animações contínuas */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes rotate-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .rotate-orbit {
          animation: rotate-orbit 30s linear infinite;
          transform-origin: ${centerX}px ${centerY}px;
        }
        .float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* SVG Principal */}
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-auto"
        aria-label="Ciclo de Receita: Atrair, Converter, Reter"
      >
        <defs>
          {/* Filtros de glow */}
          <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="center-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="15" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.3" />
          </filter>

          {/* Gradientes para cada estágio */}
          {CYCLE_STAGES.map((stage) => (
            <radialGradient key={`grad-${stage.id}`} id={`gradient-${stage.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={stage.color} stopOpacity="0.3" />
              <stop offset="70%" stopColor={stage.color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={stage.color} stopOpacity="0.05" />
            </radialGradient>
          ))}

          {/* Gradiente central */}
          <radialGradient id="center-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
          </radialGradient>

          {/* Gradiente do anel orbital */}
          <linearGradient id="orbit-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
            <stop offset="33%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="66%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* ========== ÓRBITA CENTRAL ========== */}

        {/* Anel orbital animado */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          fill="none"
          stroke="url(#orbit-gradient)"
          strokeWidth="2"
          strokeDasharray="8 12"
          className="rotate-orbit"
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Glow ambiente */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius + 60}
          fill="url(#center-gradient)"
          opacity={0.15}
          className="pulse-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { opacity: 0.15, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        />

        {/* ========== CONEXÕES ENTRE NÓS ========== */}

        {CYCLE_STAGES.map((stage, index) => {
          const nextIndex = (index + 1) % CYCLE_STAGES.length
          const from = getNodePosition(stage.angle)
          const to = getNodePosition(CYCLE_STAGES[nextIndex].angle)
          const path = getCurvePath(from, to)

          return (
            <g key={`connection-${stage.id}`}>
              {/* Linha de conexão */}
              <motion.path
                d={path}
                fill="none"
                stroke={isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(100, 116, 139, 0.5)'}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.8, ease: customEase }}
              />

              {/* Partículas fluindo */}
              {shouldAnimate && (
                <>
                  <FlowingParticle
                    id={`particle-${stage.id}-1`}
                    delay={2 + index * 0.5}
                    duration={2}
                    path={path}
                    color={stage.color}
                  />
                  <FlowingParticle
                    id={`particle-${stage.id}-2`}
                    delay={3 + index * 0.5}
                    duration={2.5}
                    path={path}
                    color={CYCLE_STAGES[nextIndex].color}
                  />
                </>
              )}
            </g>
          )
        })}

        {/* ========== NÓS DOS ESTÁGIOS ========== */}

        {CYCLE_STAGES.map((stage, index) => {
          const pos = getNodePosition(stage.angle)
          const isHovered = hoveredStage === stage.id

          return (
            <motion.g
              key={stage.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{
                delay: 0.6 + index * 0.15,
                duration: 0.6,
                ease: customEase,
              }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              {/* Glow do nó */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius + 15}
                fill={stage.color}
                opacity={isHovered ? 0.3 : 0.15}
                filter="url(#node-glow)"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  opacity: isHovered ? 0.4 : 0.15,
                }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />

              {/* Círculo principal do nó */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={`url(#gradient-${stage.id})`}
                stroke={stage.color}
                strokeWidth={isHovered ? 3 : 2}
                filter="url(#shadow)"
                animate={{
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  transformOrigin: `${pos.x}px ${pos.y}px`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              />

              {/* Inner ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius - 8}
                fill="none"
                stroke={stage.color}
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeDasharray="4 4"
              />

              {/* Label do estágio */}
              <motion.text
                x={pos.x}
                y={pos.y - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={stage.color}
                fontSize="18"
                fontWeight="800"
                letterSpacing="0.02em"
                style={{
                  pointerEvents: 'none',
                  textShadow: `0 2px 10px ${stage.glowColor}`,
                }}
              >
                {stage.label}
              </motion.text>

              {/* Número do estágio */}
              <text
                x={pos.x}
                y={pos.y + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'}
                fontSize="11"
                fontWeight="600"
              >
                {String(index + 1).padStart(2, '0')}
              </text>
            </motion.g>
          )
        })}

        {/* ========== CENTRO: RECEITA ========== */}

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        >
          {/* Glow central */}
          <circle
            cx={centerX}
            cy={centerY}
            r={centerRadius + 20}
            fill="#10B981"
            opacity={0.2}
            filter="url(#center-glow)"
            className="pulse-glow"
          />

          {/* Círculo central */}
          <circle
            cx={centerX}
            cy={centerY}
            r={centerRadius}
            fill="url(#center-gradient)"
            stroke="#10B981"
            strokeWidth="3"
          />

          {/* Ícone de tendência */}
          <g transform={`translate(${centerX - 10}, ${centerY - 18})`}>
            <TrendUp
              size={20}
              color="#FFFFFF"
              weight="bold"
            />
          </g>

          {/* Texto Receita */}
          <text
            x={centerX}
            y={centerY + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.05em"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            RECEITA
          </text>
        </motion.g>

        {/* ========== SETAS DE FLUXO ========== */}

        {CYCLE_STAGES.map((stage, index) => {
          const nextIndex = (index + 1) % CYCLE_STAGES.length
          const from = getNodePosition(stage.angle)
          const to = getNodePosition(CYCLE_STAGES[nextIndex].angle)

          // Posição da seta no meio do caminho
          const midAngle = (stage.angle + CYCLE_STAGES[nextIndex].angle) / 2
          const arrowPos = getNodePosition(midAngle)
          const arrowAngle = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI

          return (
            <motion.g
              key={`arrow-${stage.id}`}
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
            >
              <g transform={`translate(${arrowPos.x}, ${arrowPos.y}) rotate(${arrowAngle})`}>
                <polygon
                  points="0,-5 10,0 0,5"
                  fill={isDark ? 'rgba(100, 116, 139, 0.6)' : 'rgba(100, 116, 139, 0.8)'}
                />
              </g>
            </motion.g>
          )
        })}
      </svg>

      {/* Tooltip Premium */}
      {hoveredStage && hoveredData && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 sm:bottom-4 pointer-events-none z-10"
        >
          <div
            className="px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border max-w-sm"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%)',
              borderColor: `${hoveredData.color}40`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${hoveredData.color}30, 0 0 60px ${hoveredData.color}20`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${hoveredData.color}20` }}
              >
                {hoveredData.id === 'atrair' && <Users size={20} weight="duotone" style={{ color: hoveredData.color }} />}
                {hoveredData.id === 'converter' && <Handshake size={20} weight="duotone" style={{ color: hoveredData.color }} />}
                {hoveredData.id === 'reter' && <Heart size={20} weight="duotone" style={{ color: hoveredData.color }} />}
              </div>
              <div>
                <p className="font-bold" style={{ color: hoveredData.color }}>
                  {hoveredData.label}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {hoveredData.question}
                </p>
              </div>
            </div>

            {/* Exemplos */}
            <div className="flex flex-wrap gap-1.5">
              {hoveredData.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${hoveredData.color}15`,
                    color: hoveredData.color,
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Legenda mobile */}
      <div className="md:hidden mt-6 space-y-3">
        {CYCLE_STAGES.map((stage) => (
          <div
            key={`mobile-${stage.id}`}
            className={`
              flex items-center gap-3 p-3 rounded-xl border
              ${isDark ? 'border-white/10 bg-white/3' : 'border-gray-200 bg-gray-50'}
            `}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${stage.color}20` }}
            >
              {stage.id === 'atrair' && <Users size={20} weight="duotone" style={{ color: stage.color }} />}
              {stage.id === 'converter' && <Handshake size={20} weight="duotone" style={{ color: stage.color }} />}
              {stage.id === 'reter' && <Heart size={20} weight="duotone" style={{ color: stage.color }} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm" style={{ color: stage.color }}>
                {stage.label}
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stage.question}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicação de interatividade (desktop) */}
      <motion.p
        className={`hidden md:block text-center text-xs mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        Passe o mouse sobre cada etapa para explorar
      </motion.p>
    </div>
  )
}
