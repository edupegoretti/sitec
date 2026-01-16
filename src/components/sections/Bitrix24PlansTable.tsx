'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Users, HardDrive, Sparkles } from 'lucide-react'
import { BITRIX24_PLANOS, ZOPU_LINKS } from '@/lib/constants'
import { Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'

type Plano = (typeof BITRIX24_PLANOS)[number]
type BillingCycle = 'monthly' | 'annual'

interface Bitrix24PlansTableProps {
  plans?: readonly Plano[]
}

// Componente do Toggle de Billing
function BillingToggle({
  value,
  onChange,
}: {
  value: BillingCycle
  onChange: (value: BillingCycle) => void
}) {
  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <div className="relative flex items-center p-1 bg-gray-100 rounded-full">
        {/* Background animado */}
        <motion.div
          className="absolute h-[calc(100%-8px)] bg-white rounded-full shadow-md"
          initial={false}
          animate={{
            x: value === 'monthly' ? 4 : 'calc(100% + 4px)',
            width: value === 'monthly' ? 'calc(50% - 8px)' : 'calc(50% - 8px)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />

        <button
          onClick={() => onChange('monthly')}
          className={cn(
            'relative z-10 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200',
            value === 'monthly' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          Mensal
        </button>
        <button
          onClick={() => onChange('annual')}
          className={cn(
            'relative z-10 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 flex items-center gap-2',
            value === 'annual' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          )}
        >
          Anual
          <span
            className={cn(
              'px-2 py-0.5 text-xs font-bold rounded-full transition-colors duration-200',
              value === 'annual'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700'
            )}
          >
            -20%
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {value === 'annual' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-green-600 font-medium"
          >
            Economize 20% pagando anualmente
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// Função para formatar preço
function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export function Bitrix24PlansTable({ plans = BITRIX24_PLANOS }: Bitrix24PlansTableProps) {
  const [billing, setBilling] = useState<BillingCycle>('annual')

  return (
    <div className="space-y-8">
      {/* Toggle de Billing */}
      <Reveal>
        <BillingToggle value={billing} onChange={setBilling} />
      </Reveal>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plano, index) => {
          const currentPrice = billing === 'annual' ? plano.precoAnual : plano.precoMensal
          const monthlyPrice = plano.precoMensal
          const savings = monthlyPrice - plano.precoAnual

          return (
            <Reveal key={plano.id} delay={0.1 * index}>
              <div
                className={cn(
                  'relative rounded-2xl border bg-white overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1',
                  plano.destaque
                    ? 'border-brand shadow-lg shadow-brand/10'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-card-hover'
                )}
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
                  className={cn(
                    'p-6',
                    plano.destaque ? 'bg-brand text-white' : 'bg-gray-50'
                  )}
                >
                  <h3
                    className={cn(
                      'text-2xl font-bold',
                      plano.destaque ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {plano.nome}
                  </h3>
                  <p
                    className={cn(
                      'mt-1 text-sm',
                      plano.destaque ? 'text-white/80' : 'text-gray-600'
                    )}
                  >
                    {plano.para}
                  </p>
                </div>

                {/* Preço */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${plano.id}-${billing}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-bold text-gray-900"
                      >
                        {formatPrice(currentPrice)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-gray-500">/mês</span>
                  </div>

                  {/* Economia no plano anual */}
                  <AnimatePresence mode="wait">
                    {billing === 'annual' ? (
                      <motion.div
                        key="annual-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 flex items-center gap-2"
                      >
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(monthlyPrice)}
                        </span>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          Economia de {formatPrice(savings)}/mês
                        </span>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="monthly-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-sm text-gray-500"
                      >
                        ou {formatPrice(plano.precoAnual)}/mês no anual
                      </motion.p>
                    )}
                  </AnimatePresence>
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
                    className={cn(
                      'block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all',
                      plano.destaque
                        ? 'bg-brand text-white hover:bg-brand-hover shadow-lg shadow-brand/20'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    )}
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          )
        })}
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
