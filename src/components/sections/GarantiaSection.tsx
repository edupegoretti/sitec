'use client'

import { Trophy } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Button } from '@/components/shared'
import { ZOPU_COMPROMISSO, ZOPU_LINKS, ZOPU_STATS } from '@/lib/constants'

export function GarantiaSection() {
  return (
    <section className="py-12 bg-brand">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Trophy size={40} weight="duotone" className="shrink-0" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-[10px] font-bold text-green-900">
                {ZOPU_STATS.retencao.replace('%', '')}
              </span>
            </div>
            <div>
              <p className="text-xl font-bold">{ZOPU_COMPROMISSO.texto}</p>
              <p className="text-white/80 text-sm max-w-md">
                {ZOPU_COMPROMISSO.descricao}
              </p>
            </div>
          </div>
          <Button
            href={ZOPU_LINKS.whatsappEspecialista}
            external
            variant="secondary"
            className="bg-white text-brand hover:bg-gray-100 border-white"
          >
            Falar com especialista
          </Button>
        </div>
      </Container>
    </section>
  )
}
