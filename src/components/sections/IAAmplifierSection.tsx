'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { AlertTriangle, Bot, Database, GitBranch } from 'lucide-react'

const PREREQUISITOS = [
  {
    icon: Database,
    titulo: 'Dados confiáveis',
    descricao: 'IA precisa de dados limpos para funcionar. Garbage in, garbage out.',
  },
  {
    icon: GitBranch,
    titulo: 'Processo definido',
    descricao: 'Automação só funciona quando as regras estão claras.',
  },
  {
    icon: Bot,
    titulo: 'Time que usa',
    descricao: 'IA aprende com uso real, não com campos vazios.',
  },
] as const

export function IAAmplifierSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand/10 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <Reveal>
            <Badge variant="warning" className="mb-6 bg-amber-500/10 text-amber-400 border-amber-500/20">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
              2026: IA virou padrão
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              IA não conserta dado ruim.{' '}
              <span className="text-amber-400">Ela só escala o caos.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              Em 2026, IA virou padrão. Se seu CRM é o "sistema de registro", ele precisa ter
              dados confiáveis e processo definido — senão a IA automatiza erro, não resultado.
            </p>
          </Reveal>

          {/* Prerequisitos cards */}
          <Reveal delay={0.3}>
            <div className="grid sm:grid-cols-3 gap-6">
              {PREREQUISITOS.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-brand/30 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center mb-4 mx-auto group-hover:bg-brand/30 transition-colors">
                    <item.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.titulo}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.descricao}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Bottom message */}
          <Reveal delay={0.4}>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-400">
                A Zopu prepara sua operação para IA funcionar de verdade —{' '}
                <span className="text-white font-medium">não promete milagre.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
