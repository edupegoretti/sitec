'use client'

import { ArrowRight } from 'lucide-react'
import { ChartLineUp } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { ZOPU_LINKS } from '@/lib/constants'

type Props = {
  title?: string
  description?: string
  className?: string
}

export function BlogFinalCTA({
  title = 'Se chegou até aqui, está na hora de resolver',
  description = 'CRM não precisa ser só cadastro. Em 15 minutos, um especialista mostra onde sua receita está travando.',
  className,
}: Props) {
  const handleDiagnosticoClick = () => {
    if (typeof window !== 'undefined' && window.openDiagnosticoModal) {
      window.openDiagnosticoModal()
    }
  }

  return (
    <div className={cn('rounded-3xl bg-bg-dark text-white p-8 sm:p-12 lg:p-16 text-center', className)}>
      <h2 className="text-3xl lg:text-4xl font-bold max-w-2xl mx-auto">
        {title}
      </h2>

      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        {description}
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDiagnosticoClick}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 group"
        >
          <ChartLineUp className="w-5 h-5" />
          Diagnóstico gratuito
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        <a
          href={ZOPU_LINKS.whatsappEspecialista}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl transition-all duration-300"
        >
          Falar com especialista
        </a>
      </div>
    </div>
  )
}
