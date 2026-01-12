'use client'

import { Container } from '@/components/layout'
import { SectionHeader, Reveal, Button } from '@/components/shared'
import { METODOLOGIA_ZOPU, ZOPU_STATS } from '@/lib/constants'

export function MetodologiaSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <Container>
        <SectionHeader
          label="Nossa metodologia"
          title="6 pilares que garantem resultado"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {METODOLOGIA_ZOPU.pilares.map((pilar, index) => (
            <Reveal key={pilar.id} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1 h-full">
                <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{pilar.nome}</h3>
                <p className="text-sm text-gray-600">{pilar.descricao}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6}>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              É por isso que {ZOPU_STATS.retencao} dos nossos clientes ficam — e{' '}
              {ZOPU_STATS.taxaFalha} dos projetos do mercado falham.
            </p>
            <Button href="/revopslaunch" variant="secondary">
              Conhecer metodologia completa
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
