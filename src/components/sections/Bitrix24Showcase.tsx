'use client'

import { useState, useCallback } from 'react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Sparkle } from '@phosphor-icons/react'
import { BITRIX24_FEATURES_EXPANDED } from '@/lib/constants'
import { FeatureTabs, FeatureContent, FeatureMockup } from './bitrix24-showcase'

export function Bitrix24Showcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const features = BITRIX24_FEATURES_EXPANDED
  const activeFeature = features[activeIndex]

  const handleSelect = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }, [activeIndex])

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Badge className="mb-4">A plataforma</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Bitrix24: CRM, projetos e comunicação.{' '}
              <span className="text-brand">Integrado.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              CRM, projetos, comunicação, automação e IA — em uma única plataforma.
            </p>
          </Reveal>
        </div>

        {/* Tabs de navegação */}
        <Reveal delay={0.3}>
          <FeatureTabs
            features={features}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </Reveal>

        {/* Conteúdo principal */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-10 sm:mt-14">
          {/* Mockup/Screenshot - Mobile: aparece primeiro */}
          <div className="order-1 lg:order-1">
            <Reveal delay={0.4} direction="left">
              <FeatureMockup feature={activeFeature} />
            </Reveal>
          </div>

          {/* Conteúdo - Mobile: aparece segundo */}
          <div className="order-2 lg:order-2">
            <FeatureContent
              feature={activeFeature}
              direction={direction}
            />
          </div>
        </div>

        {/* Quote/Social Proof */}
        <Reveal delay={0.5}>
          <div className="mt-14 sm:mt-20 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              {/* Quote icon */}
              <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-brand" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 italic mb-6 leading-relaxed">
                "O Bitrix24 substituiu Salesforce + Slack + Asana + Zoom para nós.
                Uma única plataforma, completamente unificada."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                  <span className="text-brand font-semibold text-sm">GO</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    Gestor de Operações
                  </p>
                  <p className="text-xs text-gray-500">
                    Empresa de Serviços, São Paulo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Feature highlights - pequenos cards abaixo */}
        <Reveal delay={0.6}>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { numero: '35+', label: 'ferramentas integradas' },
              { numero: '100+', label: 'integrações prontas' },
              { numero: 'R$', label: 'preço fixo em reais' },
              { numero: '99.999%', label: 'disponibilidade' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-5 rounded-2xl bg-white border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1"
              >
                <p className="text-xl sm:text-2xl font-bold text-brand">
                  {item.numero}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Footer micro-text */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Sparkle size={16} weight="duotone" className="text-amber-500" />
            <span className="text-xs text-gray-500">CRM, projetos, comunicação, automação e IA — em uma única plataforma.</span>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
