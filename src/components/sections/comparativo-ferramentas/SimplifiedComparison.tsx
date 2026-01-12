'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/shared'

interface Feature {
  name: string
  bitrix24: boolean | string
  others: boolean | string
  highlight?: boolean
}

interface Category {
  id: string
  name: string
  icon: string
  features: Feature[]
}

const CATEGORIES: Category[] = [
  {
    id: 'crm',
    name: 'CRM & Vendas',
    icon: '📊',
    features: [
      { name: 'Pipeline visual com automações', bitrix24: true, others: 'HubSpot/Salesforce' },
      { name: 'Cotações e propostas', bitrix24: true, others: 'PandaDoc separado' },
      { name: 'Telefonia VoIP integrada', bitrix24: true, others: 'Aircall/RingCentral separado' },
      { name: 'Email marketing', bitrix24: true, others: 'Mailchimp separado' },
      { name: 'Relatórios personalizados', bitrix24: true, others: true, highlight: true },
    ],
  },
  {
    id: 'collaboration',
    name: 'Colaboração',
    icon: '💬',
    features: [
      { name: 'Chat em tempo real', bitrix24: true, others: 'Slack separado' },
      { name: 'Videoconferência HD', bitrix24: true, others: 'Zoom/Meet separado' },
      { name: 'Feed de atividades', bitrix24: true, others: false },
      { name: 'Calendário compartilhado', bitrix24: true, others: 'Google Calendar' },
    ],
  },
  {
    id: 'projects',
    name: 'Gestão de Projetos',
    icon: '✅',
    features: [
      { name: 'Tarefas e kanban', bitrix24: true, others: 'Asana/Monday separado' },
      { name: 'Gantt e dependências', bitrix24: true, others: 'Asana pago separado' },
      { name: 'Timesheet integrado', bitrix24: true, others: 'Toggl separado' },
      { name: 'Templates de projetos', bitrix24: true, others: true, highlight: true },
    ],
  },
  {
    id: 'automation',
    name: 'Automação & IA',
    icon: '🤖',
    features: [
      { name: 'Automação sem código', bitrix24: true, others: 'Zapier/Make separado' },
      { name: 'IA para resumos e insights', bitrix24: true, others: 'OpenAI API separado' },
      { name: 'Chatbots personalizados', bitrix24: true, others: 'ManyChat separado' },
      { name: 'RPA (robôs)', bitrix24: true, others: false, highlight: true },
    ],
  },
  {
    id: 'data',
    name: 'Dados & Storage',
    icon: '💾',
    features: [
      { name: 'Armazenamento 1TB+', bitrix24: true, others: 'Dropbox/GDrive separado' },
      { name: 'Dados centralizados', bitrix24: true, others: false },
      { name: 'Backup automático', bitrix24: true, others: 'Backups manuais' },
      { name: 'Versionamento de arquivos', bitrix24: true, others: true },
    ],
  },
]

export function SimplifiedComparison() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('crm')

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId))
  }

  const renderValue = (value: boolean | string, isBitrix24: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center justify-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            isBitrix24 ? 'bg-brand/10' : 'bg-green-100'
          }`}>
            <Check className={`w-4 h-4 ${isBitrix24 ? 'text-brand' : 'text-green-600'}`} strokeWidth={3} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
            <X className="w-4 h-4 text-red-600" strokeWidth={3} />
          </div>
        </div>
      )
    }
    return (
      <div className="text-xs text-center text-gray-600 leading-tight px-2">
        {value}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Reveal>
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200/80 shadow-card overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 bg-gray-100 border-b-2 border-gray-200">
            <div className="text-sm font-semibold text-gray-700">Categoria</div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white text-sm font-bold rounded-full shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>Bitrix24</span>
              </div>
            </div>
            <div className="text-center text-sm font-semibold text-gray-700">
              Stack Fragmentado
            </div>
          </div>

          {/* Categories */}
          <div className="divide-y divide-gray-200">
            {CATEGORIES.map((category, index) => {
              const isExpanded = expandedCategory === category.id
              const allBitrix24 = category.features.every((f) => f.bitrix24 === true)

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Category Header - Clickable */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full grid grid-cols-3 gap-4 p-4 sm:p-6 hover:bg-gray-50 transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-brand transition-colors">
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {category.features.length} recursos
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      {allBitrix24 && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          <span>Tudo incluso</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end">
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 group-hover:text-brand transition-all duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Features - Expandable */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gray-50/50 px-4 sm:px-6 pb-4">
                          {category.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.05 }}
                              className={`grid grid-cols-3 gap-4 py-3 border-b border-gray-200/50 last:border-0 ${
                                feature.highlight ? 'bg-brand/5 -mx-4 sm:-mx-6 px-4 sm:px-6' : ''
                              }`}
                            >
                              <div className="flex items-center">
                                <span className="text-sm text-gray-700">{feature.name}</span>
                              </div>
                              <div className="flex items-center justify-center">
                                {renderValue(feature.bitrix24, true)}
                              </div>
                              <div className="flex items-center justify-center">
                                {renderValue(feature.others, false)}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Footer Summary */}
          <div className="bg-gradient-to-r from-brand/10 to-purple-50 p-6 border-t-2 border-brand/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  Resultado da comparação
                </div>
                <div className="text-xs text-gray-600">
                  Bitrix24: 1 plataforma, tudo integrado • Stack fragmentado: 5+ ferramentas, integrações quebradas
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-brand text-white text-sm font-semibold rounded-xl shadow-md">
                <Sparkles className="w-4 h-4" />
                <span>Bitrix24 vence</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
