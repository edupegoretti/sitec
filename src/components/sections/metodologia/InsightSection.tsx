'use client'

import { ArrowDown } from 'lucide-react'
import { X, Check, Path, Gear, ChartLineUp, UsersThree } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'

// Erros comuns de consultorias tradicionais
const ABORDAGEM_TRADICIONAL = [
  'Configuram antes de entender o processo',
  'Importam dados sem limpeza prévia',
  'Treinam a equipe só no go-live',
  'Entregam o projeto e desaparecem',
]

// Abordagem Zopu
const ABORDAGEM_ZOPU = [
  'Entendemos o processo antes de configurar',
  'Limpamos e estruturamos os dados primeiro',
  'Treinamos a equipe antes, durante e depois',
  'Acompanhamos por 12 meses após go-live',
]

// As 4 perguntas que a Zopu faz ANTES de configurar
const PERGUNTAS_ZOPU = [
  {
    numero: '01',
    icon: Path,
    pergunta: 'Como seu cliente compra?',
    detalhe: 'Mapeamos a jornada real, do primeiro contato ao pós-venda.',
  },
  {
    numero: '02',
    icon: Gear,
    pergunta: 'Qual processo faz sentido?',
    detalhe: 'Desenhamos o fluxo antes de configurar qualquer campo.',
  },
  {
    numero: '03',
    icon: ChartLineUp,
    pergunta: 'Que dados você precisa?',
    detalhe: 'Definimos métricas que importam, não relatórios genéricos.',
  },
  {
    numero: '04',
    icon: UsersThree,
    pergunta: 'Quem vai usar — e como?',
    detalhe: 'Planejamos a adoção desde o dia zero.',
  },
]

export function InsightSection() {
  return (
    <section id="insight" className="py-20 sm:py-28 lg:py-32 bg-bg-secondary overflow-hidden relative">
      {/* Decorative blurred elements - padrão home/DiferenciaisSection */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-brand/3 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-red-500/3 rounded-full translate-x-1/2 blur-3xl" />

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Reveal>
            <Badge variant="default" className="mb-6">
              Por que funciona
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
              A maioria começa pela ferramenta.{' '}
              <span className="block sm:inline text-brand">Nós começamos pelo processo.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Antes de configurar qualquer campo, respondemos 4 perguntas que definem o sucesso.
            </p>
          </Reveal>
        </div>

        {/* Comparação split dark/light - padrão DiferenciaisSection */}
        <Reveal delay={0.25}>
          <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elevated-hover mb-12 sm:mb-16">
            {/* Left Column - Tradicional (Dark) */}
            <div className="bg-bg-dark p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <X size={16} weight="bold" className="text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Abordagem tradicional
                  </p>
                  <p className="text-white/50 text-xs">O que a maioria faz</p>
                </div>
              </div>

              <div className="space-y-4">
                {ABORDAGEM_TRADICIONAL.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={10} weight="bold" className="text-red-400" />
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-red-400 text-sm font-medium">
                  Resultado: CRM que ninguém usa
                </p>
              </div>
            </div>

            {/* Right Column - Zopu (Light) */}
            <div className="bg-white p-8 sm:p-10 border-l-4 border-brand">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                  <Check size={16} weight="bold" className="text-brand" />
                </div>
                <div>
                  <p className="text-xs text-brand uppercase tracking-wider font-semibold">
                    Abordagem Zopu
                  </p>
                  <p className="text-gray-500 text-xs">Processo primeiro</p>
                </div>
              </div>

              <div className="space-y-4">
                {ABORDAGEM_ZOPU.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} weight="bold" className="text-white" />
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <p className="text-brand text-sm font-medium">
                  Resultado: CRM que o time usa
                </p>
                <span className="text-xs text-gray-500 font-medium bg-gray-50 px-2.5 py-1 rounded-full">
                  96% retenção
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Perguntas - Grid 2x2 */}
        <Reveal delay={0.35}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                As 4 perguntas que fazemos antes de configurar
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {PERGUNTAS_ZOPU.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-elevated hover:border-brand/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand/15 transition-colors">
                        <Icon size={24} weight="duotone" className="text-brand" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-brand">{item.numero}</span>
                        </div>
                        <p className="text-gray-900 font-semibold text-base mb-1">
                          {item.pergunta}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {item.detalhe}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Bridge CTA */}
        <Reveal delay={0.4}>
          <div className="max-w-3xl mx-auto mt-12 sm:mt-16">
            <div className="bg-bg-dark rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex-1">
                  <p className="text-white/60 text-sm font-medium mb-1">
                    O próximo passo
                  </p>
                  <p className="text-xl sm:text-2xl text-white font-medium leading-snug">
                    Só depois dessas respostas, aplicamos os 6 pilares.
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href="#pilares"
                    className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 group shadow-sm"
                  >
                    Ver os 6 pilares
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
