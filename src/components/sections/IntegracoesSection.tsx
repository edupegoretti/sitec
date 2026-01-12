'use client'

import { MessageCircle, Check } from 'lucide-react'
import { Container } from '@/components/layout'
import { SectionHeader, Reveal } from '@/components/shared'
import { INTEGRACOES_DESTAQUE, WHATSZOPU } from '@/lib/constants'

export function IntegracoesSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <SectionHeader
          label="Conectividade"
          title="100+ integrações prontas"
          description="Conectamos Bitrix24 com as ferramentas que você já usa"
        />

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-12">
          {INTEGRACOES_DESTAQUE.map((integracao) => (
            <Reveal key={integracao}>
              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-200/80 hover:border-brand/30 transition-all duration-300 ease-out-expo">
                <span className="text-sm font-medium text-gray-700">
                  {integracao}
                </span>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="flex items-center justify-center p-4 bg-brand/10 rounded-xl">
              <span className="text-sm font-medium text-brand">
                +90 outras
              </span>
            </div>
          </Reveal>
        </div>

        {/* WhatsZopu em destaque */}
        <Reveal delay={0.2}>
          <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {WHATSZOPU.nome}
                </h3>
                <p className="text-gray-600 mb-4">
                  {WHATSZOPU.descricao}. Desenvolvemos internamente porque as
                  opções do mercado não eram confiáveis.
                </p>
                <div className="flex flex-wrap gap-4">
                  {WHATSZOPU.diferenciais.map((d) => (
                    <div key={d} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
