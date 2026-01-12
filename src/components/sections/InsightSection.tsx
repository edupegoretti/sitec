'use client'

import { useState, useCallback } from 'react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Check, ArrowRight, X } from 'lucide-react'
import { Target, BookOpen, Headphones, Database } from '@phosphor-icons/react'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// Categorias de falha baseadas em pesquisa Gartner/Forrester 2024-2025
const FAILURE_CATEGORIES = [
  {
    id: 'planejamento',
    icon: Target,
    label: 'Planejamento',
    estatistica: '48%',
    estatisticaTexto: 'das falhas são por falta de estratégia clara',
    fonte: 'Gartner 2024',
    errosComuns: [
      { texto: 'Implementar features sem mapear processos existentes', percent: '65%' },
      { texto: 'Ausência de sponsor executivo no projeto', percent: '42%' },
      { texto: 'Customização excessiva que engessa evolução', percent: '28%' },
    ],
    solucoes: [
      'Metodologia Fluidsales™: 2 semanas de diagnóstico antes de configurar',
      'Mapeamento de processos com stakeholders-chave',
      'Definição de sponsor interno obrigatória',
    ],
    resultado: 'Ferramenta espelha seu processo, não o contrário',
  },
  {
    id: 'capacitacao',
    icon: BookOpen,
    label: 'Capacitação',
    estatistica: '38%',
    estatisticaTexto: 'das falhas são por treinamento insuficiente',
    fonte: 'Forrester 2025',
    errosComuns: [
      { texto: 'Treinamento único no go-live — equipe esquece em 30 dias', percent: '58%' },
      { texto: 'Manual em PDF como única referência', percent: '47%' },
      { texto: 'Resistência dos usuários por falta de contexto', percent: '25%' },
    ],
    solucoes: [
      'Fluidz: trilhas personalizadas por função (vendedor, gestor, admin)',
      '9.500+ certificações emitidas com gamificação',
      'Conteúdo atualizado a cada release do Bitrix24',
    ],
    resultado: 'Adoção real da equipe, não só login no sistema',
  },
  {
    id: 'suporte',
    icon: Headphones,
    label: 'Suporte',
    estatistica: '32%',
    estatisticaTexto: 'das falhas são por falta de acompanhamento',
    fonte: 'CSO Insights',
    errosComuns: [
      { texto: 'Suporte reativo via ticket — problemas acumulam', percent: '52%' },
      { texto: 'Projeto entregue = responsabilidade do cliente', percent: '47%' },
      { texto: 'Tempo de resposta de 48h+ para questões críticas', percent: '38%' },
    ],
    solucoes: [
      'Call mensal proativo para revisar uso e ajustar',
      'WhatsApp direto com time técnico para urgências',
      'Ajustes e melhorias contínuas inclusas no contrato',
    ],
    resultado: 'Problemas resolvidos antes de impactar a operação',
  },
  {
    id: 'dados',
    icon: Database,
    label: 'Dados',
    estatistica: '35%',
    estatisticaTexto: 'das falhas são por dados de baixa qualidade',
    fonte: 'Gartner 2024',
    errosComuns: [
      { texto: 'Migrar tudo do sistema anterior sem limpeza', percent: '38%' },
      { texto: 'Duplicatas e inconsistências herdadas do sistema anterior', percent: '35%' },
      { texto: 'Relatórios não confiáveis por dados sujos', percent: '32%' },
    ],
    solucoes: [
      'Limpeza e validação antes de migrar qualquer dado',
      'Deduplicação e padronização automatizadas',
      'Enriquecimento de dados com fontes externas',
    ],
    resultado: 'Relatórios confiáveis desde o início',
  },
]

export function InsightSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [direction, setDirection] = useState(0)
  const category = FAILURE_CATEGORIES[activeCategory]

  const handleSelect = useCallback((index: number) => {
    setDirection(index > activeCategory ? 1 : -1)
    setActiveCategory(index)
  }, [activeCategory])

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#FAFAFC] overflow-hidden relative">
      {/* Decorative blurred elements */}
      <div className="absolute top-32 right-0 w-80 h-80 bg-brand/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-red-500/2 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <Reveal>
            <Badge className="mb-4">Por que CRMs falham</Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              50% dos CRMs falham em entregar resultado.{' '}
              <span className="text-brand">E como evitamos.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600">
              Metodologia validada em <span className="font-semibold text-gray-900">450+ clientes.</span>
            </p>
          </Reveal>
        </div>

        {/* Tabs - Premium styling */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {FAILURE_CATEGORIES.map((cat, index) => {
              const Icon = cat.icon
              const isActive = index === activeCategory
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(index)}
                  className={cn(
                    'relative px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl font-medium transition-all duration-300 ease-out-expo',
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeInsightTab"
                      className="absolute inset-0 bg-brand rounded-2xl shadow-elevated shadow-brand/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} weight="duotone" />
                    <span className="hidden sm:inline">{cat.label}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Conteúdo do tab ativo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Estatística principal - DESTAQUE MÁXIMO */}
            <div className="mb-10 sm:mb-12">
              <div className="flex items-baseline gap-4 justify-center flex-wrap">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-brand tabular-nums">
                  {category.estatistica}
                </span>
                <span className="text-xl sm:text-2xl text-gray-700 max-w-sm text-center sm:text-left font-medium">
                  {category.estatisticaTexto}
                </span>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                Fonte: {category.fonte}
              </p>
            </div>

            {/* Grid de 2 colunas: Erros vs Soluções - ALTO CONTRASTE */}
            <div className="grid lg:grid-cols-2 gap-0 max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-elevated-hover">
              {/* Coluna de Erros - FUNDO ESCURO */}
              <div className="bg-bg-dark p-6 sm:p-8 lg:p-10">
                <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold mb-6">
                  Erros que consultorias tradicionais cometem
                </p>
                <div className="space-y-5">
                  {category.errosComuns.map((erro, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white leading-relaxed">
                          {erro.texto}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {erro.percent} das implementações
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coluna de Soluções - FUNDO BRANCO COM ACCENT */}
              <div className="bg-white p-6 sm:p-8 lg:p-10 border-l-4 border-brand">
                <p className="text-xs text-brand uppercase tracking-wider font-semibold mb-6">
                  Como a Zopu resolve
                </p>
                <div className="space-y-5">
                  {category.solucoes.map((solucao, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <p className="text-gray-900 leading-relaxed font-medium">
                        {solucao}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Resultado dentro do card de soluções */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {category.resultado}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats - Premium styling */}
        <Reveal delay={0.5}>
          <div className="mt-14 sm:mt-20">
            <div className="bg-brand rounded-3xl p-6 sm:p-8 lg:p-10 shadow-elevated shadow-brand/20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {[
                  { numero: ZOPU_STATS.clientes, label: 'clientes ativos' },
                  { numero: '+20%', label: 'conversão (case real)' },
                  { numero: ZOPU_STATS.diasParaFuncionar, label: 'dias para operar' },
                  { numero: ZOPU_STATS.tempoResposta, label: 'SLA de resposta' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-white">
                      {item.numero}
                    </p>
                    <p className="text-sm text-white/70 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA - Premium button */}
        <Reveal delay={0.6}>
          <div className="mt-10 sm:mt-12 text-center">
            <a
              href={ZOPU_LINKS.whatsappEspecialista}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-bg-dark text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#0d2d4d] transition-all duration-300 ease-out-expo shadow-elevated hover:shadow-elevated-hover hover:-translate-y-1 group"
            >
              Falar com especialista
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-out-expo" />
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Descubra qual categoria de falha sua empresa está mais exposta
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
