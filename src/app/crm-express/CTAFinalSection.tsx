'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, CheckCircle } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { BeamButton } from '@/components/ui'
import { AnimatedOrbs } from '@/components/effects'
import { ZOPU_LINKS } from '@/lib/constants'

/**
 * CTAFinalSection - Premium CTA with animated gradient background
 *
 * Features:
 * - Animated gradient background
 * - Floating orbs
 * - Headline with glow effect
 * - Single dominant CTA
 * - Quick benefit pills
 */

const QUICK_BENEFITS = [
  { icon: Calendar, text: 'Conversa de 20 min' },
  { icon: CheckCircle, text: 'Sem compromisso' },
  { icon: Clock, text: 'Orçamento na hora' },
]

export function CTAFinalSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      {/* Animated orbs */}
      <AnimatedOrbs preset="subtle" disableOnMobile />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full mb-6"
          >
            <span className="text-sm font-medium text-brand">
              Próximo passo
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Descubra em 20 minutos
            <br />
            <span className="text-brand">se faz sentido pra você</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-600 mb-8"
          >
            Sem compromisso. Você sai da conversa sabendo exatamente o que precisa.
          </motion.p>

          {/* Quick benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {QUICK_BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm"
                >
                  <Icon size={16} weight="fill" className="text-success" />
                  <span className="text-sm font-medium text-gray-700">
                    {benefit.text}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <BeamButton
              href={ZOPU_LINKS.whatsappEspecialista}
              external
              size="xl"
              className="text-lg"
            >
              Agendar diagnóstico gratuito
            </BeamButton>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-500 mt-6"
          >
            Conversa via WhatsApp ou Google Meet • Resposta em até 2h
          </motion.p>
        </motion.div>
      </Container>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  )
}
