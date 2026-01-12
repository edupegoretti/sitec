'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Lightning, Clock, Rocket } from '@phosphor-icons/react'

interface SpeedIndicatorProps {
  className?: string
}

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const tick = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplayValue(Math.round(eased * value))

      if (now < endTime) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, value, duration])

  return <span ref={ref}>{displayValue}</span>
}

export function SpeedIndicator({ className }: SpeedIndicatorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Main container - using proper dark background */}
        <div className="relative bg-bg-dark rounded-3xl border border-white/10 p-8 overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Floating orbs - using brand and success colors */}
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 bg-brand rounded-full blur-[80px] opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 w-24 h-24 bg-success rounded-full blur-[60px] opacity-15"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                <Rocket size={16} weight="duotone" className="text-success" />
              </div>
              <span className="text-white/70 text-sm font-medium">
                Tempo de implementação
              </span>
            </motion.div>

            {/* Main number display */}
            <div className="text-center mb-6">
              <motion.div
                className="flex items-baseline justify-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              >
                <span className="text-4xl sm:text-5xl text-white/60 font-medium mr-2">até</span>
                <span className="text-6xl sm:text-7xl font-bold text-white tracking-tight">
                  <AnimatedNumber value={30} duration={1.5} />
                </span>
              </motion.div>
              <motion.p
                className="text-xl text-white/70 mt-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                dias
              </motion.p>
            </div>

            {/* Comparison badges */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center">
                  <Lightning size={16} weight="duotone" className="text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-white/90 text-sm font-medium">4x mais rápido</p>
                  <p className="text-white/50 text-xs">que implementação tradicional</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-brand/15 flex items-center justify-center">
                  <Clock size={16} weight="duotone" className="text-brand" />
                </div>
                <div className="flex-1">
                  <p className="text-white/90 text-sm font-medium">~5 meses economizados</p>
                  <p className="text-white/50 text-xs">comparado a 6 meses tradicionais</p>
                </div>
              </div>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="mt-6 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                <span>Progresso típico</span>
                <span>Go-live</span>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-linear-to-r from-success to-brand rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
                />
                {/* Milestone markers */}
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  {[0, 33, 66, 100].map((pos, idx) => (
                    <motion.div
                      key={pos}
                      className="w-1.5 h-1.5 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 1.5 + idx * 0.2 }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-white/40">
                <span>Diagnóstico</span>
                <span>Setup</span>
                <span>Treinamento</span>
                <span>Live!</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
