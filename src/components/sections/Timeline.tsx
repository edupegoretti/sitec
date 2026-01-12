'use client'

import { cn } from '@/lib/utils'
import { Reveal, SectionHeader, Badge } from '@/components/shared'
import { Check } from 'lucide-react'

interface TimelinePhase {
  fase: number
  nome: string
  periodo: string
  descricao: string
  entregas: string[]
}

interface TimelineProps {
  label?: string
  title?: string
  description?: string
  phases: TimelinePhase[]
  className?: string
}

export function Timeline({
  label = 'Metodologia 30 a 90 dias',
  title = 'Simples, executável e mensurável',
  description = 'Três fases com entregas claras. Sem surpresas, sem enrolação.',
  phases,
  className,
}: TimelineProps) {
  return (
    <section className={cn('py-16 sm:py-24 bg-gray-50', className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={label} title={title} description={description} />

        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {phases.map((phase, index) => (
            <Reveal key={phase.fase} delay={index * 0.15}>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1 h-full">
                <div className="absolute -top-4 left-8">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-brand text-white text-sm font-bold rounded-lg">
                    {String(phase.fase).padStart(2, '0')}
                  </span>
                </div>
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {phase.nome}
                    </h3>
                    <Badge variant="default" className="text-xs">
                      {phase.periodo}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-6">{phase.descricao}</p>
                  <ul className="space-y-2">
                    {phase.entregas.map((entrega, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        {entrega}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
