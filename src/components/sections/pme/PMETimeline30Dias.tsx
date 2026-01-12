'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Compass, Gear, GraduationCap, Rocket } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { PME_TIMELINE_30_DIAS } from '@/lib/constants'

// SVG Visual components para cada semana
function DiscoveryVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Bússola animada */}
      <motion.circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="50"
        fill="rgba(255,255,255,0.1)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      {/* Pontos cardeais */}
      {['N', 'L', 'S', 'O'].map((dir, i) => {
        const angle = i * 90 - 90
        const rad = (angle * Math.PI) / 180
        const x = 100 + Math.cos(rad) * 60
        const y = 100 + Math.sin(rad) * 60
        return (
          <motion.text
            key={dir}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="12"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            {dir}
          </motion.text>
        )
      })}

      {/* Agulha da bússola */}
      <motion.g
        initial={{ rotate: -45 }}
        animate={{ rotate: 0 }}
        transition={{ delay: 0.6, duration: 1, type: 'spring' }}
        style={{ transformOrigin: '100px 100px' }}
      >
        <polygon points="100,50 95,100 105,100" fill="#00D26A" />
        <polygon points="100,150 95,100 105,100" fill="rgba(255,255,255,0.3)" />
      </motion.g>

      {/* Centro */}
      <motion.circle
        cx="100"
        cy="100"
        r="8"
        fill="white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
      />
    </svg>
  )
}

function ConfiguracaoVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Engrenagens animadas */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '80px 80px' }}
      >
        <circle cx="80" cy="80" r="30" fill="rgba(255,255,255,0.2)" />
        {[...Array(8)].map((_, i) => {
          const angle = i * 45
          const rad = (angle * Math.PI) / 180
          return (
            <rect
              key={i}
              x={75 + Math.cos(rad) * 30}
              y={75 + Math.sin(rad) * 30}
              width="10"
              height="10"
              rx="2"
              fill="rgba(255,255,255,0.3)"
              transform={`rotate(${angle}, ${80 + Math.cos(rad) * 30}, ${80 + Math.sin(rad) * 30})`}
            />
          )
        })}
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '130px 120px' }}
      >
        <circle cx="130" cy="120" r="25" fill="rgba(255,255,255,0.15)" />
        {[...Array(6)].map((_, i) => {
          const angle = i * 60
          const rad = (angle * Math.PI) / 180
          return (
            <rect
              key={i}
              x={126 + Math.cos(rad) * 25}
              y={116 + Math.sin(rad) * 25}
              width="8"
              height="8"
              rx="2"
              fill="rgba(255,255,255,0.25)"
              transform={`rotate(${angle}, ${130 + Math.cos(rad) * 25}, ${120 + Math.sin(rad) * 25})`}
            />
          )
        })}
      </motion.g>

      {/* Conexões */}
      <motion.line
        x1="100"
        y1="90"
        x2="115"
        y2="105"
        stroke="#00D26A"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />

      {/* Check de configurado */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <circle cx="160" cy="160" r="20" fill="#00D26A" />
        <path
          d="M150 160 L157 167 L170 153"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </svg>
  )
}

function TreinamentoVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Quadro/tela */}
      <motion.rect
        x="30"
        y="30"
        width="140"
        height="90"
        rx="8"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Conteúdo do quadro - gráfico */}
      <motion.path
        d="M 50 100 L 70 85 L 90 90 L 110 70 L 130 75 L 150 55"
        stroke="#00D26A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />

      {/* Pessoas (avatares) */}
      {[60, 100, 140].map((x, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15 }}
        >
          {/* Corpo */}
          <ellipse cx={x} cy="165" rx="15" ry="10" fill="rgba(255,255,255,0.2)" />
          {/* Cabeça */}
          <circle cx={x} cy="145" r="10" fill="rgba(255,255,255,0.3)" />
          {/* Indicador de entendimento */}
          <motion.circle
            cx={x + 12}
            cy="140"
            r="6"
            fill="#00D26A"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.2 }}
          />
          <motion.path
            d={`M ${x + 9} 140 L ${x + 11} 142 L ${x + 15} 138`}
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.4 + i * 0.2 }}
          />
        </motion.g>
      ))}
    </svg>
  )
}

function GoLiveVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Foguete */}
      <motion.g
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
      >
        {/* Corpo do foguete */}
        <path
          d="M 100 40 C 100 40 80 70 80 100 L 80 130 L 120 130 L 120 100 C 120 70 100 40 100 40"
          fill="white"
        />
        {/* Janela */}
        <circle cx="100" cy="90" r="12" fill="#635BFF" />
        <circle cx="100" cy="90" r="8" fill="rgba(255,255,255,0.3)" />

        {/* Aletas */}
        <path d="M 80 115 L 60 140 L 80 130 Z" fill="rgba(255,255,255,0.7)" />
        <path d="M 120 115 L 140 140 L 120 130 Z" fill="rgba(255,255,255,0.7)" />

        {/* Chamas */}
        <motion.g
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <ellipse cx="100" cy="145" rx="15" ry="20" fill="#FF6B35" />
          <ellipse cx="100" cy="150" rx="10" ry="15" fill="#FFD93D" />
          <ellipse cx="100" cy="155" rx="5" ry="8" fill="white" />
        </motion.g>
      </motion.g>

      {/* Estrelas ao redor */}
      {[
        { x: 40, y: 60, delay: 0.5 },
        { x: 160, y: 50, delay: 0.7 },
        { x: 30, y: 120, delay: 0.9 },
        { x: 170, y: 100, delay: 1.1 },
        { x: 50, y: 170, delay: 1.3 },
        { x: 150, y: 160, delay: 1.5 },
      ].map((star, i) => (
        <motion.circle
          key={i}
          cx={star.x}
          cy={star.y}
          r="3"
          fill="#00D26A"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: 1 }}
          transition={{ delay: star.delay, duration: 0.5 }}
        />
      ))}

      {/* Badge de sucesso */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <circle cx="160" cy="170" r="18" fill="#00D26A" />
        <path
          d="M 150 170 L 157 177 L 170 163"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </svg>
  )
}

// Mapeamento de visuais
const VISUALS = [DiscoveryVisual, ConfiguracaoVisual, TreinamentoVisual, GoLiveVisual]
const ICONS = [Compass, Gear, GraduationCap, Rocket]

const AUTOPLAY_INTERVAL = 5000 // 5 seconds per phase

