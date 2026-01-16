'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Play, Quotes, TrendUp } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal, Button } from '@/components/shared'
import { CASE_DESTAQUE } from '@/lib/constants'
import { useCountUp } from '@/hooks/useCountUp'

// Animated counter for the percentage
function AnimatedMetric({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, value: animatedValue } = useCountUp(value, { delay: 200 })

  return (
    <span ref={ref}>
      +{Math.round(animatedValue)}
      {suffix}
    </span>
  )
}

export function CaseDestaque() {
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Extract video ID from YouTube URL
  const videoId = CASE_DESTAQUE.videoUrl.includes('youtu.be/')
    ? CASE_DESTAQUE.videoUrl.split('youtu.be/')[1]
    : CASE_DESTAQUE.videoUrl.split('v=')[1]?.split('&')[0]

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-bg-secondary overflow-hidden relative">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-green-500/5 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-brand/5 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Badge className="mb-4">Resultado comprovado</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              De CRM básico para{' '}
              <span className="text-green-600">+20% de conversão</span> com rotina e governança
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Veja como a {CASE_DESTAQUE.empresa} transformou a operação comercial com a Zopu e
              passou a confiar no número.
            </p>
          </Reveal>
        </div>

        {/* Main Card - Split Layout */}
        <motion.div
          ref={containerRef}
          className="grid lg:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-elevated"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Side - Dark with Metrics */}
          <div className="bg-bg-dark p-8 sm:p-10 lg:p-12 relative overflow-hidden">
            {/* Animated background pattern */}
            <div
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
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-green-500 rounded-full blur-[80px] opacity-20" />

            <div className="relative z-10">
              {/* Metric badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <TrendUp size={14} weight="duotone" className="text-green-400" />
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">
                  Taxa de conversão
                </span>
              </motion.div>

              {/* Big metric */}
              <motion.p
                className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <AnimatedMetric value={20} suffix="%" />
              </motion.p>

              <motion.p
                className="text-lg text-white/60 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                de aumento na conversão de vendas
              </motion.p>

              {/* Company info */}
              <motion.div
                className="mb-8 pb-8 border-b border-white/10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <p className="text-sm text-white/40 uppercase tracking-wider mb-1">Case de sucesso</p>
                <p className="text-2xl font-bold text-white">{CASE_DESTAQUE.empresa}</p>
                <p className="text-white/60">{CASE_DESTAQUE.setor}</p>
              </motion.div>

              {/* What was delivered */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <p className="text-xs text-white/40 uppercase tracking-wider mb-4">O que implementamos</p>
                <div className="space-y-3">
                  {CASE_DESTAQUE.solucao.entregas.slice(0, 4).map((entrega, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <p className="text-sm text-white/80">{entrega}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Light with Quote and Video */}
          <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            {/* Quote */}
            <div className="mb-8">
              <Quotes size={40} weight="duotone" className="text-brand/20 mb-4" />
              <blockquote className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
                {CASE_DESTAQUE.depoimento.texto.split('surreal').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-brand">surreal</span>}
                  </span>
                ))}
              </blockquote>

              <div className="flex items-center gap-4">
                {/* Avatar with initials */}
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <span className="text-brand font-bold text-lg">
                    {CASE_DESTAQUE.depoimento.autor.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{CASE_DESTAQUE.depoimento.autor}</p>
                  <p className="text-sm text-gray-500">{CASE_DESTAQUE.depoimento.cargo}</p>
                </div>
              </div>
            </div>

            {/* Video with Thumbnail */}
            <div className="mb-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group">
                {!isPlaying ? (
                  <>
                    {/* Thumbnail */}
                    <img
                      src={thumbnailUrl}
                      alt={`Depoimento ${CASE_DESTAQUE.empresa}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                    {/* Play Button */}
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label="Reproduzir vídeo"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-elevated shadow-brand/30">
                        <Play size={32} weight="fill" className="text-white ml-1" />
                      </div>
                    </button>

                    {/* Video label */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-sm font-medium">
                        Assista o depoimento completo
                      </p>
                    </div>
                  </>
                ) : (
                  /* YouTube Embed */
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={`Case ${CASE_DESTAQUE.empresa} - Depoimento`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between">
              <Button href="/cases/ferro-em-brasa" variant="secondary" className="group">
                Ver case completo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-sm text-gray-400 hidden sm:block">
                450+ clientes transformados
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats Strip */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
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
      </Container>
    </section>
  )
}
