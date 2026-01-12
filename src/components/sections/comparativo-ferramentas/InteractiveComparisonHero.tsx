'use client'

import { forwardRef } from 'react'
import { Badge } from '@/components/shared'

export const InteractiveComparisonHero = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      {/* Decorative elements (Zopu pattern) */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-brand/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-green-500/3 rounded-full -translate-x-1/2 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge className="mb-6">Comparativo Interativo</Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Compare Bitrix24 com
            <br />
            <span className="text-brand">a ferramenta que você usa hoje</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha sua ferramenta atual abaixo para ver a comparação lado a lado de features, preços e benefícios.
          </p>
        </div>
      </div>
    </section>
  )
})

InteractiveComparisonHero.displayName = 'InteractiveComparisonHero'
