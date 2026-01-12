'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Badge } from '@/components/shared'
import { TCO_SCENARIOS, calcularEconomia } from '@/lib/comparativoFerramentas'
import { cn } from '@/lib/utils'
import { useCountUp } from '@/hooks/useCountUp'

type Scenario = '10_usuarios' | '30_usuarios' | '50_usuarios'

interface TCOComparisonProps {
  className?: string
}

type TableRow = {
  crm: string
  mensal: number
  anual: number
  obs: string
  highlight?: boolean
}

// Animated price component
function AnimatedPrice({ value, className = '' }: { value: number; className?: string }) {
  const { ref, value: animatedValue } = useCountUp(value, { delay: 100 })

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      }).format(Math.round(animatedValue))}
    </span>
  )
}

const scenarios: { id: Scenario; label: string; context: string }[] = [
  {
    id: '10_usuarios',
    label: '10 Usuários',
    context: 'PME em crescimento. Time de vendas + marketing + projetos.',
  },
  {
    id: '30_usuarios',
    label: '30 Usuários',
    context: 'Empresa mid-market. Múltiplos times usando CRM, Projetos e Comunicação.',
  },
  {
    id: '50_usuarios',
    label: '50 Usuários',
    context: 'Empresa estabelecida. Escala exige plataforma robusta sem explodir orçamento.',
  },
]

export function TCOComparison({ className = '' }: TCOComparisonProps) {
  const [activeScenario, setActiveScenario] = useState<Scenario>('30_usuarios')

  const currentData = TCO_SCENARIOS[activeScenario]
  const currentScenario = scenarios.find((s) => s.id === activeScenario)!
  const usuarios = parseInt(activeScenario.split('_')[0])

  // Calculate economy vs most expensive (Salesforce)
  const economia = calcularEconomia(usuarios, 'salesforce')

  const tableData: TableRow[] = [
    { crm: 'HubSpot Professional', ...currentData.hubspot, obs: 'Base + 7 users adicionais' },
    { crm: 'Salesforce Professional', ...currentData.salesforce, obs: '$150/user × ' + usuarios },
    { crm: 'Pipedrive Growth', ...currentData.pipedrive, obs: 'Com add-ons' },
    { crm: 'Zoho CRM Professional', ...currentData.zoho, obs: 'Com add-ons' },
    { crm: 'RD Station CRM Pro', ...currentData.rdstation, obs: usuarios >= 4 ? '' : 'Mínimo 4 users' },
    { crm: 'Bitrix24 Professional', ...currentData.bitrix24, obs: 'Usuários ilimitados', highlight: true },
  ]

  return (
    <div className={className}>
      {/* Scenario Tabs */}
      <Reveal>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              className={cn(
                'flex-1 px-6 py-4 rounded-xl border-2 transition-all duration-300 text-left',
                activeScenario === scenario.id
                  ? 'border-brand bg-brand/5 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              )}
            >
              <p
                className={cn(
                  'text-lg font-bold mb-1',
                  activeScenario === scenario.id ? 'text-brand' : 'text-gray-900'
                )}
              >
                {scenario.label}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">{scenario.context}</p>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Table Desktop */}
      <Reveal delay={0.1}>
        <div className="hidden lg:block bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-card mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Comparação de TCO para {currentScenario.label}
              </caption>

              <thead className="bg-gray-50/80">
                <tr className="divide-x divide-gray-100">
                  <th scope="col" className="text-left p-4 text-sm font-semibold text-gray-600">
                    CRM
                  </th>
                  <th scope="col" className="text-right p-4 text-sm font-semibold text-gray-600">
                    Mensal (BRL)
                  </th>
                  <th scope="col" className="text-right p-4 text-sm font-semibold text-gray-600">
                    Anual (BRL)
                  </th>
                  <th scope="col" className="text-left p-4 text-sm font-semibold text-gray-600">
                    Observação
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {tableData.map((item, index) => (
                  <motion.tr
                    key={item.crm}
                    className={cn(
                      'divide-x divide-gray-100 transition-colors duration-300',
                      item.highlight
                        ? 'bg-brand/5'
                        : index % 2 === 0
                        ? 'bg-white hover:bg-gray-50/60'
                        : 'bg-gray-50/30 hover:bg-gray-50/60'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <th
                      scope="row"
                      className={cn(
                        'text-left p-4 text-sm font-semibold',
                        item.highlight ? 'text-brand' : 'text-gray-700'
                      )}
                    >
                      {item.crm}
                      {item.highlight && (
                        <Badge size="sm" className="ml-2">
                          Melhor escolha
                        </Badge>
                      )}
                    </th>
                    <td className="text-right p-4 text-sm font-medium text-gray-900">
                      <AnimatedPrice value={item.mensal} />
                    </td>
                    <td className="text-right p-4 text-sm font-bold text-gray-900">
                      <AnimatedPrice value={item.anual} />
                    </td>
                    <td className="text-left p-4 text-xs text-gray-500">{item.obs}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Cards Mobile */}
      <Reveal delay={0.1}>
        <div className="lg:hidden space-y-4 mb-6">
          {tableData.map((item, index) => (
            <motion.div
              key={item.crm}
              className={cn(
                'rounded-2xl border p-5 shadow-sm',
                item.highlight
                  ? 'border-brand bg-brand/5'
                  : 'border-gray-200/80 bg-white'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={cn(
                    'text-base font-bold',
                    item.highlight ? 'text-brand' : 'text-gray-900'
                  )}
                >
                  {item.crm}
                </h3>
                {item.highlight && <Badge size="sm">Melhor escolha</Badge>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Mensal</p>
                  <p className="text-lg font-semibold text-gray-900">
                    <AnimatedPrice value={item.mensal} />
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Anual</p>
                  <p className="text-lg font-bold text-gray-900">
                    <AnimatedPrice value={item.anual} />
                  </p>
                </div>
              </div>

              {item.obs && (
                <p className="text-xs text-gray-500 border-t border-gray-200 pt-3">
                  {item.obs}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Economy Highlight */}
      <Reveal delay={0.2}>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-900 mb-1">
                Economia com Bitrix24 Professional
              </p>
              <p className="text-2xl font-bold text-green-700">
                <AnimatedPrice value={economia.valorAnual} className="text-2xl font-bold text-green-700" />{' '}
                <span className="text-base font-medium">por ano</span>
              </p>
              <p className="text-xs text-green-600 mt-1">
                vs Salesforce Professional ({economia.percentual}% mais barato)
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Disclaimers */}
      <Reveal delay={0.3}>
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200/60">
          <p className="text-xs font-semibold text-gray-700 mb-3">Como calculamos:</p>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5">•</span>
              <span>Preços consultados em dezembro/2025 via sites oficiais</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5">•</span>
              <span>Taxa de conversão: USD $1 = R$ 6,00 (conservadora)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5">•</span>
              <span>
                Incluímos add-ons necessários para equivalência funcional (Einstein, Service
                Cloud, integrações, etc.)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-0.5">•</span>
              <span>
                <strong>Por que Bitrix24 não muda de preço?</strong> Usuários ilimitados. Você
                paga o mesmo se tiver 5 ou 500 usuários.
              </span>
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  )
}
