'use client'

import { X, Check, Sparkle } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'

// Consolidated comparison data - ONE devastating comparison
const COMPARATIVO_CONSOLIDADO = {
  problemas: [
    {
      categoria: 'Abordagem',
      items: [
        'Começa pela ferramenta, não pelo processo',
        'Copia campos do CRM antigo sem análise',
        'Vende licença primeiro, entende depois',
      ],
    },
    {
      categoria: 'Implementação',
      items: [
        'Go-live = projeto finalizado',
        'Treinamento genérico de 2h no final',
        'Suporte reativo via ticket',
      ],
    },
    {
      categoria: 'Resultados',
      items: [
        'Mede features entregues, não uso real',
        '60% de retenção média no mercado',
        '"Promessa de IA" sem dados limpos',
      ],
    },
  ],
  solucoes: [
    {
      categoria: 'Abordagem',
      items: [
        'Começa pelo processo, depois configura',
        'Desenha modelo de dados correto do zero',
        'Entende seu negócio antes de vender',
      ],
    },
    {
      categoria: 'Implementação',
      items: [
        'Go-live = começo da parceria',
        'Adoção por função com Fluidz (9.500+ certificados)',
        'Acompanhamento proativo mensal',
      ],
    },
    {
      categoria: 'Resultados',
      items: [
        'Mede uso real + resultado de negócio',
        '96% de retenção anual comprovada',
        'IA calibrada no seu contexto específico',
      ],
    },
  ],
}

// IA highlight data - AI-Ready positioning
const IA_DESTAQUE = {
  badge: 'AI-Ready',
  titulo: '75% das implementações de AI em CRM vão falhar.',
  subtitulo: 'Não por falta de tecnologia. Por falta de fundamentos.',
  fonte: 'Forrester 2025',
  descricao: 'A Metodologia Fluidsales™ resolve os pré-requisitos:',
  items: [
    { antes: 'Dados organizados', depois: 'AI tem contexto real' },
    { antes: 'Processo definido', depois: 'AI sabe quando agir' },
    { antes: 'Time que usa', depois: 'AI aprende com interações reais' },
  ],
  conclusao: 'Não vendemos "promessa de AI". Entregamos a estrutura que faz AI funcionar.',
}

export function DiferenciaisSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-brand/3 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-red-500/3 rounded-full translate-x-1/2 blur-3xl" />

      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Reveal>
            <Badge variant="default" className="mb-6">
              Por que Zopu é diferente
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Implementação Tradicional vs{' '}
              <span className="text-brand">Metodologia Fluidsales™</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A diferença entre CRM abandonado e CRM que o time usa está no processo.
              Não na ferramenta.
            </p>
          </Reveal>
        </div>

        {/* Main Comparison - ONE devastating split */}
        <Reveal delay={0.3}>
          <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elevated-hover">
            {/* Left Column - Problems (Dark) */}
            <div className="bg-bg-dark p-8 sm:p-10 lg:p-12">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-8">
                Implementação Tradicional
              </p>

              <div className="space-y-8">
                {COMPARATIVO_CONSOLIDADO.problemas.map((grupo, groupIndex) => (
                  <div key={groupIndex}>
                    <p className="text-sm text-gray-500 font-medium mb-4">{grupo.categoria}</p>
                    <div className="space-y-4">
                      {grupo.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <X size={12} weight="bold" className="text-red-400" />
                          </div>
                          <p className="text-white/90 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Solutions (Light) */}
            <div className="bg-white p-8 sm:p-10 lg:p-12 border-l-4 border-brand">
              <p className="text-xs text-brand uppercase tracking-wider font-semibold mb-8">
                Metodologia Fluidsales™
              </p>

              <div className="space-y-8">
                {COMPARATIVO_CONSOLIDADO.solucoes.map((grupo, groupIndex) => (
                  <div key={groupIndex}>
                    <p className="text-sm text-gray-500 font-medium mb-4">{grupo.categoria}</p>
                    <div className="space-y-4">
                      {grupo.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={12} weight="bold" className="text-white" />
                          </div>
                          <p className="text-gray-900 font-medium leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* AI-Ready Section - Ponte para o futuro */}
        <Reveal delay={0.4}>
          <div className="max-w-4xl mx-auto mt-10 sm:mt-14">
            <div className="bg-bg-dark rounded-3xl p-8 sm:p-10 lg:p-12 shadow-elevated">
              {/* Header */}
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Sparkle size={14} weight="fill" />
                  {IA_DESTAQUE.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {IA_DESTAQUE.titulo}
                </h3>
                <p className="text-white/60">
                  {IA_DESTAQUE.subtitulo}
                </p>
                <p className="text-xs text-white/40 mt-2">Fonte: {IA_DESTAQUE.fonte}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-8" />

              {/* Pre-requisites */}
              <p className="text-brand text-sm font-semibold mb-6 text-center">{IA_DESTAQUE.descricao}</p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {IA_DESTAQUE.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Check size={16} weight="bold" className="text-brand" />
                      <p className="text-white font-medium text-sm">{item.antes}</p>
                    </div>
                    <p className="text-white/50 text-sm pl-6">→ {item.depois}</p>
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <p className="text-center text-white/80 font-medium italic">
                &ldquo;{IA_DESTAQUE.conclusao}&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
