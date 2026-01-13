'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Tabs, TabsList, TabTrigger, TabContent, MobileTabsList, MobileTabTrigger } from '@/components/shared/Tabs'
import { Search, Settings, GraduationCap, ChevronRight, Check } from 'lucide-react'

const ETAPAS = [
  {
    id: 'arquitetura',
    numero: '01',
    icon: Search,
    titulo: 'Arquitetura',
    subtitulo: 'Antes do CRM',
    duracao: '7 dias',
    descricao: 'Mapeamos jornada, funil, critérios de passagem, integrações necessárias e métricas que importam.',
    entregaveis: [
      'Sponsor e times-chave para entrevistas',
      'Dados atuais (planilhas/CRM anterior)',
      'Metas e definição de sucesso',
    ],
    criterio: 'Documento de Arquitetura aprovado pelo sponsor',
    cor: 'brand',
  },
  {
    id: 'implementacao',
    numero: '02',
    icon: Settings,
    titulo: 'Implementação',
    subtitulo: 'Bitrix24 + Integrações',
    duracao: '30 dias',
    descricao: 'Configuração + automações + integrações (WhatsApp, ERP, marketing) + dashboards.',
    entregaveis: [
      'Acessos Bitrix24 e sistemas integrados',
      'Regras de negócio validadas',
      'Base para migração (quando existir)',
    ],
    criterio: 'Ambiente configurado e testado pelo time',
    cor: 'amber',
  },
  {
    id: 'adocao',
    numero: '03',
    icon: GraduationCap,
    titulo: 'Adoção Assistida',
    subtitulo: 'Treinamento + Rotina',
    duracao: '30–90 dias',
    descricao: 'Treinamento por função (Fluidz) + acompanhamento semanal + ajustes baseados em uso real.',
    entregaveis: [
      'Agenda do time para treinamentos',
      'Gestor responsável pela rotina',
      'Comprometimento com rituais',
    ],
    criterio: 'Adoção medida acima do benchmark (% uso, qualidade)',
    cor: 'emerald',
  },
] as const

const corClasses = {
  brand: {
    bg: 'bg-brand',
    bgLight: 'bg-brand/10',
    bgLighter: 'bg-brand/5',
    text: 'text-brand',
    border: 'border-brand/20',
    borderActive: 'border-brand',
  },
  amber: {
    bg: 'bg-amber-500',
    bgLight: 'bg-amber-500/10',
    bgLighter: 'bg-amber-500/5',
    text: 'text-amber-600',
    border: 'border-amber-500/20',
    borderActive: 'border-amber-500',
  },
  emerald: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-500/10',
    bgLighter: 'bg-emerald-500/5',
    text: 'text-emerald-600',
    border: 'border-emerald-500/20',
    borderActive: 'border-emerald-500',
  },
} as const

export function MetodoFluidsalesSection() {
  const tabValues = ETAPAS.map((e) => e.id)

  return (
    <section id="metodo" className="py-16 sm:py-24 bg-gray-50/50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)] bg-size-[24px_24px]" />

      <Container>
        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <Reveal>
              <Badge className="mb-6">Como funciona</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Fluidsales™:{' '}
                <span className="text-brand">3 etapas claras.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cada fase tem entregáveis definidos, responsabilidades claras e critério de conclusão.
              </p>
            </Reveal>
          </div>

          {/* Tabs */}
          <Reveal delay={0.2}>
            <Tabs defaultValue="arquitetura" className="w-full">
              {/* Desktop Tab List */}
              <TabsList className="hidden sm:flex mb-10" variant="pills">
                {ETAPAS.map((etapa) => (
                  <TabTrigger key={etapa.id} value={etapa.id} badge={etapa.duracao}>
                    <span className="flex items-center gap-2">
                      <etapa.icon className="w-4 h-4" />
                      {etapa.titulo}
                    </span>
                  </TabTrigger>
                ))}
              </TabsList>

              {/* Mobile Tab List */}
              <MobileTabsList showDots tabValues={tabValues} className="mb-8">
                {ETAPAS.map((etapa) => (
                  <MobileTabTrigger key={etapa.id} value={etapa.id} badge={etapa.duracao}>
                    {etapa.titulo}
                  </MobileTabTrigger>
                ))}
              </MobileTabsList>

              {/* Tab Content */}
              {ETAPAS.map((etapa) => {
                const cores = corClasses[etapa.cor as keyof typeof corClasses]
                const Icon = etapa.icon

                return (
                  <TabContent key={etapa.id} value={etapa.id} forceMount>
                    <div className={`p-6 sm:p-8 rounded-2xl border-2 ${cores.borderActive} ${cores.bgLighter}`}>
                      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Main description */}
                        <div className="lg:col-span-1">
                          <div className={`w-14 h-14 rounded-2xl ${cores.bgLight} flex items-center justify-center mb-4`}>
                            <Icon className={`w-7 h-7 ${cores.text}`} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{etapa.titulo}</h3>
                          <p className={`text-sm font-medium ${cores.text} mb-4`}>
                            {etapa.subtitulo} • {etapa.duracao}
                          </p>
                          <p className="text-gray-600 leading-relaxed">{etapa.descricao}</p>
                        </div>

                        {/* What we need from you */}
                        <div className="lg:col-span-1">
                          <div className="h-full p-5 sm:p-6 bg-white rounded-xl border border-gray-200">
                            <p className={`text-sm font-bold uppercase tracking-wider ${cores.text} mb-4`}>
                              O que precisamos de você
                            </p>
                            <ul className="space-y-3">
                              {etapa.entregaveis.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <ChevronRight className={`w-4 h-4 ${cores.text} shrink-0 mt-0.5`} />
                                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Definition of done */}
                        <div className="lg:col-span-1">
                          <div className={`h-full p-5 sm:p-6 rounded-xl border-2 ${cores.border} ${cores.bgLight}`}>
                            <p className={`text-sm font-bold uppercase tracking-wider ${cores.text} mb-4`}>
                              Critério de pronto
                            </p>
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-full ${cores.bg} flex items-center justify-center shrink-0`}>
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-gray-700 leading-relaxed">{etapa.criterio}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabContent>
                )
              })}
            </Tabs>
          </Reveal>

          {/* Bottom note */}
          <Reveal delay={0.4}>
            <div className="mt-12 text-center">
              <p className="text-gray-500">
                <strong className="text-gray-700">Transparência total:</strong>{' '}
                você sabe o que entregamos, o que depende do seu time e quando cada etapa termina.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
