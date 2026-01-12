'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal, RevenueCycle } from '@/components/shared'
import { ZOPU_LINKS } from '@/lib/constants'

const scrollToNextSection = () => {
  const nextSection = document.querySelector('section:nth-of-type(2)')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

export function HeroMetodologia() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-b from-bg-dark via-[#0D2847] to-[#0F2D4A]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Central glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 pointer-events-none">
        <div className="absolute inset-0 bg-brand/6 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header - Focado na dor */}
          <div className="text-center mb-10 lg:mb-12">
            {/* Badge */}
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/6 border border-white/10 rounded-full backdrop-blur-sm mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">RevOps Launch™</span>
              </div>
            </Reveal>

            {/* Headline - RevOps: operação de receita unificada */}
            <Reveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.15] tracking-tight">
                Marketing, Vendas e Pós-vendas{' '}
                <br className="hidden sm:block" />
                <span className="text-green-400">em uma única operação de receita</span>
              </h1>
            </Reveal>

            {/* Subheadline - O que é RevOps + Bitrix24 */}
            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                RevOps é quando os três times param de trabalhar em silos.
                <br className="hidden sm:block" />
                <span className="text-gray-300">Implementamos isso com Bitrix24 em até 60 dias.</span>
              </p>
            </Reveal>
          </div>

          {/* Revenue Cycle Diagram */}
          <Reveal delay={0.3}>
            <div className="relative mb-10 lg:mb-12">
              <RevenueCycle className="w-full" theme="dark" />
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToNextSection}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-bg-dark font-semibold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-black/20"
              >
                Entender a metodologia
                <ArrowDown size={20} weight="bold" className="transition-transform group-hover:translate-y-1" />
              </button>

              <a
                href={ZOPU_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/6 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border border-white/15 hover:bg-white/10 hover:border-white/25 transition-all duration-300"
              >
                Falar com especialista
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0F2D4A] to-transparent pointer-events-none" />
    </section>
  )
}
