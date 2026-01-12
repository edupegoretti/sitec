'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quotes, TrendUp } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { useCountUp } from '@/hooks/useCountUp'

// Animated percentage counter
function AnimatedPercentage({ value }: { value: number }) {
  const { ref, value: animatedValue } = useCountUp(value, { delay: 200 })

  return <span ref={ref}>+{Math.round(animatedValue)}%</span>
}

export function CaseHighlight() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-success/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand/5 rounded-full blur-[100px]" />

      <Container>
        <div ref={containerRef} className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                Resultado real
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Sucesso dos clientes que adotaram a nossa metodologia
              </h2>
            </div>
          </Reveal>

          {/* Main card - Editorial asymmetric layout */}
          <motion.div
            className="grid lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden shadow-elevated bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left: Big metric - 5 cols */}
            <div className="lg:col-span-5 bg-bg-dark p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Success glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-success rounded-full blur-[80px] opacity-30" />

              <div className="relative z-10">
                {/* Mini icon */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-success/20 rounded-full mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <TrendUp size={14} weight="duotone" className="text-success" />
                  <span className="text-xs font-semibold text-success uppercase tracking-wide">
                    Conversão
                  </span>
                </motion.div>

                {/* Big number */}
                <motion.p
                  className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <AnimatedPercentage value={20} />
                </motion.p>

                <motion.p
                  className="text-lg text-white/70"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  taxa de conversão
                </motion.p>

                {/* Company badge */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <p className="text-sm text-white/50">Case de sucesso</p>
                  <p className="text-white font-semibold mt-1">Ferro em Brasa</p>
                  <p className="text-sm text-white/60">E-commerce • Identificação Bovina</p>
                </motion.div>
              </div>
            </div>

            {/* Right: Testimonial + Video - 7 cols */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              {/* Quote */}
              <div className="relative">
                <Quotes size={40} weight="duotone" className="text-brand/20 mb-4" />
                <blockquote className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
                  A Zopu nos ajudou a enxergar novas oportunidades. A implementação foi{' '}
                  <span className="text-brand">surreal</span>.
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* Avatar placeholder with initials */}
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                    <span className="text-brand font-bold text-lg">J</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">João</p>
                    <p className="text-sm text-gray-500">Proprietário, Ferro em Brasa</p>
                  </div>
                </div>
              </div>

              {/* Video Embed */}
              <motion.div
                className="mt-8 rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="relative w-full aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/IhrMZZRuH54?autoplay=1&mute=1&loop=1&playlist=IhrMZZRuH54&rel=0"
                    title="Case Ferro em Brasa - Depoimento"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm text-gray-600 text-center">
                    Depoimento: Como a Ferro em Brasa transformou suas vendas
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom stats strip */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span>Estrutura SDR + Closer implementada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span>Relatórios automatizados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>Parceria de longo prazo</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
