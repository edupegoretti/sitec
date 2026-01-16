'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import {
  ClipboardText,
  Stack,
  Play,
  ShieldCheck,
  Buildings,
  type IconProps,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ENTERPRISE_IMPLEMENTATION_PHASES, ENTERPRISE_DIFFERENTIALS } from '@/lib/constants'

// Enterprise SVG Visual: Assessment Dashboard
function AssessmentVisual() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      <defs>
        <linearGradient id="ent-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
      </defs>

      {/* Main card */}
      <rect x="20" y="10" width="240" height="180" rx="12" fill="url(#ent-card-grad)" stroke="#e2e8f0" strokeWidth="1" />

      {/* Header bar */}
      <rect x="20" y="10" width="240" height="36" rx="12" fill="#0A2540" />
      <rect x="20" y="34" width="240" height="12" fill="#0A2540" />
      <circle cx="38" cy="28" r="5" fill="#ef4444" opacity="0.8" />
      <circle cx="54" cy="28" r="5" fill="#f59e0b" opacity="0.8" />
      <circle cx="70" cy="28" r="5" fill="#10B981" opacity="0.8" />
      <text x="140" y="32" textAnchor="middle" fill="white" fontSize="10" fontFamily="system-ui" fontWeight="600">Assessment Report</text>

      {/* Metrics row */}
      <g transform="translate(35, 58)">
        <rect width="60" height="42" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="30" y="18" textAnchor="middle" fill="#635BFF" fontSize="15" fontWeight="700">87%</text>
        <text x="30" y="32" textAnchor="middle" fill="#64748b" fontSize="7">Maturidade</text>
      </g>
      <g transform="translate(110, 58)">
        <rect width="60" height="42" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="30" y="18" textAnchor="middle" fill="#635BFF" fontSize="15" fontWeight="700">24</text>
        <text x="30" y="32" textAnchor="middle" fill="#64748b" fontSize="7">Processos</text>
      </g>
      <g transform="translate(185, 58)">
        <rect width="60" height="42" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="30" y="18" textAnchor="middle" fill="#635BFF" fontSize="15" fontWeight="700">12</text>
        <text x="30" y="32" textAnchor="middle" fill="#64748b" fontSize="7">Integrações</text>
      </g>

      {/* Progress section */}
      <g transform="translate(35, 110)">
        <text x="0" y="0" fill="#64748b" fontSize="7" fontWeight="500">ANÁLISE DE PROCESSOS</text>
        {/* Progress bars */}
        <g transform="translate(0, 10)">
          <text x="0" y="8" fill="#64748b" fontSize="7">Comercial</text>
          <rect x="50" y="2" width="160" height="8" rx="4" fill="#e2e8f0" />
          <rect x="50" y="2" width="140" height="8" rx="4" fill="#635BFF">
            <animate attributeName="width" values="0;140" dur="1.5s" fill="freeze" />
          </rect>
        </g>
        <g transform="translate(0, 28)">
          <text x="0" y="8" fill="#64748b" fontSize="7">Operações</text>
          <rect x="50" y="2" width="160" height="8" rx="4" fill="#e2e8f0" />
          <rect x="50" y="2" width="120" height="8" rx="4" fill="#8B5CF6">
            <animate attributeName="width" values="0;120" dur="1.5s" begin="0.2s" fill="freeze" />
          </rect>
        </g>
        <g transform="translate(0, 46)">
          <text x="0" y="8" fill="#64748b" fontSize="7">Atendimento</text>
          <rect x="50" y="2" width="160" height="8" rx="4" fill="#e2e8f0" />
          <rect x="50" y="2" width="155" height="8" rx="4" fill="#22C55E">
            <animate attributeName="width" values="0;155" dur="1.5s" begin="0.4s" fill="freeze" />
          </rect>
        </g>
      </g>
    </svg>
  )
}

