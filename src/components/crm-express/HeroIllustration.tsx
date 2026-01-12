'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Check, ArrowRight } from '@phosphor-icons/react'

interface HeroIllustrationProps {
  className?: string
}

// Animated counter
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * value))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  return <span ref={ref}>{displayValue}{suffix}</span>
}

export function HeroIllustration({ className }: HeroIllustrationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const deliverables = [
    { label: 'Pipeline configurado', delay: 0.4 },
    { label: 'WhatsApp integrado', delay: 0.5 },
    { label: 'Automações ativas', delay: 0.6 },
    { label: 'Equipe treinada', delay: 0.7 },
  ]

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Main card */}
        <div className="relative bg-white/3 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-brand/5 via-transparent to-success/5" />

          {/* Content */}
          <div className="relative p-8">
            {/* Header badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 border border-brand/20 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-medium text-brand">Implementação Express</span>
            </motion.div>

            {/* Big number showcase */}
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-baseline gap-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <span className="text-5xl sm:text-6xl font-bold text-white tracking-tight">
                  <AnimatedNumber value={30} />
                </span>
                <span className="text-2xl sm:text-3xl font-medium text-white/60">dias</span>
              </motion.div>

              <motion.p
                className="text-white/50 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                do diagnóstico ao go-live
              </motion.p>
            </div>

            {/* Timeline visual */}
            <div className="relative mb-8">
              {/* Progress bar background */}
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-brand via-brand to-success rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
                />
              </div>

              {/* Timeline markers */}
              <div className="flex justify-between mt-3">
                {['Diagnóstico', 'Setup', 'Treinamento', 'Go-live'].map((step, index) => (
                  <motion.div
                    key={step}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <motion.div
                      className={`w-3 h-3 rounded-full border-2 ${
                        index === 3
                          ? 'bg-success border-success'
                          : 'bg-white/10 border-white/30'
                      }`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 1 + index * 0.15, type: 'spring' }}
                    />
                    <span className={`text-[10px] mt-1.5 ${
                      index === 3 ? 'text-success font-medium' : 'text-white/40'
                    }`}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Deliverables list */}
            <div className="space-y-2.5">
              {deliverables.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white/3 rounded-xl border border-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: item.delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: item.delay + 0.2, type: 'spring', stiffness: 300 }}
                  >
                    <Check size={12} weight="bold" className="text-success" />
                  </motion.div>
                  <span className="text-sm text-white/80">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom comparison */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-medium text-white/30 line-through decoration-white/20">
                    6 meses
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5">tradicional</p>
                </div>

                <motion.div
                  className="w-8 h-8 rounded-full bg-linear-to-r from-brand/20 to-success/20 flex items-center justify-center"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={16} weight="bold" className="text-success" />
                </motion.div>

                <div className="text-center">
                  <motion.p
                    className="text-lg font-bold text-success"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    30 dias
                  </motion.p>
                  <p className="text-[10px] text-success/70 mt-0.5">CRM Express</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand rounded-full blur-[100px] opacity-20" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-success rounded-full blur-[80px] opacity-15" />
        </div>
      </motion.div>
    </div>
  )
}
