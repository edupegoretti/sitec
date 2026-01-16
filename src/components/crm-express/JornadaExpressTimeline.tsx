'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, MagnifyingGlass, Gear, GraduationCap, Rocket } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'

// Dados das fases do CRM Express (baseado no PDF oficial)
const CRM_EXPRESS_FASES = [
  {
    fase: 1,
    titulo: 'Entender seu processo',
    subtitulo: 'A gente mapeia como sua equipe vende hoje',
    duracao: '1-2 semanas',
    entregas: [
      'Análise do processo comercial atual',
      'Identificação de gargalos e vazamentos',
      'Plano de implementação definido',
    ],
  },
  {
    fase: 2,
    titulo: 'Montar o sistema',
    subtitulo: 'Criamos seu pipeline, regras e automações',
    duracao: '2-3 semanas',
    entregas: [
      'Pipeline de leads configurado',
      'Pipeline de vendas ativo',
      'WhatsApp integrado',
      'Automações de follow-up',
    ],
  },
  {
    fase: 3,
    titulo: 'Ensinar o time',
    subtitulo: 'Treinamento por função (vendedor, gestor)',
    duracao: '~1 semana',
    entregas: [
      'Equipe na plataforma Fluidz',
      'Certificação concluída',
      'Material de referência entregue',
    ],
  },
  {
    fase: 4,
    titulo: 'Ligar o sistema',
    subtitulo: 'CRM no ar + 30 dias de acompanhamento',
    duracao: '+ 30 dias suporte',
    entregas: [
      'Sistema em produção',
      'Suporte via WhatsApp',
      'Ajustes e otimizações',
      'Dashboard de métricas ativo',
    ],
  },
]

// SVG Visual: Diagnóstico (Lupa + análise)
function DiagnosticoVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Lupa */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Círculo da lupa */}
        <circle
          cx="90"
          cy="80"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="6"
        />
        <circle
          cx="90"
          cy="80"
          r="35"
          fill="rgba(255,255,255,0.1)"
        />
        {/* Cabo da lupa */}
        <motion.line
          x1="122"
          y1="112"
          x2="155"
          y2="145"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
      </motion.g>

      {/* Linhas de análise dentro da lupa */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1="65"
          y1={65 + i * 15}
          x2="115"
          y2={65 + i * 15}
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
        />
      ))}

      {/* Checkmark de análise concluída */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3, type: 'spring' }}
      >
        <circle cx="155" cy="160" r="18" fill="#10B981" />
        <path
          d="M 145 160 L 152 167 L 165 153"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>

      {/* Pontos de dados ao redor */}
      {[
        { x: 40, y: 140, delay: 0.6 },
        { x: 160, y: 60, delay: 0.7 },
        { x: 35, y: 50, delay: 0.8 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="rgba(255,255,255,0.4)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ delay: point.delay, duration: 0.4 }}
        />
      ))}
    </svg>
  )
}

// SVG Visual: Configuração (Engrenagens + Pipeline)
function ConfiguracaoVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Engrenagem principal animada */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '70px 70px' }}
      >
        <circle cx="70" cy="70" r="25" fill="rgba(255,255,255,0.2)" />
        {[...Array(8)].map((_, i) => {
          const angle = i * 45
          const rad = (angle * Math.PI) / 180
          return (
            <rect
              key={i}
              x={66 + Math.cos(rad) * 25}
              y={66 + Math.sin(rad) * 25}
              width="8"
              height="8"
              rx="2"
              fill="rgba(255,255,255,0.3)"
              transform={`rotate(${angle}, ${70 + Math.cos(rad) * 25}, ${70 + Math.sin(rad) * 25})`}
            />
          )
        })}
      </motion.g>

      {/* Engrenagem secundária */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '120px 100px' }}
      >
        <circle cx="120" cy="100" r="20" fill="rgba(255,255,255,0.15)" />
        {[...Array(6)].map((_, i) => {
          const angle = i * 60
          const rad = (angle * Math.PI) / 180
          return (
            <rect
              key={i}
              x={117 + Math.cos(rad) * 20}
              y={97 + Math.sin(rad) * 20}
              width="6"
              height="6"
              rx="1"
              fill="rgba(255,255,255,0.25)"
              transform={`rotate(${angle}, ${120 + Math.cos(rad) * 20}, ${100 + Math.sin(rad) * 20})`}
            />
          )
        })}
      </motion.g>

      {/* Pipeline visual (3 etapas) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={45 + i * 45}
            y="145"
            width="35"
            height="25"
            rx="4"
            fill={i === 2 ? '#10B981' : 'rgba(255,255,255,0.2)'}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.3 }}
          />
        ))}
        {/* Setas entre etapas */}
        {[0, 1].map((i) => (
          <motion.path
            key={`arrow-${i}`}
            d={`M ${85 + i * 45} 157 L ${90 + i * 45} 157`}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.2 }}
          />
        ))}
      </motion.g>

      {/* Check de configurado */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <circle cx="160" cy="55" r="16" fill="#10B981" />
        <path
          d="M 151 55 L 157 61 L 169 49"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </svg>
  )
}

