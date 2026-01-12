'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { BRIDGE_STAGE, type FunnelStage, type FlywheelMetric } from '@/content/revenuePerformanceMap'

type StageInfo = FunnelStage | FlywheelMetric | typeof BRIDGE_STAGE

interface MetricTooltipProps {
  stage?: StageInfo | null
  position?: { x: number; y: number } | null
  variant?: 'floating' | 'fixed'
}

export function MetricTooltip({ stage, position, variant = 'fixed' }: MetricTooltipProps) {
  // Versão flutuante com posição FIXA no topo do SVG
  if (variant === 'floating') {
    return (
      <AnimatePresence>
        {stage && (
          <motion.div
            id="rpm-tooltip-floating"
            role="tooltip"
            className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-50"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-bg-dark/95 backdrop-blur-xl px-5 py-3 shadow-2xl whitespace-nowrap">
              <span className="px-3 py-1 rounded-lg bg-brand/20 text-brand text-base font-bold">
                {stage.metricId}
              </span>
              <span className="text-lg font-semibold text-white">
                {stage.label}
              </span>
              <span className="text-base text-success font-medium">
                Clique para ver detalhes →
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Versão fixa (abaixo do mapa - fallback e mobile)
  return (
    <div
      id="rpm-tooltip"
      role="tooltip"
      aria-live="polite"
      className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 shadow-xl"
    >
      <div className="mb-3">
        <p className="text-base font-semibold text-white text-center">
          {stage ? `${stage.metricId} • ${stage.label}` : 'Passe o mouse ou use Tab'}
        </p>
      </div>

      {stage ? (
        <div className="space-y-3 text-sm text-white/80">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-success mb-1">
              Definição operacional
            </p>
            <p>{stage.definition}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-success mb-1">
              Onde fica no Bitrix24
            </p>
            <p>{stage.bitrixObject}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-success mb-1">
              Vazamentos comuns
            </p>
            <p>{stage.leakage}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-success mb-1">
              Ação do RevOps Launch
            </p>
            <p>{stage.activation}</p>
          </div>
        </div>
      ) : (
        <p className="text-base text-white/80 text-center">
          Selecione uma etapa para ver definição, origem no CRM, vazamentos e ação recomendada.
        </p>
      )}
    </div>
  )
}
