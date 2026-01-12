'use client'

import { Cursor } from '@phosphor-icons/react'

interface MapLegendProps {
  className?: string
}

export function MapLegend({ className }: MapLegendProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
        {/* Funil */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-linear-to-r from-brand to-[#C7C3FF]" />
          <span className="text-white/80 font-medium">Funil (V1–V6)</span>
        </div>

        {/* Bridge */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-lg border-2 border-white/40 bg-white/10" />
          <span className="text-white/80 font-medium">Onboarding</span>
        </div>

        {/* Flywheel */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-linear-to-br from-success to-[#06B6D4]" />
          <span className="text-white/80 font-medium">Flywheel (V7–V13)</span>
        </div>

        {/* Instrução de interatividade */}
        <div className="flex items-center gap-2">
          <Cursor size={16} weight="duotone" className="text-white/50" />
          <span className="text-white/50 text-xs">Clique para detalhes</span>
        </div>
      </div>
    </div>
  )
}
