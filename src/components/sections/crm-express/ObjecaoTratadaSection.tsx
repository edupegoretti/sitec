'use client'

import Link from 'next/link'
import { ArrowRight, WarningCircle, CheckCircle } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

export function ObjecaoTratadaSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm">
              {/* Objeção */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <WarningCircle size={24} weight="duotone" className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-amber-600 font-semibold uppercase tracking-wider mb-1">
                    Objeção comum
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    "E se meu time não usar o CRM?"
                  </h2>
                </div>
              </div>

              {/* Resposta */}
              <div className="bg-success/5 rounded-2xl p-6 border border-success/20 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <CheckCircle size={20} weight="duotone" className="text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">
                      Por isso criamos a Fluidz.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      A maior plataforma de certificação Bitrix24 do mundo.
                      <span className="font-medium"> 9.500+ profissionais já certificados.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Diferença */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-red-800 font-semibold text-sm mb-2">
                    Treinamento tradicional:
                  </p>
                  <p className="text-red-700 text-sm">
                    4 horas genéricas. Todo mundo junto. Ninguém lembra nada.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <p className="text-gray-900 font-semibold text-sm mb-2">
                    Certificação Fluidz:
                  </p>
                  <p className="text-gray-700 text-sm">
                    Por função. Vendedor aprende o que vendedor precisa. Gestor, o que gestor precisa.
                  </p>
                </div>
              </div>

              {/* Resultado */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-center sm:text-left">
                  Resultado: <span className="font-semibold text-success">96% de retenção anual</span>.
                  <br className="sm:hidden" />
                  <span className="text-gray-500"> CRM que não é usado não retém cliente.</span>
                </p>
                <Link
                  href="/fluidz"
                  className="inline-flex items-center gap-2 text-brand font-medium hover:gap-3 transition-all shrink-0"
                >
                  Conhecer a Fluidz
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
