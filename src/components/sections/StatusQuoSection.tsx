'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { CheckCircle } from 'lucide-react'
import { ZOPU_LINKS } from '@/lib/constants'

const SINTOMAS = [
  'Eu preciso cobrar atualização do CRM todo dia.',
  'Quando um vendedor sai, o processo vai embora com ele.',
  'Eu não confio no pipeline para decidir meta.',
  'O histórico está no WhatsApp pessoal de alguém.',
] as const

export function StatusQuoSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/3 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/3 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <Reveal>
            <Badge variant="warning" className="mb-6">
              O problema real
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Seu problema não é falta de CRM.{' '}
              <span className="text-red-600">É CRM sem governança.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-xl text-gray-600 leading-relaxed">
                A maioria das implementações falha no mesmo lugar: o CRM vira{' '}
                <strong className="text-gray-900">"sistema para preencher"</strong>, não{' '}
                <strong className="text-gray-900">"sistema para operar"</strong>.
              </p>
              <p className="text-lg text-gray-500 mt-4">
                Quando isso acontece, o time cria planilha paralela, o WhatsApp vira caos e o
                gestor descobre o problema tarde demais.
              </p>
            </div>
          </Reveal>

          {/* Checklist de sintomas */}
          <Reveal delay={0.3}>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 border border-gray-200/60 mb-10">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                Se identificou com algum desses?
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {SINTOMAS.map((sintoma, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200/80 hover:border-red-200 hover:bg-red-50/30 transition-all duration-300 cursor-default group"
                  >
                    <CheckCircle className="w-5 h-5 text-gray-300 group-hover:text-red-500 shrink-0 mt-0.5 transition-colors" />
                    <span className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                      "{sintoma}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTA contextual */}
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                Vamos mapear seu risco em 20 min
              </a>
              <span className="text-sm text-gray-500">
                Sem compromisso. Se não fizer sentido, a gente fala na hora.
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
