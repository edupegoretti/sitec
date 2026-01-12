'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Check } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { GROWTH_ARCHITECTURE_HERO, ZOPU_LINKS } from '@/lib/constants'
import { durations, easings, heroEntrance, staggers } from '@/lib/motion'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// Pillar colors for reuse
const PILLAR_COLORS = [
  '#635BFF', // Jornada - brand purple
  '#10B981', // Processos - emerald
  '#F59E0B', // Dados - amber
  '#EC4899', // ICP - pink
  '#8B5CF6', // Adoção - violet
  '#06B6D4', // Métricas - cyan
]

// CSS keyframes for elegant AI connection animations
const aiHubStyles = `
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.3; }
  }
  @keyframes flow-to-pillars {
    0% { stroke-dashoffset: 24; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes sparkle-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

// Metodologia Fluidsales™ - Premium Visualization
// Design: Cards connected by flowing gradient rail
function FluidsalesMethodology({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  // Card centers distributed evenly across 1200px width with generous spacing
  // Gap calculation: (1200 - 2*70) / 5 = 212px between centers
  // With cardWidth 110: gap between cards = 212 - 110 = 102px
  const pillars = [
    { cx: 100, color: PILLAR_COLORS[0], title: 'Jornada', subtitle: 'do Cliente' },
    { cx: 300, color: PILLAR_COLORS[1], title: 'Processos', subtitle: 'Comerciais' },
    { cx: 500, color: PILLAR_COLORS[2], title: 'Dados', subtitle: '& Higienização' },
    { cx: 700, color: PILLAR_COLORS[3], title: 'ICP', subtitle: '& Segmentação' },
    { cx: 900, color: PILLAR_COLORS[4], title: 'Adoção', subtitle: '& Capacitação' },
    { cx: 1100, color: PILLAR_COLORS[5], title: 'Métricas', subtitle: '& Resultados' },
  ]

  // Proportions based on Golden Ratio (1.618) and design best practices
  // Card aspect ratio: ~1.4 (close to √2 = 1.414, ISO paper ratio)
  // Card width: 12% of viewBox width (1200 * 0.12 = 144)
  const cardWidth = 144
  const cardHeight = 100  // 144/100 = 1.44 aspect ratio
  const cardY = 150  // More vertical breathing room

  // Flow rail position (bottom of cards)
  const railY = cardY + cardHeight + 20

  return (
    <div className="w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-10">
      {/* SVG Diagram */}
      <svg
        viewBox="0 0 1200 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-label="Metodologia Fluidsales™ - IA automatiza 6 pilares do seu CRM"
      >
        {/* Inject keyframes for AI Hub animations */}
        <style>{aiHubStyles}</style>

        <defs>
          {/* Subtle shadow for cards */}
          <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.1" />
          </filter>

          {/* Rainbow gradient for the flow rail */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={PILLAR_COLORS[0]} />
            <stop offset="20%" stopColor={PILLAR_COLORS[1]} />
            <stop offset="40%" stopColor={PILLAR_COLORS[2]} />
            <stop offset="60%" stopColor={PILLAR_COLORS[3]} />
            <stop offset="80%" stopColor={PILLAR_COLORS[4]} />
            <stop offset="100%" stopColor={PILLAR_COLORS[5]} />
          </linearGradient>
        </defs>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* AI ORCHESTRATION HUB - Elegant Connection Design */}
        {/* Central node with flowing lines to each pillar */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        <g aria-label="IA orquestrando os 6 pilares">
          {/* Connection lines from AI hub to each pillar card */}
          {pillars.map((pilar, index) => {
            // Calculate bezier curve control points for elegant arc
            const hubX = 600
            const hubY = 66 // Start below the hub center (hub at y=40, r=26)
            const targetX = pilar.cx
            const targetY = cardY - 4 // Just above card

            // Control point creates a smooth arc that fans out elegantly
            // Distance from center affects curve intensity
            const distance = Math.abs(targetX - hubX)
            const curveIntensity = 0.6 + (distance / 1000) * 0.4
            const controlY = hubY + (targetY - hubY) * curveIntensity
            // Control X moves outward for outer pillars, creating fan effect
            const controlX = hubX + (targetX - hubX) * 0.5

            return (
              <g key={`connection-${index}`}>
                {/* Background line - static, subtle guide */}
                <path
                  d={`M ${hubX} ${hubY} Q ${controlX} ${controlY} ${targetX} ${targetY}`}
                  fill="none"
                  stroke={pilar.color}
                  strokeOpacity="0.12"
                  strokeWidth="1.5"
                />
                {/* Animated dashed line - shows data/automation flow */}
                <path
                  d={`M ${hubX} ${hubY} Q ${controlX} ${controlY} ${targetX} ${targetY}`}
                  fill="none"
                  stroke={pilar.color}
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  strokeDasharray="6 12"
                  style={{
                    animation: prefersReducedMotion ? 'none' : `flow-to-pillars ${1.5 + index * 0.15}s linear infinite`,
                  }}
                />
                {/* Small dot at connection point on card */}
                <circle
                  cx={targetX}
                  cy={targetY}
                  r="3"
                  fill={pilar.color}
                  opacity="0.7"
                />
              </g>
            )
          })}

          {/* Outer glow ring - subtle pulsing */}
          <circle
            cx="600"
            cy="40"
            r="36"
            fill="#635BFF"
            style={{
              animation: prefersReducedMotion ? 'none' : 'pulse-glow 3s ease-in-out infinite',
            }}
          />

          {/* Core circle - solid brand */}
          <circle cx="600" cy="40" r="26" fill="#635BFF" />

          {/* Inner highlight ring */}
          <circle cx="600" cy="40" r="26" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1" />

          {/* Sparkle icon - refined 4-pointed star */}
          <g
            style={{
              transformOrigin: '600px 40px',
              animation: prefersReducedMotion ? 'none' : 'sparkle-rotate 25s linear infinite',
            }}
          >
            <path
              d="M600 25 L603 36 L614 40 L603 44 L600 55 L597 44 L586 40 L597 36 Z"
              fill="white"
            />
          </g>

        </g>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* FLOW RAIL - Gradient line connecting all cards */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {/* Main flow rail with gradient (scaled) */}
        <rect
          x={pillars[0].cx - 15}
          y={railY}
          width={pillars[5].cx - pillars[0].cx + 30}
          height="8"
          rx="4"
          fill="url(#flowGradient)"
        />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 6 PILARES - Cards on the rail */}
        {/* ═══════════════════════════════════════════════════════════════ */}

        {pillars.map((pilar) => (
          <g key={pilar.title}>
            {/* Card with shadow */}
            <g filter="url(#cardShadow)">
              {/* Card background - COLORED */}
              <rect
                x={pilar.cx - cardWidth / 2}
                y={cardY}
                width={cardWidth}
                height={cardHeight}
                rx="12"
                fill={pilar.color}
              />
            </g>

            {/* Connector dot on rail (scaled) */}
            <circle cx={pilar.cx} cy={railY + 4} r="10" fill="white" stroke={pilar.color} strokeWidth="3.5" />

            {/* Card title - WHITE (scaled for larger cards) */}
            <text
              x={pilar.cx}
              y={cardY + 45}
              textAnchor="middle"
              fill="white"
              fontSize="22"
              fontWeight="700"
              fontFamily="system-ui"
            >
              {pilar.title}
            </text>

            {/* Card subtitle - WHITE with opacity */}
            <text
              x={pilar.cx}
              y={cardY + 72}
              textAnchor="middle"
              fill="white"
              opacity="0.9"
              fontSize="16"
              fontFamily="system-ui"
            >
              {pilar.subtitle}
            </text>
          </g>
        ))}

        {/* AI Flow Label - positioned below the rail */}
        <text
          x="600"
          y={railY + 40}
          textAnchor="middle"
          fill="#635BFF"
          fontSize="18"
          fontWeight="600"
          fontFamily="system-ui"
          letterSpacing="0.03em"
        >
          IA orquestra todo o fluxo automaticamente
        </text>
      </svg>

      {/* Summary Badge - Pill style with overlapping circles */}
      <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-full border border-gray-200 shadow-sm">
        <div className="flex -space-x-2">
          {PILLAR_COLORS.map((color, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-sm"
              style={{ backgroundColor: color }}
            >
              <Check size={14} weight="bold" className="text-white" />
            </div>
          ))}
        </div>
        <span className="text-gray-700 font-medium">
          6 pilares = CRM que funciona de verdade
        </span>
      </div>
    </div>
  )
}

export function HeroMetodologiaGrowth() {
  const prefersReducedMotion = useReducedMotion()

  const transition = {
    duration: durations.medium,
    ease: easings.premium,
  }

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient minimalista */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-white to-gray-50/50" />

      {/* Elemento decorativo sutil */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-linear-to-l from-brand/3 to-transparent" />
      </div>

      <Container className="relative pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Framework R5: Reconhecer */}
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: heroEntrance.badge }}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-linear-to-r from-brand/5 to-brand/10 border border-brand/20 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            <span className="text-sm font-medium text-brand">{GROWTH_ARCHITECTURE_HERO.badge}</span>
          </motion.div>

          {/* Headline - Validação empática */}
          <motion.h1
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: heroEntrance.title }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6"
          >
            {GROWTH_ARCHITECTURE_HERO.headline.parte1}
            <br className="hidden sm:block" />
            <span className="text-brand">{GROWTH_ARCHITECTURE_HERO.headline.parte2}</span>
          </motion.h1>

          {/* Subtítulo - Validação da dor */}
          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: heroEntrance.description }}
            className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {GROWTH_ARCHITECTURE_HERO.subheadline}
          </motion.p>


          {/* CTAs - Primário e Secundário */}
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: heroEntrance.cta }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-12"
          >
            {/* CTA Primário - Scroll para pilares */}
            <a
              href="#pilares"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 ease-out shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
            >
              Entender os 6 pilares
              <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            </a>

            {/* CTA Secundário - WhatsApp */}
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-4 text-gray-700 font-medium hover:text-brand transition-colors"
            >
              Agendar diagnóstico
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Fluidsales Methodology Visualization */}
          <motion.div
            id="visualizacao"
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: heroEntrance.visual }}
          >
            <FluidsalesMethodology prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </Container>

      {/* Divider sutil */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />
    </section>
  )
}
