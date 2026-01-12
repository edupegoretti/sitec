'use client'

import { motion } from 'framer-motion'
import { Lightning, Stack, Gear, Check } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ZOPU_ESCOPOS, ZOPU_LINKS } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const ESCOPO_ICONS: Record<string, React.ElementType> = {
  Zap: Lightning,
  Layers: Stack,
  Settings: Gear,
}

const ESCOPO_COLORS: Record<string, { primary: string; light: string; glow: string }> = {
  'crm-express': {
    primary: '#F59E0B',
    light: 'rgba(245, 158, 11, 0.1)',
    glow: 'rgba(245, 158, 11, 0.2)',
  },
  'revops-launch': {
    primary: '#635BFF',
    light: 'rgba(99, 91, 255, 0.1)',
    glow: 'rgba(99, 91, 255, 0.3)',
  },
  'growth-architecture': {
    primary: '#00A67E',
    light: 'rgba(0, 166, 126, 0.1)',
    glow: 'rgba(0, 166, 126, 0.2)',
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.6,
      ease: customEase,
    },
  }),
}

export function AdaptacaoSection() {
  return (
    <section className="py-24 sm:py-32 bg-linear-to-b from-bg-dark via-[#0D2847] to-bg-dark relative overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute top-1/4 left-0 w-100 h-100 bg-brand/10 rounded-full blur-[150px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-75 h-75 bg-amber-500/8 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                Escolha seu ponto de partida
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Metodologia que se adapta ao seu escopo
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Dá para acelerar o go-live — sem sacrificar a base
              </p>
            </Reveal>
          </div>

          {/* Scope Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-14">
            {ZOPU_ESCOPOS.map((escopo, index) => {
              const Icon = ESCOPO_ICONS[escopo.icon] || Stack
              const colors = ESCOPO_COLORS[escopo.id]
              const isRecommended = 'recomendado' in escopo && escopo.recomendado

              return (
                <motion.div
                  key={escopo.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                  className={`relative group ${isRecommended ? 'lg:-mt-3 lg:mb-3' : ''}`}
                >
                  {/* Recommended badge */}
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                        style={{
                          backgroundColor: colors.primary,
                          boxShadow: `0 4px 20px ${colors.glow}`,
                        }}
                      >
                        Mais completo
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <motion.div
                    className={`relative h-full rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
                      isRecommended
                        ? 'bg-white/8 border-2'
                        : 'bg-white/4 border border-white/10 hover:bg-white/6'
                    }`}
                    style={{
                      borderColor: isRecommended ? `${colors.primary}50` : undefined,
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  >
                    {/* Glow on recommended */}
                    {isRecommended && (
                      <div
                        className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at top, ${colors.glow} 0%, transparent 60%)`,
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: colors.light }}
                        >
                          <Icon size={24} weight="duotone" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{escopo.nome}</h3>
                          <p className="text-sm text-gray-500">{escopo.subtitulo}</p>
                        </div>
                      </div>

                      {/* Prazo badge */}
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium mb-6"
                        style={{
                          backgroundColor: colors.light,
                          color: colors.primary,
                        }}
                      >
                        {escopo.prazo}
                      </div>

                      {/* Para quem */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                          Para quem
                        </p>
                        <p className="text-white">{escopo.para}</p>
                      </div>

                      {/* Metodologia */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                          Metodologia
                        </p>
                        <p className="text-gray-400 text-sm">{escopo.metodologia}</p>
                      </div>

                      {/* Diferenciais */}
                      <div className="space-y-2.5">
                        {escopo.diferenciais.slice(0, 4).map((dif, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: colors.light }}
                            >
                              <Check size={12} weight="bold" style={{ color: colors.primary }} />
                            </div>
                            <span className="text-sm text-gray-400">{dif}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Soft CTA - não compete com CTA final */}
          <Reveal delay={0.5}>
            <div className="text-center">
              <p className="text-gray-500">
                Não sabe qual escopo?{' '}
                <a
                  href={ZOPU_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-[#7C6FFF] transition-colors font-medium"
                >
                  Fale com um consultor →
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
