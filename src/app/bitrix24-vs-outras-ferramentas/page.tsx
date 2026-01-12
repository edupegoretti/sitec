'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal, ContextualCTA } from '@/components/shared'
import {
  InteractiveComparisonHero,
  UnifiedStickySelector,
  DynamicSplitComparison,
  PriceCalculator,
  ComparativoVantagens,
  ComparativoFAQ,
} from '@/components/sections/comparativo-ferramentas'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import { type ToolId } from '@/lib/toolComparisonData'

// Note: metadata moved to layout or use generateMetadata
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata

export default function Bitrix24VsOutrasFerramentasPage() {
  const [selectedTool, setSelectedTool] = useState<ToolId>('hubspot')
  const [activeCategory, setActiveCategory] = useState('crm')
  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const [isSelectorHidden, setIsSelectorHidden] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const comparisonRef = useRef<HTMLElement>(null)
  const calculatorRef = useRef<HTMLElement>(null)

  // Scroll detection - show/hide sticky selector based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom
        setIsStickyVisible(heroBottom < 72) // 72px = header height
      }

      // Hide selector when calculator section is reached
      if (calculatorRef.current) {
        const calculatorTop = calculatorRef.current.getBoundingClientRect().top
        // Hide when calculator section top is near the viewport top (with some offset)
        setIsSelectorHidden(calculatorTop < 150)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-scroll ao selecionar tool
  const handleToolSelect = (tool: ToolId) => {
    setSelectedTool(tool)
    if (comparisonRef.current && !isStickyVisible) {
      comparisonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <main className="pt-20 lg:pt-24">
      {/* =============================================
          SEÇÃO 1: HERO INTERATIVO
          ============================================= */}
      <InteractiveComparisonHero ref={heroRef} />

      {/* =============================================
          UNIFIED STICKY SELECTOR
          ============================================= */}
      <UnifiedStickySelector
        selectedTool={selectedTool}
        onToolSelect={handleToolSelect}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        isSticky={isStickyVisible}
        isHidden={isSelectorHidden}
      />

      {/* =============================================
          SEÇÃO 2: COMPARAÇÃO SPLIT DARK/LIGHT
          ============================================= */}
      <DynamicSplitComparison
        ref={comparisonRef}
        selectedTool={selectedTool}
        activeCategory={activeCategory}
      />

      {/* =============================================
          SEÇÃO 3: CALCULADORA DE ECONOMIA
          ============================================= */}
      <section ref={calculatorRef} id="calculadora" className="py-16 sm:py-24 lg:py-32 bg-white">
        <Container>
          <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
            <Reveal>
              <Badge className="mb-4">Calculadora de Economia</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Quanto você{' '}
                <span className="text-brand">pode economizar por ano</span>?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600">
                Selecione as ferramentas que usa hoje e veja a economia em tempo real
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="max-w-6xl mx-auto">
              <PriceCalculator />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 4: DIFERENCIAIS
          ============================================= */}
      <section id="diferenciais" className="py-16 sm:py-24 lg:py-32 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <Reveal>
              <Badge className="mb-4">Por que Bitrix24</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Vantagens que{' '}
                <span className="text-brand">só uma plataforma única</span>{' '}
                entrega
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600">
                Não é ter mais ferramentas. É ter ferramentas que conversam entre si.
              </p>
            </Reveal>
          </div>

          <ComparativoVantagens />

          <div className="mt-12">
            <ContextualCTA
              context="Talvez você esteja se perguntando: 'Mas meu time vai realmente usar isso?'"
              ctaText="Ver perguntas frequentes"
              href="#faq"
              variant="subtle"
              theme="light"
            />
          </div>
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 5: FAQ
          ============================================= */}
      <section id="faq" className="py-16 sm:py-24 lg:py-32 bg-gray-50/50">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <Reveal>
              <Badge className="mb-4">Perguntas Frequentes</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Dúvidas comuns{' '}
                <span className="text-brand">sobre migração e adoção</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600">
                Não é sobre funcionalidades. É sobre se seu time vai realmente usar.
              </p>
            </Reveal>
          </div>

          <ComparativoFAQ />

          <div className="mt-12">
            <ContextualCTA
              context="Viu os números. Entendeu as vantagens. Tirou suas dúvidas."
              ctaText="Agendar diagnóstico gratuito"
              href="#cta-final"
              variant="prominent"
              theme="brand"
            />
          </div>
        </Container>
      </section>

      {/* =============================================
          SEÇÃO 6: CTA FINAL
          ============================================= */}
      <section id="cta-final" className="py-16 sm:py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <Container>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Pronto para centralizar dados{' '}
                <span className="text-brand">e alinhar times?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-xl text-gray-300 mb-10">
                Diagnóstico gratuito de 20 minutos.
                <br />
                Avaliamos se Bitrix24 + Zopu é o encaixe certo para sua operação.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 ease-out-expo shadow-elevated hover:shadow-elevated-hover hover:-translate-y-1"
                >
                  Agendar diagnóstico gratuito
                  <ArrowRight weight="duotone" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-out-expo" />
                </a>
                <a
                  href={ZOPU_LINKS.testeGratis}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Teste grátis Bitrix24 15 dias
                </a>
              </div>
            </Reveal>

            {/* Trust indicators - Evidências Zopu */}
            <Reveal delay={0.3}>
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-400">
                <span className="flex flex-col items-center gap-1 text-center">
                  <Check weight="duotone" className="w-4 h-4 text-green-400 mb-1" />
                  <strong className="text-white text-base">Gold Partner</strong>
                  <span className="text-xs">Bitrix24</span>
                </span>
                <span className="flex flex-col items-center gap-1 text-center">
                  <Check weight="duotone" className="w-4 h-4 text-green-400 mb-1" />
                  <strong className="text-white text-base">{ZOPU_STATS.retencao}</strong>
                  <span className="text-xs">Retenção anual</span>
                </span>
                <span className="flex flex-col items-center gap-1 text-center">
                  <Check weight="duotone" className="w-4 h-4 text-green-400 mb-1" />
                  <strong className="text-white text-base">{ZOPU_STATS.clientes}</strong>
                  <span className="text-xs">Clientes ativos</span>
                </span>
                <span className="flex flex-col items-center gap-1 text-center">
                  <Check weight="duotone" className="w-4 h-4 text-green-400 mb-1" />
                  <strong className="text-white text-base">SLA &lt;5min</strong>
                  <span className="text-xs">Primeira resposta</span>
                </span>
                <span className="flex flex-col items-center gap-1 text-center col-span-2 md:col-span-3 lg:col-span-1">
                  <Check weight="duotone" className="w-4 h-4 text-green-400 mb-1" />
                  <strong className="text-white text-base">9.500+</strong>
                  <span className="text-xs">Certificados Fluidz</span>
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  )
}
