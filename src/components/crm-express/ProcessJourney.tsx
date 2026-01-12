'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { MagnifyingGlass, Gear, GraduationCap, Headphones, X, Check } from '@phosphor-icons/react'

interface ProcessJourneyProps {
  className?: string
}

// Cores distintas por fase - seguindo padrão do FrameworkVisual
const STAGE_COLORS = {
  diagnostico: {
    id: 'diagnostico',
    color: 'brand',
    hex: '#635BFF',
    bgClass: 'bg-brand',
    bgLightClass: 'bg-brand/10',
    textClass: 'text-brand',
    borderClass: 'border-brand',
    fillClass: 'fill-brand',
  },
  setup: {
    id: 'setup',
    color: 'amber',
    hex: '#F59E0B',
    bgClass: 'bg-amber-500',
    bgLightClass: 'bg-amber-500/10',
    textClass: 'text-amber-500',
    borderClass: 'border-amber-500',
    fillClass: 'fill-amber-500',
  },
  treinamento: {
    id: 'treinamento',
    color: 'success',
    hex: '#00A67E',
    bgClass: 'bg-success',
    bgLightClass: 'bg-success/10',
    textClass: 'text-success',
    borderClass: 'border-success',
    fillClass: 'fill-success',
  },
  suporte: {
    id: 'suporte',
    color: 'info',
    hex: '#3B82F6',
    bgClass: 'bg-info',
    bgLightClass: 'bg-info/10',
    textClass: 'text-info',
    borderClass: 'border-info',
    fillClass: 'fill-info',
  },
} as const

const STAGES = [
  {
    id: 'diagnostico',
    icon: MagnifyingGlass,
    title: 'Diagnóstico',
    duration: '20 min',
    description: 'Entendemos seu cenário, processos atuais e objetivos de negócio.',
    deliverables: [
      'Análise do processo comercial',
      'Identificação de gargalos',
    ],
    details: [
      'Análise do processo comercial atual',
      'Identificação de gargalos',
      'Definição de prioridades',
      'Alinhamento de expectativas',
    ],
    colors: STAGE_COLORS.diagnostico,
  },
  {
    id: 'setup',
    icon: Gear,
    title: 'Setup',
    duration: '20-30 dias',
    description: 'Configuramos o Bitrix24 personalizado para seu fluxo de vendas.',
    deliverables: [
      'Pipeline configurado',
      'WhatsApp integrado',
    ],
    details: [
      'Configuração de pipelines',
      'Integração WhatsApp',
      'Automações de follow-up',
      'Dashboards e relatórios',
    ],
    colors: STAGE_COLORS.setup,
  },
  {
    id: 'treinamento',
    icon: GraduationCap,
    title: 'Treinamento',
    duration: '5-10 dias',
    description: 'Sua equipe aprende na prática com a plataforma Fluidz.',
    deliverables: [
      'Certificação da equipe',
      'Material de referência',
    ],
    details: [
      'Treinamento assíncrono',
      'Exercícios práticos',
      'Certificação da equipe',
      'Material de referência',
    ],
    colors: STAGE_COLORS.treinamento,
  },
  {
    id: 'suporte',
    icon: Headphones,
    title: 'Acompanhamento',
    duration: '30 dias',
    description: '30 dias de suporte dedicado para ajustes e dúvidas.',
    deliverables: [
      'Suporte via WhatsApp',
      'Ajustes de configuração',
    ],
    details: [
      'Suporte via WhatsApp',
      'Ajustes de configuração',
      'Resolução de dúvidas',
      'Otimizações incrementais',
    ],
    colors: STAGE_COLORS.suporte,
  },
]

