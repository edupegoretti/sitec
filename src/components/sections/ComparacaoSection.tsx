'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Check, X, Minus } from 'lucide-react'

const COMPARATIVO = [
  {
    pergunta: 'Quem garante adoção no dia 30/60/90?',
    projetoTermina: false,
    imersaoAtivacao: false,
    zopu: true,
  },
  {
    pergunta: 'Treina por função (vendedor, gestor, CS)?',
    projetoTermina: false,
    imersaoAtivacao: false,
    zopu: true,
  },
  {
    pergunta: 'Mantém governança e ajusta com crescimento?',
    projetoTermina: false,
    imersaoAtivacao: 'parcial',
    zopu: true,
  },
  {
    pergunta: 'Existe SLA de suporte contratual?',
    projetoTermina: false,
    imersaoAtivacao: false,
    zopu: true,
  },
  {
    pergunta: 'Existe contrato de sustentação?',
    projetoTermina: false,
    imersaoAtivacao: false,
    zopu: true,
  },
  {
    pergunta: 'Mapeia processo antes de configurar?',
    projetoTermina: false,
    imersaoAtivacao: false,
    zopu: true,
  },
] as const

function StatusIcon({ status }: { status: boolean | 'parcial' }) {
  if (status === true) {
    return (
      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <Check className="w-4 h-4 text-emerald-600" />
      </div>
    )
  }
  if (status === 'parcial') {
    return (
      <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
        <Minus className="w-4 h-4 text-amber-600" />
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
      <X className="w-4 h-4 text-red-500" />
    </div>
  )
}

export function ComparacaoSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">Comparativo</Badge>
            </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Ativação rápida é fácil.{' '}
                <span className="text-brand">Sustentar rotina e dados confiáveis é raro.</span>
            </h2>
          </Reveal>
        </div>

          {/* Tabela comparativa - Desktop */}
          <Reveal delay={0.2}>
            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
                <div className="p-4 font-semibold text-gray-700 text-sm">Critério</div>
                <div className="p-4 text-center font-semibold text-gray-500 text-sm border-l border-gray-200">
                  Projeto que termina no go-live
                </div>
                <div className="p-4 text-center font-semibold text-gray-500 text-sm border-l border-gray-200">
                  Imersão 3 dias (ativação)
                </div>
                <div className="p-4 text-center font-semibold text-brand text-sm border-l border-brand/20 bg-brand/5">
                  Governança de Receita (Zopu)
                </div>
              </div>

              {/* Rows */}
              {COMPARATIVO.map((item, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 ${index !== COMPARATIVO.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50/50 transition-colors`}
                >
                  <div className="p-4 text-sm text-gray-700">{item.pergunta}</div>
                  <div className="p-4 flex justify-center items-center border-l border-gray-100">
                    <StatusIcon status={item.projetoTermina} />
                  </div>
                  <div className="p-4 flex justify-center items-center border-l border-gray-100">
                    <StatusIcon status={item.imersaoAtivacao} />
                  </div>
                  <div className="p-4 flex justify-center items-center border-l border-brand/10 bg-brand/5">
                    <StatusIcon status={item.zopu} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tabela comparativa - Mobile (cards) */}
          <Reveal delay={0.2}>
            <div className="md:hidden space-y-4">
              {COMPARATIVO.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <p className="font-medium text-gray-900 mb-4 text-sm">{item.pergunta}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <StatusIcon status={item.projetoTermina} />
                      <p className="text-[10px] text-gray-500 mt-1">Projeto padrão</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-50">
                      <StatusIcon status={item.imersaoAtivacao} />
                      <p className="text-[10px] text-gray-500 mt-1">Imersão 3 dias</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-brand/5">
                      <StatusIcon status={item.zopu} />
                      <p className="text-[10px] text-brand font-medium mt-1">Zopu</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Bottom message */}
          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <p className="text-gray-500 text-sm">
                A diferença não é só velocidade de ativação. É{' '}
                <span className="font-medium text-gray-700">rotina e dados confiáveis.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
