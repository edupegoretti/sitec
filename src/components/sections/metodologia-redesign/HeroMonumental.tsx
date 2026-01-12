'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'

// Custom easing as tuple for Framer Motion
const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Stagger animation for the monument numbers
const numberVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 1,
      ease: customEase,
    },
  }),
}

const dividerVariants = {
  hidden: {
    opacity: 0,
    scaleY: 0,
  },
  visible: (i: number) => ({
    opacity: 0.3,
    scaleY: 1,
    transition: {
      delay: 0.4 + i * 0.15,
      duration: 0.8,
      ease: customEase,
    },
  }),
}

const glowVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 1.2,
      ease: customEase,
    },
  }),
}

export function HeroMonumental() {
  const numbers = ['30', '60', '90']

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-b from-bg-dark via-[#0F2D4A] to-bg-dark-secondary">
      {/* Architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow behind numbers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-brand/10 rounded-full blur-[120px]" />
      </div>

      {/* Subtle diagonal lines for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 100px,
            rgba(255,255,255,0.1) 100px,
            rgba(255,255,255,0.1) 101px
          )`,
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <Reveal delay={0}>
            <Badge variant="dark" className="mb-8 border border-white/10 backdrop-blur-sm">
              Metodologia Fluidsales™
            </Badge>
          </Reveal>

          {/* Monumental Numbers */}
          <div className="relative mb-12">
            {/* Background glow effects for each number */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 sm:gap-8 lg:gap-12">
              {numbers.map((_, i) => (
                <motion.div
                  key={`glow-${i}`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={glowVariants}
                  className="w-24 sm:w-32 lg:w-48 h-24 sm:h-32 lg:h-48 rounded-full blur-3xl"
                  style={{
                    background: i === 0
                      ? 'radial-gradient(circle, rgba(99,91,255,0.3) 0%, transparent 70%)'
                      : i === 1
                      ? 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)'
                      : 'radial-gradient(circle, rgba(0,166,126,0.25) 0%, transparent 70%)',
                  }}
                />
              ))}
            </div>

            {/* The numbers themselves */}
            <div className="relative flex items-center justify-center gap-2 sm:gap-4 lg:gap-6">
              {numbers.map((num, i) => (
                <div key={num} className="flex items-center">
                  <motion.span
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={numberVariants}
                    className="relative font-bold tracking-[-0.04em] leading-none select-none"
                    style={{
                      fontSize: 'clamp(5rem, 18vw, 14rem)',
                      background: i === 0
                        ? 'linear-gradient(180deg, #FFFFFF 20%, #635BFF 100%)'
                        : i === 1
                        ? 'linear-gradient(180deg, #FFFFFF 20%, #F59E0B 100%)'
                        : 'linear-gradient(180deg, #FFFFFF 20%, #00A67E 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 80px rgba(255,255,255,0.1)',
                    }}
                  >
                    {num}
                  </motion.span>

                  {/* Divider pillar */}
                  {i < numbers.length - 1 && (
                    <motion.div
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={dividerVariants}
                      className="mx-2 sm:mx-4 lg:mx-6 w-0.5 sm:w-0.75 origin-bottom"
                      style={{
                        height: 'clamp(4rem, 14vw, 10rem)',
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 100%)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Labels under numbers */}
            <motion.div
              className="flex items-center justify-center gap-8 sm:gap-16 lg:gap-24 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {['Diagnóstico', 'Desenho', 'Implantação'].map((label, i) => (
                <span
                  key={label}
                  className="text-[10px] sm:text-xs lg:text-sm font-medium uppercase tracking-[0.2em]"
                  style={{
                    color: i === 0
                      ? 'rgba(99,91,255,0.8)'
                      : i === 1
                      ? 'rgba(245,158,11,0.8)'
                      : 'rgba(0,166,126,0.8)',
                  }}
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Subtitle */}
          <Reveal delay={0.5}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              A metodologia que outros parceiros{' '}
              <span className="relative">
                <span className="relative z-10">não entregam</span>
                <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-brand/60 rounded-full" />
              </span>
            </h1>
          </Reveal>

          {/* Statistic highlight */}
          <Reveal delay={0.6}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-10">
              <span className="text-3xl sm:text-4xl font-bold text-red-400">{ZOPU_STATS.taxaFalha}</span>
              <span className="text-sm sm:text-base text-gray-300">
                dos CRMs falham.{' '}
                <span className="text-white font-semibold">Os nossos, não.</span>
              </span>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.7}>
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold text-lg rounded-xl hover:bg-brand-hover transition-all duration-300 shadow-[0_0_40px_rgba(99,91,255,0.4)] hover:shadow-[0_0_60px_rgba(99,91,255,0.5)] hover:-translate-y-0.5"
            >
              Falar com especialista
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          {/* Trust indicator */}
          <Reveal delay={0.8}>
            <p className="mt-8 text-sm text-gray-500">
              <span className="text-brand font-semibold">{ZOPU_STATS.retencao}</span> de retenção — a maior entre parceiros Bitrix24
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-bg-dark-secondary to-transparent pointer-events-none" />
    </section>
  )
}
