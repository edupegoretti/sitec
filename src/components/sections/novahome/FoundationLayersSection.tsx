'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Compass, Users, Shield, Rocket } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { FoundationSVG } from './FoundationSVG'

// Dados dos 4 pilares
const PILARES = [
  {
    icon: Compass,
    titulo: 'Processo antes de sistema',
    descricao:
      'Mapeamos seu funil, critérios de qualificação e handoffs antes de tocar no Bitrix24. Tecnologia sem processo é só custo.',
    destaque: 'Diagnóstico de 2 semanas',
  },
  {
    icon: Users,
    titulo: 'Adoção por função',
    descricao:
      'Cada pessoa aprende o que precisa para o dia a dia dela. Vendedor não faz curso de admin. Gestor não aprende a cadastrar produto.',
    destaque: 'Trilhas Fluidz por papel',
  },
  {
    icon: Shield,
    titulo: 'Sustentação contínua',
    descricao:
      'CRM não é projeto com data de fim. É infraestrutura. Por isso existe contrato de manutenção, SLA de suporte e revisões trimestrais.',
    destaque: 'Contrato de sustentação',
  },
  {
    icon: Rocket,
    titulo: 'Evolução com o negócio',
    descricao:
      'Time cresceu? Processo mudou? Lançou produto novo? O CRM acompanha. Sem retrabalho, sem começar do zero.',
    destaque: 'Governança evolutiva',
  },
] as const

export function FoundationLayersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [activeStep, setActiveStep] = useState(0)
  const activeStepRef = useRef(0)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Detecta se a seção está visível
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    activeStepRef.current = activeStep
  }, [activeStep])

  // Scroll-driven active step (premium scrollytelling feel)
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[]
    if (cards.length === 0) return

    const ratios = new Map<number, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index)
          ratios.set(index, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let bestIndex = activeStepRef.current
        let bestRatio = ratios.get(bestIndex) ?? 0

        ratios.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = index
          }
        })

        if (bestRatio >= 0.25 && bestIndex !== activeStepRef.current) {
          setActiveStep(bestIndex)
        }
      },
      {
        threshold: [0, 0.25, 0.4, 0.6, 0.8, 1],
        rootMargin: '-25% 0px -55% 0px',
      }
    )

    cards.forEach((card, index) => {
      card.dataset.index = String(index)
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/3 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">Arquitetura de Receita</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Não é só implementar CRM.{' '}
                <span className="text-brand">
                  É construir a base que sustenta crescimento.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Arquitetura de Receita é a estrutura que conecta processo,
                tecnologia e pessoas para que a operação comercial funcione —
                hoje e quando o negócio escalar.
              </p>
            </Reveal>
          </div>

          {/* Layout: Cards à esquerda, SVG à direita */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Coluna de Cards */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              {PILARES.map((pilar, index) => {
                const Icon = pilar.icon
                const isActive = index === activeStep

                return (
                  <motion.button
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el
                    }}
                    type="button"
                    initial={
                      prefersReducedMotion ? undefined : { opacity: 0, x: -20 }
                    }
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : isInView
                          ? { opacity: 1, x: 0 }
                          : {}
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={[
                      'pilar-card group w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                      isActive
                        ? 'bg-white border-brand/35 shadow-lg'
                        : 'bg-gray-50 border-gray-200 hover:border-brand/30 hover:bg-white hover:shadow-lg',
                    ].join(' ')}
                    aria-pressed={isActive}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onFocus={() => setHoveredStep(index)}
                    onBlur={() => setHoveredStep(null)}
                    onClick={() => {
                      setActiveStep(index)
                      cardRefs.current[index]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      })
                    }}
                  >
                    {/* Icon + Title */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand/15 transition-colors">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg font-bold text-gray-900">
                            {pilar.titulo}
                          </h3>
                          <span className="text-xs font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {pilar.destaque}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {pilar.descricao}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Coluna do SVG */}
            <motion.div
              className="order-1 lg:order-2 lg:sticky lg:top-24"
              initial={
                prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : isInView
                    ? { opacity: 1, scale: 1 }
                    : {}
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="bg-linear-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <FoundationSVG
                  ref={visualRef}
                  activeLayer={hoveredStep ?? activeStep}
                  visibleLayers={isInView ? activeStep + 1 : 0}
                  showGrowth={isInView && activeStep === PILARES.length - 1}
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom insight */}
          <Reveal delay={0.8}>
            <div className="mt-12 sm:mt-16 text-center">
              <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
                Quando esses quatro pilares estão no lugar, CRM deixa de ser
                &quot;mais um sistema&quot; e vira{' '}
                <span className="font-medium text-gray-700">
                  infraestrutura de receita previsível.
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
