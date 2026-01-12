'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  BRIDGE_STAGE,
  BUSINESS_MODELS,
  FUNNEL_STAGES,
  FLYWHEEL_MODELS,
  SECONDARY_KPIS,
  type BusinessModelId,
  type FunnelStage,
  type FlywheelMetric,
} from '@/content/revenuePerformanceMap'
import { trackEvent } from '@/lib/analytics'
import { MapLegend } from './MapLegend'
import { MetricDrawer } from './MetricDrawer'
import { MetricTooltip } from './MetricTooltip'
import { MobileMetricCard } from './MobileMetricCard'
import { ModelContextCard } from './ModelContextCard'
import { RevenueModelTabs } from './RevenueModelTabs'
import { RevenueParticleSystem } from './RevenueParticleSystem'
import { RevenueEngineDesktop } from './RevenueEngineDesktop'

type StageInfo = FunnelStage | FlywheelMetric | typeof BRIDGE_STAGE

interface RevenuePerformanceMapProps {
  className?: string
}

export function RevenuePerformanceMap({ className }: RevenuePerformanceMapProps) {
  const [model, setModel] = useState<BusinessModelId>('recorrencia')
  const [activeStageId, setActiveStageId] = useState<string | null>(null)
  const [drawerStageId, setDrawerStageId] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastHoverRef = useRef<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const flywheelMetrics = useMemo(() => FLYWHEEL_MODELS[model], [model])

  const stageById = useMemo(() => {
    const allStages: StageInfo[] = [...FUNNEL_STAGES, BRIDGE_STAGE, ...flywheelMetrics]
    return new Map(allStages.map((stage) => [stage.id, stage]))
  }, [flywheelMetrics])

  const activeStage = activeStageId ? stageById.get(activeStageId) : null
  const drawerStage = drawerStageId ? stageById.get(drawerStageId) : null

  const handleStageHover = (id: string | null, position?: { x: number; y: number }) => {
    setActiveStageId(id)
    setTooltipPosition(position ?? null)
    if (id && lastHoverRef.current !== id) {
      trackEvent('rpm_diagram_stage_hover', { stage_id: id })
      lastHoverRef.current = id
    }
  }

  const handleStageLeave = (id: string) => {
    if (drawerStageId === id || activeStageId !== id) {
      return
    }
    setActiveStageId(null)
    setTooltipPosition(null)
  }

  const handleStageOpen = (id: string) => {
    setDrawerStageId(id)
    setActiveStageId(id)
    trackEvent('rpm_diagram_stage_open', { stage_id: id })
  }

  const handleModelChange = (nextModel: BusinessModelId) => {
    setModel(nextModel)
    trackEvent('rpm_toggle_business_model', { model: nextModel })
  }

  useEffect(() => {
    if (!drawerStageId) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerStageId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [drawerStageId])

  useEffect(() => {
    if (drawerStageId) {
      closeButtonRef.current?.focus()
    }
  }, [drawerStageId])

  return (
    <div className={cn('p-2 sm:p-4', className)} ref={containerRef}>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center relative z-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-2">
            Mapa de Performance de Receita™
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white shadow-black/50 drop-shadow-md">
            O Motor de Receita
          </h3>
          <p className="text-sm sm:text-base text-white/80 mt-2 max-w-xl mx-auto">
            Funil e Flywheel operando como um sistema único no Bitrix24.
          </p>
        </div>

        {/* Tabs */}
        <div className="relative z-10">
          <RevenueModelTabs
            models={BUSINESS_MODELS}
            activeModel={model}
            onModelChange={handleModelChange}
          />
        </div>

        {/* Context Card */}
        <ModelContextCard model={model} />

        {/* Legend */}
        <MapLegend className="hidden md:block" />

        {/* === MOBILE: List View === */}
        <div className="flex flex-col md:hidden">
          <div className="space-y-1">
            {FUNNEL_STAGES.map((stage) => (
              <div key={stage.id} className="relative">
                <MobileMetricCard
                  stage={stage}
                  color="#6366f1"
                  onTap={() => handleStageOpen(stage.id)}
                />
                <div className="h-4 w-px bg-white/20 mx-auto" />
              </div>
            ))}
            <div className="relative">
              <MobileMetricCard stage={BRIDGE_STAGE} color="#14b8a6" onTap={() => handleStageOpen(BRIDGE_STAGE.id)} />
              <div className="h-4 w-px bg-white/20 mx-auto" />
            </div>
            {flywheelMetrics.map((stage) => (
              <div key={stage.id} className="relative">
                <MobileMetricCard stage={stage} color="#10b981" onTap={() => handleStageOpen(stage.id)} />
                <div className="h-4 w-px bg-white/20 mx-auto last:hidden" />
              </div>
            ))}
          </div>
        </div>

        {/* === DESKTOP: UNIFIED ENGINE === */}
        {/* 
            This replaces the separate Svg components with ONE single high-fidelity engine.
            This ensures absolute alignment between Funnel, Bridge, and Flywheel.
        */}
        <div className="hidden md:block relative min-h-[450px] bg-white/5 border border-white/10 rounded-3xl overflow-visible backdrop-blur-sm">
          <RevenueParticleSystem containerRef={containerRef} />

          <AnimatePresence mode="wait">
            <motion.div
              key={model}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <RevenueEngineDesktop
                funnelStages={FUNNEL_STAGES}
                flywheelMetrics={flywheelMetrics}
                activeStageId={activeStageId}
                onStageHover={handleStageHover}
                onStageOpen={handleStageOpen}
                onStageLeave={handleStageLeave}
              />
            </motion.div>
          </AnimatePresence>

          {/* Tooltip Flutuante */}
          <MetricTooltip
            stage={activeStage}
            position={tooltipPosition}
            variant="floating"
          />
        </div>

      </div>

      {/* Drawer */}
      <MetricDrawer
        open={Boolean(drawerStage)}
        stage={drawerStage}
        onClose={() => {
          setDrawerStageId(null)
          setActiveStageId(null)
        }}
        secondaryKpis={SECONDARY_KPIS}
        closeButtonRef={closeButtonRef}
      />
    </div>
  )
}
