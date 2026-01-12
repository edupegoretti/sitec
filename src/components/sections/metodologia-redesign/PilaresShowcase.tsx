'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Map, GitBranch, Database, Target, Users, BarChart3 } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { METODOLOGIA_ZOPU } from '@/lib/constants'

interface Pilar {
  id: string
  nome: string
  descricao: string
  descricaoCompleta?: string
  icon: string
  antes?: {
    titulo: string
    descricao: string
  }
  depois?: {
    titulo: string
    descricao: string
  }
  visual?: string
}

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PILAR_ICONS: Record<string, React.ElementType> = {
  Map,
  GitBranch,
  Database,
  Target,
  Users,
  BarChart3,
}

const AUTOPLAY_INTERVAL = 6000

function PilarContent({ pilar, index, Icon }: { pilar: Pilar; index: number; Icon: React.ElementType }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left: Visual */}
      <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
        <div className="absolute inset-0 bg-linear-to-br from-brand to-[#8B5CF6] rounded-3xl overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          {/* Icon display */}
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Icon className="w-32 h-32 text-white/80" strokeWidth={1} />
            </motion.div>
          </div>

          {/* Number badge */}
          <div className="absolute bottom-6 right-6 text-8xl font-bold text-white/10">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Top left icon */}
          <div className="absolute top-6 left-6 w-14 h-14 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/20 rounded-full text-sm font-semibold text-brand mb-6">
          Pilar {String(index + 1).padStart(2, '0')}
        </div>

        <h3 className="text-3xl sm:text-4xl font-bold mb-4">
          {pilar.nome}
        </h3>

        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          {pilar.descricaoCompleta || pilar.descricao}
        </p>

        {/* Before/After cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Before */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-sm font-bold">✕</span>
              </div>
              <span className="text-red-400 font-semibold text-sm uppercase tracking-wide">
                Antes
              </span>
            </div>
            <p className="font-semibold text-white mb-1">
              {pilar.antes?.titulo}
            </p>
            <p className="text-sm text-gray-400">
              {pilar.antes?.descricao}
            </p>
          </div>

          {/* After */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-sm font-bold">✓</span>
              </div>
              <span className="text-green-400 font-semibold text-sm uppercase tracking-wide">
                Depois
              </span>
            </div>
            <p className="font-semibold text-white mb-1">
              {pilar.depois?.titulo}
            </p>
            <p className="text-sm text-gray-400">
              {pilar.depois?.descricao}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PilaresShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const pilares = METODOLOGIA_ZOPU.pilares
  const activePilar = pilares[activeIndex] as Pilar
  const Icon = PILAR_ICONS[activePilar.icon] || Map

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const handlePrev = useCallback(() => {
    stopAutoPlay()
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? pilares.length - 1 : prev - 1))
  }, [pilares.length, stopAutoPlay])

  const handleNext = useCallback(() => {
    stopAutoPlay()
    setDirection(1)
    setActiveIndex((prev) => (prev === pilares.length - 1 ? 0 : prev + 1))
  }, [pilares.length, stopAutoPlay])

  const handleSelect = useCallback((index: number) => {
    stopAutoPlay()
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }, [activeIndex, stopAutoPlay])

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setActiveIndex((prev) => (prev === pilares.length - 1 ? 0 : prev + 1))
      }, AUTOPLAY_INTERVAL)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, pilares.length])

  return (
    <section className="py-20 sm:py-28 bg-bg-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand/10 rounded-full -translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500/10 rounded-full translate-x-1/2 blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <Badge variant="dark" className="mb-4">
              Os 6 Pilares
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              O que entregamos{' '}
              <span className="text-brand">em cada projeto</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Cada pilar resolve um aspecto crítico da sua operação de receita
            </p>
          </Reveal>
        </div>

        {/* Navigation dots */}
        <Reveal delay={0.3}>
          <div className="flex items-center justify-center gap-3 mb-12">
            {pilares.map((pilar, index) => {
              const PilarIcon = PILAR_ICONS[pilar.icon] || Map
              const isActive = index === activeIndex
              return (
                <button
                  key={pilar.id}
                  onClick={() => handleSelect(index)}
                  className={`group relative flex flex-col items-center transition-all duration-300 ${
                    isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-brand shadow-lg shadow-brand/40'
                        : 'bg-white/10 group-hover:bg-white/20'
                    }`}
                  >
                    <PilarIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Main content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: customEase }}
            >
              <PilarContent pilar={activePilar} index={activeIndex} Icon={Icon} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Pilar anterior"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-gray-400 text-sm">
              {activeIndex + 1} / {pilares.length}
            </span>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Próximo pilar"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
