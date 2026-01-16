'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { Bot, Database, GitBranch, Sparkles } from 'lucide-react'
import { BrowserMockup } from './BrowserMockup'
import { IAOrchestrationVisual } from './IAOrchestrationVisual'

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

export function IAMultiplierSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <Reveal>
              <Badge className="mb-4">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                2026: IA virou padrão
              </Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Dados confiáveis + processo claro ={' '}
                <span className="text-brand">IA que entrega resultado.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                A IA vira vantagem competitiva quando existe rotina e dado confiável.
                Por isso a gente cuida do processo antes de ligar qualquer automação.
              </p>
            </Reveal>
          </div>

          {/* Two columns: Visual + Prerequisites */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Browser Mockup - Dark mockup stands out on light bg */}
            <div className="order-1 lg:order-1">
              <Reveal delay={0.3}>
                <div className="relative">
                  <BrowserMockup url="crm.bitrix24.com.br/ai-copilot" dark>
                    <IAOrchestrationVisual />
                  </BrowserMockup>

                  {/* Floating badge - like "A plataforma" section */}
                  <div className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 w-12 h-12 sm:w-14 sm:h-14 bg-brand rounded-xl shadow-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Prerequisites - Clean cards on light */}
            <div className="order-2 lg:order-2 space-y-6">
              <Reveal delay={0.3}>
                <div>
                  <p className="text-sm font-semibold text-brand uppercase tracking-wide mb-2">
                    Pré-requisitos
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Para IA funcionar de verdade
                  </h3>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Não adianta ligar IA sem estrutura. Ela precisa de fundação sólida para entregar resultado.
                </p>
              </Reveal>

              <ul className="space-y-4">
                {PREREQUISITOS.map((item, index) => (
                  <Reveal key={index} delay={0.5 + index * 0.1}>
                    <li className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-brand" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.titulo}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.descricao}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom quote - styled like "A plataforma" testimonial */}
          <Reveal delay={0.8}>
            <div className="mt-14 sm:mt-20 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-5 h-5 text-brand" />
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 italic mb-4 leading-relaxed">
                  "A Zopu não 'vende IA'. A gente coloca a operação em ordem para a IA funcionar."
                </p>
                <p className="text-sm text-gray-500">
                  IA multiplica o que já funciona — quanto melhor a base, maior o resultado.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
