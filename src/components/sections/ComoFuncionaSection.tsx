'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Search, Settings, GraduationCap, ArrowRight } from 'lucide-react'

const ETAPAS = [
  {
    numero: '01',
    icon: Search,
    titulo: 'Diagnóstico',
    subtitulo: 'Antes de configurar',
    descricao: 'Mapeamos jornada, funil real, critérios e vazamentos.',
    entregaveis: [
      'Sponsor e times-chave para entrevistas',
      'Dados atuais (planilhas/CRM)',
      'Metas e funil atual',
    ],
    criterio: 'Mapa validado + funil com critérios definidos',
    cor: 'brand',
  },
  {
    numero: '02',
    icon: Settings,
    titulo: 'Implementação',
    subtitulo: 'Bitrix24 espelha seu processo',
    descricao:
      'Configuração + integrações que importam + automações com regra (não com gambiarra).',
    entregaveis: [
      'Acessos Bitrix24 e integrações',
      'Regras de passagem por etapa',
      'Base para migração (quando existir)',
    ],
    criterio: 'Pipelines, automações e dashboards operando',
    cor: 'amber',
  },
  {
    numero: '03',
    icon: GraduationCap,
    titulo: 'Adoção e Sustentação',
    subtitulo: 'O pós-go-live é onde o jogo se ganha',
    descricao: 'Treino por função (Fluidz) + ajustes + governança contínua.',
    entregaveis: [
      'Agenda do time para treinamentos',
      'Gestor responsável pela rotina',
      'Ritual de acompanhamento acordado',
    ],
    criterio: 'Equipe treinada + uso diário monitorado',
    cor: 'emerald',
  },
] as const

const corClasses = {
  brand: {
    bg: 'bg-brand',
    bgLight: 'bg-brand/10',
    text: 'text-brand',
    border: 'border-brand/30',
  },
  amber: {
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/30',
  },
  emerald: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/30',
  },
} as const

export function ComoFuncionaSection() {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">Como funciona</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                O que fazemos (em ordem) — e{' '}
                <span className="text-brand">por que funciona</span>
              </h2>
            </Reveal>
          </div>

          {/* Timeline vertical */}
          <div className="relative">
            {/* Linha conectora vertical (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/20 via-amber-500/20 to-emerald-500/20 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-0">
              {ETAPAS.map((etapa, index) => {
                const cores = corClasses[etapa.cor as keyof typeof corClasses]
                const isLeft = index % 2 === 0

                return (
                  <Reveal key={index} delay={0.1 * (index + 1)}>
                    <div
                      className={`relative md:grid md:grid-cols-2 md:gap-8 ${index !== ETAPAS.length - 1 ? 'md:pb-12' : ''}`}
                    >
                      {/* Número central (desktop) */}
                      <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-gray-200 items-center justify-center z-10">
                        <span className={`text-sm font-bold ${cores.text}`}>{etapa.numero}</span>
                      </div>

                      {/* Card */}
                      <div
                        className={`${isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'} ${!isLeft && 'md:text-left'}`}
                      >
                        <div
                          className={`group p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border ${cores.border} hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
                        >
                          {/* Mobile numero */}
                          <div className="md:hidden flex items-center gap-3 mb-4">
                            <span
                              className={`w-8 h-8 rounded-full ${cores.bgLight} flex items-center justify-center`}
                            >
                              <span className={`text-xs font-bold ${cores.text}`}>
                                {etapa.numero}
                              </span>
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-300" />
                          </div>

                          <div
                            className={`w-12 h-12 rounded-xl ${cores.bgLight} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                          >
                            <etapa.icon className={`w-6 h-6 ${cores.text}`} />
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-1">{etapa.titulo}</h3>
                          <p className="text-sm text-gray-500 mb-3">{etapa.subtitulo}</p>
                          <p className="text-gray-600 leading-relaxed">{etapa.descricao}</p>

                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-gray-200/70 bg-white/80 p-4">
                              <p className={`text-xs font-semibold uppercase tracking-wider ${cores.text} mb-2`}>
                                Entregáveis do cliente
                              </p>
                              <ul className="space-y-1 text-xs text-gray-600">
                                {etapa.entregaveis.map((entregavel) => (
                                  <li key={entregavel}>• {entregavel}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200/70 bg-white/80 p-4">
                              <p className={`text-xs font-semibold uppercase tracking-wider ${cores.text} mb-2`}>
                                Critério de pronto
                              </p>
                              <p className="text-xs text-gray-600">{etapa.criterio}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* Bottom message - Busch principle */}
          <Reveal delay={0.4}>
            <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-brand/5 to-emerald-500/5 rounded-2xl p-6 sm:p-8 border border-brand/10">
                <p className="text-center text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Expectativa vs. Experiência:</strong> Você
                  vai saber exatamente o que será entregue em cada etapa — e o que depende do
                  seu time para dar certo.
                </p>
                <p className="text-center text-sm text-gray-500 mt-3">
                  É assim que o CRM vira rotina e o número passa a ser confiável.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
