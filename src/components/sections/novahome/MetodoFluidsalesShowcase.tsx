'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Button, Reveal } from '@/components/shared'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import { PilarTimelineCustom, PilarVisualCustom, PilarContentCustom } from './PilarComponents'

const AUTOPLAY_INTERVAL = 5000

/**
 * Pilares adaptados para a narrativa de Arquitetura de Receita
 * Mantém os IDs originais para reutilizar as visualizações SVG
 */
const PILARES_ARQUITETURA = [
  {
    id: 'journey',
    nome: 'Mapa da Jornada',
    descricao: 'Mapeamento de como o cliente passa pelo negócio',
    descricaoCompleta:
      'Antes de qualquer configuração, mapeamos toda a jornada do seu cliente — desde o primeiro contato até a recompra. Isso garante que o Bitrix24 reflita a realidade do seu negócio, não um template genérico.',
    icon: 'Map',
    antes: {
      titulo: 'Sem Arquitetura',
      descricao: 'Jornada invisível. Você não sabe onde perde cliente.',
    },
    depois: {
      titulo: 'Com Arquitetura de Receita',
      descricao: 'Cada touchpoint rastreado. Gargalos identificados automaticamente.',
    },
    visual: 'journey-map',
  },
  {
    id: 'processos',
    nome: 'Funil com Critérios',
    descricao: 'Pipeline com critérios de passagem claros',
    descricaoCompleta:
      'Documentamos critérios de passagem entre etapas ANTES de configurar. Cada fase tem definição de entrada, saída e tempo máximo. Isso elimina o "depende" e cria previsibilidade real.',
    icon: 'GitBranch',
    antes: {
      titulo: 'Sem Arquitetura',
      descricao: 'Cada vendedor faz do seu jeito. Funil é só visual.',
    },
    depois: {
      titulo: 'Com Arquitetura de Receita',
      descricao: 'Pipeline estruturado com SLAs, regras de handoff e automações.',
    },
    visual: 'process-flow',
  },
  {
    id: 'dados',
    nome: 'Dados Confiáveis',
    descricao: 'Base limpa e validações automáticas',
    descricaoCompleta:
      'Limpamos, padronizamos e criamos regras para manter assim. Dados confiáveis que a liderança pode usar para tomar decisões estratégicas — não métricas de vaidade.',
    icon: 'Database',
    antes: {
      titulo: 'Sem Arquitetura',
      descricao: 'Base suja, duplicidades, campos vazios. Dashboard mente.',
    },
    depois: {
      titulo: 'Com Arquitetura de Receita',
      descricao: 'Dados higienizados com validações automáticas. Forecast confiável.',
    },
    visual: 'data-org',
  },
  {
    id: 'icp',
    nome: 'Qualificação Clara',
    descricao: 'Critérios objetivos de qualificação',
    descricaoCompleta:
      'Definimos critérios objetivos de qualificação. Lead scoring baseado em dados reais, não em achismo. Sua equipe sabe exatamente quem priorizar — e a IA sabe quem ignorar.',
    icon: 'Target',
    antes: {
      titulo: 'Sem Arquitetura',
      descricao: 'Qualificação subjetiva. Tempo perdido com leads frios.',
    },
    depois: {
      titulo: 'Com Arquitetura de Receita',
      descricao: 'Score automático. Foco apenas em leads quentes.',
    },
    visual: 'icp-target',
  },
  {
    id: 'adocao',
    nome: 'Adoção por Função',
    descricao: 'Treinamento personalizado via Fluidz',
    descricaoCompleta:
      'Criamos trilhas por função (Fluidz) e rituais de acompanhamento. Vendedor aprende o que vendedor precisa, gestor aprende o que gestor precisa. Não treinamento genérico de 2h.',
    icon: 'Users',
    antes: {
      titulo: 'Sem Arquitetura',
      descricao: 'Treinamento genérico. Time não usa o CRM em 60 dias.',
    },
    depois: {
      titulo: 'Com Arquitetura de Receita',
      descricao: 'Trilhas personalizadas. Certificação via Fluidz. Rotina sustentável.',
    },
    visual: 'adoption-plan',
  },
  {
    id: 'metricas',
    nome: 'Métricas que Importam',
    descricao: 'Dashboards de forecast confiáveis',
    descricaoCompleta:
      'Definimos KPIs antes de começar. Baseline documentado, metas claras, dashboard pronto. Quando você pergunta, o sistema responde — com números que a gestão pode usar.',
    icon: 'BarChart3',
    antes: {
      titulo: 'Sem Arquitetura',
      descricao: 'Sem baseline. Impossível medir ROI ou provar resultado.',
    },
    depois: {
      titulo: 'Com Arquitetura de Receita',
      descricao: 'Dashboard em tempo real. Receita auditável.',
    },
    visual: 'success-metrics',
  },
] as const

export function MetodoFluidsalesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const pilares = PILARES_ARQUITETURA
  const activePilar = pilares[activeIndex]
  const isLastPilar = activeIndex === pilares.length - 1

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
            <Badge className="mb-4">Arquitetura de Receita</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-brand">Fluidsales™</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 font-semibold text-gray-700">
                Os 6 pilares que garantem previsibilidade de receita
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Implementação estratégica focada no seu modelo de negócio — não em configurações genéricas.
            </p>
          </Reveal>
        </div>

        {/* Timeline Navigation */}
        <Reveal delay={0.3}>
          <div className="mb-16 px-4 sm:px-8">
            <PilarTimelineCustom
              pilares={pilares}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              loadingProgress={loadingProgress}
              isAutoPlaying={isAutoPlaying}
            />
          </div>
        </Reveal>

        {/* Content Area */}
        <div className="bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card mb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Visual animado */}
            <Reveal delay={0.4}>
              <PilarVisualCustom pilar={activePilar} index={activeIndex} />
            </Reveal>

            {/* Right: Conteúdo */}
            <div className="order-first lg:order-last">
              <PilarContentCustom pilar={activePilar} index={activeIndex} direction={direction} />
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

      </Container>
    </section>
  )
}
