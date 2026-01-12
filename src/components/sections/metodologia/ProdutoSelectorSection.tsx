'use client'

import { motion } from 'framer-motion'
import { Lightning, Stack, Buildings, Check, Star, ArrowRight } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { GROWTH_ARCHITECTURE_PRODUTOS } from '@/lib/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  Zap: Lightning,
  Layers: Stack,
  Building: Buildings,
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

export function ProdutoSelectorSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
                Escolha seu caminho
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                3 formas de começar
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Do básico ao enterprise. Cada um com escopo definido e resultado claro.
              </p>
            </Reveal>
          </div>

          {/* Products Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {GROWTH_ARCHITECTURE_PRODUTOS.map((produto, index) => {
              const Icon = ICON_MAP[produto.icon] || Lightning
              const isRecommended = produto.destaque

              return (
                <motion.div
                  key={produto.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={cardVariants}
                  className="relative"
                >
                  {/* Recommended badge */}
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white text-sm font-semibold rounded-full shadow-lg shadow-brand/30">
                        <Star size={14} weight="fill" />
                        Recomendado
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className={`relative bg-white rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-500 ${
                      isRecommended
                        ? 'border-2 border-brand shadow-xl shadow-brand/10 ring-4 ring-brand/10'
                        : 'border border-gray-200 hover:border-gray-300 hover:shadow-lg'
                    }`}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isRecommended ? 'bg-brand/10' : 'bg-gray-100'
                          }`}
                        >
                          <Icon
                            size={24}
                            weight="duotone"
                            className={isRecommended ? 'text-brand' : 'text-gray-600'}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{produto.nome}</h3>
                          <p className="text-sm text-gray-500">{produto.timeline}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{produto.tagline}</p>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-gray-900">{produto.investimento}</span>
                      </div>
                      <p className="text-sm text-gray-500">{produto.parcelamento}</p>
                    </div>

                    {/* Para quem */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Para quem?
                      </p>
                      <div className="space-y-2">
                        {produto.paraQuem.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check size={16} weight="bold" className="text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* O que você recebe */}
                    <div className="mb-6 flex-grow">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        Você recebe
                      </p>
                      <div className="space-y-2">
                        {produto.voceRecebe.slice(0, 5).map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isRecommended ? 'bg-brand/10' : 'bg-gray-100'
                              }`}
                            >
                              <Check
                                size={10}
                                weight="bold"
                                className={isRecommended ? 'text-brand' : 'text-gray-500'}
                              />
                            </div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                        {produto.voceRecebe.length > 5 && (
                          <p className="text-xs text-gray-400 pl-6">
                            + {produto.voceRecebe.length - 5} itens
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={produto.href}
                      className={`group inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isRecommended
                          ? 'bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {produto.cta}
                      <ArrowRight
                        size={18}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Comparison hint */}
          <Reveal delay={0.6}>
            <div className="mt-12 text-center">
              <p className="text-gray-500">
                Não sabe qual escolher?{' '}
                <a
                  href="https://wa.me/554733079280?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20ajuda%20para%20escolher%20o%20melhor%20produto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand font-semibold hover:underline"
                >
                  Fale com um especialista
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
