'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Question } from '@phosphor-icons/react'

interface FAQ {
  pergunta: string
  resposta: string
}

interface FAQGridProps {
  faqs: readonly FAQ[]
}

export function FAQGrid({ faqs }: FAQGridProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50" id="faq">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <Badge className="mb-4">Tire suas duvidas</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Perguntas frequentes
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-lg text-gray-600">
              Tudo que voce precisa saber sobre o Bitrix24 antes de comecar.
            </p>
          </Reveal>
        </div>

        {/* Grid de FAQs - todas visiveis */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={0.1 + idx * 0.05}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 h-full">
                {/* Pergunta */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <Question size={16} weight="duotone" className="text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                    {faq.pergunta}
                  </h3>
                </div>

                {/* Resposta - sempre visivel */}
                <p className="text-gray-600 leading-relaxed pl-11">
                  {faq.resposta}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
