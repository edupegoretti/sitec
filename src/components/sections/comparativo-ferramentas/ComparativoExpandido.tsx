'use client'

import { motion } from 'framer-motion'
import { Check, X, Plus } from 'lucide-react'
import { Reveal, Badge } from '@/components/shared'
import { COMPARATIVO_FEATURES, type FeatureStatus } from '@/lib/comparativoFerramentas'
import { cn } from '@/lib/utils'

interface ComparativoExpandidoProps {
  className?: string
}

function FeatureCell({ value, highlight = false }: { value: FeatureStatus; highlight?: boolean }) {
  const isCheck = value === '✓'
  const isX = value === '✗'
  const isAddon = value === 'Add-on'
  const isBeta = value === 'Beta'

  if (isCheck) {
    const circleBg = highlight ? 'bg-brand/10' : 'bg-green-100'
    const iconColor = highlight ? 'text-brand' : 'text-green-600'
    const strokeWidth = highlight ? 2.75 : 3

    return (
      <div className="flex items-center justify-center">
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full w-8 h-8',
            circleBg
          )}
          aria-label="Incluso no plano"
          title="Incluso no plano"
        >
          <Check className={cn('w-4 h-4', iconColor)} strokeWidth={strokeWidth} />
        </span>
      </div>
    )
  }

  if (isX) {
    return (
      <div className="flex items-center justify-center">
        <span
          className="inline-flex items-center justify-center rounded-full bg-gray-100 w-8 h-8"
          aria-label="Não disponível"
          title="Não disponível"
        >
          <X className="w-4 h-4 text-gray-400" strokeWidth={2.75} />
        </span>
      </div>
    )
  }

  if (isAddon) {
    return (
      <div className="flex items-center justify-center">
        <span
          className="inline-flex items-center gap-1 rounded-full border border-amber-200/70 bg-amber-50 text-xs font-semibold text-amber-700 px-2 py-0.5"
          aria-label="Add-on pago"
          title="Add-on pago"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Add-on
        </span>
      </div>
    )
  }

  if (isBeta) {
    return (
      <div className="flex items-center justify-center">
        <span
          className="inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50 text-xs font-semibold text-blue-700 px-2.5 py-0.5"
          aria-label="Beta"
          title="Em versão beta"
        >
          Beta
        </span>
      </div>
    )
  }

  // Custom text value
  return (
    <div className="flex items-center justify-center">
      <span className="text-xs text-gray-600">{value}</span>
    </div>
  )
}

