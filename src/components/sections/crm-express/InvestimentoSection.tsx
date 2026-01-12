'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Check, Clock, ShieldCheck, Sparkle, ArrowRight, Trophy } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { BeamButton } from '@/components/ui'
import { ZOPU_LINKS } from '@/lib/constants'
import { useMediaQuery } from '@/hooks/useMousePosition'

/**
 * InvestimentoSection - Premium Pricing Card with Border Beam
 *
 * Features:
 * - Animated border beam effect
 * - Price reveal animation
 * - Staggered checkmarks
 * - Shield pulse on guarantees
 * - Premium glass card design
 */

const INCLUSO = [
  'Diagnóstico do processo comercial',
  'Configuração completa do Bitrix24',
  'Pipeline de leads + pipeline de vendas',
  'WhatsApp Business integrado',
  'Automações de follow-up',
  'Dashboard de métricas',
  'Certificação Fluidz por função',
  '30 dias de acompanhamento pós-go-live',
]

const GARANTIAS = [
  { icon: Clock, label: '30 dias ou menos' },
  { icon: ShieldCheck, label: 'Escopo fechado' },
  { icon: Sparkle, label: 'Suporte incluso' },
]

// Investment display (no prices - "Sob consulta")
function InvestmentDisplay() {
  return (
    <span className="text-white">
      Sob consulta
    </span>
  )
}

// Border Beam animation component
function BorderBeam() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 640px)')

  if (prefersReducedMotion || isMobile) return null

  return (
    <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
      {/* Top beam */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
        style={{ width: '33%' }}
        animate={{ left: ['-33%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      {/* Right beam */}
      <motion.div
        className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-success to-transparent"
        style={{ height: '33%' }}
        animate={{ top: ['-33%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0.75 }}
      />
      {/* Bottom beam */}
      <motion.div
        className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-brand to-transparent"
        style={{ width: '33%' }}
        animate={{ right: ['-33%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1.5 }}
      />
      {/* Left beam */}
      <motion.div
        className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-transparent via-success to-transparent"
        style={{ height: '33%' }}
        animate={{ bottom: ['-33%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 2.25 }}
      />
    </div>
  )
}

export function InvestimentoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 bg-brand/3 rounded-full blur-[150px]" />
      </div>

      <Container className="relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Investimento
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Preço justo.{' '}
                <span className="text-brand">Escopo fechado.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600">
                Sem surpresas. Sem escopo que cresce. Tudo definido antes de começar.
              </p>
            </Reveal>
          </div>

          {/* Pricing Card */}
          <Reveal delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer glow effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-brand via-purple-500 to-success rounded-[28px] opacity-20 blur-xl"
                animate={!prefersReducedMotion ? {
                  opacity: [0.15, 0.25, 0.15],
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl overflow-hidden border border-white/10">
                {/* Border Beam Effect */}
                <BorderBeam />

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Glow spots */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-success/10 rounded-full blur-[80px]" />

                <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left - Price */}
                    <div className="text-center lg:text-left">
                      {/* Popular Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-400/30 rounded-full mb-6"
                      >
                        <motion.div
                          animate={!prefersReducedMotion ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Trophy size={16} weight="fill" className="text-amber-400" />
                        </motion.div>
                        <span className="text-sm font-medium text-amber-200">Mais Popular</span>
                      </motion.div>

                      {/* Investment */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="mb-6"
                      >
                        <p className="text-white/50 text-sm mb-1">Investimento</p>
                        <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            <InvestmentDisplay />
                          </span>
                        </div>
                        <p className="text-white/50 text-sm mt-2">
                          Fale com um especialista • Licenças Bitrix24 à parte
                        </p>
                      </motion.div>

                      {/* Garantias */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                      >
                        {GARANTIAS.map((garantia, index) => {
                          const Icon = garantia.icon
                          return (
                            <motion.div
                              key={index}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.7 + index * 0.1 }}
                            >
                              <motion.div
                                animate={!prefersReducedMotion && garantia.icon === ShieldCheck ? {
                                  scale: [1, 1.1, 1],
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                              >
                                <Icon size={16} weight="fill" className="text-success" />
                              </motion.div>
                              <span className="text-sm text-white/80">{garantia.label}</span>
                            </motion.div>
                          )
                        })}
                      </motion.div>
                    </div>

                    {/* Right - What's included */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <p className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Check size={18} weight="bold" className="text-success" />
                        O que está incluso
                      </p>
                      <ul className="space-y-3">
                        {INCLUSO.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 + index * 0.05 }}
                            className="flex items-start gap-3 group"
                          >
                            <motion.div
                              className="shrink-0 mt-0.5"
                              initial={{ scale: 0 }}
                              animate={isInView ? { scale: 1 } : {}}
                              transition={{
                                delay: 0.8 + index * 0.05,
                                type: 'spring',
                                stiffness: 300,
                              }}
                            >
                              <Check size={14} weight="bold" className="text-success" />
                            </motion.div>
                            <span className="text-white/80 text-sm">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-10 pt-8 border-t border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <p className="text-white/60 text-center sm:text-left">
                        Quer saber o valor exato para sua operação?
                      </p>
                      <BeamButton
                        href={ZOPU_LINKS.whatsappEspecialista}
                        external
                        variant="secondary"
                        size="lg"
                      >
                        Solicitar orçamento
                      </BeamButton>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Bottom note */}
          <Reveal delay={0.5}>
            <p className="text-center text-sm text-gray-500 mt-8">
              O valor final depende do número de usuários e complexidade do processo.
              <br />
              Em 20 minutos de conversa, você sai com o orçamento fechado.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
