'use client'

import { MessageCircle } from 'lucide-react'
import { ChartLineUp } from '@phosphor-icons/react'
import { ZOPU_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export function MobileCTABar({ className }: Props) {
  const handleDiagnosticoClick = () => {
    if (typeof window !== 'undefined' && window.openDiagnosticoModal) {
      window.openDiagnosticoModal()
    }
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 lg:hidden',
        'bg-white/95 backdrop-blur-lg border-t border-gray-200',
        'px-4 py-3 safe-area-bottom',
        className
      )}
    >
      <div className="flex gap-3 max-w-lg mx-auto">
        {/* Diagnóstico Button */}
        <button
          onClick={handleDiagnosticoClick}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
        >
          <ChartLineUp className="w-5 h-5" />
          <span>Diagnóstico</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={ZOPU_LINKS.whatsappEspecialista}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
