'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, TrendDown, CaretDown } from '@phosphor-icons/react'
import { Reveal, Badge, AnimatedCost } from '@/components/shared'
import { TOOLS, TCO_PRICING, type ToolId } from '@/lib/toolComparisonData'

interface InteractiveTCOCalculatorProps {
  selectedTool: ToolId
}

const BITRIX24_COST = 1119 // Professional plan

export function InteractiveTCOCalculator({ selectedTool }: InteractiveTCOCalculatorProps) {
  const [userCount, setUserCount] = useState(30)
  const [showAddons, setShowAddons] = useState(false)

  const selectedToolData = TOOLS[selectedTool]
  const pricing = TCO_PRICING[selectedTool]

  const calculation = useMemo(() => {
    const fragmentedCost = pricing.totalForUsers(userCount)
    const savings = fragmentedCost - BITRIX24_COST
    const savingsPercent = fragmentedCost > 0 ? Math.round((savings / fragmentedCost) * 100) : 0

    return {
      fragmentedCost,
      bitrix24Cost: BITRIX24_COST,
      monthlySavings: savings,
      annualSavings: savings * 12,
      savingsPercent,
    }
  }, [userCount, pricing])

  return (
    <Reveal>
      {/* Wrapper layer - HomePage pattern */}
      <div className="bg-linear-to-br from-gray-50 to-gray-100/80 rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-card">
        <div className="bg-white rounded-3xl border border-brand/20 overflow-hidden">
          {/* Premium Header with Particles */}
          <div className="relative px-6 sm:px-8 py-8 overflow-hidden">
            {/* Particle background */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-amber-50/30" />
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 bg-brand/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative">
              <Badge className="mb-3">Análise de Custo Total</Badge>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Quanto você{' '}
                <span className="text-brand relative">
                  economiza
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
                {' '}migrando para Bitrix24?
              </h3>
              <p className="text-gray-600">
                vs. {selectedToolData.name} + add-ons necessários
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Interactive Slider with Contextual Insights */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users weight="duotone" className="w-4 h-4 text-brand" />
                  <span>Tamanho do time</span>
                </label>
                <div className="text-right">
                  <span className="text-3xl font-bold text-brand">{userCount}</span>
                  <span className="text-sm text-gray-500 ml-1">usuários</span>
                </div>
              </div>

              {/* Custom styled slider */}
              <div className="relative">
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={userCount}
                  onChange={(e) => setUserCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5
                             [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md
                             [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
                             [&::-webkit-slider-thumb]:hover:scale-110"
                  style={{
                    background: `linear-gradient(to right,
                      rgb(99 91 255) 0%,
                      rgb(99 91 255) ${((userCount - 5) / 95) * 100}%,
                      #e5e7eb ${((userCount - 5) / 95) * 100}%,
                      #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5</span>
                  <span>50</span>
                  <span>100+</span>
                </div>
              </div>

              {/* Contextual insights */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`insight-${userCount}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 p-3 bg-brand/5 rounded-xl border border-brand/10"
                >
                  <p className="text-sm text-gray-700">
                    <strong className="text-brand">
                      {userCount <= 15
                        ? '👥 Time enxuto:'
                        : userCount <= 30
                        ? '🚀 Crescendo rápido:'
                        : userCount <= 50
                        ? '🏢 Operação estabelecida:'
                        : '🌐 Empresa de escala:'}
                    </strong>{' '}
                    {userCount <= 15
                      ? 'A fragmentação de ferramentas custa proporcionalmente mais em times pequenos.'
                      : userCount <= 30
                      ? 'Neste estágio, cada R$ economizado pode ser investido em crescimento.'
                      : userCount <= 50
                      ? 'Integração é crucial - o custo de dados fragmentados supera o preço das ferramentas.'
                      : 'A complexidade de gerenciar múltiplas ferramentas se torna insustentável.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {calculation.monthlySavings > 0 ? (
                <motion.div
                  key={`results-${selectedTool}-${userCount}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Comparison Cards - HomePage Pattern */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Fragmented Stack */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 h-full shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
                      <div className="text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                        Stack Fragmentado
                      </div>
                      <div className="text-xs text-slate-500 mb-3">
                        {selectedToolData.name} + {pricing.addons.length} add-ons
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
                        <AnimatedCost value={calculation.fragmentedCost} showDecimals={false} delay={200} />
                      </div>
                      <div className="text-xs text-slate-600 mb-3">/mês • {userCount} usuários</div>

                      {/* Always visible breakdown - HomePage pattern */}
                      <div className="pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-600">
                          Base: R$ {pricing.base} + Add-ons: R${' '}
                          {pricing.addons.reduce((sum, a) => sum + a.cost, 0)}
                        </p>
                      </div>
                    </div>

                    {/* Bitrix24 Unified */}
                    <div className="bg-linear-to-br from-amber-50 to-orange-50/50 rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 h-full shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
                      <div className="text-xs font-semibold text-brand mb-1 uppercase tracking-wider">
                        Stack Unificado
                      </div>
                      <div className="text-xs text-amber-700 mb-3">
                        Bitrix24 Professional • Tudo incluído
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                        <AnimatedCost value={calculation.bitrix24Cost} showDecimals={false} delay={200} />
                      </div>
                      <div className="text-xs text-amber-700 mb-3">
                        /mês • usuários ilimitados
                      </div>

                      {/* Always visible breakdown - HomePage pattern */}
                      <div className="pt-3 border-t border-amber-200">
                        <p className="text-xs text-amber-700">
                          Preço fixo • Sem surpresas • Sem add-ons
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Savings Display - Keep dark theme (unique to this component) */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden mb-6"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-linear-to-br from-brand/20 via-transparent to-purple-500/20 opacity-50" />
                    <motion.div
                      className="absolute -top-10 -right-10 w-40 h-40 bg-brand/30 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        {/* Icon container - HomePage pattern: w-11 h-11, solid bg */}
                        <div className="shrink-0 w-11 h-11 bg-brand/20 rounded-xl flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <TrendDown weight="duotone" className="w-6 h-6 text-brand" />
                          </motion.div>
                        </div>

                        <div className="flex-1">
                          <div className="text-sm font-medium text-white/70 mb-2">
                            Economia mensal com Bitrix24
                          </div>
                          <div className="text-4xl sm:text-5xl font-bold mb-3">
                            <AnimatedCost value={calculation.monthlySavings} showDecimals={false} delay={200} />
                            <span className="text-xl font-medium text-white/80 ml-2">/mês</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                            <span className="text-white/90">
                              <AnimatedCost value={calculation.annualSavings} showDecimals={false} delay={200} /> por ano
                            </span>
                            <span className="px-2 py-1 bg-brand/20 rounded-lg text-brand font-semibold">
                              {calculation.savingsPercent}% mais barato
                            </span>
                          </div>

                          {/* Meaningful context */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-4 pt-4 border-t border-white/10"
                          >
                            <p className="text-sm text-white/80">
                              <strong className="text-white">
                                O que você faria com{' '}
                                <AnimatedCost value={calculation.annualSavings} showDecimals={false} delay={200} /> a mais por ano?
                              </strong>
                            </p>
                            <p className="text-xs text-white/60 mt-1">
                              {calculation.annualSavings > 50000
                                ? '💰 Contratar 1-2 profissionais especializados'
                                : calculation.annualSavings > 20000
                                ? '🚀 Investir em marketing e crescimento'
                                : '📈 Expandir suas operações comerciais'}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Interactive Add-ons Breakdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => setShowAddons(!showAddons)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center group-hover:bg-slate-300 transition-colors">
                          <span className="text-sm font-bold text-slate-600">
                            {pricing.addons.length}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          Add-ons necessários em {selectedToolData.name}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: showAddons ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <CaretDown weight="duotone" className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {showAddons && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 p-4 bg-white rounded-xl border border-slate-200">
                            <ul className="space-y-2">
                              {pricing.addons.map((addon, idx) => (
                                <motion.li
                                  key={addon.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-brand transition-colors" />
                                    <span className="text-sm text-gray-700">{addon.name}</span>
                                  </div>
                                  <span className="text-sm font-semibold text-slate-600">
                                    +R$ {addon.cost}/mês
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                            <div className="mt-3 pt-3 border-t border-slate-200 text-right">
                              <span className="text-xs text-slate-600">Total add-ons: </span>
                              <span className="text-sm font-bold text-slate-900">
                                R$ {pricing.addons.reduce((sum, a) => sum + a.cost, 0)}/mês
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-gray-500"
                >
                  <Users weight="duotone" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Configure os usuários para calcular sua economia</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