// SVG Visual: Treinamento (Tela + Pessoas)
function TreinamentoVisual() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Tela/Quadro */}
      <motion.rect
        x="30"
        y="25"
        width="140"
        height="85"
        rx="8"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Conteúdo do quadro - gráfico de crescimento */}
      <motion.path
        d="M 50 90 L 70 75 L 95 80 L 120 55 L 150 45"
        stroke="#10B981"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />

      {/* Pontos no gráfico */}
      {[
        { x: 50, y: 90 },
        { x: 70, y: 75 },
        { x: 95, y: 80 },
        { x: 120, y: 55 },
        { x: 150, y: 45 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        />
      ))}

      {/* Pessoas (avatares) */}
      {[55, 100, 145].map((x, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15 }}
        >
          {/* Corpo */}
          <ellipse cx={x} cy="160" rx="14" ry="10" fill="rgba(255,255,255,0.2)" />
          {/* Cabeça */}
          <circle cx={x} cy="140" r="10" fill="rgba(255,255,255,0.3)" />
          {/* Badge de certificado */}
          <motion.circle
            cx={x + 10}
            cy="135"
            r="6"
            fill="#10B981"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3 + i * 0.15, type: 'spring' }}
          />
          <motion.path
            d={`M ${x + 7} 135 L ${x + 9} 137 L ${x + 13} 133`}
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5 + i * 0.15 }}
          />
        </motion.g>
      ))}
    </svg>
  )
}

