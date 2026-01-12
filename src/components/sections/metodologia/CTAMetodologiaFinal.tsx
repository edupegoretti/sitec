'use client'

import { ArrowRight, Check } from 'lucide-react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { GROWTH_ARCHITECTURE_CTAS, ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'

export function CTAMetodologiaFinal() {
  const { principal } = GROWTH_ARCHITECTURE_CTAS

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-brand/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-green-500/3 rounded-full -translate-x-1/2 blur-3xl" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {principal.headline}
            </h2>
          </Reveal>

          {/* Subheadline */}
          <Reveal delay={0.1}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {principal.subheadline}
            </p>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                `${ZOPU_STATS.clientes} clientes ativos`,
                `${ZOPU_STATS.retencao} retenção anual`,
                'Gold Partner Bitrix24',
              ].map((item, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full"
                >
                  <Check size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold text-base rounded-2xl hover:bg-brand-hover transition-all duration-300 ease-out-expo shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                <WhatsappLogo size={20} weight="fill" />
                Falar com especialista
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/crm-express"
                className="inline-flex items-center gap-2 px-6 py-4 text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Ver CRM Express
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          {/* Response time */}
          <Reveal delay={0.4}>
            <p className="mt-8 text-sm text-gray-500">
              Resposta em até 24 horas úteis. Sem compromisso.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
