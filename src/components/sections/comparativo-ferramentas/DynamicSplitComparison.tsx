'use client'

import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { TOOLS, COMPARISON_DATA, type ToolId } from '@/lib/toolComparisonData'

interface DynamicSplitComparisonProps {
  selectedTool: ToolId
  activeCategory: string
}

export const DynamicSplitComparison = forwardRef<HTMLElement, DynamicSplitComparisonProps>(
  ({ selectedTool, activeCategory }, ref) => {
    const selectedToolData = TOOLS[selectedTool]
    const categoryData = COMPARISON_DATA.find((cat) => cat.id === activeCategory)
    const [expandedFeature, setExpandedFeature] = useState<number | null>(null)
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

    if (!categoryData) return null

    // Calculate summary counts
    const bitrix24Count = categoryData.features.filter(f => f.bitrix24.available && f.bitrix24.included).length
    const competitorAvailable = categoryData.features.filter(f => f.competitors[selectedTool].available).length
    const competitorIncluded = categoryData.features.filter(f => f.competitors[selectedTool].included).length
    const competitorPaid = competitorAvailable - competitorIncluded
    const totalFeatures = categoryData.features.length

    return (
      <section ref={ref} className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Contextual */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Bitrix24 vs <span className="text-brand">{selectedToolData.name}</span>
            </h2>
            <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
              <categoryData.icon weight="duotone" className="w-6 h-6 text-brand" />
              <span>{categoryData.name} • {totalFeatures} recursos comparados</span>
            </p>
          </div>

          {/* Summary Preview */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bitrix24</p>
                <p className="text-2xl font-bold text-green-600">
                  {bitrix24Count}/{totalFeatures}
                </p>
                <p className="text-xs text-gray-500">recursos incluídos</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{selectedToolData.name}</p>
                <p className="text-2xl font-bold text-red-600">
                  {competitorIncluded}/{totalFeatures}
                </p>
                <p className="text-xs text-gray-500">
                  incluídos • {competitorPaid} pagos • {totalFeatures - competitorAvailable} indisponíveis
                </p>
              </div>
            </div>
          </div>

        {/* Split Comparison Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-elevated"
          >
            {/* LEFT: Bitrix24 (Always WIN - Light) */}
            <div className="bg-white p-8 lg:p-12 border-r-4 border-green-500 relative">
              {/* Green stripe indicator */}
              <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />

              <div className="flex items-center gap-3 mb-10 pt-2">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Check weight="duotone" className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-green-700 uppercase tracking-wider font-semibold">
                    Bitrix24 Professional
                  </p>
                  <p className="text-2xl font-bold text-gray-900">Tudo incluído</p>
                </div>
              </div>

              {/* Features List - Compact with Expand */}
              <ul className="space-y-2">
                {categoryData.features.map((feature, idx) => {
                  const isExpanded = expandedFeature === idx || hoveredFeature === idx
                  const isHighlighted = hoveredFeature === idx

                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onMouseEnter={() => setHoveredFeature(idx)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={() => setExpandedFeature(expandedFeature === idx ? null : idx)}
                      className={`
                        group cursor-pointer rounded-lg px-3 py-2 transition-all duration-200
                        ${isHighlighted ? 'bg-green-50 shadow-sm' : 'hover:bg-gray-50'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Check
                          weight="duotone"
                          className="w-5 h-5 text-green-600 shrink-0"
                        />
                        <p className="font-semibold text-gray-900 text-sm">
                          {feature.name}
                        </p>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pl-8">
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.description}
                              </p>
                              {feature.bitrix24.note && (
                                <p className="text-xs text-green-700 mt-2 bg-green-100 inline-block px-2 py-1 rounded">
                                  ✓ {feature.bitrix24.note}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Pricing */}
              <div className="mt-10 pt-8 border-t-2 border-gray-200">
                <p className="text-4xl font-bold text-brand">
                  R$ 1.119
                  <span className="text-lg text-gray-500 font-normal">/mês</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Usuários ilimitados • Sem add-ons • Preço fixo
                </p>
              </div>
            </div>

            {/* RIGHT: Selected Tool (LOSE - Dark) */}
            <div className="bg-bg-dark p-8 lg:p-12 relative">
              {/* Red stripe indicator */}
              <div className="absolute top-0 right-0 w-full h-2 bg-red-500" />

              <div className="flex items-center gap-3 mb-10 pt-2">
                <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <X weight="duotone" className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-red-400 uppercase tracking-wider font-semibold">
                    {selectedToolData.name}
                  </p>
                  <p className="text-2xl font-bold text-white">Stack fragmentado</p>
                </div>
              </div>

              {/* Features List - Compact with Expand */}
              <ul className="space-y-2">
                {categoryData.features.map((feature, idx) => {
                  const competitorFeature = feature.competitors[selectedTool]
                  const isAvailable = competitorFeature.available
                  const isIncluded = competitorFeature.included
                  const isExpanded = expandedFeature === idx || hoveredFeature === idx
                  const isHighlighted = hoveredFeature === idx

                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onMouseEnter={() => setHoveredFeature(idx)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      onClick={() => setExpandedFeature(expandedFeature === idx ? null : idx)}
                      className={`
                        group cursor-pointer rounded-lg px-3 py-2 transition-all duration-200
                        ${isHighlighted ? 'bg-white/10 shadow-sm' : 'hover:bg-white/5'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {isAvailable ? (
                          isIncluded ? (
                            <Check
                              weight="duotone"
                              className="w-5 h-5 text-gray-400 shrink-0"
                            />
                          ) : (
                            <div className="w-5 h-5 shrink-0 bg-yellow-500/20 rounded-md flex items-center justify-center">
                              <span className="text-yellow-400 text-xs font-bold">$</span>
                            </div>
                          )
                        ) : (
                          <X
                            weight="duotone"
                            className="w-5 h-5 text-red-400 shrink-0"
                          />
                        )}
                        <p
                          className={`font-semibold text-sm ${
                            isAvailable && isIncluded ? 'text-white/70' : 'text-white'
                          }`}
                        >
                          {feature.name}
                        </p>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pl-8">
                              {!isAvailable && (
                                <p className="text-sm text-red-400 leading-relaxed">
                                  {competitorFeature.addon || 'Não disponível'}
                                </p>
                              )}
                              {isAvailable && !isIncluded && competitorFeature.addon && (
                                <p className="text-sm text-yellow-400 font-medium leading-relaxed">
                                  Adicional necessário: {competitorFeature.addon}
                                  {competitorFeature.price &&
                                    ` (R$ ${competitorFeature.price}/mês)`}
                                </p>
                              )}
                              {isAvailable && isIncluded && (
                                <p className="text-sm text-gray-400 leading-relaxed">
                                  {feature.description}
                                </p>
                              )}
                              {competitorFeature.note && (
                                <p className="text-xs text-gray-500 mt-2 bg-white/10 inline-block px-2 py-1 rounded">
                                  {competitorFeature.note}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Pricing (Variable + Add-ons) */}
              <div className="mt-10 pt-8 border-t-2 border-white/10">
                <p className="text-4xl font-bold text-white">
                  Varia
                  <span className="text-lg text-gray-400 font-normal">/mês</span>
                </p>
                <p className="text-sm text-red-400 mt-2">
                  + Add-ons necessários • Por usuário • Custo escalável
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Summary */}
        <Reveal>
          <div className="mt-8 p-6 bg-linear-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border-2 border-green-500/20">
            <p className="text-center text-gray-700">
              <strong className="text-green-700">Resumo:</strong> Bitrix24 entrega{' '}
              <strong className="text-gray-900">tudo integrado</strong> pelo preço fixo de R$
              1.119/mês. {selectedToolData.name} exige{' '}
              <strong className="text-red-700">múltiplas ferramentas</strong> para equivalência
              funcional.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
})

DynamicSplitComparison.displayName = 'DynamicSplitComparison'
