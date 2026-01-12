'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Shield, Clock, Headset } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { AnimatedOrbs } from '@/components/effects'
import { BeamButton } from '@/components/ui'
import { HeadlineReveal, TypewriterText } from '@/components/effects/TextReveal'
import { Pipeline3DInterativo } from './Pipeline3DInterativo'
import { TrustBar } from './TrustBar'
import { ZOPU_LINKS } from '@/lib/constants'
import { useMediaQuery } from '@/hooks/useMousePosition'

/**
 * HeroCRMExpress - Premium Hero Section
 *
 * Features:
 * - Animated orbs background
 * - Headline reveal animation
 * - Single CTA with beam effect
 * - Gold Partner badge with shimmer
 * - Pipeline 3D visualization
 * - Trust bar with client logos
 */

// Gold Partner Badge with shimmer
function GoldPartnerBadge() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <motion.div
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-200/60" />

      {/* Shimmer effect */}
      {!prefersReducedMotion && !isMobile && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        />
      )}

      {/* Content */}
      <div className="relative flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
          <Shield size={12} weight="fill" className="text-white" />
        </div>
        <span className="text-xs sm:text-sm font-semibold text-amber-800">
          Gold Partner Bitrix24
        </span>
      </div>
    </motion.div>
  )
}

// Guarantee pills
function GuaranteePills() {
  const guarantees = [
    { icon: Clock, text: '30 dias' },
    { icon: Shield, text: 'Garantia total' },
    { icon: Headset, text: 'Suporte dedicado' },
  ]

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      {guarantees.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.text}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
          >
            <Icon size={14} weight="fill" className="text-brand" />
            <span className="text-xs font-medium text-gray-600">{item.text}</span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function HeroCRMExpress() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <section
      ref={ref}
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-white"
    >
      {/* Animated background orbs */}
      <AnimatedOrbs preset="hero" disableOnMobile />

      {/* Static gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/50" />
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-gradient-to-l from-brand/3 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header Content */}
          <div className="text-center mb-8 lg:mb-12">
            {/* Badge */}
            <GoldPartnerBadge />

            {/* Headline with reveal animation */}
            <div className="mt-6 lg:mt-8">
              {prefersReducedMotion || isMobile ? (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                  Vendas organizadas.
                  <br />
                  <span className="text-brand">Em 30 dias.</span>
                </h1>
              ) : (
                <HeadlineReveal
                  text="Vendas organizadas.\nEm 30 dias."
                  as="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight"
                  highlightLines={[1]}
                  highlightClassName="text-brand"
                  stagger={0.2}
                  baseDelay={0.2}
                />
              )}
            </div>

            {/* Subheadline */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                CRM Bitrix24 configurado para o seu processo de vendas.
              </p>

              {/* Typewriter subtitle - desktop only */}
              {!isMobile && !prefersReducedMotion ? (
                <p className="text-base text-gray-500 max-w-xl mx-auto mt-2">
                  <TypewriterText
                    text="WhatsApp centralizado. Follow-up automático. Pipeline visível."
                    speed={40}
                    delay={1}
                    cursor
                    cursorClassName="text-brand"
                  />
                </p>
              ) : (
                <p className="text-base text-gray-500 max-w-xl mx-auto mt-2">
                  WhatsApp centralizado. Follow-up automático. Pipeline visível.
                </p>
              )}
            </motion.div>

            {/* Single CTA with beam effect */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <BeamButton
                href={ZOPU_LINKS.whatsappEspecialista}
                external
                size="lg"
                className="text-base lg:text-lg"
              >
                Quero organizar minhas vendas
              </BeamButton>

              {/* Guarantee pills */}
              <GuaranteePills />
            </motion.div>
          </div>

          {/* Pipeline 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Pipeline3DInterativo />
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <TrustBar />
          </motion.div>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50/80 to-transparent pointer-events-none" />
    </section>
  )
}

export default HeroCRMExpress
