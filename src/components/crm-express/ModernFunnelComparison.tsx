'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/layout'
import { Button } from '@/components/shared'
import { ZOPU_LINKS } from '@/lib/constants'
import { useCountUp } from '@/hooks/useCountUp'

/**
 * ModernFunnelComparison — Estado da Arte
 *
 * Sistema de partículas fluindo pelos funis
 * Partículas escapam no funil fragmentado, consolidam no integrado
 * Tooltips educacionais, números animados, visual premium
 */

// === DADOS DOS STAGES ===

interface Stage {
  label: string
  color: string
  insight: string
  escapeRate?: number // % de leads que escapam (só no fragmentado)
}

const STAGES_FRAGMENTED: Stage[] = [
  { label: 'Leads em planilha', color: '#f97068', insight: 'Leads dispersos em múltiplas fontes', escapeRate: 15 },
  { label: 'Qualificação manual', color: '#fab3a9', insight: '30% dos leads nunca são qualificados', escapeRate: 20 },
  { label: 'Nutrição irregular', color: '#fdc89e', insight: 'Comunicação inconsistente perde interesse', escapeRate: 15 },
  { label: 'HAND-OFF PERDIDO', color: '#5b8def', insight: '40% dos leads se perdem na transição', escapeRate: 25 },
  { label: 'Passagem confusa', color: '#93b4f5', insight: 'Vendas não tem contexto do lead', escapeRate: 10 },
  { label: 'Aceite demorado', color: '#6366f1', insight: 'Lead esfria enquanto espera', escapeRate: 5 },
  { label: 'Negociação lenta', color: '#7dd3a1', insight: 'Sem visibilidade do processo', escapeRate: 5 },
  { label: 'Fechamento difícil', color: '#8ee4a8', insight: 'Propostas sem follow-up', escapeRate: 3 },
  { label: 'Resultado', color: '#c5e86c', insight: 'Apenas 8% convertem', escapeRate: 0 },
]

const STAGES_INTEGRATED: Stage[] = [
  { label: 'Leads centralizados', color: 'hsl(260, 65%, 45%)', insight: 'Todas as fontes em um só lugar' },
  { label: 'Scoring por IA', color: 'hsl(260, 63%, 48%)', insight: 'IA prioriza leads mais quentes' },
  { label: 'Nutrição automática', color: 'hsl(260, 61%, 51%)', insight: 'WhatsApp e email no tempo certo' },
  { label: 'Transição fluida', color: 'hsl(260, 59%, 54%)', insight: 'Contexto completo para vendas' },
  { label: 'Handover rastreado', color: 'hsl(260, 57%, 57%)', insight: 'Nenhum lead esquecido' },
  { label: 'Aceite imediato', color: 'hsl(260, 55%, 60%)', insight: 'Alertas em tempo real' },
  { label: 'Negociação ágil', color: 'hsl(260, 53%, 63%)', insight: 'Pipeline visual e claro' },
  { label: 'Fechamento rápido', color: 'hsl(260, 51%, 66%)', insight: 'Propostas com alerta de abertura' },
  { label: 'Resultado', color: 'hsl(260, 49%, 69%)', insight: '35% de conversão média' },
]

// === COMPONENTE DE NÚMERO ANIMADO ===

function AnimatedPercentage({
  value,
  className,
  delay = 0,
}: {
  value: number
  className?: string
  delay?: number
}) {
  const { ref, value: animatedValue } = useCountUp(value, { delay })

  return (
    <span ref={ref} className={className}>
      {Math.round(animatedValue)}%
    </span>
  )
}

// === COMPONENTE DO FUNIL SVG COM PARTÍCULAS ===