// Enterprise SVG Visual: Architecture Diagram - Hub and Spoke
function ArchitectureVisual() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      {/* Background */}
      <rect x="10" y="5" width="260" height="190" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Grid pattern */}
      <defs>
        <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="center-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#635BFF" />
          <stop offset="100%" stopColor="#0A2540" />
        </linearGradient>
      </defs>
      <rect x="10" y="5" width="260" height="190" rx="12" fill="url(#grid)" />

      {/* Center Bitrix24 Hub */}
      <circle cx="140" cy="100" r="38" fill="url(#center-grad)" />
      <circle cx="140" cy="100" r="32" fill="white" />
      <text x="140" y="104" textAnchor="middle" fill="#0A2540" fontSize="10" fontWeight="700">BITRIX24</text>

      {/* Enterprise Systems around - 8 systems */}
      {/* Top */}
      <g transform="translate(115, 18)">
        <rect width="50" height="22" rx="4" fill="#0A2540" />
        <text x="25" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">SAP</text>
      </g>
      {/* Top Right */}
      <g transform="translate(195, 35)">
        <rect width="55" height="22" rx="4" fill="#635BFF" />
        <text x="27" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">Salesforce</text>
      </g>
      {/* Right */}
      <g transform="translate(205, 88)">
        <rect width="55" height="22" rx="4" fill="#8B5CF6" />
        <text x="27" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">Power BI</text>
      </g>
      {/* Bottom Right */}
      <g transform="translate(195, 142)">
        <rect width="55" height="22" rx="4" fill="#0A2540" />
        <text x="27" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">WhatsApp</text>
      </g>
      {/* Bottom */}
      <g transform="translate(115, 170)">
        <rect width="50" height="22" rx="4" fill="#635BFF" />
        <text x="25" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">TOTVS</text>
      </g>
      {/* Bottom Left */}
      <g transform="translate(30, 142)">
        <rect width="50" height="22" rx="4" fill="#8B5CF6" />
        <text x="25" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">Omie</text>
      </g>
      {/* Left */}
      <g transform="translate(20, 88)">
        <rect width="55" height="22" rx="4" fill="#0A2540" />
        <text x="27" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">AWS</text>
      </g>
      {/* Top Left */}
      <g transform="translate(30, 35)">
        <rect width="50" height="22" rx="4" fill="#635BFF" />
        <text x="25" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="500">Google</text>
      </g>

      {/* Connection lines from center to each system */}
      {/* Top */}
      <line x1="140" y1="62" x2="140" y2="40" stroke="#635BFF" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>
      {/* Top Right */}
      <line x1="170" y1="72" x2="195" y2="52" stroke="#635BFF" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>
      {/* Right */}
      <line x1="178" y1="100" x2="205" y2="100" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>
      {/* Bottom Right */}
      <line x1="170" y1="128" x2="195" y2="148" stroke="#635BFF" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>
      {/* Bottom */}
      <line x1="140" y1="138" x2="140" y2="170" stroke="#635BFF" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>
      {/* Bottom Left */}
      <line x1="110" y1="128" x2="80" y2="148" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>
      {/* Left */}
      <line x1="102" y1="100" x2="75" y2="100" stroke="#0A2540" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>
      {/* Top Left */}
      <line x1="110" y1="72" x2="80" y2="52" stroke="#635BFF" strokeWidth="1.5" strokeDasharray="3,2">
        <animate attributeName="stroke-dashoffset" values="5;0" dur="1s" repeatCount="indefinite" />
      </line>

      {/* Data flow particles */}
      <circle r="2.5" fill="#635BFF">
        <animateMotion dur="2s" repeatCount="indefinite" path="M140,62 L140,40" />
      </circle>
      <circle r="2.5" fill="#8B5CF6">
        <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M178,100 L205,100" />
      </circle>
      <circle r="2.5" fill="#635BFF">
        <animateMotion dur="2s" repeatCount="indefinite" begin="1s" path="M140,138 L140,170" />
      </circle>
      <circle r="2.5" fill="#0A2540">
        <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s" path="M102,100 L75,100" />
      </circle>
    </svg>
  )
}

// Enterprise SVG Visual: Go-Live Dashboard
function GoLiveVisual() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      {/* Main card */}
      <rect x="20" y="20" width="240" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Header */}
      <rect x="20" y="20" width="240" height="40" rx="12" fill="#22C55E" />
      <rect x="20" y="48" width="240" height="12" fill="#22C55E" />
      <circle cx="40" cy="40" r="8" fill="white" opacity="0.3" />
      <path d="M36 40 L39 43 L45 37" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="140" y="44" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui" fontWeight="600">Go-Live Status: ACTIVE</text>

      {/* Status items */}
      <g transform="translate(35, 75)">
        <circle cx="8" cy="8" r="8" fill="#22C55E" />
        <path d="M4 8 L7 11 L12 5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="25" y="12" fill="#0A2540" fontSize="10" fontWeight="500">CRM configurado</text>
      </g>
      <g transform="translate(35, 100)">
        <circle cx="8" cy="8" r="8" fill="#22C55E" />
        <path d="M4 8 L7 11 L12 5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="25" y="12" fill="#0A2540" fontSize="10" fontWeight="500">Integrações ativas</text>
      </g>
      <g transform="translate(35, 125)">
        <circle cx="8" cy="8" r="8" fill="#22C55E" />
        <path d="M4 8 L7 11 L12 5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="25" y="12" fill="#0A2540" fontSize="10" fontWeight="500">Time treinado</text>
      </g>
      <g transform="translate(35, 150)">
        <circle cx="8" cy="8" r="8" fill="#22C55E" />
        <path d="M4 8 L7 11 L12 5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="25" y="12" fill="#0A2540" fontSize="10" fontWeight="500">Dados migrados</text>
      </g>

      {/* Stats on right */}
      <g transform="translate(170, 75)">
        <rect width="75" height="90" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="37" y="25" textAnchor="middle" fill="#0A2540" fontSize="8" fontWeight="500">USUÁRIOS</text>
        <text x="37" y="50" textAnchor="middle" fill="#22C55E" fontSize="22" fontWeight="700">847</text>
        <text x="37" y="70" textAnchor="middle" fill="#64748b" fontSize="8">ativos</text>
        <rect x="15" y="78" width="45" height="4" rx="2" fill="#e2e8f0" />
        <rect x="15" y="78" width="42" height="4" rx="2" fill="#22C55E">
          <animate attributeName="width" values="0;42" dur="1s" fill="freeze" />
        </rect>
      </g>
    </svg>
  )
}

