'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import {
  Filter,
  TrendingDown,
  Smartphone,
  DatabaseZap,
  type LucideIcon
} from 'lucide-react'
import { ZOPU_LINKS } from '@/lib/constants'
import { BitrixTrajectoryDiagram } from './BitrixTrajectoryDiagram'

interface Sintoma {
  icon: LucideIcon
  titulo: string
  descricao: string
}

const SINTOMAS: Sintoma[] = [
  {
    icon: Filter,
    titulo: 'Pipeline inflado',
    descricao: 'Deals que não avançam há semanas ocupando espaço e poluindo a visão.',
  },
  {
    icon: TrendingDown,
    titulo: 'Forecast instável',
    descricao: 'Projeção que muda toda segunda-feira, sem previsibilidade real.',
  },
  {
    icon: Smartphone,
    titulo: 'Conversas perdidas',
    descricao: 'Histórico preso no WhatsApp pessoal do vendedor, invisível para a gestão.',
  },
  {
    icon: DatabaseZap,
    titulo: 'Dados corrompidos',
    descricao: 'Duplicados, campos em branco, relatórios que ninguém confia.',
  },
]

export function ProblemaModeloSection() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <Badge variant="warning" className="mb-6">
                O problema real
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                A diferença entre CRM que funciona e CRM abandonado?{' '}
                <span className="text-brand">Modelo operacional.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Muita empresa ativa o CRM achando que{' '}
                <strong className="text-gray-900">"configurar = usar"</strong>. Resultado: o time
                preenche por obrigação, o dado perde confiabilidade e a gestão opera sem visibilidade.
              </p>
            </Reveal>
          </div>

          {/* Trajectory Diagram */}
          <Reveal delay={0.25}>
            <div className="mb-12">
              <p className="text-center text-sm text-gray-500 mb-6">
                O que falta: um <strong className="text-gray-700">modelo operacional de receita</strong> integrado
              </p>
              <BitrixTrajectoryDiagram />
            </div>
          </Reveal>

          {/* Sintomas - Cards com Ícones Únicos */}
          <Reveal delay={0.3}>
            <div className="mb-12">
              <div className="text-center mb-10">
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">
                  Reconhece algum desses sintomas?
                </p>
                <p className="text-gray-500">
                  Se marcou mais de dois, seu CRM está em risco.
                </p>
              </div>

              {/* Grid 2x2 para os 4 sintomas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {SINTOMAS.map((sintoma, index) => {
                  const Icon = sintoma.icon
                  return (
                    <Reveal key={index} delay={0.35 + index * 0.06}>
                      <div className="group relative p-6 bg-white rounded-2xl border border-gray-200/80 hover:border-red-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out hover:-translate-y-1 h-full">
                        {/* Icon container */}
                        <div className="w-12 h-12 mb-4 bg-linear-to-br from-red-50 to-red-100/80 rounded-2xl flex items-center justify-center group-hover:from-red-100 group-hover:to-red-200/80 transition-colors duration-300">
                          <Icon className="w-6 h-6 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <h4 className="text-base font-semibold text-gray-900 mb-2">
                          {sintoma.titulo}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {sintoma.descricao}
                        </p>

                        {/* Subtle danger indicator */}
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-400/60 group-hover:bg-red-500 transition-colors duration-300" />
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* CTA contextual */}
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-white text-base font-semibold rounded-2xl hover:bg-brand-hover transition-all duration-300 shadow-elevated shadow-brand/20 hover:shadow-elevated-hover hover:shadow-brand/30 hover:-translate-y-1"
              >
                Resolver isso agora
              </a>
              <span className="text-sm text-gray-500">
                Conversa direta, sem enrolação
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
