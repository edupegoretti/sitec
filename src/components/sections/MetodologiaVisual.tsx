'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Button, Reveal } from '@/components/shared'
import { METODOLOGIA_ZOPU, ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import { PilarTimeline, PilarVisual, PilarContent } from './metodologia'

const AUTOPLAY_INTERVAL = 5000 // 5 segundos

export function MetodologiaVisual() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const pilares = METODOLOGIA_ZOPU.pilares
  const activePilar = pilares[activeIndex]
  const isLastPilar = activeIndex === pilares.length - 1

  // Função para parar autoplay
  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
    setLoadingProgress(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  // Animação da barra de progresso
  useEffect(() => {
    if (isAutoPlaying && !isLastPilar) {
      startTimeRef.current = performance.now()

      const animate = (currentTime: number) => {
        if (!startTimeRef.current) return
        const elapsed = currentTime - startTimeRef.current
        const progress = Math.min(elapsed / AUTOPLAY_INTERVAL, 1)
        setLoadingProgress(progress)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    } else {
      setLoadingProgress(0)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isAutoPlaying, activeIndex, isLastPilar])

  // Intervalo para avançar automaticamente
  useEffect(() => {
    if (isAutoPlaying && !isLastPilar) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setActiveIndex((prev) => prev + 1)
        setLoadingProgress(0)
        startTimeRef.current = performance.now()
      }, AUTOPLAY_INTERVAL)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isAutoPlaying, activeIndex, isLastPilar])

  const handleSelect = useCallback((index: number) => {
    stopAutoPlay()
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }, [activeIndex, stopAutoPlay])

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      stopAutoPlay()
      setDirection(-1)
      setActiveIndex(activeIndex - 1)
    }
  }, [activeIndex, stopAutoPlay])

  const handleNext = useCallback(() => {
    if (activeIndex < pilares.length - 1) {
      stopAutoPlay()
      setDirection(1)
      setActiveIndex(activeIndex + 1)
    }
  }, [activeIndex, pilares.length, stopAutoPlay])

  return (
    <section className="py-20 sm:py-32 bg-white overflow-hidden relative">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-brand/3 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-40 right-0 w-64 h-64 bg-amber-500/3 rounded-full translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal>
            <Badge className="mb-4">Nossa metodologia</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-brand">{METODOLOGIA_ZOPU.nome}</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-semibold text-gray-700">
                Os 6 pilares que garantem resultado
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {METODOLOGIA_ZOPU.descricao}
              <br />
              <span className="text-gray-900 font-medium">
                Tudo isso acontece <span className="text-brand font-semibold">ANTES</span> de configurar a ferramenta.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Timeline Navigation */}
        <Reveal delay={0.3}>
          <div className="mb-16 px-4 sm:px-8">
            <PilarTimeline
              pilares={pilares}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              loadingProgress={loadingProgress}
              isAutoPlaying={isAutoPlaying}
            />
          </div>
        </Reveal>

        {/* Content Area - Gradient container */}
        <div className="bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card mb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Visual animado */}
            <Reveal delay={0.4}>
              <PilarVisual pilar={activePilar} index={activeIndex} />
            </Reveal>

            {/* Right: Conteúdo */}
            <div className="order-first lg:order-last">
              <PilarContent pilar={activePilar} index={activeIndex} direction={direction} />
            </div>
          </div>
        </div>

        {/* Navigation buttons (mobile) */}
        <div className="flex items-center justify-center gap-4 lg:hidden mb-12">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              activeIndex === 0
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-brand/10 text-brand hover:bg-brand/20'
            }`}
            aria-label="Pilar anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-500">
            {activeIndex + 1} de {pilares.length}
          </span>
          <button
            onClick={handleNext}
            disabled={activeIndex === pilares.length - 1}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              activeIndex === pilares.length - 1
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-brand/10 text-brand hover:bg-brand/20'
            }`}
            aria-label="Próximo pilar"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer CTA */}
        <Reveal delay={0.5}>
          <motion.div
            className="bg-bg-dark rounded-2xl p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand font-semibold mb-3">O resultado</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Retenção porque o CRM vira rotina
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Retenção anual de {ZOPU_STATS.retencao} com foco em processo, dados e adoção real.
              <span className="text-gray-300"> Reconhecidos pela Bitrix24 como referência em retenção.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/revopslaunch" variant="primary">
                Ver metodologia completa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button href={ZOPU_LINKS.whatsappEspecialista} variant="secondary" external>
                Falar com especialista
              </Button>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  )
}
