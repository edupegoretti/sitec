'use client'

import { Check, Users, HardDrive, Sparkles } from 'lucide-react'
import { BITRIX24_PLANOS, ZOPU_LINKS } from '@/lib/constants'
import { Reveal } from '@/components/shared'

type Plano = (typeof BITRIX24_PLANOS)[number]

interface Bitrix24PlansTableProps {
  plans?: readonly Plano[]
}

export function Bitrix24PlansTable({ plans = BITRIX24_PLANOS }: Bitrix24PlansTableProps) {
  return (
    <div className="space-y-8">
      {/* Grid de cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plano, index) => (
          <Reveal key={plano.id} delay={0.1 * index}>
            <div
              className={`relative rounded-2xl border bg-white overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plano.destaque
                  ? 'border-brand shadow-lg shadow-brand/10'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-card-hover'
              }`}
            >
              {/* Badge Mais popular */}
              {plano.destaque && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand text-white text-xs font-semibold rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Mais popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div
                className={`p-6 ${
                  plano.destaque ? 'bg-brand text-white' : 'bg-gray-50'
                }`}
              >
                <h3
                  className={`text-2xl font-bold ${
                    plano.destaque ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plano.nome}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    plano.destaque ? 'text-white/80' : 'text-gray-600'
                  }`}
                >
                  {plano.para}
                </p>
              </div>

              {/* Preço */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {plano.precoMensal}
                  </span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {plano.precoAnual}/mês no plano anual
                </p>
              </div>

              {/* Stats: Usuários e Storage */}
              <div className="grid grid-cols-2 gap-4 p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-brand" />
                    <span className="text-xl font-bold text-gray-900">
                      {plano.usuarios}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">usuários</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <HardDrive className="w-4 h-4 text-brand" />
                    <span className="text-xl font-bold text-gray-900">
                      {plano.storage}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">armazenamento</p>
                </div>
              </div>

              {/* Features */}
              <ul className="p-6 space-y-3 grow">
                {plano.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="p-6 pt-0 mt-auto">
                <a
                  href={ZOPU_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all ${
                    plano.destaque
                      ? 'bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Nota de rodapé */}
      <Reveal delay={0.4}>
        <p className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
          Todos os planos incluem suporte em português. A Zopu oferece implementação
          especializada e 365 dias de suporte contratando a licença conosco.
        </p>
      </Reveal>
    </div>
  )
}
