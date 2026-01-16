'use client'

import { useState } from 'react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Map,
  GraduationCap,
  Rocket,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  FileText,
  BarChart3,
  ShieldCheck,
} from 'lucide-react'
import { ZOPU_LINKS } from '@/lib/constants'
import { transitions } from '@/lib/motion'

interface MarcoEntrega {
  dia: number
  titulo: string
  subtitulo: string
  icon: React.ElementType
  cor: {
    bg: string
    bgHover: string
    text: string
    border: string
    gradient: string
  }
  entregas: string[]
  metrica: string
  documento: string
}

const MARCOS: MarcoEntrega[] = [
  {
    dia: 3,
    titulo: 'Setup Inicial',
    subtitulo: 'Ambiente configurado e pronto',
    icon: Zap,
    cor: {
      bg: 'bg-blue-50',
      bgHover: 'hover:bg-blue-100/80',
      text: 'text-blue-600',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600',
    },
    entregas: [
      'Ambiente Bitrix24 configurado',
      'Usuários criados com permissões',
      'Integrações essenciais ativadas',
      'Kickoff com time comercial',
    ],
    metrica: 'Ambiente acessível por 100% do time',
    documento: 'Checklist de Setup',
  },
  {
    dia: 7,
    titulo: 'Processo Desenhado',
    subtitulo: 'Blueprint do seu comercial',
    icon: Map,
    cor: {
      bg: 'bg-emerald-50',
      bgHover: 'hover:bg-emerald-100/80',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    entregas: [
      'Mapeamento do processo atual',
      'Pipeline configurado com etapas reais',
      'Campos obrigatórios definidos',
      'Automações críticas ativadas',
    ],
    metrica: 'Processo validado pelos gestores',
    documento: 'Mapa de Processo',
  },
  {
    dia: 15,
    titulo: 'Time Treinado',
    subtitulo: 'Cada um sabe o que fazer',
    icon: GraduationCap,
    cor: {
      bg: 'bg-violet-50',
      bgHover: 'hover:bg-violet-100/80',
      text: 'text-violet-600',
      border: 'border-violet-200',
      gradient: 'from-violet-500 to-violet-600',
    },
    entregas: [
      'Treinamento por função (Fluidz)',
      'Rotinas diárias definidas',
      'Certificação individual',
      'Playbook de operação entregue',
    ],
    metrica: '100% do time operando no sistema',
    documento: 'Playbook de Operação',
  },
  {
    dia: 30,
    titulo: 'Operação Voando',
    subtitulo: 'Time autônomo e produtivo',
    icon: Rocket,
    cor: {
      bg: 'bg-amber-50',
      bgHover: 'hover:bg-amber-100/80',
      text: 'text-amber-600',
      border: 'border-amber-200',
      gradient: 'from-amber-500 to-amber-600',
    },
    entregas: [
      'Time operando sem supervisão',
      'Dados sendo preenchidos corretamente',
      'Rituais de gestão funcionando',
      'Primeiros insights de dados',
    ],
    metrica: 'Check de autonomia aprovado',
    documento: 'Certificado de Autonomia',
  },
]

// Logos simplificados para prova social
const PROOF_LOGOS = ['WEG', 'SBT', 'Stone', 'Unimed', 'Komeco']

export function Plano90DiasSection() {
  const [expandedMarco, setExpandedMarco] = useState<number | null>(null)

  const toggleMarco = (dia: number) => {
    setExpandedMarco(expandedMarco === dia ? null : dia)
  }

  return (
    <section
      id="plano-adocao"
      className="py-16 sm:py-24 bg-linear-to-b from-white via-gray-50/30 to-white relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand/3 rounded-full translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full -translate-x-1/2 blur-3xl" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Reveal>
              <Badge className="mb-6">Plano de Adoção</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Seu time voando em 30 dias.{' '}
                <span className="text-brand">Ou continuamos até funcionar.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Cada semana com entrega concreta e verificável. Sem surpresas, sem "depende", sem achismo.
              </p>
            </Reveal>
          </div>

          {/* Garantia */}
          <Reveal delay={0.22}>
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">
                  Se em 30 dias seu time não estiver usando, continuamos sem custo adicional
                </span>
              </div>
            </div>
          </Reveal>

          {/* Timeline Visual */}
          <Reveal delay={0.25}>
            <div className="mb-12">
              {/* Connection line - Desktop */}
              <div className="hidden lg:block relative h-2 bg-gray-100 rounded-full mb-8 mx-16">
                <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-blue-500 via-emerald-500 via-violet-500 to-amber-500 rounded-full opacity-20" />

                {/* Progress dots */}
                {MARCOS.map((marco, index) => (
                  <div
                    key={marco.dia}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${(index / (MARCOS.length - 1)) * 100}%` }}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-linear-to-br ${marco.cor.gradient} shadow-lg transform -translate-x-1/2 flex items-center justify-center`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Marco Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {MARCOS.map((marco, index) => {
                  const Icon = marco.icon
                  const isExpanded = expandedMarco === marco.dia

                  return (
                    <Reveal key={marco.dia} delay={0.3 + index * 0.08}>
                      <div
                        className={`group relative bg-white rounded-2xl border ${
                          isExpanded ? marco.cor.border : 'border-gray-200/80'
                        } shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden`}
                      >
                        {/* Card Header - Always visible */}
                        <button
                          onClick={() => toggleMarco(marco.dia)}
                          className={`w-full p-5 sm:p-6 text-left ${marco.cor.bgHover} transition-colors duration-300`}
                        >
                          {/* Day badge */}
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1 bg-linear-to-r ${marco.cor.gradient} text-white text-xs font-bold rounded-full mb-4`}
                          >
                            Dia {marco.dia}
                          </div>

                          {/* Icon + Title */}
                          <div className="flex items-start gap-3 mb-2">
                            <div
                              className={`shrink-0 w-10 h-10 ${marco.cor.bg} rounded-xl flex items-center justify-center`}
                            >
                              <Icon className={`w-5 h-5 ${marco.cor.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 leading-tight">
                                {marco.titulo}
                              </h3>
                              <p className="text-sm text-gray-500 mt-0.5">
                                {marco.subtitulo}
                              </p>
                            </div>
                          </div>

                          {/* Expand indicator */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-400 font-medium">
                              Ver entregas
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={transitions.fast}
                              className="overflow-hidden"
                            >
                              <div className={`p-5 sm:p-6 pt-0 ${marco.cor.bg}/30`}>
                                {/* Entregas */}
                                <div className="space-y-2.5 mb-5">
                                  {marco.entregas.map((entrega, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                      <CheckCircle2
                                        className={`w-4 h-4 mt-0.5 shrink-0 ${marco.cor.text}`}
                                      />
                                      <span className="text-sm text-gray-700 leading-relaxed">
                                        {entrega}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                {/* Metrica */}
                                <div
                                  className={`p-3 rounded-xl ${marco.cor.bg} border ${marco.cor.border} mb-3`}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <BarChart3 className={`w-4 h-4 ${marco.cor.text}`} />
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                      Métrica de sucesso
                                    </span>
                                  </div>
                                  <p className={`text-sm font-medium ${marco.cor.text}`}>
                                    {marco.metrica}
                                  </p>
                                </div>

                                {/* Documento */}
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <FileText className="w-4 h-4" />
                                  <span>Documento: {marco.documento}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* Prova Social */}
          <Reveal delay={0.5}>
            <div className="text-center mb-10">
              <p className="text-sm text-gray-500 mb-4">
                Esse é o mesmo plano usado por empresas como:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
                {PROOF_LOGOS.map((name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold text-gray-400"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.55}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                Agendar apresentação
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={ZOPU_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 font-medium hover:text-brand transition-colors"
              >
                Tirar dúvidas no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