function FunnelWithParticles({
  stages,
  isFragmented,
  isInView,
  onHoverStage,
  hoveredStage,
}: {
  stages: Stage[]
  isFragmented: boolean
  isInView: boolean
  onHoverStage: (label: string | null) => void
  hoveredStage: string | null
}) {
  const totalStages = stages.length
  const svgHeight = 400
  const svgWidth = 280
  const stageHeight = svgHeight / totalStages
  const topWidth = 260
  const bottomWidth = 80

  // Gera partículas
  const particles = Array.from({ length: isFragmented ? 20 : 15 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    escapeAt: isFragmented ? Math.floor(Math.random() * 6) + 1 : -1, // Stage onde escapa (1-6)
    escapeDirection: (Math.random() > 0.5 ? 'left' : 'right') as 'left' | 'right',
  }))

  // Calcula largura em cada Y
  const getWidthAtY = (y: number) => {
    const progress = y / svgHeight
    return topWidth - (topWidth - bottomWidth) * progress
  }

  // Gera path para partícula fluir pelo centro
  const generateFlowPath = (escapeAt: number, escapeDir: 'left' | 'right') => {
    const points: string[] = []
    const startX = svgWidth / 2 + (Math.random() - 0.5) * 40

    for (let stage = 0; stage <= totalStages; stage++) {
      const y = stage * stageHeight
      const width = getWidthAtY(y)
      const centerX = svgWidth / 2

      if (isFragmented && stage === escapeAt) {
        // Escapa para o lado
        const escapeX = escapeDir === 'left' ? centerX - width / 2 - 30 : centerX + width / 2 + 30
        points.push(`${centerX + (Math.random() - 0.5) * 20},${y}`)
        points.push(`${escapeX},${y + stageHeight / 2}`)
        break
      } else {
        const variation = (Math.random() - 0.5) * (width * 0.3)
        points.push(`${centerX + variation},${y}`)
      }
    }

    return `M ${points.join(' L ')}`
  }

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full max-w-70 mx-auto"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Glow filter */}
        <filter id={`glow-${isFragmented ? 'frag' : 'int'}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stages do funil */}
      {stages.map((stage, i) => {
        const y = i * stageHeight
        const widthTop = getWidthAtY(y)
        const widthBottom = getWidthAtY(y + stageHeight)
        const xTop = (svgWidth - widthTop) / 2
        const xBottom = (svgWidth - widthBottom) / 2
        const isHovered = hoveredStage === stage.label

        return (
          <g
            key={stage.label}
            onMouseEnter={() => onHoverStage(stage.label)}
            onMouseLeave={() => onHoverStage(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Forma trapezoidal */}
            <motion.path
              d={`M ${xTop} ${y} L ${xTop + widthTop} ${y} L ${xBottom + widthBottom} ${y + stageHeight} L ${xBottom} ${y + stageHeight} Z`}
              fill={stage.color}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? {
                opacity: 1,
                scale: 1,
                filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
              } : {}}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              style={{ transformOrigin: 'center' }}
            />

            {/* Glow on hover */}
            {isHovered && (
              <motion.path
                d={`M ${xTop} ${y} L ${xTop + widthTop} ${y} L ${xBottom + widthBottom} ${y + stageHeight} L ${xBottom} ${y + stageHeight} Z`}
                fill="none"
                stroke="white"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                style={{ filter: 'blur(4px)' }}
              />
            )}

            {/* Label */}
            <motion.text
              x={svgWidth / 2}
              y={y + stageHeight / 2 + 4}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight={isHovered ? '700' : '500'}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 * i + 0.2 }}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)', pointerEvents: 'none' }}
            >
              {stage.label}
            </motion.text>
          </g>
        )
      })}

      {/* Partículas animadas */}
      {isInView &&
        particles.map((particle) => (
          <motion.circle
            key={particle.id}
            r="4"
            fill={isFragmented ? '#fff' : '#a78bfa'}
            opacity="0.8"
            filter={`url(#glow-${isFragmented ? 'frag' : 'int'})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.8, 0] }}
            transition={{
              duration: isFragmented ? 3 : 4,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <animateMotion
              dur={isFragmented ? '3s' : '4s'}
              repeatCount="indefinite"
              begin={`${particle.delay}s`}
              path={generateFlowPath(particle.escapeAt, particle.escapeDirection)}
            />
          </motion.circle>
        ))}
    </svg>
  )
}

// === TOOLTIP COMPONENT ===

function StageTooltip({
  insight,
  isVisible,
}: {
  insight: string
  isVisible: boolean
}) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      className="absolute z-50 -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap"
    >
      {insight}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
    </motion.div>
  )
}

