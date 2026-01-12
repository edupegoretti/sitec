'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  UserPlus,
  WhatsappLogo,
  Kanban,
  BellRinging,
  CheckCircle,
  Trophy,
  Sparkle,
} from '@phosphor-icons/react'
import { useMediaQuery } from '@/hooks/useMousePosition'

/**
 * Pipeline3DInterativo - Premium 3D Pipeline Visualization
 *
 * Features:
 * - 5 cards with 3D tilt effect on hover
 * - Particles flowing between cards
 * - Confetti burst on final stage
 * - Animated metrics below
 * - Fully responsive with mobile fallback
 */

const STAGES = [
  {
    id: 'capture',
    label: 'Lead capturado',
    description: 'Site, WhatsApp ou indicação',
    icon: UserPlus,
    color: 'brand',
  },
  {
    id: 'centralize',
    label: 'Conversa no CRM',
    description: 'Histórico centralizado',
    icon: WhatsappLogo,
    color: 'success',
  },
  {
    id: 'organize',
    label: 'Pipeline visual',
    description: 'Etapas claras de venda',
    icon: Kanban,
    color: 'info',
  },
  {
    id: 'automate',
    label: 'Follow-up automático',
    description: 'Lembretes no tempo certo',
    icon: BellRinging,
    color: 'warning',
  },
  {
    id: 'close',
    label: 'Venda fechada',
    description: 'Processo replicável',
    icon: CheckCircle,
    color: 'success',
    isFinal: true,
  },
]

const METRICS = [
  { value: 30, suffix: ' dias', label: 'para implementar' },
  { value: 96, suffix: '%', label: 'taxa de satisfação' },
  { value: 450, suffix: '+', label: 'empresas atendidas' },
]

// Color mappings
const COLOR_CLASSES = {
  brand: {
    bg: 'bg-brand',
    text: 'text-brand',
    border: 'border-brand',
    glow: 'shadow-brand/30',
    gradient: 'from-brand to-brand/80',
  },
  success: {
    bg: 'bg-success',
    text: 'text-success',
    border: 'border-success',
    glow: 'shadow-success/30',
    gradient: 'from-success to-success/80',
  },
  info: {
    bg: 'bg-info',
    text: 'text-info',
    border: 'border-info',
    glow: 'shadow-info/30',
    gradient: 'from-info to-info/80',
  },
  warning: {
    bg: 'bg-warning',
    text: 'text-warning',
    border: 'border-warning',
    glow: 'shadow-warning/30',
    gradient: 'from-warning to-warning/80',
  },
}

// Particle component for flowing between cards
function Particle({ delay, duration }: { delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-brand/60"
      initial={{ x: 0, opacity: 0, scale: 0 }}
      animate={{
        x: '100%',
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Confetti piece
function ConfettiPiece({ index }: { index: number }) {
  const colors = ['#635BFF', '#00A67E', '#F59E0B', '#3B82F6']
  const angle = (index / 12) * 360
  const distance = 40 + Math.random() * 30

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: colors[index % colors.length] }}
      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        scale: [0, 1.5, 0],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: index * 0.02,
      }}
    />
  )
}

// 3D Card component
interface Card3DProps {
  stage: typeof STAGES[0]
  index: number
  isInView: boolean
  showConfetti: boolean
  onMouseEnter?: () => void
}