// Enterprise SVG Visual: Hypercare Support
function HypercareVisual() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full">
      {/* Main card */}
      <rect x="10" y="5" width="260" height="190" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Header */}
      <rect x="10" y="5" width="260" height="36" rx="12" fill="#0A2540" />
      <rect x="10" y="29" width="260" height="12" fill="#0A2540" />
      <text x="140" y="28" textAnchor="middle" fill="white" fontSize="11" fontFamily="system-ui" fontWeight="600">Hypercare Dashboard</text>

      {/* KPI Cards - 3 cards */}
      <g transform="translate(20, 52)">
        <rect width="75" height="55" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="37" y="24" textAnchor="middle" fill="#635BFF" fontSize="16" fontWeight="700">99.99%</text>
        <text x="37" y="42" textAnchor="middle" fill="#64748b" fontSize="8">Uptime</text>
      </g>
      <g transform="translate(102, 52)">
        <rect width="75" height="55" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="37" y="24" textAnchor="middle" fill="#22C55E" fontSize="16" fontWeight="700">Horário</text>
        <text x="37" y="42" textAnchor="middle" fill="#64748b" fontSize="8">Comercial</text>
      </g>
      <g transform="translate(184, 52)">
        <rect width="75" height="55" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="37" y="24" textAnchor="middle" fill="#635BFF" fontSize="16" fontWeight="700">&lt;2min</text>
        <text x="37" y="42" textAnchor="middle" fill="#64748b" fontSize="8">Resposta</text>
      </g>

      {/* Activity chart - adjusted position */}
      <g transform="translate(20, 120)">
        <text x="0" y="0" fill="#64748b" fontSize="7" fontWeight="500">TICKETS RESOLVIDOS</text>
        <g transform="translate(0, 8)">
          <rect x="0" y="22" width="18" height="18" rx="2" fill="#635BFF" opacity="0.3" />
          <rect x="22" y="12" width="18" height="28" rx="2" fill="#635BFF" opacity="0.5" />
          <rect x="44" y="7" width="18" height="33" rx="2" fill="#635BFF" opacity="0.7" />
          <rect x="66" y="15" width="18" height="25" rx="2" fill="#635BFF" opacity="0.6" />
          <rect x="88" y="2" width="18" height="38" rx="2" fill="#635BFF" />
          <rect x="110" y="8" width="18" height="32" rx="2" fill="#635BFF" opacity="0.8" />
          <rect x="132" y="5" width="18" height="35" rx="2" fill="#22C55E" />
        </g>
      </g>

      {/* Support indicator - larger and repositioned */}
      <g transform="translate(185, 118)">
        <rect width="75" height="65" rx="8" fill="white" stroke="#22C55E" strokeWidth="1" />
        <circle cx="37" cy="28" r="14" fill="#22C55E" opacity="0.15" />
        <circle cx="37" cy="28" r="9" fill="#22C55E" opacity="0.3" />
        <circle cx="37" cy="28" r="5" fill="#22C55E">
          <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <text x="37" y="52" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="600">ONLINE</text>
      </g>
    </svg>
  )
}

// Enterprise Icons
const VISUALS = [AssessmentVisual, ArchitectureVisual, GoLiveVisual, HypercareVisual]
type PhosphorIcon = React.ComponentType<IconProps>
const ICONS: PhosphorIcon[] = [ClipboardText, Stack, Play, ShieldCheck]
const COLORS = ['#635BFF', '#635BFF', '#22C55E', '#635BFF']

const AUTOPLAY_INTERVAL = 6000

