'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { AlertTriangle } from 'lucide-react'
import { ZOPU_LINKS } from '@/lib/constants'

const SINTOMAS = [
  'Eu preciso cobrar atualização do CRM todo dia.',
  'Quando um vendedor sai, o processo vai embora com ele.',
  'Eu não confio no pipeline para decidir meta.',
  'O histórico está no WhatsApp pessoal de alguém.',
] as const

export function StatusQuoSection() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <Badge variant="warning" className="mb-6">
                O problema real
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ativar CRM é fácil.{' '}
                <span className="text-red-600">Difícil é manter uso e ter dados confiáveis.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                CRM sem governança vira{' '}
                <strong className="text-gray-900">"sistema para preencher"</strong>, não{' '}
                <strong className="text-gray-900">"sistema para operar"</strong>. Veja o que
                acontece na prática:
              </p>
            </Reveal>
          </div>

          {/* Sintomas */}
          <Reveal delay={0.3}>
            <div className="bg-linear-to-br from-red-50/50 to-amber-50/30 rounded-2xl p-6 border border-red-100/50 mb-10">
              <p className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Se identificou com algum desses?
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SINTOMAS.map((sintoma, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-gray-200/60 hover:border-red-300 hover:bg-red-50/50 transition-all duration-300 cursor-default group"
                  >
                    <span className="text-red-400 group-hover:text-red-500 shrink-0 mt-0.5 transition-colors font-mono text-sm">
                      →
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed italic">
                      "{sintoma}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTA contextual */}
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                Quero evitar esse cenário
              </a>
              <span className="text-sm text-gray-500">
                Diagnóstico gratuito de 20 min
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
