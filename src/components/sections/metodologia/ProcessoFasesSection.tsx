'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlass, PencilSimple, Rocket, ChartLineUp, Check, CaretRight } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { GROWTH_ARCHITECTURE_FASES } from '@/lib/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  MagnifyingGlass,
  PencilSimple,
  Rocket,
  ChartLineUp,
}

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.6,
      ease: customEase,
    },
  }),
}

export function ProcessoFasesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                O Processo
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                4 fases para CRM funcionando
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Entender → Desenhar → Entregar → Operar.{' '}
                <span className="text-gray-900 font-semibold">Sem atalhos.</span>
              </p>
            </Reveal>
          </div>

          {/* Phases Grid */}
          <div className="relative">
            {/* Connection line - desktop only */}
            <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-linear-to-r from-brand via-amber-500 via-green-500 to-pink-500 opacity-20" />

            <div className="grid lg:grid-cols-4 gap-6">
              {GROWTH_ARCHITECTURE_FASES.map((fase, index) => {
                const Icon = ICON_MAP[fase.icon] || MagnifyingGlass

                return (
                  <motion.div
                    key={fase.fase}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={cardVariants}
                    className="relative"
                  >
                    {/* Arrow connector - mobile/tablet */}
                    {index < GROWTH_ARCHITECTURE_FASES.length - 1 && (
                      <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                        <CaretRight
                          size={24}
                          weight="bold"
                          className="rotate-90 text-gray-300"
                        />
                      </div>
                    )}

                    {/* Card */}
                    <div className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-500 h-full">
                      {/* Phase number badge */}
                      <div
                        className="absolute -top-3 left-6 px-4 py-1 rounded-full text-sm font-bold text-white shadow-lg"
                        style={{
                          backgroundColor: fase.cor,
                          boxShadow: `0 4px 14px ${fase.cor}40`,
                        }}
                      >
                        Fase {fase.fase}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mt-2"
                        style={{ backgroundColor: `${fase.cor}15` }}
                      >
                        <Icon
                          size={24}
                          weight="duotone"
                          style={{ color: fase.cor }}
                        />
                      </div>

                      {/* Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {fase.nome}
                      </h3>

                      {/* Duration */}
                      <p
                        className="text-sm font-semibold mb-3"
                        style={{ color: fase.cor }}
                      >
                        {fase.duracao}
                      </p>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-5">
                        {fase.descricao}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Entregas
                        </p>
                        {fase.entregas.map((entrega, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2"
                          >
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: `${fase.cor}20` }}
                            >
                              <Check
                                size={10}
                                weight="bold"
                                style={{ color: fase.cor }}
                              />
                            </div>
                            <span className="text-xs text-gray-700">{entrega}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Timeline summary */}
          <Reveal delay={0.6}>
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-6 px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand">30 dias</p>
                  <p className="text-xs text-gray-500">CRM Express</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-500">60 dias</p>
                  <p className="text-xs text-gray-500">RevOps Launch</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">Custom</p>
                  <p className="text-xs text-gray-500">Enterprise</p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </Container>
    </section>
  )
}
