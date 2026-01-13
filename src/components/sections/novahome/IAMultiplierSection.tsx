'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { AlertTriangle, Bot, Database, GitBranch } from 'lucide-react'
import { BrowserMockup } from './BrowserMockup'
import { IAOrchestrationVisual } from './IAOrchestrationVisual'

const PREREQUISITOS = [
  {
    numero: '01',
    icon: Database,
    titulo: 'Dados confiáveis',
    descricao: 'IA precisa de dados limpos para funcionar. Garbage in, garbage out.',
  },
  {
    numero: '02',
    icon: GitBranch,
    titulo: 'Processo definido',
    descricao: 'Automação só funciona quando as regras estão claras.',
  },
  {
    numero: '03',
    icon: Bot,
    titulo: 'Time que usa',
    descricao: 'IA aprende com uso real, não com campos vazios.',
  },
] as const

export function IAMultiplierSection() {
  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand/5 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Reveal>
              <Badge variant="warning" className="mb-6 bg-amber-500/10 text-amber-400 border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                2026: IA virou padrão
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Dados confiáveis + processo claro ={' '}
                <span className="text-amber-400">IA que entrega resultado.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                A IA vira vantagem competitiva quando existe rotina e dado confiável.
                Por isso a gente cuida do processo antes de ligar qualquer automação.
              </p>
            </Reveal>
          </div>

          {/* Two columns: Visual + Prerequisites */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            {/* Left: Browser Mockup - Clean, no excessive effects */}
            <Reveal delay={0.3}>
              <BrowserMockup url="crm.bitrix24.com.br/ai-copilot" dark>
                <IAOrchestrationVisual />
              </BrowserMockup>
            </Reveal>

            {/* Right: Prerequisites - Clean cards */}
            <div className="space-y-5">
              <Reveal delay={0.3}>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Pré-requisitos para IA funcionar
                </h3>
              </Reveal>

              {PREREQUISITOS.map((item, index) => (
                <Reveal key={index} delay={0.4 + index * 0.1}>
                  <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/8 transition-colors duration-300">
                    {/* Number */}
                    <div className="w-10 h-10 rounded-lg bg-brand/20 flex items-center justify-center shrink-0">
                      <span className="text-brand font-bold text-sm">{item.numero}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="w-4 h-4 text-brand" />
                        <h4 className="text-lg font-semibold text-white">{item.titulo}</h4>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.descricao}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom message */}
          <Reveal delay={0.7}>
            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-gray-300 leading-relaxed">
                Por isso, a Zopu não "vende IA".{' '}
                <span className="text-white font-medium">
                  A gente coloca a operação em ordem para a IA funcionar.
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-3">
                IA multiplica o que já funciona — quanto melhor a base, maior o resultado.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