export function PMETimeline30Dias() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const semanas = PME_TIMELINE_30_DIAS
  const activeSemana = semanas[activeIndex]

  // Calculate segment width (distance between dots)
  const segmentWidth = 100 / (semanas.length - 1)
  // Base progress (completed segments)
  const baseProgress = activeIndex * segmentWidth
  // Current progress including loading animation (don't exceed 100% on last phase)
  const isLastPhase = activeIndex === semanas.length - 1
  const currentProgress = isLastPhase ? 100 : baseProgress + (loadingProgress * segmentWidth)

  // Loading bar animation
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

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setLoadingProgress(0) // Reset loading progress
        setActiveIndex((prev) => (prev + 1) % semanas.length) // Loop back to 0
      }, AUTOPLAY_INTERVAL)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, semanas.length])

  // Stop auto-play on user interaction
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
    setActiveIndex((prev) => (prev === 0 ? semanas.length - 1 : prev - 1))
  }, [stopAutoPlay, semanas.length])

  const handleNext = useCallback(() => {
    stopAutoPlay()
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % semanas.length)
  }, [stopAutoPlay, semanas.length])

  const VisualComponent = VISUALS[activeIndex]
  const IconComponent = ICONS[activeIndex]

  return (
    <section className="py-20 sm:py-32 bg-linear-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-brand/3 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-40 right-0 w-64 h-64 bg-green-500/3 rounded-full translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal>
            <Badge className="mb-4">Processo transparente</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              O que muda nos primeiros{' '}
              <span className="text-brand">30 dias</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Semana a semana, você sabe exatamente o que esperar.
            </p>
          </Reveal>
        </div>

        {/* Timeline Navigation */}
        <Reveal delay={0.3}>
          <div className="mb-16 px-4 sm:px-8">
            <div className="relative py-8">
              {/* Linha de fundo */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

              {/* Linha de progresso animada */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-linear-to-r from-brand via-[#8B5CF6] to-green-500 -translate-y-1/2 rounded-full transition-none"
                style={{ width: `${currentProgress}%` }}
              />

              {/* Pontos */}
              <div className="relative flex justify-between">
                {semanas.map((semana, index) => {
                  const isActive = index === activeIndex
                  const isCompleted = index < activeIndex
                  const isLast = index === semanas.length - 1

                  return (
                    <button
                      key={semana.semana}
                      onClick={() => handleSelect(index)}
                      className="relative flex flex-col items-center group focus:outline-none"
                      aria-label={`Ver Semana ${semana.semana}: ${semana.titulo}`}
                    >
                      {/* Ponto */}
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isActive
                            ? isLast
                              ? 'bg-linear-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/40'
                              : 'bg-linear-to-br from-brand to-[#8B5CF6] shadow-lg shadow-purple-500/40'
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
                          className={`text-sm sm:text-base font-bold ${
                            isActive || isCompleted ? 'text-white' : 'text-gray-400 group-hover:text-brand'
                          }`}
                        >
                          {semana.semana}
                        </span>
                      </motion.div>

                      {/* Label */}
                      <motion.span
                        className={`absolute -bottom-8 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? isLast ? 'text-green-600' : 'text-brand'
                            : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                        animate={{
                          opacity: isActive ? 1 : 0.7,
                        }}
                      >
                        <span className="hidden sm:inline">{semana.titulo}</span>
                        <span className="sm:hidden">S{semana.semana}</span>
                      </motion.span>

                      {/* Indicador de ativo (glow) */}
                      {isActive && (
                        <motion.div
                          className={`absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                            isLast ? 'bg-green-500/20' : 'bg-brand/20'
                          }`}
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
          </div>
        </Reveal>

        {/* Content Area */}
        <div className="bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card mb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Visual animado */}
            <Reveal delay={0.4}>
              <motion.div
                key={activeSemana.semana}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square max-w-md mx-auto"
              >
                {/* Container com gradiente */}
                <div className={`absolute inset-0 rounded-3xl overflow-hidden ${
                  activeIndex === 3
                    ? 'bg-linear-to-br from-green-500 to-green-700'
                    : 'bg-linear-to-br from-brand to-[#8B5CF6]'
                }`}>
                  {/* Padrão de fundo decorativo */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                  </div>

                  {/* Conteúdo visual animado */}
                  <div className="relative w-full h-full p-8">
                    <VisualComponent />
                  </div>

                  {/* Ícone no canto */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <IconComponent size={24} weight="duotone" className="text-white" />
                  </div>

                  {/* Número da semana */}
                  <div className="absolute bottom-4 right-4 text-7xl font-bold text-white/10">
                    0{activeSemana.semana}
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Right: Conteúdo */}
            <div className="order-first lg:order-last">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSemana.semana}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Número + Título */}
                  <div className="flex items-center gap-4">
                    <span className={`text-6xl sm:text-7xl font-bold ${
                      activeIndex === 3 ? 'text-green-500/15' : 'text-brand/15'
                    }`}>
                      0{activeSemana.semana}
                    </span>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                        Semana {activeSemana.semana}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {activeSemana.titulo}
                      </h3>
                    </div>
                  </div>

                  {/* Entregas */}
                  <div className="space-y-3">
                    {activeSemana.entregas.map((entrega, i) => (
                      <motion.div
                        key={entrega}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          activeIndex === 3 ? 'bg-green-100' : 'bg-brand/10'
                        }`}>
                          <Check className={`w-4 h-4 ${
                            activeIndex === 3 ? 'text-green-600' : 'text-brand'
                          }`} />
                        </div>
                        <span className="text-gray-700 font-medium">{entrega}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation buttons (mobile only) */}
        <div className="flex items-center justify-center gap-4 lg:hidden mb-12">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-brand/10 text-brand hover:bg-brand/20"
            aria-label="Semana anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-500">
            Semana {activeIndex + 1} de {semanas.length}
          </span>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-brand/10 text-brand hover:bg-brand/20"
            aria-label="Próxima semana"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Resultado final */}
        <Reveal delay={0.5}>
          <motion.div
            className="bg-bg-dark rounded-2xl p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand font-semibold mb-3">O resultado</p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Ao final dos 30 dias, você terá:
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-white/80">
              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                Máquina de vendas funcionando
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                Dashboard ativo
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                Time treinado
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                WhatsApp integrado
              </span>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  )
}
