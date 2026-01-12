'use client'

import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { ArrowRight, Clock } from 'lucide-react'
import { ZOPU_LINKS } from '@/lib/constants'

export function EscassezSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-brand to-brand-hover relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Icon */}
          <Reveal>
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              A gente não aceita todo projeto.{' '}
              <span className="text-white/80">E isso é parte da qualidade.</span>
            </h2>
          </Reveal>

          {/* Texto explicativo */}
          <Reveal delay={0.2}>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Para manter qualidade, SLA e acompanhamento, abrimos um número limitado de
              projetos em paralelo. Se você quer começar no próximo ciclo, faça o diagnóstico
              agora.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-brand text-base font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-black/20 hover:-translate-y-1"
              >
                Aplicar para diagnóstico (20 min)
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          {/* Microcopy */}
          <Reveal delay={0.4}>
            <p className="mt-6 text-white/60 text-sm">
              Sem compromisso. Se não for o melhor caminho, a gente te diz.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