// SVG Visual: Go-Live (Foguete + Sucesso)
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
          d="M 100 35 C 100 35 80 65 80 95 L 80 125 L 120 125 L 120 95 C 120 65 100 35 100 35"
          fill="white"
        />
        {/* Janela */}
        <circle cx="100" cy="85" r="12" fill="#635BFF" />
        <circle cx="100" cy="85" r="8" fill="rgba(255,255,255,0.3)" />

        {/* Aletas */}
        <path d="M 80 110 L 60 135 L 80 125 Z" fill="rgba(255,255,255,0.7)" />
        <path d="M 120 110 L 140 135 L 120 125 Z" fill="rgba(255,255,255,0.7)" />

        {/* Chamas animadas */}
        <motion.g
          animate={{ scaleY: [1, 1.3, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ transformOrigin: '100px 140px' }}
        >
          <ellipse cx="100" cy="140" rx="15" ry="20" fill="#FF6B35" />
          <ellipse cx="100" cy="145" rx="10" ry="15" fill="#FFD93D" />
          <ellipse cx="100" cy="150" rx="5" ry="8" fill="white" />
        </motion.g>
      </motion.g>

      {/* Estrelas ao redor */}
      {[
        { x: 35, y: 55, delay: 0.6 },
        { x: 165, y: 45, delay: 0.7 },
        { x: 30, y: 115, delay: 0.8 },
        { x: 170, y: 95, delay: 0.9 },
        { x: 45, y: 165, delay: 1.0 },
        { x: 155, y: 155, delay: 1.1 },
      ].map((star, i) => (
        <motion.circle
          key={i}
          cx={star.x}
          cy={star.y}
          r="3"
          fill="#10B981"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: 1 }}
          transition={{ delay: star.delay, duration: 0.5 }}
        />
      ))}

      {/* Badge de sucesso GRANDE */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        <circle cx="160" cy="170" r="20" fill="#10B981" />
        <path
          d="M 148 170 L 156 178 L 172 162"
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

// Mapeamento de visuais e ícones
const VISUALS = [DiagnosticoVisual, ConfiguracaoVisual, TreinamentoVisual, GoLiveVisual]
const ICONS = [MagnifyingGlass, Gear, GraduationCap, Rocket]

const AUTOPLAY_INTERVAL = 5000

export function JornadaExpressTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const fases = CRM_EXPRESS_FASES
  const activeFase = fases[activeIndex]

  const segmentWidth = 100 / (fases.length - 1)
  const baseProgress = activeIndex * segmentWidth
  const isLastPhase = activeIndex === fases.length - 1
  const currentProgress = isLastPhase ? 100 : baseProgress + loadingProgress * segmentWidth

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
        setLoadingProgress(0)
        setActiveIndex((prev) => (prev + 1) % fases.length)
      }, AUTOPLAY_INTERVAL)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, fases.length])

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

  const handleSelect = useCallback(
    (index: number) => {
      stopAutoPlay()
      setDirection(index > activeIndex ? 1 : -1)
      setActiveIndex(index)
    },
    [activeIndex, stopAutoPlay]
  )

  const handlePrev = useCallback(() => {
    stopAutoPlay()
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? fases.length - 1 : prev - 1))
  }, [stopAutoPlay, fases.length])

  const handleNext = useCallback(() => {
    stopAutoPlay()
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % fases.length)
  }, [stopAutoPlay, fases.length])

  const VisualComponent = VISUALS[activeIndex]
  const IconComponent = ICONS[activeIndex]

  return (
    <section className="py-20 sm:py-32 bg-white overflow-hidden relative">

      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal>
            <Badge className="mb-4">Processo transparente</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Sua jornada em{' '}
              <span className="text-brand">até 30 dias</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Fase a fase, você sabe exatamente o que esperar.
            </p>
          </Reveal>
        </div>

        {/* Timeline Navigation */}
        <Reveal delay={0.3}>
          <div className="mb-16 px-4 sm:px-8">
            <div className="relative py-8">
              {/* Linha de fundo */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

              {/* Linha de progresso */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-linear-to-r from-brand via-brand to-success -translate-y-1/2 rounded-full"
                style={{ width: `${currentProgress}%`, transition: 'none' }}
              />

              {/* Pontos */}
              <div className="relative flex justify-between">
                {fases.map((fase, index) => {
                  const isActive = index === activeIndex
                  const isCompleted = index < activeIndex
                  const isLast = index === fases.length - 1

                  return (
                    <button
                      key={fase.fase}
                      onClick={() => handleSelect(index)}
                      className="relative flex flex-col items-center group focus:outline-none"
                      aria-label={`Ver Fase ${fase.fase}: ${fase.titulo}`}
                    >
                      {/* Ponto - TAMANHO FIXO para evitar efeito de fade */}
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer"
                        style={{
                          transition: 'none',
                          animation: 'none',
                          background: isActive
                            ? isLast
                              ? 'linear-gradient(to bottom right, #00A67E, #166534)'
                              : 'linear-gradient(to bottom right, #635BFF, #5851EA)'
                            : isCompleted
                              ? '#635BFF'
                              : '#FFFFFF',
                          border: !isActive && !isCompleted ? '2px solid #D1D5DB' : 'none',
                          boxShadow: isActive
                            ? isLast
                              ? '0 10px 15px -3px rgba(0, 166, 126, 0.4)'
                              : '0 10px 15px -3px rgba(99, 91, 255, 0.4)'
                            : 'none',
                        }}
                      >
                        <span
                          className="text-sm sm:text-base font-bold"
                          style={{
                            transition: 'none',
                            color: isActive || isCompleted ? '#FFFFFF' : '#9CA3AF',
                          }}
                        >
                          {fase.fase}
                        </span>
                      </div>

                      {/* Label */}
                      <span
                        className="absolute -bottom-8 text-xs sm:text-sm font-medium whitespace-nowrap"
                        style={{
                          transition: 'none',
                          color: isActive
                            ? isLast
                              ? '#00A67E'
                              : '#635BFF'
                            : '#9CA3AF',
                        }}
                      >
                        <span className="hidden sm:inline">{fase.titulo}</span>
                        <span className="sm:hidden">F{fase.fase}</span>
                      </span>

                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Content Area */}
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card mb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Visual animado */}
            <Reveal delay={0.4}>
              <motion.div
                key={activeFase.fase}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square max-w-md mx-auto"
              >
                {/* Container com fundo sólido */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{
                    background: activeIndex === 3
                      ? '#00A67E'
                      : '#635BFF',
                  }}
                >
                  {/* Conteúdo visual animado */}
                  <div className="relative w-full h-full p-8">
                    <VisualComponent />
                  </div>

                  {/* Ícone no canto */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <IconComponent size={24} weight="duotone" className="text-white" />
                  </div>

                  {/* Número da fase */}
                  <div className="absolute bottom-4 right-4 text-7xl font-bold text-white/10">
                    0{activeFase.fase}
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Right: Conteúdo */}
            <div className="order-first lg:order-last">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeFase.fase}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Número + Título */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-6xl sm:text-7xl font-bold ${
                        activeIndex === 3 ? 'text-success/15' : 'text-brand/15'
                      }`}
                    >
                      0{activeFase.fase}
                    </span>
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                        Fase {activeFase.fase} • {activeFase.duracao}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {activeFase.titulo}
                      </h3>
                      {activeFase.subtitulo && (
                        <p className="text-gray-600 mt-1">
                          {activeFase.subtitulo}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Entregas */}
                  <div className="space-y-3">
                    {activeFase.entregas.map((entrega, i) => (
                      <motion.div
                        key={entrega}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            activeIndex === 3 ? 'bg-success/10' : 'bg-brand/10'
                          }`}
                        >
                          <Check
                            size={16}
                            weight="bold"
                            className={activeIndex === 3 ? 'text-success' : 'text-brand'}
                          />
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
            aria-label="Fase anterior"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          <span className="text-sm text-gray-500">
            Fase {activeIndex + 1} de {fases.length}
          </span>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-brand/10 text-brand hover:bg-brand/20"
            aria-label="Próxima fase"
          >
            <ArrowRight size={20} weight="bold" />
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
            <div className="flex flex-wrap justify-center gap-3 text-white/80">
              <span className="bg-success/20 text-success px-4 py-2 rounded-full text-sm font-medium">
                CRM funcionando
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                Pipeline visual
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                WhatsApp integrado
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                Time treinado
              </span>
              <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                Dashboard ativo
              </span>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  )
}
