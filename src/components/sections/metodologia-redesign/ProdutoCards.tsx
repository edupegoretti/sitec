'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Layers, ArrowRight, HelpCircle } from 'lucide-react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ZOPU_PRODUTOS, ZOPU_LINKS } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRODUTO_CONFIG: Record<string, {
  icon: React.ElementType
  color: string
  colorLight: string
  glow: string
  recommended?: boolean
  badge?: string
}> = {
  'crm-express': {
    icon: Zap,
    color: '#F59E0B',
    colorLight: 'rgba(245, 158, 11, 0.1)',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
  'crm-futuro': {
    icon: Layers,
    color: '#635BFF',
    colorLight: 'rgba(99, 91, 255, 0.1)',
    glow: 'rgba(99, 91, 255, 0.35)',
    recommended: true,
    badge: 'Mais completo',
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.7,
      ease: customEase,
    },
  }),
}

export function ProdutoCards() {
  return (
    <section className="py-24 sm:py-32 bg-linear-to-b from-bg-dark via-[#0F2D4A] to-bg-dark relative overflow-hidden">
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

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-125 h-125 bg-brand/10 rounded-full blur-[150px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-100 h-100 bg-amber-500/8 rounded-full blur-[120px] translate-x-1/2 pointer-events-none" />

      <Container className="relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                Produtos Zopu
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Escolha seu caminho
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                3 formas de implementar do jeito certo
              </p>
            </Reveal>
          </div>

          {/* Product Cards */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-4 xl:gap-6 items-stretch mb-12">
            {ZOPU_PRODUTOS.map((produto, index) => {
              const config = PRODUTO_CONFIG[produto.id]
              const Icon = config?.icon || Layers
              const isRecommended = config?.recommended

              return (
                <motion.div
                  key={produto.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                  className={`relative group ${isRecommended ? 'lg:-mt-4 lg:mb-4' : ''}`}
                >
                  {/* Recommended Badge */}
                  {isRecommended && config?.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="px-5 py-2 rounded-full text-sm font-bold text-white shadow-xl"
                        style={{
                          backgroundColor: config.color,
                          boxShadow: `0 8px 30px ${config.glow}`,
                        }}
                      >
                        {config.badge}
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <motion.div
                    className={`relative h-full rounded-2xl overflow-hidden transition-all duration-500 ${
                      isRecommended
                        ? 'bg-white/8 border-2'
                        : 'bg-white/4 border border-white/10 hover:bg-white/6 hover:border-white/20'
                    }`}
                    style={{
                      borderColor: isRecommended ? `${config?.color}60` : undefined,
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  >
                    {/* Glow effect for recommended */}
                    {isRecommended && (
                      <div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at top, ${config?.glow} 0%, transparent 60%)`,
                        }}
                      />
                    )}

                    <div className="relative p-6 sm:p-8">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: config?.colorLight }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: config?.color }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {produto.nome}
                          </h3>
                          <p className="text-sm text-gray-500">{produto.subtitulo}</p>
                        </div>
                      </div>

                      {/* Para quem */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-400 mb-1">Para quem:</p>
                        <p className="text-white font-medium">{produto.para}</p>
                      </div>

                      {/* Prazo */}
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6"
                        style={{ backgroundColor: config?.colorLight }}
                      >
                        <span
                          className="text-2xl font-bold"
                          style={{ color: config?.color }}
                        >
                          {produto.prazo}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-bold text-white">
                            {produto.preco}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{produto.tipo}</p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {produto.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: config?.colorLight }}
                            >
                              <Check
                                className="w-3 h-3"
                                style={{ color: config?.color }}
                              />
                            </div>
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <a
                        href={ZOPU_LINKS.whatsappEspecialista}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/btn w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                          isRecommended
                            ? 'text-white'
                            : 'bg-white/10 text-white hover:bg-white/15'
                        }`}
                        style={
                          isRecommended
                            ? {
                                backgroundColor: config?.color,
                                boxShadow: `0 4px 20px ${config?.glow}`,
                              }
                            : undefined
                        }
                      >
                        <span>Falar com especialista</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Help Note */}
          <Reveal delay={0.6}>
            <div className="text-center">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-white/4 border border-white/10 rounded-xl hover:bg-white/8 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-brand/15 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-brand" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Não sabe qual escolher?</p>
                  <p className="text-sm text-gray-400">
                    Nosso especialista identifica o caminho ideal
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
