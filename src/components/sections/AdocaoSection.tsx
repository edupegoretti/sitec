'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS } from '@/lib/constants'
import { GraduationCap, Users, TrendingUp, Award } from 'lucide-react'

const PROVAS = [
  {
    icon: GraduationCap,
    valor: ZOPU_STATS.alunosFluidz,
    label: 'profissionais certificados',
  },
  {
    icon: TrendingUp,
    valor: ZOPU_STATS.retencao,
    label: 'taxa de retenção anual',
  },
] as const

const TRILHAS = [
  { perfil: 'Vendedor', foco: 'Pipeline, atividades, follow-up' },
  { perfil: 'Gestor', foco: 'Dashboard, forecast, gestão de time' },
  { perfil: 'CS', foco: 'Health Score, renovação, expansão' },
  { perfil: 'Admin', foco: 'Configuração, automações, integrações' },
] as const

export function AdocaoSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/4 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <Reveal>
                <Badge variant="success" className="mb-6">
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  Fluidz
                </Badge>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Se o time não usa, não existe CRM.{' '}
                  <span className="text-emerald-600">Existe "planilha com login".</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Por isso a Zopu inclui treinamento por função e trilhas práticas (vendedor,
                  gestor, CS). A meta é simples:{' '}
                  <strong className="text-gray-900">uso diário sem cobrança.</strong>
                </p>
              </Reveal>

              {/* Provas */}
              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-6 mb-8">
                  {PROVAS.map((prova, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <prova.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900">{prova.valor}</p>
                        <p className="text-xs text-gray-500">{prova.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Link para Fluidz */}
              <Reveal delay={0.4}>
                <a
                  href="https://fluidz.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Conhecer a plataforma Fluidz
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </Reveal>
            </div>

            {/* Right: Trilhas por função */}
            <Reveal delay={0.3}>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-3xl p-6 sm:p-8 border border-gray-200/60">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Trilhas por função</h3>
                    <p className="text-sm text-gray-500">Treinamento que faz sentido</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {TRILHAS.map((trilha, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200/80 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-medium text-gray-900">{trilha.perfil}</span>
                      </div>
                      <span className="text-sm text-gray-500">{trilha.foco}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Certificação reconhecida pelo mercado
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
