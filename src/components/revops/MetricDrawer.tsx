'use client'

import type { RefObject } from 'react'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import { BRIDGE_STAGE, type FunnelStage, type FlywheelMetric, type StageConnections } from '@/content/revenuePerformanceMap'

type StageInfo = (FunnelStage | FlywheelMetric | typeof BRIDGE_STAGE) & {
  connections?: StageConnections
}

interface MetricDrawerProps {
  open: boolean
  stage?: StageInfo | null
  onClose: () => void
  secondaryKpis: ReadonlyArray<{ label: string; items: ReadonlyArray<string> }>
  closeButtonRef?: RefObject<HTMLButtonElement | null>
}

export function MetricDrawer({
  open,
  stage,
  onClose,
  secondaryKpis,
  closeButtonRef,
}: MetricDrawerProps) {
  if (!open || !stage) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl"
        aria-label="Fechar painel"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        className="absolute right-0 top-0 h-full w-full max-w-md bg-bg-dark border-l border-white/10 shadow-2xl overflow-y-auto rounded-3xl"
      >
        {/* Header with gradient */}
        <div className="bg-linear-to-r from-brand to-success p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
                {stage.metricId}
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stage.label}
              </h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <X size={16} weight="duotone" />
              Fechar
            </button>
          </div>
          <p className="text-base text-white/80 mt-3">
            {stage.definition}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-base">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-success mb-2">
              O que essa métrica mostra
            </p>
            <p className="text-white/80">{stage.insight}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-success mb-2">
              O que fazer na prática
            </p>
            <p className="text-white/80">{stage.nextStep}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-success mb-2">
              Exemplos de campos/automação
            </p>
            <ul className="flex flex-wrap gap-2">
              {stage.examples.map((example) => (
                <li
                  key={example}
                  className="rounded-full border border-brand/50 bg-brand/20 px-3 py-1 text-sm font-semibold text-white"
                >
                  {example}
                </li>
              ))}
            </ul>
          </div>

          {/* Conexões entre métricas */}
          {stage.connections && (stage.connections.upstream || stage.connections.downstream) && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-success mb-2">
                Métricas conectadas
              </p>
              <div className="space-y-2">
                {stage.connections.upstream && (
                  <div className="flex items-center gap-2 text-base text-white/80">
                    <ArrowLeft size={18} weight="duotone" className="text-brand shrink-0" />
                    <span>
                      <span className="text-white/60">Depende de:</span> {stage.connections.upstream}
                    </span>
                  </div>
                )}
                {stage.connections.downstream && (
                  <div className="flex items-center gap-2 text-base text-white/80">
                    <ArrowRight size={18} weight="duotone" className="text-success shrink-0" />
                    <span>
                      <span className="text-white/60">Impacta:</span> {stage.connections.downstream}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-success mb-2">
              Filtros de diagnostico (KPIs secundarios)
            </p>
            <div className="space-y-3">
              {secondaryKpis.map((group) => (
                <div key={group.label} className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                    {group.label}
                  </span>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-sm text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
