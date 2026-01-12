'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Clock } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

// WhatsApp personalizado para página PME
const WHATSAPP_PME = 'https://wa.me/554733079280?text=Ol%C3%A1%2C%20vim%20da%20p%C3%A1gina%20Bitrix24%20para%20PMEs%20e%20gostaria%20de%20falar%20com%20um%20especialista.'

export function PMEHero() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-brand/5 to-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Coluna de texto */}
          <div className="max-w-xl">
            <Reveal>
              <Badge className="mb-6">Para empresas de 5 a 50 usuários</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                CRM que funciona.
                <br />
                <span className="text-brand">Em menos de 30 dias.</span>
                <sup className="text-brand/60 text-lg sm:text-xl align-super">*</sup>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-600 mb-4">
                Se você já tentou CRM antes e não funcionou, você não está sozinho.
                {' '}{ZOPU_STATS.taxaFalha} das implementações falham — e a culpa não é sua.
              </p>
              <p className="text-lg sm:text-xl text-gray-900 font-medium mb-8">
                É da abordagem — e a Zopu faz diferente.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <a
                  href={WHATSAPP_PME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:-translate-y-1"
                >
                  Falar com especialista
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-gray-500">
                <span className="text-gray-400">*</span> Com metodologia testada e validada em {ZOPU_STATS.clientes} clientes
              </p>
            </Reveal>
          </div>

          {/* Coluna da imagem */}
          <Reveal direction="right" delay={0.2}>
            <div className="relative lg:order-last order-first">
              <div className="relative lg:-mr-8 xl:-mr-16">
                <Image
                  src="/images/bitrix24screen/bitrix24pme.png"
                  alt="Bitrix24 para PMEs - CRM simples e eficiente"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto"
                />
                {/* Badges flutuantes */}
                <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100">
                  <Clock size={20} weight="duotone" className="text-brand" />
                  <span className="text-sm font-semibold text-gray-900">30 dias</span>
                </div>
                <div className="absolute -top-4 -right-4 sm:top-4 sm:right-4 flex items-center gap-2 bg-green-500 rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-semibold text-white">{ZOPU_STATS.retencao} retenção</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
