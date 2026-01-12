'use client'

import { motion } from 'framer-motion'
import { X, Check, ArrowClockwise, TrendUp } from '@phosphor-icons/react'

/**
 * FailureSuccessCycle - Diagrama visual split-screen animado
 * Mostra a diferença entre implementação como ferramenta vs sistema
 *
 * Design inspirado em: Linear, Stripe, Vercel
 */

const FAILURE_STEPS = [
  { id: 1, label: 'Compra CRM', sublabel: 'sem diagnóstico' },
  { id: 2, label: 'Treinamento genérico', sublabel: '4h para todos' },
  { id: 3, label: 'Baixa adoção', sublabel: '~25% em 3 meses' },
  { id: 4, label: '"CRM não funciona"', sublabel: 'cancela ou troca' },
]

const SUCCESS_STEPS = [
  { id: 1, label: 'Diagnóstico', sublabel: 'processo primeiro' },
  { id: 2, label: 'Treino por função', sublabel: 'vendedor ≠ gestor' },
  { id: 3, label: 'Alta adoção', sublabel: '85%+ em 3 meses' },
  { id: 4, label: 'CRM vira rotina', sublabel: 'escala resultados' },
]

function CycleColumn({
  type,
  steps,
  delay = 0
}: {
  type: 'failure' | 'success'
  steps: typeof FAILURE_STEPS
  delay?: number
}) {
  const isFailure = type === 'failure'

  const colors = isFailure
    ? {
        bg: 'bg-gray-900',
        cardBg: 'bg-gray-800/50',
        border: 'border-gray-700/50',
        accent: '#ef4444',
        accentBg: 'bg-red-500/10',
        accentText: 'text-red-400',
        text: 'text-gray-300',
        subtext: 'text-gray-500',
        line: '#374151',
        icon: X,
      }
    : {
        bg: 'bg-white',
        cardBg: 'bg-gray-50',
        border: 'border-gray-200',
        accent: '#00a67e',
        accentBg: 'bg-success/10',
        accentText: 'text-success',
        text: 'text-gray-900',
        subtext: 'text-gray-500',
        line: '#e5e7eb',
        icon: Check,
      }

  const Icon = colors.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-2xl ${colors.bg} p-6 sm:p-8 overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <motion.div
          className={`w-10 h-10 rounded-xl ${colors.accentBg} flex items-center justify-center`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: delay + 0.2 }}
        >
          <Icon size={20} weight="bold" className={colors.accentText} />
        </motion.div>
        <div>
          <p className={`text-sm font-medium ${colors.subtext}`}>
            {isFailure ? 'Implementação comum' : 'Implementação Zopu'}
          </p>
          <p className={`text-lg font-bold ${colors.text}`}>
            {isFailure ? 'Ciclo da Falha' : 'Ciclo do Sucesso'}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[19px] top-6 bottom-6 w-0.5"
          style={{ backgroundColor: colors.line }}
        />

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: isFailure ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.3 + index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Step number */}
              <motion.div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  isFailure
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-success/20 text-success'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {step.id}
              </motion.div>

              {/* Content */}
              <div className={`flex-1 ${colors.cardBg} rounded-xl p-4 border ${colors.border}`}>
                <p className={`font-semibold ${colors.text}`}>
                  {step.label}
                </p>
                <p className={`text-sm ${colors.subtext}`}>
                  {step.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom result */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.8 }}
        className={`mt-6 pt-6 border-t ${colors.border}`}
      >
        <div className="flex items-center gap-3">
          {isFailure ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <ArrowClockwise size={20} className="text-red-400" />
              </motion.div>
              <p className="text-red-400 font-medium text-sm">
                Repete o erro com outro CRM
              </p>
            </>
          ) : (
            <>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TrendUp size={20} className="text-success" />
              </motion.div>
              <p className="text-success font-medium text-sm">
                Escala resultados com previsibilidade
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* Decorative gradient */}
      {isFailure ? (
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[60px]" />
      ) : (
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-[60px]" />
      )}
    </motion.div>
  )
}

export function FailureSuccessCycle() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CycleColumn type="failure" steps={FAILURE_STEPS} delay={0} />
      <CycleColumn type="success" steps={SUCCESS_STEPS} delay={0.2} />
    </div>
  )
}
