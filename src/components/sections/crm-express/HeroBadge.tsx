'use client'

import { Lightning } from '@phosphor-icons/react'

export function HeroBadge() {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full">
        <Lightning size={16} weight="fill" className="text-success" />
        <span className="text-sm font-semibold text-success">
          Funcionando em 30 dias ou menos
        </span>
      </div>
    </div>
  )
}
