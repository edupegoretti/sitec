'use client'

import { CheckCircle, XCircle } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'

const PARA_QUEM_E = [
  'Já escolheu Bitrix24 (ou está convicto do all-in-one).',
  'Vende/atende pelo WhatsApp e precisa de governança.',
  'Quer pipeline com critérios claros e dados confiáveis.',
  'Tem sponsor executivo e aceita ajustar rotina.',
  'Busca parceiro de longo prazo, não entrega pontual.',
] as const

const PARA_QUEM_NAO_E = [
  'Quer só “configurar e ir embora”.',
  'Busca milagre em 72h sem mexer no processo.',
  'Não tem time-chave disponível para entrevistas e validações.',
  'Quer CRM sem governança (cada um do seu jeito).',
  'Procura apenas o menor preço de licença.',
] as const

export function ParaQuemSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-brand/4 rounded-full -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-red-500/4 rounded-full translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">Fit do projeto</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                A Zopu é para quem quer operação rodando{' '}
                <span className="text-brand">sem virar refém do comercial.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Quem tenta agradar todo mundo vira commodity. Por isso deixamos claro o tipo de
                projeto que dá certo (e o que não dá).
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Para quem é */}
            <Reveal>
              <div className="h-full p-6 sm:p-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-200/60 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Para quem é</h3>
                </div>
                <ul className="space-y-3">
                  {PARA_QUEM_E.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Para quem não é */}
            <Reveal delay={0.1}>
              <div className="h-full p-6 sm:p-8 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200/60 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Para quem não é</h3>
                </div>
                <ul className="space-y-3">
                  {PARA_QUEM_NAO_E.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
