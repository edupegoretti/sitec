'use client'

import { Buildings } from '@phosphor-icons/react'

export function EnterpriseHeroBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-linear-to-r from-brand/10 to-brand/5 border border-brand/20 rounded-full mb-6 shadow-sm">
      <Buildings size={16} weight="duotone" className="text-brand" />
      <span className="text-sm font-medium text-brand">Enterprise</span>
    </div>
  )
}