export function ComparativoExpandido({ className = '' }: ComparativoExpandidoProps) {
  return (
    <div className={className}>
      {/* Desktop Table */}
      <Reveal>
        <div className="hidden lg:block bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">
                Comparação de 15 funcionalidades entre 6 CRMs
              </caption>

              <thead className="bg-gray-50/80 sticky top-0 z-10">
                <tr className="divide-x divide-gray-100">
                  <th
                    scope="col"
                    className="text-left p-4 text-sm font-semibold text-gray-600 min-w-[220px]"
                  >
                    Funcionalidade
                  </th>
                  <th scope="col" className="p-4 text-center min-w-[100px]">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900">HubSpot</p>
                      <p className="text-xs text-gray-500">Professional</p>
                    </div>
                  </th>
                  <th scope="col" className="p-4 text-center min-w-[100px]">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900">Salesforce</p>
                      <p className="text-xs text-gray-500">Professional</p>
                    </div>
                  </th>
                  <th scope="col" className="p-4 text-center min-w-[100px]">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900">Pipedrive</p>
                      <p className="text-xs text-gray-500">Growth</p>
                    </div>
                  </th>
                  <th scope="col" className="p-4 text-center min-w-[100px]">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900">Zoho</p>
                      <p className="text-xs text-gray-500">Professional</p>
                    </div>
                  </th>
                  <th scope="col" className="p-4 text-center min-w-[100px]">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900">RD Station</p>
                      <p className="text-xs text-gray-500">CRM Pro</p>
                    </div>
                  </th>
                  <th scope="col" className="p-4 text-center bg-brand/5 min-w-[120px]">
                    <div className="flex flex-col items-center gap-1">
                      <Badge size="sm" className="mb-1">
                        Melhor escolha
                      </Badge>
                      <p className="text-sm font-bold text-brand">Bitrix24</p>
                      <p className="text-xs text-brand/70">Professional</p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {COMPARATIVO_FEATURES.map((item, index) => (
                  <motion.tr
                    key={item.feature}
                    className={cn(
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30',
                      'divide-x divide-gray-100 hover:bg-gray-50/60 transition-colors duration-300'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <th
                      scope="row"
                      className="text-left p-4 text-sm font-medium text-gray-700"
                    >
                      {item.feature}
                      {item.observacao && (
                        <p className="text-xs text-gray-400 mt-1 font-normal">
                          {item.observacao}
                        </p>
                      )}
                    </th>
                    <td className="p-4">
                      <FeatureCell value={item.hubspot} />
                    </td>
                    <td className="p-4">
                      <FeatureCell value={item.salesforce} />
                    </td>
                    <td className="p-4">
                      <FeatureCell value={item.pipedrive} />
                    </td>
                    <td className="p-4">
                      <FeatureCell value={item.zoho} />
                    </td>
                    <td className="p-4">
                      <FeatureCell value={item.rdstation} />
                    </td>
                    <td className="p-4 bg-brand/5">
                      <FeatureCell value={item.bitrix24} highlight />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Mobile Cards */}
      <Reveal>
        <div className="lg:hidden space-y-4">
          {COMPARATIVO_FEATURES.map((item, index) => (
            <motion.div
              key={item.feature}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-900">{item.feature}</p>
                {item.observacao && (
                  <p className="text-xs text-gray-500 mt-1">{item.observacao}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-2">HubSpot</p>
                  <FeatureCell value={item.hubspot} />
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-2">Salesforce</p>
                  <FeatureCell value={item.salesforce} />
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-2">Pipedrive</p>
                  <FeatureCell value={item.pipedrive} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-2">Zoho</p>
                  <FeatureCell value={item.zoho} />
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-3 text-center">
                  <p className="text-xs text-gray-500 mb-2">RD Station</p>
                  <FeatureCell value={item.rdstation} />
                </div>
                <div className="rounded-xl bg-brand/5 border border-brand/20 p-3 text-center">
                  <p className="text-xs text-brand font-semibold mb-2">Bitrix24</p>
                  <FeatureCell value={item.bitrix24} highlight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>

      {/* Legend */}
      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <FeatureCell value="✓" /> Incluso no plano
          </span>
          <span className="flex items-center gap-2">
            <FeatureCell value="Add-on" /> Add-on pago
          </span>
          <span className="flex items-center gap-2">
            <FeatureCell value="Beta" /> Versão beta
          </span>
          <span className="flex items-center gap-2">
            <FeatureCell value="✗" /> Não disponível
          </span>
        </div>
      </Reveal>

      {/* Disclaimer */}
      <Reveal delay={0.2}>
        <p className="text-center text-xs text-gray-400 mt-4">
          *Dados consultados em dezembro/2025 via sites oficiais: HubSpot, Salesforce,
          Pipedrive, Zoho CRM, RD Station CRM. Base de comparação: Planos
          Professional/Enterprise com recursos equivalentes.
        </p>
      </Reveal>

      {/* Callout sobre Add-ons */}
      <Reveal delay={0.3}>
        <div className="mt-6 p-5 bg-amber-50 border border-amber-200/50 rounded-xl">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">
                Por que alguns estão marcados como "Add-on"?
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                Add-on significa que você paga extra, além da licença base. Por exemplo:
                Salesforce Einstein (IA) custa +$50/usuário/mês além dos $100 já cobrados pela
                licença Professional. No Bitrix24, tudo que você vê marcado com ✓ está incluso.
                Sem upsells. Sem surpresas.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