function Card3D({ stage, index, isInView, showConfetti, onMouseEnter }: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 1024px)')

  const Icon = stage.icon
  const colors = COLOR_CLASSES[stage.color as keyof typeof COLOR_CLASSES]

  // 3D tilt calculation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || prefersReducedMotion || isMobile) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setMousePos({ x, y })
  }

  const tiltStyle = useMemo(() => {
    if (!isHovered || prefersReducedMotion || isMobile) {
      return { transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }
    }

    const rotateX = -mousePos.y * 10
    const rotateY = mousePos.x * 10

    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
    }
  }, [isHovered, mousePos, prefersReducedMotion, isMobile])

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        onMouseEnter?.()
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className={`
          relative z-10 flex flex-col items-center p-4 lg:p-6
          bg-white rounded-2xl
          border-2 transition-colors duration-300
          ${isHovered ? colors.border : 'border-gray-100'}
          ${stage.isFinal ? 'ring-2 ring-success/20' : ''}
        `}
        style={{
          ...tiltStyle,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0,0,0,0.15), 0 0 30px ${stage.isFinal ? 'rgba(0,166,126,0.2)' : 'rgba(99,91,255,0.15)'}`
            : '0 4px 6px -1px rgba(0,0,0,0.07)',
        }}
      >
        {/* Confetti burst for final stage */}
        <AnimatePresence>
          {stage.isFinal && showConfetti && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <ConfettiPiece key={i} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          className={`
            relative w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center
            ${stage.isFinal ? colors.bg : 'bg-gray-50'}
            transition-all duration-300
          `}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            size={28}
            weight={stage.isFinal ? 'fill' : 'regular'}
            className={stage.isFinal ? 'text-white' : colors.text}
          />

          {/* Glow effect for final stage */}
          {stage.isFinal && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-success"
              animate={{
                boxShadow: ['0 0 20px rgba(0,166,126,0.3)', '0 0 40px rgba(0,166,126,0.5)', '0 0 20px rgba(0,166,126,0.3)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Label */}
        <p className={`mt-3 text-sm lg:text-base font-semibold text-center ${stage.isFinal ? colors.text : 'text-gray-900'}`}>
          {stage.label}
        </p>

        {/* Description - hidden on mobile */}
        <p className="hidden lg:block mt-1 text-xs text-gray-500 text-center">
          {stage.description}
        </p>

        {/* Final stage badge */}
        {stage.isFinal && (
          <motion.div
            className="mt-3 flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Sparkle size={12} weight="fill" className="text-success" />
            <span className="text-xs font-medium text-success">Processo replicável</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Animated Counter
function AnimatedCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setCount(value)
      return
    }

    const duration = 1500
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out-expo)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, value, delay, prefersReducedMotion])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="text-3xl lg:text-4xl font-bold text-gray-900">
        {count}
        <span className="text-brand">{suffix}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </motion.div>
  )
}

// Main component
export function Pipeline3DInterativo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const [showConfetti, setShowConfetti] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const prefersReducedMotion = useReducedMotion()

  // Trigger confetti when last card is in view
  useEffect(() => {
    if (isInView && !showConfetti) {
      const timeout = setTimeout(() => {
        setShowConfetti(true)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [isInView, showConfetti])

  // Generate particles for desktop only
  const particles = useMemo(() => {
    if (isMobile || isTablet || prefersReducedMotion) return []

    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      delay: i * 0.8,
      duration: 3 + Math.random() * 2,
    }))
  }, [isMobile, isTablet, prefersReducedMotion])

  return (
    <div ref={containerRef} className="w-full py-8">
      {/* Pipeline Cards */}
      <div className="relative">
        {/* Connection line - Desktop */}
        {!isMobile && (
          <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2 bg-gray-100 hidden lg:block">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-brand to-success"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />

            {/* Particles flowing along the line */}
            {particles.map((p) => (
              <div key={p.id} className="absolute top-1/2 left-0 -translate-y-1/2">
                <Particle delay={p.delay} duration={p.duration} />
              </div>
            ))}
          </div>
        )}

        {/* Cards Grid */}
        <div className={`
          relative z-10 grid gap-3 lg:gap-6
          ${isMobile
            ? 'grid-cols-1 max-w-xs mx-auto'
            : isTablet
              ? 'grid-cols-3 max-w-2xl mx-auto'
              : 'grid-cols-5 max-w-5xl mx-auto'
          }
        `}>
          {STAGES.map((stage, index) => (
            <Card3D
              key={stage.id}
              stage={stage}
              index={index}
              isInView={isInView}
              showConfetti={showConfetti && stage.isFinal === true}
            />
          ))}
        </div>
      </div>

      {/* Metrics */}
      <motion.div
        className="mt-12 grid grid-cols-3 gap-4 lg:gap-8 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        {METRICS.map((metric, index) => (
          <AnimatedCounter
            key={metric.label}
            {...metric}
            delay={0.8 + index * 0.15}
          />
        ))}
      </motion.div>

      {/* Celebration message */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <Trophy size={18} weight="fill" className="text-success" />
              <span className="text-sm font-medium text-success">
                Seu processo de vendas organizado em 30 dias
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Pipeline3DInterativo
