'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Brain, Database, GitBranch } from '@phosphor-icons/react'

const BULLETS = [
  {
    icon: Brain,
    texto: 'A era da IA mudou a régua: empresas que escalam são as que escalam por sistemas.',
  },
  {
    icon: Database,
    texto: 'Seu CRM é o sistema de registro que a IA usa para trabalhar.',
  },
  {
    icon: GitBranch,
    texto: 'Sem dados organizados e governança, IA vira ruído — não resultado.',
  },
]

export function PorQueAgoraSection() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-white to-gray-50">
      <Container>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
            <Badge className="mb-4">Por que agora</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Em 2026, CRM não é mais ferramenta.
              <br />
              <span className="text-brand">É o sistema operacional da sua receita.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Se processo e dados não estiverem corretos, a IA só escala problemas — não resultados.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {BULLETS.map((item, index) => (
            <Reveal key={index} delay={0.1 * (index + 1)} className="h-full">
              <div className="h-full flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                  <item.icon size={24} weight="duotone" className="text-brand" />
                </div>
                <p className="text-gray-700">{item.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
