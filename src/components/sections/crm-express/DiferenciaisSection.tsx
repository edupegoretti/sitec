'use client'

import { ListChecks, Database, WhatsappLogo, GraduationCap } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const DIFERENCIAIS = [
  {
    icon: ListChecks,
    titulo: 'Processo primeiro, ferramenta depois',
    antes: 'CRM comum: configura campos, torce pra funcionar',
    depois: 'CRM Express: mapeia seu funil, depois configura o Bitrix24 pra espelhar',
  },
  {
    icon: Database,
    titulo: 'Dados organizados desde o dia 1',
    antes: 'CRM comum: dados bagunçados, campos livres, caos',
    depois: 'CRM Express: campos padronizados, etapas definidas, base limpa',
  },
  {
    icon: WhatsappLogo,
    titulo: 'WhatsApp governado',
    antes: 'CRM comum: conversas no celular do vendedor',
    depois: 'CRM Express: histórico no CRM, responsáveis definidos, SLAs claros',
  },
  {
    icon: GraduationCap,
    titulo: 'Time treinado, não só "apresentado"',
    antes: 'CRM comum: treinamento genérico de 4h pra todo mundo',
    depois: 'CRM Express: certificação Fluidz por função (vendedor, SDR, gestor)',
  },
]

export function DiferenciaisSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-3">
                Por que funciona
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                O que fazemos diferente
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A maioria dos CRMs falha porque é implementada como software.
                Nós implementamos como sistema de vendas.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {DIFERENCIAIS.map((diferencial, index) => {
              const Icon = diferencial.icon
              return (
                <Reveal key={index} delay={0.1 * index}>
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                        <Icon size={20} weight="duotone" className="text-brand" />
                      </div>
                      <h3 className="font-bold text-gray-900">
                        {diferencial.titulo}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-red-500 font-bold text-xs mt-0.5 shrink-0">ANTES</span>
                        <p className="text-gray-500 text-sm line-through decoration-red-300">
                          {diferencial.antes}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-success font-bold text-xs mt-0.5 shrink-0">DEPOIS</span>
                        <p className="text-gray-900 text-sm font-medium">
                          {diferencial.depois}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
