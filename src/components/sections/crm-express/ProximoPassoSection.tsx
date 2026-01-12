'use client'

import Link from 'next/link'
import { ArrowRight, TrendUp, Users, GitMerge, Headset } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const GATILHOS = [
  {
    icon: Users,
    texto: 'Mais de um time trabalhando o mesmo pipeline',
  },
  {
    icon: GitMerge,
    texto: 'Handoffs entre áreas viraram gargalo',
  },
  {
    icon: Headset,
    texto: 'Pós-venda/CS precisa entrar no mesmo sistema',
  },
  {
    icon: TrendUp,
    texto: 'Você quer forecast de receita estruturado',
  },
]

export function ProximoPassoSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-100">
      <Container>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-brand uppercase tracking-wider mb-2">
                Próximo passo natural
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Quando evoluir para RevOps Launch?
              </h3>
              <p className="text-lg text-gray-600">
                O CRM Express é o começo. Quando sua operação crescer, estes são os sinais de que é hora de expandir:
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {GATILHOS.map((gatilho, index) => (
              <Reveal key={index} delay={0.1 * (index + 1)}>
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                    <gatilho.icon size={20} weight="duotone" className="text-brand" />
                  </div>
                  <p className="text-gray-700 pt-2">{gatilho.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="text-center">
              <Link
                href="/revopslaunch"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-medium rounded-xl hover:bg-brand-dark transition-colors group"
              >
                Conhecer RevOps Launch
                <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Implementação completa de Revenue Operations em até 60 dias
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
