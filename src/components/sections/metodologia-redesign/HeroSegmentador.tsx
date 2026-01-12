'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Layers, ArrowRight, MessageCircle, Check } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS, ZOPU_LINKS, METODOLOGIA_STATS, CAMINHOS_ENTRADA_ZOPU } from '@/lib/constants'

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PRODUTO_ICONS: Record<string, React.ElementType> = {
  express: Zap,
  'revops-launch': Layers,
}

const PRODUTO_CORES: Record<string, { primary: string; glow: string }> = {
  express: { primary: '#F59E0B', glow: 'rgba(245, 158, 11, 0.3)' },
  'revops-launch': { primary: '#635BFF', glow: 'rgba(99, 91, 255, 0.4)' },
}

interface Produto {
  id: string
  nome: string
  prazo: string
  descricao: string
  destacado?: boolean
  recomendado?: boolean
}

const PRODUTOS: Produto[] = [
  {
    id: 'express',
    nome: 'CRM Express',
    prazo: '30 dias',
    descricao: 'Começar rápido com pré-vendas e vendas',
    destacado: false,
  },
  {
    id: 'revops-launch',
    nome: 'RevOps Launch™',
    prazo: '60 dias',
    descricao: 'Operação de RevOps completa',
    destacado: true,
    recomendado: true,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.12,
      duration: 0.7,
      ease: customEase,
    },
  }),
}

export function HeroSegmentador() {
  const [hoveredProduto, setHoveredProduto] = useState<string | null>(null)

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-linear-to-b from-bg-dark via-[#0F2D4A] to-bg-dark-secondary">
      {/* Architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/4 w-150 h-150 bg-brand/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Diagonal accent lines */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 200px,
            rgba(255,255,255,0.1) 200px,
            rgba(255,255,255,0.1) 201px
          )`,
        }}
      />

      <Container className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge - Failure Statistic */}
          <Reveal delay={0}>
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-full backdrop-blur-sm">
                <span className="text-2xl font-bold text-red-400">{METODOLOGIA_STATS.crmsFalham}</span>
                <span className="text-sm text-red-300/90">
                  dos CRMs falham.{' '}
                  <span className="text-white font-semibold">Reduzimos esse risco com metodologia.</span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={0.1}>
            <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Implemente CRM do jeito certo
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-linear-to-r from-white via-brand to-white bg-clip-text text-transparent">
                  — da primeira vez
                </span>
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-0.75 bg-brand/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: customEase }}
                />
              </span>
            </h1>
          </Reveal>

          {/* Subheadline */}
          <Reveal delay={0.2}>
            <p className="text-center text-xl sm:text-2xl text-gray-300/90 mb-16 max-w-3xl mx-auto leading-relaxed">
              Escolha o caminho certo para sua operação de receita
            </p>
          </Reveal>

          {/* Product Selector Cards */}
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 mb-14">
            {PRODUTOS.map((produto, index) => {
              const Icon = PRODUTO_ICONS[produto.id] || Layers
              const cores = PRODUTO_CORES[produto.id]
              const isHovered = hoveredProduto === produto.id
              const isRecommended = produto.recomendado

              return (
                <motion.div
                  key={produto.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredProduto(produto.id)}
                  onMouseLeave={() => setHoveredProduto(null)}
                  className="relative group"
                >
                  {/* Recommended Badge */}
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      <div
                        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                        style={{
                          backgroundColor: cores.primary,
                          boxShadow: `0 4px 20px ${cores.glow}`,
                        }}
                      >
                        Recomendado
                      </div>
                    </div>
                  )}

                  {/* Card Container */}
                  <motion.div
                    className={`relative h-full rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-500 ${
                      isRecommended
                        ? 'bg-white/8 border-2'
                        : 'bg-white/4 border border-white/10 hover:bg-white/6'
                    }`}
                    style={{
                      borderColor: isRecommended ? `${cores.primary}50` : undefined,
                    }}
                    animate={{
                      scale: isHovered ? 1.02 : 1,
                      y: isHovered ? -8 : 0,
                    }}
                    transition={{ duration: 0.3, ease: customEase }}
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, ${cores.glow} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon and Timing */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                          style={{
                            backgroundColor: `${cores.primary}15`,
                            boxShadow: isHovered ? `0 0 30px ${cores.glow}` : 'none',
                          }}
                        >
                          <Icon
                            className="w-7 h-7 transition-colors"
                            style={{ color: cores.primary }}
                          />
                        </div>
                        <div
                          className="text-3xl sm:text-4xl font-bold tracking-tight"
                          style={{ color: cores.primary }}
                        >
                          {produto.prazo}
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {produto.nome}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                        {produto.descricao}
                      </p>

                      {/* Learn More Link */}
                      <div
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                        style={{ color: cores.primary }}
                      >
                        <span>Saiba mais</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-0.75 rounded-full"
                      style={{ backgroundColor: cores.primary }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: isHovered || isRecommended ? 1 : 0,
                        opacity: isHovered || isRecommended ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: customEase }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* CTAs */}
          <Reveal delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold text-lg rounded-xl hover:bg-brand-hover transition-all duration-300 shadow-[0_0_40px_rgba(99,91,255,0.35)] hover:shadow-[0_0_60px_rgba(99,91,255,0.5)] hover:-translate-y-0.5"
              >
                Falar com especialista
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          {/* Trust Signal */}
          <Reveal delay={0.8}>
            <div className="text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/3 border border-white/10 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-bold">{ZOPU_STATS.retencao}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  de retenção — a maior entre parceiros Bitrix24
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-bg-dark-secondary to-transparent pointer-events-none" />
    </section>
  )
}
