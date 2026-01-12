'use client'

import { Check, X } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const IDEAL_PARA = [
  'Vende via WhatsApp e perde histórico das conversas',
  'Depende da memória do vendedor para fazer follow-up',
  'Não sabe quantos leads tem no funil agora',
  'Quer organizar vendas sem projeto de 6 meses',
  'Time de 2 a 15 vendedores (pré-vendas + vendas)',
]

const NAO_E_PARA = [
  'Já tem CRM funcionando e quer migrar',
  'Precisa integrar marketing + vendas + CS',
  'Operação complexa com múltiplas unidades',
]

export function ParaQuemESection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Antes de continuar
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                CRM Express é para você?
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* É para você */}
            <Reveal delay={0.1}>
              <div className="bg-success/5 border-2 border-success/20 rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Check size={20} weight="bold" className="text-success" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    É para você se:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {IDEAL_PARA.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check
                        size={18}
                        weight="bold"
                        className="text-success shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Não é para você */}
            <Reveal delay={0.2}>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <X size={20} weight="bold" className="text-gray-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Talvez não seja ideal se:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {NAO_E_PARA.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X
                        size={18}
                        weight="bold"
                        className="text-gray-400 shrink-0 mt-0.5"
                      />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 pt-4 border-t border-gray-200 text-sm text-gray-500">
                  Nesses casos, conheça o{' '}
                  <a href="/revopslaunch" className="text-brand font-medium hover:underline">
                    RevOps Launch
                  </a>{' '}
                  ou o{' '}
                  <a href="/fluidsales" className="text-brand font-medium hover:underline">
                    Metodologia Fluidsales
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
