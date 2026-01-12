'use client'

import {
  GraduationCap,
  Target,
  Handshake,
  Lightning,
  Users,
  ChartLineUp,
} from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const PERFIL_ZOPER = [
  {
    icon: GraduationCap,
    titulo: 'Aprendiz por natureza',
    descricao: 'Curiosidade insaciável e vontade de evoluir constantemente.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Handshake,
    titulo: 'Integridade',
    descricao: 'Fazemos o certo, mesmo quando ninguém está olhando.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Target,
    titulo: 'Executor incansável',
    descricao: 'Buscamos a perfeição em cada entrega, sem desculpas.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Lightning,
    titulo: 'Rejeitamos ineficiências',
    descricao: 'Acreditamos que processos ruins roubam tempo e energia.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Users,
    titulo: 'Foco em pessoas',
    descricao: 'Transformação digital precisa de processos, tecnologia e pessoas.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: ChartLineUp,
    titulo: 'Orientado a resultados',
    descricao: 'Medimos sucesso pelo impacto real no cliente.',
    color: 'from-brand to-indigo-600',
  },
]

export function SobreZoper() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 rounded-full mb-6">
              <Users size={16} weight="duotone" className="text-brand" />
              <span className="text-sm font-medium text-brand">O que é ser um Zoper</span>
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Mais do que colaboradores,{' '}
              <span className="text-brand">somos Zopers</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              A Zopu nasceu da frustração de profissionais com as abordagens tradicionais de CRM no Brasil.
              Depois de mais de 15 anos no mercado, os fundadores deixaram posições estáveis em uma unicórnio
              para <strong className="text-gray-900">&ldquo;libertar pessoas de ineficiências e destravar o crescimento dos negócios&rdquo;</strong>.
            </p>
          </Reveal>
        </div>

        {/* Perfil Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PERFIL_ZOPER.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={item.titulo} delay={0.1 + index * 0.05}>
                <div className="group h-full bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  {/* Icon with gradient */}
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg shadow-gray-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    <Icon size={24} weight="fill" className="text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.titulo}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