// === FLOATING ORBS ===

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand/10 blur-xl"
          style={{
            width: 100 + i * 40,
            height: 100 + i * 40,
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}

// === COMPONENTE PRINCIPAL ===

export function ModernFunnelComparison() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#1a1744] relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(99, 91, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating orbs */}
      <FloatingOrbs />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 bg-brand/20 border border-brand/30 rounded-full text-brand text-sm font-medium mb-4"
            >
              Visualize a diferença
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              Modernize seu Funil de Vendas
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Veja como seus leads se comportam — e por que tantos escapam.
            </p>
          </motion.div>

          {/* Comparativo de Funis */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_100px_1fr] gap-8 lg:gap-4 items-start mb-12">
            {/* Funil Esquerdo - Fragmentado */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-lg sm:text-xl text-white/70 mb-6 font-medium">
                Sem CRM
              </h3>

              <div className="relative group">
                <FunnelWithParticles
                  stages={STAGES_FRAGMENTED}
                  isFragmented={true}
                  isInView={isInView}
                  onHoverStage={setHoveredStage}
                  hoveredStage={hoveredStage}
                />

                {/* Tooltip */}
                {hoveredStage && STAGES_FRAGMENTED.find(s => s.label === hoveredStage) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-xl shadow-xl border border-white/10 whitespace-nowrap z-50"
                  >
                    {STAGES_FRAGMENTED.find(s => s.label === hoveredStage)?.insight}
                  </motion.div>
                )}
              </div>

              {/* Resultado */}
              <div className="mt-8">
                <AnimatedPercentage
                  value={8}
                  delay={800}
                  className="text-5xl sm:text-6xl font-bold text-white/25"
                />
                <p className="text-sm text-white/40 mt-2">taxa de conversão</p>
              </div>
            </motion.div>

            {/* Centro - Conector */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:flex flex-col items-center justify-center pt-24"
            >
              <span className="text-white/80 font-semibold text-sm mb-4">Marketing</span>
              <div className="relative h-64 w-px bg-white/20">
                {/* Animated particles flowing down */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand"
                    animate={{
                      y: [0, 256],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: 'linear',
                    }}
                  />
                ))}
              </div>
              <span className="text-white/80 font-semibold text-sm mt-4">Sales</span>
            </motion.div>

            {/* Funil Direito - Integrado */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-lg sm:text-xl text-white mb-6 font-medium">
                Com CRM Express
              </h3>

              <div className="relative group">
                <FunnelWithParticles
                  stages={STAGES_INTEGRATED}
                  isFragmented={false}
                  isInView={isInView}
                  onHoverStage={setHoveredStage}
                  hoveredStage={hoveredStage}
                />
                {/* Glow effect */}
                <div
                  className="absolute inset-0 -z-10 blur-3xl opacity-30"
                  style={{
                    background: 'radial-gradient(circle, rgba(99,91,255,0.4) 0%, transparent 70%)',
                  }}
                />

                {/* Tooltip */}
                {hoveredStage && STAGES_INTEGRATED.find(s => s.label === hoveredStage) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-xl shadow-xl border border-white/10 whitespace-nowrap z-50"
                  >
                    {STAGES_INTEGRATED.find(s => s.label === hoveredStage)?.insight}
                  </motion.div>
                )}
              </div>

              {/* Resultado */}
              <div className="mt-8">
                <AnimatedPercentage
                  value={35}
                  delay={1000}
                  className="text-5xl sm:text-6xl font-bold text-brand"
                />
                <p className="text-sm text-brand/60 mt-2">taxa de conversão</p>
              </div>
            </motion.div>
          </div>

          {/* Badge de destaque */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex justify-center mb-10"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-brand/20 border border-brand/30 rounded-full"
            >
              <span className="text-white font-medium">Mais vendas com processo visível e time que usa</span>
            </motion.span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="text-white/60 mb-6">
              Implementação completa em até{' '}
              <span className="text-white font-semibold">30 dias</span>
            </p>
            <Button
              variant="primary"
              size="lg"
              href={ZOPU_LINKS.whatsappEspecialista}
              showArrow
              external
            >
              Modernizar meu funil
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
