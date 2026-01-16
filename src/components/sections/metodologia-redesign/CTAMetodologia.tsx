'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChatCircle, Medal } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ZOPU_LINKS, ZOPU_STATS } from '@/lib/constants'

export function CTAMetodologia() {
  return (
    <section className="py-20 sm:py-28 bg-linear-to-br from-brand via-brand-dark to-[#8B5CF6] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stats bar */}
          <Reveal>
            <div className="inline-flex items-center gap-6 sm:gap-10 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{ZOPU_STATS.clientes}</p>
                <p className="text-xs sm:text-sm text-white/70">Clientes ativos</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{ZOPU_STATS.projetos}</p>
                <p className="text-xs sm:text-sm text-white/70">Projetos entregues</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">{ZOPU_STATS.alunosFluidz}</p>
                <p className="text-xs sm:text-sm text-white/70">Certificados Fluidz</p>
              </div>
            </div>
          </Reveal>

          {/* Gold Partner Badge */}
          <Reveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full mb-10">
              <Medal size={16} weight="duotone" className="text-amber-300" />
              <span className="text-sm font-medium text-amber-200">Gold Partner Bitrix24</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para ter sua{' '}
              <span className="relative">
                <span className="relative z-10">operação funcionando?</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 rounded-full z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Em até 60 dias, sua equipe estará operando com Bitrix24 + Fluidz.
              <br className="hidden sm:block" />
              Vamos entender seu cenário?
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-brand font-semibold text-lg rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5"
              >
                Falar com especialista
                <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          {/* Secondary link */}
          <Reveal delay={0.4}>
            <Link
              href="/por-que-zopu"
              className="inline-flex items-center gap-2 mt-8 text-white/70 hover:text-white transition-colors"
            >
              <span>Ou conheça mais sobre a Zopu</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
