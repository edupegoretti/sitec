'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Warning, ChartLine, Gear, ChatCircleDots, Timer } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'
import { cn } from '@/lib/utils'

// Copy regionalizada BR - linguagem natural para empreendedor PME
const MOTIVOS_FALHA = [
  {
    id: 'adocao',
    label: 'Adoção',
    headline: 'Meu time não usa o CRM',
    copy: 'Você investiu no sistema, pagou consultoria, fez treinamento. Dois meses depois, metade do time voltou pra planilha. A outra metade preenche por obrigação.',
    sintomas: [
      'Vendedor reclama que demora pra registrar',
      'Gestor não confia nos números',
      'Reunião de pipeline ainda é no feeling',
    ],
    gancho: 'Sistema que ninguém usa é só custo.',
    icon: Warning,
  },
  {
    id: 'previsao',
    label: 'Previsão',
    headline: 'Não sei quanto vou vender esse mês',
    copy: 'O diretor pergunta a previsão do trimestre. Você olha o pipeline, faz uma conta de cabeça, joga um percentual de segurança — e torce pra acertar.',
    sintomas: [
      'Mesmo cliente aparece três vezes com nomes diferentes',
      'Relatório de marketing não fecha com o de vendas',
      'Ninguém sabe qual número é o certo',
    ],
    gancho: 'Previsão baseada em dado errado é chute.',
    icon: ChartLine,
  },
  {
    id: 'processo',
    label: 'Processo',
    headline: 'Cada vendedor faz de um jeito',
    copy: 'Você tem um ou dois vendedores que sempre batem meta. O resto depende do mês. O problema é que ninguém sabe o que os bons fazem de diferente.',
    sintomas: [
      'Conversão varia muito entre vendedores',
      'Negociação para no meio sem ninguém saber o próximo passo',
      'Não existe um jeito certo de vender',
    ],
    gancho: 'Se o processo está na cabeça, você não tem processo.',
    icon: Gear,
  },
  {
    id: 'comunicacao',
    label: 'Comunicação',
    headline: 'Informação se perde entre os times',
    copy: 'Marketing diz que entregou lead qualificado. Vendas diz que o lead era frio. Atendimento descobre que o cliente comprou uma coisa e esperava outra.',
    sintomas: [
      'Passagem de bastão entre times é manual',
      'Cliente repete a mesma história em cada contato',
      'Cada área tem sua própria planilha',
    ],
    gancho: 'Cliente percebe quando os times não conversam.',
    icon: ChatCircleDots,
  },
  {
    id: 'complexidade',
    label: 'Complexidade',
    headline: 'Medo de sistema "grande demais"',
    copy: 'Bitrix24 é completo — e isso é uma vantagem enorme. Mas sem o acompanhamento certo, essa riqueza pode intimidar. A Zopu treina sua equipe pra dominar o sistema em semanas, usando só o que realmente importa pro seu resultado.',
    sintomas: [
      'Receio de que a equipe não consiga acompanhar',
      'Preocupação com o tempo de adaptação',
      'Dúvida se vale o investimento em algo tão robusto',
    ],
    gancho: 'Completo não precisa ser complicado.',
    icon: Timer,
  },
]

// Tab component
interface MotivoTabProps {
  motivo: typeof MOTIVOS_FALHA[0]
  isActive: boolean
  onClick: () => void
}

function MotivoTab({ motivo, isActive, onClick }: MotivoTabProps) {
  const Icon = motivo.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium transition-all duration-300',
        'flex items-center gap-2 min-h-11',
        'focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
        isActive
          ? 'text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      )}
      aria-label={`Ver problema: ${motivo.label}`}
    >
      {isActive && (
        <motion.div
          layoutId="activeMotivoTab"
          className="absolute inset-0 rounded-xl bg-gray-900 shadow-lg"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        <Icon size={18} weight={isActive ? 'fill' : 'duotone'} />
        <span className="text-sm sm:text-base">{motivo.label}</span>
      </span>
    </button>
  )
}

// Content component - layout HeroHome
function ExpandedContent({ motivo }: { motivo: typeof MOTIVOS_FALHA[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-gray-50 border border-gray-100 shadow-sm p-6 sm:p-8 lg:p-10"
    >
      {/* Headline */}
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
        {motivo.headline}
      </h3>

      {/* Copy */}
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-4">
        {motivo.copy}
      </p>

      {/* Sintomas */}
      <div className="mt-6">
        <ul className="space-y-2.5">
          {motivo.sintomas.map((sintoma, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 shrink-0" />
              {sintoma}
            </li>
          ))}
        </ul>
      </div>

      {/* Gancho (condicional) */}
      {motivo.gancho && (
        <blockquote className="mt-6 border-l-4 border-brand pl-4 py-1">
          <p className="text-base font-medium text-gray-900 italic">
            "{motivo.gancho}"
          </p>
        </blockquote>
      )}
    </motion.div>
  )
}

export function DorSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeMotivo = MOTIVOS_FALHA[activeIndex]

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <section
      id="problema"
      className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden"
    >
      <Container>
        {/* Header - Tipografia HeroHome */}
        <div className="text-center mb-8 sm:mb-12">
          <Reveal>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Os Desafios
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">
              O que pode{' '}
              <span className="text-brand">travar seu CRM</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              A ferramenta funciona. O segredo está em como ela é implementada.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={0.3}>
          <div
            className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2 px-4 -mx-4 sm:mx-0 sm:px-0 sm:overflow-visible scrollbar-hide"
            role="tablist"
            aria-label="Problemas de CRM"
          >
            {MOTIVOS_FALHA.map((motivo, index) => (
              <MotivoTab
                key={motivo.id}
                motivo={motivo}
                isActive={index === activeIndex}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.4}>
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <ExpandedContent
                key={activeMotivo.id}
                motivo={activeMotivo}
              />
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Progress indicator */}
        <div className="mt-8 max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">
              {activeIndex + 1} de {MOTIVOS_FALHA.length}
            </span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={{ width: '0%' }}
              animate={{ width: `${((activeIndex + 1) / MOTIVOS_FALHA.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Bridge CTA */}
        <Reveal delay={0.5}>
          <div className="mt-10 text-center">
            <a
              href="#insight"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-300 shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Ver como resolvemos
              <ArrowRight className="w-4 h-4" weight="bold" />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
