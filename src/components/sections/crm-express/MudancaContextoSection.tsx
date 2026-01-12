'use client'

import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { FailureSuccessCycle } from './FailureSuccessCycle'

export function MudancaContextoSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-brand/3 rounded-full -translate-x-1/2 blur-[100px]" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-success/3 rounded-full translate-x-1/2 blur-[100px]" />

      <Container className="relative">
        {/* Header - Muito mais limpo */}
        <Reveal>
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-4">
              Por que 70% dos CRMs falham
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              CRM não falha por ferramenta.
              <br />
              <span className="text-brand">Falha por execução.</span>
            </h2>
          </div>
        </Reveal>

        {/* Visual principal - Diagrama comparativo */}
        <Reveal delay={0.1}>
          <FailureSuccessCycle />
        </Reveal>

        {/* Insight footer - Compacto */}
        <Reveal delay={0.3}>
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-gray-600 text-lg">
              A diferença não é a ferramenta.
              <span className="text-gray-900 font-semibold"> É ter processo, dados e adoção </span>
              desde o primeiro dia.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
