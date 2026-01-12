'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useMemo, useEffect } from 'react'
import {
  ChatSlash,
  Clock,
  EyeSlash,
  ChartBar,
  ArrowRight,
  type IconProps,
  Warning,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { useFlashlightPosition, useMediaQuery, useIsTouchDevice } from '@/hooks/useMousePosition'

/**
 * ProblemasSection - Dark Navy Premium with Flashlight Effect
 *
 * Features:
 * - Dark navy (#0A2540) background
 * - Glassmorphism cards
 * - Flashlight effect following mouse
 * - Animated counter for impact numbers
 * - Grid pattern overlay
 * - Red glow orbs for dramatic effect
 */

type PhosphorIcon = React.ComponentType<IconProps>

interface Problema {
  icon: PhosphorIcon
  titulo: string
  impacto: string
  impactoNumero: string
  descricao: string
  solucao: string
}

const PROBLEMAS: Problema[] = [
  {
    icon: ChatSlash,
    titulo: 'Leads perdidos no WhatsApp',
    impactoNumero: '30%',
    impacto: 'dos leads nunca recebem resposta',
    descricao: 'Conversas espalhadas em celulares pessoais. Vendedor sai, histórico vai junto.',
    solucao: 'WhatsApp centralizado no CRM',
  },
  {
    icon: Clock,
    titulo: 'Follow-up no achismo',
    impactoNumero: '48%',
    impacto: 'das vendas precisam de 5+ follow-ups',
    descricao: 'Sem lembretes automáticos, seu vendedor depende da memória. E esquece.',
    solucao: 'Automação de tarefas e lembretes',
  },
  {
    icon: EyeSlash,
    titulo: 'Funil invisível',
    impactoNumero: '0',
    impacto: 'visibilidade do pipeline',
    descricao: 'Você descobre o mês ruim quando já acabou. Sem previsibilidade de receita.',
    solucao: 'Pipeline visual em tempo real',
  },
  {
    icon: ChartBar,
    titulo: 'Decisões no escuro',
    impactoNumero: '?',
    impacto: 'Quem vende mais? Qual canal converte?',
    descricao: 'Sem métricas por vendedor e por origem, você investe onde não deveria.',
    solucao: 'Dashboard com métricas essenciais',
  },
]

// Animated counter component
function AnimatedNumber({ value, isInView }: { value: string; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(value)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Handle non-numeric values
    const numericValue = parseInt(value)
    if (isNaN(numericValue) || prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    if (!isInView) return

    let current = 0
    const duration = 1500
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing
      const eased = 1 - Math.pow(1 - progress, 3)
      current = Math.floor(eased * numericValue)
      setDisplayValue(current.toString() + (value.includes('%') ? '%' : ''))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [value, isInView, prefersReducedMotion])

  return <span>{displayValue}</span>
}

// Glassmorphism Problem Card
function ProblemCard({ problema, index, isInView }: {
  problema: Problema
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = problema.icon
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`
          relative h-full p-6 lg:p-8 rounded-2xl overflow-hidden
          bg-white/[0.03] backdrop-blur-sm
          border transition-all duration-300
          ${isHovered ? 'border-white/20 bg-white/[0.06]' : 'border-white/10'}
        `}
        whileHover={prefersReducedMotion ? {} : { y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            {/* Icon with glow */}
            <div className="relative">
              <motion.div
                className={`
                  w-14 h-14 rounded-xl flex items-center justify-center
                  bg-danger/10 transition-all duration-300
                  ${isHovered ? 'bg-danger/20' : ''}
                `}
                animate={isHovered && !prefersReducedMotion ? {
                  boxShadow: ['0 0 20px rgba(220, 38, 38, 0.2)', '0 0 30px rgba(220, 38, 38, 0.4)', '0 0 20px rgba(220, 38, 38, 0.2)'],
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icon
                  size={26}
                  weight="duotone"
                  className="text-danger"
                />
              </motion.div>
            </div>

            {/* Impact number */}
            <div className="text-right">
              <motion.p
                className="text-4xl lg:text-5xl font-bold text-danger"
                animate={isHovered && !prefersReducedMotion ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedNumber value={problema.impactoNumero} isInView={isInView} />
              </motion.p>
              <p className="text-xs text-white/50 max-w-28 mt-1 leading-tight">
                {problema.impacto}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3">
            {problema.titulo}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed mb-5">
            {problema.descricao}
          </p>

          {/* Solution - always visible but styled differently on hover */}
          <motion.div
            className={`
              flex items-center gap-2 text-sm font-medium
              transition-all duration-300
              ${isHovered ? 'text-success' : 'text-brand-light/70'}
            `}
          >
            <motion.span
              animate={isHovered ? { x: [0, 4, 0] } : {}}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <ArrowRight size={16} weight="bold" />
            </motion.span>
            <span>{problema.solucao}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProblemasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTouch = useIsTouchDevice()

  // Flashlight effect
  const { elementX, elementY, isInside } = useFlashlightPosition(sectionRef as React.RefObject<HTMLElement>)

  // Show flashlight only on desktop, non-touch, and no reduced motion
  const showFlashlight = !prefersReducedMotion && !isMobile && !isTouch && isInside

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#0A2540' }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] translate-x-1/2 pointer-events-none">
        <div className="w-full h-full bg-danger rounded-full blur-[150px] opacity-[0.08]" />
      </div>
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] -translate-x-1/2 pointer-events-none">
        <div className="w-full h-full bg-brand rounded-full blur-[150px] opacity-[0.06]" />
      </div>

      {/* Flashlight effect */}
      {showFlashlight && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(600px circle at ${elementX}px ${elementY}px, rgba(99, 91, 255, 0.06), transparent 40%)`,
          }}
        />
      )}

      <Container className="relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            {/* Alert badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/20 rounded-full mb-6"
            >
              <motion.span
                className="w-2 h-2 bg-danger rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-danger">
                Enquanto você lê isso, leads estão escapando
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Problemas que{' '}
              <span className="text-danger">custam caro</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-white/60 max-w-2xl mx-auto"
            >
              Se 2 ou mais itens fazem sentido pra você, o CRM Express foi feito pro seu time.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
            {PROBLEMAS.map((problema, index) => (
              <ProblemCard
                key={index}
                problema={problema}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-success/10 border border-success/20 rounded-full">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Warning size={20} weight="fill" className="text-success" />
              </motion.div>
              <p className="text-white/80">
                A boa notícia: todos esses problemas têm solução.{' '}
                <span className="text-success font-semibold">E não leva 6 meses.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