export function EnterpriseTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const phases = ENTERPRISE_IMPLEMENTATION_PHASES
  const activePhase = phases[activeIndex]

  const segmentWidth = 100 / (phases.length - 1)
  const baseProgress = activeIndex * segmentWidth
  const isLastPhase = activeIndex === phases.length - 1
  const currentProgress = isLastPhase ? 100 : baseProgress + (loadingProgress * segmentWidth)

  useEffect(() => {
    if (isAutoPlaying) {
      startTimeRef.current = performance.now()

      const animate = (currentTime: number) => {
        if (!startTimeRef.current) return

        const elapsed = currentTime - startTimeRef.current
        const progress = Math.min(elapsed / AUTOPLAY_INTERVAL, 1)

        setLoadingProgress(progress)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAutoPlaying, activeIndex])

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setLoadingProgress(0)
        setActiveIndex((prev) => (prev + 1) % phases.length)
      }, AUTOPLAY_INTERVAL)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, phases.length])

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
    setLoadingProgress(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleSelect = useCallback((index: number) => {
    stopAutoPlay()
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }, [activeIndex, stopAutoPlay])

  const handlePrev = useCallback(() => {
    stopAutoPlay()
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? phases.length - 1 : prev - 1))
  }, [stopAutoPlay, phases.length])

  const handleNext = useCallback(() => {
    stopAutoPlay()
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % phases.length)
  }, [stopAutoPlay, phases.length])

  const VisualComponent = VISUALS[activeIndex]
  const IconComponent = ICONS[activeIndex]
  const activeColor = COLORS[activeIndex]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden relative">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <Badge className="mb-4">Metodologia</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Implementação estruturada em fases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Processo comprovado para operações de escala, com change management e
              acompanhamento dedicado.
            </p>
          </Reveal>
        </div>

        {/* Timeline Navigation - Fixed positioning */}
        <Reveal delay={0.2}>
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="relative">
              {/* Background line - positioned at center of circles */}
              <div className="absolute top-7 left-[7%] right-[7%] h-0.5 bg-gray-200" />

              {/* Animated progress line */}
              <div
                className="absolute top-7 left-[7%] h-0.75 bg-brand rounded-full transition-none"
                style={{ width: `${currentProgress * 0.86}%` }}
              />

              {/* Timeline points - evenly distributed */}
              <div className="relative flex justify-between px-[7%]">
                {phases.map((phase, index) => {
                  const isActive = index === activeIndex
                  const isCompleted = index < activeIndex
                  const PhaseIcon = ICONS[index]

                  return (
                    <button
                      key={phase.fase}
                      onClick={() => handleSelect(index)}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      {/* Circle */}
                      <div
                        className={`
                          relative w-14 h-14 rounded-full flex items-center justify-center
                          transition-all duration-300 cursor-pointer border-2 z-10
                          ${isActive
                            ? 'bg-brand border-brand shadow-lg scale-105'
                            : isCompleted
                              ? 'bg-brand border-brand'
                              : 'bg-white border-gray-300 hover:border-gray-400'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <PhaseIcon
                            size={24}
                            weight="duotone"
                            className={`transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                            }`}
                          />
                        )}
                      </div>

                      {/* Label */}
                      <div className="mt-4 text-center">
                        <p
                          className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                            isActive || isCompleted ? 'text-brand' : 'text-gray-400'
                          }`}
                        >
                          Fase {phase.fase}
                        </p>
                        <p className={`text-sm font-medium max-w-25 leading-tight ${
                          isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {phase.nome.split('&')[0].trim()}
                        </p>
                        <p className={`text-xs mt-1 ${
                          isActive ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {phase.periodo}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Visual - Dashboard mockup */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-4">
                  <VisualComponent />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Phase indicator */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-lg mb-4">
                  <IconComponent size={16} weight="duotone" className="text-brand" />
                  <span className="text-sm font-semibold text-brand">
                    Fase {activePhase.fase} • {activePhase.periodo}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {activePhase.nome}
                </h3>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-6">
                  {activePhase.descricao}
                </p>

                {/* Deliverables */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Entregas desta fase
                  </p>
                  <div className="grid gap-3">
                    {activePhase.entregas.map((entrega, idx) => (
                      <motion.div
                        key={entrega}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-brand" />
                        </div>
                        <span className="text-gray-700">{entrega}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation buttons (mobile) */}
        <div className="flex items-center justify-center gap-4 lg:hidden mt-10">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-gray-100 text-gray-600 hover:bg-gray-200"
            aria-label="Fase anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-500 font-medium">
            Fase {activeIndex + 1} de {phases.length}
          </span>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-gray-100 text-gray-600 hover:bg-gray-200"
            aria-label="Próxima fase"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Diferenciais */}
        <Reveal delay={0.4}>
          <div className="mt-20 bg-bg-dark rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center">
                <Buildings size={20} weight="duotone" className="text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white">Diferenciais da abordagem Enterprise</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {ENTERPRISE_DIFFERENTIALS.map((diferencial) => (
                <div key={diferencial} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-gray-300">{diferencial}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
