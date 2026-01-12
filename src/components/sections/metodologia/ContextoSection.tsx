'use client'

import { Lightbulb, Target, Users, TrendUp, ArrowRight } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'

// Princípios que guiam a metodologia (não timeline)
const PRINCIPIOS_METODOLOGIA = [
  {
    id: 'entender',
    numero: '01',
    titulo: 'Entender antes de configurar',
    descricao: 'Nenhuma configuração acontece antes de mapear como sua empresa realmente vende. CRM reflete processo, não o contrário.',
    icone: Lightbulb,
    cor: '#635BFF',
  },
  {
    id: 'processo',
    numero: '02',
    titulo: 'Processo antes de ferramenta',
    descricao: 'A ferramenta é o último passo, não o primeiro. Documentamos fluxos, etapas e responsáveis antes de tocar no sistema.',
    icone: Target,
    cor: '#10B981',
  },
  {
    id: 'adocao',
    numero: '03',
    titulo: 'Adoção é resultado, não treinamento',
    descricao: 'Treinamento genérico não funciona. Criamos trilhas por função e acompanhamos até virar rotina — não só no go-live.',
    icone: Users,
    cor: '#F59E0B',
  },
  {
    id: 'resultado',
    numero: '04',
    titulo: 'Sucesso se mede em uso real',
    descricao: 'Não medimos features entregues. Medimos adoção real, qualidade de dados e impacto em receita. Baseline antes, resultado depois.',
    icone: TrendUp,
    cor: '#EC4899',
  },
]

export function ContextoSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Decoração sutil */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <Container className="relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge variant="default" className="mb-6">
                15 Anos de Evolução
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Metodologia nascida da prática.{' '}
                <span className="text-brand">Validada com sucesso em 450+ empresas.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A Metodologia Fluidsales™ surgiu de padrões que vimos se repetir em centenas de implementações.
                O que funciona não é mágica — é método.
              </p>
            </Reveal>
          </div>

          {/* Princípios Grid */}
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-12">
            {PRINCIPIOS_METODOLOGIA.map((principio, index) => {
              const Icon = principio.icone
              return (
                <Reveal key={principio.id} delay={0.2 + index * 0.1}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-elevated transition-all duration-300 h-full">
                    <div className="flex items-start gap-5">
                      {/* Número e Ícone */}
                      <div className="shrink-0">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${principio.cor}15` }}
                        >
                          <Icon size={24} weight="duotone" style={{ color: principio.cor }} />
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-xs font-bold uppercase tracking-wider"
                            style={{ color: principio.cor }}
                          >
                            Princípio {principio.numero}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {principio.titulo}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {principio.descricao}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Bridge to next section */}
          <Reveal delay={0.6}>
            <div className="text-center">
              <a
                href="#insight"
                className="group inline-flex items-center gap-2 text-brand font-semibold hover:underline"
              >
                Ver como aplicamos esses princípios
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