export function ProcessJourney({ className }: ProcessJourneyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [activeStage, setActiveStage] = useState<string | null>(null)

  return (
    <div ref={ref} className={className}>
      {/* Desktop: Horizontal flow */}
      <div className="hidden lg:block">
        <svg
          viewBox="0 0 1000 320"
          className="w-full h-auto"
          aria-label="Jornada de implementação do CRM Express"
        >
          <defs>
            {/* Gradients for each stage */}
            <linearGradient id="gradient-diagnostico" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#635BFF" />
              <stop offset="100%" stopColor="#5851EA" />
            </linearGradient>
            <linearGradient id="gradient-setup" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="gradient-treinamento" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A67E" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="gradient-suporte" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            {/* Connector gradients between stages */}
            <linearGradient id="connector-1-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#635BFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="connector-2-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00A67E" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="connector-3-4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00A67E" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="particle-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Connector paths for particles */}
            <path
              id="path-1-2"
              d="M 185 120 C 250 120 270 120 335 120"
              fill="none"
            />
            <path
              id="path-2-3"
              d="M 435 120 C 500 120 520 120 585 120"
              fill="none"
            />
            <path
              id="path-3-4"
              d="M 685 120 C 750 120 770 120 835 120"
              fill="none"
            />
          </defs>

          {/* Connector lines with gradient */}
          {[
            { id: 1, gradient: 'connector-1-2' },
            { id: 2, gradient: 'connector-2-3' },
            { id: 3, gradient: 'connector-3-4' },
          ].map(({ id, gradient }) => (
            <motion.path
              key={`connector-${id}`}
              d={`M ${85 + (id - 1) * 250 + 100} 120 C ${150 + (id - 1) * 250 + 100} 120 ${170 + (id - 1) * 250 + 100} 120 ${235 + (id - 1) * 250 + 100} 120`}
              stroke={`url(#${gradient})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + id * 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* Animated particles */}
          {isInView && (
            <>
              {/* Particle 1-2 */}
              <motion.circle
                r="5"
                fill="#635BFF"
                filter="url(#particle-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 1,
                }}
              >
                <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
                  <mpath href="#path-1-2" />
                </animateMotion>
              </motion.circle>

              {/* Particle 2-3 */}
              <motion.circle
                r="5"
                fill="#F59E0B"
                filter="url(#particle-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 1.5,
                }}
              >
                <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s">
                  <mpath href="#path-2-3" />
                </animateMotion>
              </motion.circle>

              {/* Particle 3-4 */}
              <motion.circle
                r="5"
                fill="#00A67E"
                filter="url(#particle-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: 2,
                }}
              >
                <animateMotion dur="2s" repeatCount="indefinite" begin="2s">
                  <mpath href="#path-3-4" />
                </animateMotion>
              </motion.circle>
            </>
          )}

          {/* Stage nodes */}
          {STAGES.map((stage, index) => {
            const cx = 135 + index * 250
            const isActive = activeStage === stage.id

            return (
              <g
                key={stage.id}
                transform={`translate(${cx}, 120)`}
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer ring with stage color */}
                <motion.circle
                  r="52"
                  fill="none"
                  stroke={stage.colors.hex}
                  strokeOpacity="0.2"
                  strokeWidth="1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                />

                {/* Main node background with stage gradient */}
                <motion.circle
                  r="42"
                  fill={`url(#gradient-${stage.id})`}
                  filter={isActive ? 'url(#node-glow)' : undefined}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: isActive ? 1.08 : 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                />

                {/* Inner highlight */}
                <motion.circle
                  r="36"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
                />

                {/* Icon */}
                <motion.foreignObject
                  x="-12"
                  y="-12"
                  width="24"
                  height="24"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.15 }}
                >
                  <stage.icon size={24} weight="duotone" className="text-white" />
                </motion.foreignObject>

                {/* Stage number badge - elevated with stage color */}
                <motion.g
                  transform="translate(28, -32)"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.15, type: 'spring' }}
                >
                  <circle r="14" fill={stage.colors.hex} />
                  <circle r="14" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                  <text
                    textAnchor="middle"
                    y="5"
                    fontSize="12"
                    fontWeight="700"
                    fill="white"
                  >
                    {index + 1}
                  </text>
                </motion.g>

                {/* Title */}
                <motion.text
                  y="68"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="600"
                  className="fill-text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                >
                  {stage.title}
                </motion.text>

                {/* Duration badge with stage color */}
                <motion.g
                  transform="translate(0, 88)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.15 }}
                >
                  <rect
                    x="-36"
                    y="-10"
                    width="72"
                    height="22"
                    rx="11"
                    fill={stage.colors.hex}
                    fillOpacity="0.15"
                  />
                  <text
                    textAnchor="middle"
                    y="5"
                    fontSize="11"
                    fontWeight="600"
                    fill={stage.colors.hex}
                  >
                    {stage.duration}
                  </text>
                </motion.g>

                {/* Deliverables preview - visible directly below node */}
                <motion.g
                  transform="translate(0, 125)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.15 }}
                >
                  {stage.deliverables.map((deliverable, dIdx) => (
                    <g key={dIdx} transform={`translate(0, ${dIdx * 18})`}>
                      <circle
                        cx="-45"
                        cy="0"
                        r="4"
                        fill={stage.colors.hex}
                        fillOpacity="0.3"
                      />
                      <circle
                        cx="-45"
                        cy="0"
                        r="2"
                        fill={stage.colors.hex}
                      />
                      <text
                        x="-36"
                        y="4"
                        fontSize="10"
                        className="fill-text-secondary"
                      >
                        {deliverable}
                      </text>
                    </g>
                  ))}
                </motion.g>

                {/* Click hint */}
                <motion.text
                  y="185"
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-text-muted"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.5 } : {}}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.15 }}
                >
                  Clique para detalhes
                </motion.text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Mobile: Vertical flow with colored border */}
      <div className="lg:hidden space-y-3">
        {STAGES.map((stage, index) => {
          const isActive = activeStage === stage.id
          const Icon = stage.icon
          const isLast = index === STAGES.length - 1

          return (
            <div key={stage.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                className={`relative bg-white rounded-2xl p-5 border-l-4 border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? `${stage.colors.borderClass} border-r border-t border-b shadow-elevated`
                    : `${stage.colors.borderClass} border-r-border-light border-t-border-light border-b-border-light hover:shadow-card`
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon with stage color */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? stage.colors.bgClass : stage.colors.bgLightClass
                      }`}
                    >
                      <Icon
                        size={28}
                        weight="duotone"
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-white' : stage.colors.textClass
                        }`}
                      />
                    </div>
                    {/* Number badge with stage color */}
                    <span
                      className={`absolute -top-2 -right-2 w-6 h-6 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white ${stage.colors.bgClass}`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-text-primary">{stage.title}</h3>
                      {/* Duration badge with stage color */}
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${stage.colors.bgLightClass} ${stage.colors.textClass}`}
                      >
                        {stage.duration}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{stage.description}</p>

                    {/* Deliverables preview - always visible */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stage.deliverables.map((deliverable, dIdx) => (
                        <span
                          key={dIdx}
                          className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${stage.colors.bgLightClass}`}
                        >
                          <Check size={12} weight="bold" className={stage.colors.textClass} />
                          <span className="text-text-secondary">{deliverable}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border-light"
                    >
                      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                        Todas as entregas
                      </h4>
                      <ul className="space-y-2.5">
                        {stage.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-text-secondary">
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${stage.colors.bgClass}`}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Connector with gradient */}
              {!isLast && (
                <motion.div
                  className="flex justify-center py-1.5"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <div
                    className="w-0.5 h-6 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${stage.colors.hex}60, ${STAGES[index + 1].colors.hex}60)`,
                    }}
                  />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Desktop detail drawer */}
      <AnimatePresence>
        {activeStage && (
          <motion.div
            className="hidden lg:block fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm"
              onClick={() => setActiveStage(null)}
            />

            {/* Drawer */}
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {(() => {
                const stage = STAGES.find((s) => s.id === activeStage)
                if (!stage) return null
                const Icon = stage.icon

                return (
                  <div className="p-8">
                    {/* Header with stage color */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-elevated ${stage.colors.bgClass}`}
                          style={{ boxShadow: `0 8px 24px ${stage.colors.hex}30` }}
                        >
                          <Icon size={32} weight="duotone" className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-text-primary">{stage.title}</h3>
                          <span className={`font-medium ${stage.colors.textClass}`}>
                            {stage.duration}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveStage(null)}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                      >
                        <X size={20} weight="bold" className="text-text-muted" />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed mb-8">{stage.description}</p>

                    {/* Details with stage color */}
                    <div>
                      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
                        O que inclui
                      </h4>
                      <ul className="space-y-3">
                        {stage.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-3 p-4 rounded-xl ${stage.colors.bgLightClass}`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${stage.colors.bgClass}`}
                            />
                            <span className="text-text-primary">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
