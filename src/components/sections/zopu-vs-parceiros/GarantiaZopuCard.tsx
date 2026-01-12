'use client'

import { Handshake } from '@phosphor-icons/react'
import { Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'

export function GarantiaZopuCard() {
  return (
    <Reveal delay={0.2}>
      <div className="bg-linear-to-br from-brand to-bg-dark rounded-3xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Handshake size={32} weight="duotone" />
          <span className="text-xl font-bold">Compromissos Zopu</span>
        </div>
        <p className="text-white/90 text-lg mb-8 leading-relaxed">
          SLA contratual de primeira resposta, foco em adoção real e acompanhamento contínuo.
          Retenção anual de {ZOPU_STATS.retencao} é a prova de que funciona.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">{ZOPU_STATS.retencao}</p>
            <p className="text-sm text-white/70">retenção</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">{ZOPU_STATS.tempoResposta}</p>
            <p className="text-sm text-white/70">SLA resposta</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">Escopo</p>
            <p className="text-sm text-white/70">fechado</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold">365d</p>
            <p className="text-sm text-white/70">suporte</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
