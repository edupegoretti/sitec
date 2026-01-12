'use client'

import { useState } from 'react'
import { motion, useInView, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown, TrendingDown, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/shared'
import { useCountUp } from '@/hooks/useCountUp'

interface Tool {
  name: string
  cost: number
  color: string
}

interface EconomyWaterfallChartProps {
  /** Fragmented tools with their monthly costs */
  fragmentedTools: Tool[]
  /** Bitrix24 unified cost */
  bitrix24Cost: number
  /** Optional scenario label */
  scenarioLabel?: string
  className?: string
}

// Animated cost component
function AnimatedCost({ value }: { value: number }) {
  const { ref, value: animatedValue } = useCountUp(value, { delay: 300 })
  const [displayNumber, setDisplayNumber] = useState(0)

  useMotionValueEvent(animatedValue, 'change', (latest) => {
    setDisplayNumber(latest)
  })

  return (
    <span ref={ref}>
      {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      }).format(Math.round(displayNumber))}
    </span>
  )
}

export function EconomyWaterfallChart({
  fragmentedTools,
  bitrix24Cost,
  scenarioLabel = '30 usuários',
  className = '',
}: EconomyWaterfallChartProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const totalFragmented = fragmentedTools.reduce((sum, tool) => sum + tool.cost, 0)
  const savings = totalFragmented - bitrix24Cost
  const savingsPercent = Math.round((savings / totalFragmented) * 100)

  return (
    <div ref={containerRef} className={className}>
      <Reveal>
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 border border-gray-200/80 shadow-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full mb-4">
              <TrendingDown className="w-4 h-4 text-brand" />
              <span className="text-sm font-semibold text-brand">
                Economia Visual - {scenarioLabel}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              De 5 ferramentas para 1 plataforma
            </h3>
            <p className="text-gray-600">
              Veja como Bitrix24 substitui tudo e ainda economiza{' '}
              <strong className="text-green-600">
                <AnimatedCost value={savings} />
              </strong>{' '}
              por mês
            </p>
          </div>

          {/* Waterfall Chart */}
          <div className="space-y-3 max-w-4xl mx-auto">
            {/* Fragmented Tools */}
            {fragmentedTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  {/* Tool card */}
                  <div
                    className="flex-1 group relative bg-white rounded-xl p-4 border-2 hover:shadow-lg transition-all duration-300"
                    style={{ borderColor: tool.color }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tool.color }}
                        />
                        <span className="font-semibold text-gray-900">{tool.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">
                          <AnimatedCost value={tool.cost} />
                        </span>
                        <span className="text-xs text-gray-500 ml-1">/mês</span>
                      </div>
                    </div>
                  </div>

                  {/* Plus icon (except last) */}
                  {index < fragmentedTools.length - 1 && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500 font-bold text-sm">+</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Total Fragmented */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: fragmentedTools.length * 0.1, duration: 0.5 }}
              className="pt-4 border-t-2 border-dashed border-gray-300"
            >
              <div className="bg-red-50 rounded-xl p-5 border-2 border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-red-700 block mb-1">
                      Total Ferramentas Fragmentadas
                    </span>
                    <span className="text-xs text-red-600">
                      {fragmentedTools.length} ferramentas desconectadas
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-red-700">
                      <AnimatedCost value={totalFragmented} />
                    </div>
                    <span className="text-xs text-red-600">/mês</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Arrow Down with savings badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                delay: (fragmentedTools.length + 1) * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-2 py-4"
            >
              <div className="relative">
                <motion.div
                  animate={isInView ? { y: [0, 8, 0] } : {}}
                  transition={{
                    delay: (fragmentedTools.length + 2) * 0.1,
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowDown className="w-8 h-8 text-green-600" strokeWidth={3} />
                </motion.div>
              </div>
              <div className="px-4 py-2 bg-green-100 rounded-full border-2 border-green-200">
                <span className="text-sm font-bold text-green-700">
                  Economia: <AnimatedCost value={savings} /> ({savingsPercent}%)
                </span>
              </div>
            </motion.div>

            {/* Bitrix24 Unified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: (fragmentedTools.length + 2) * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="relative bg-gradient-to-br from-brand/10 to-purple-50 rounded-xl p-6 border-2 border-brand shadow-lg">
                {/* Success badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Melhor Escolha</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-base font-bold text-brand block mb-1">
                      Bitrix24 Professional
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        Usuários ilimitados
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        Tudo integrado
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        Dados centralizados
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-brand">
                      <AnimatedCost value={bitrix24Cost} />
                    </div>
                    <span className="text-xs text-gray-600">/mês fixo</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: (fragmentedTools.length + 3) * 0.1,
                duration: 0.6,
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6"
            >
              <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-brand mb-1">
                  <AnimatedCost value={savings} />
                </div>
                <div className="text-xs text-gray-600">Economia mensal</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-brand mb-1">
                  <AnimatedCost value={savings * 12} />
                </div>
                <div className="text-xs text-gray-600">Economia anual</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{savingsPercent}%</div>
                <div className="text-xs text-gray-600">Redução de custo</div>
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
