'use client'

import { Rocket, Target, Buildings } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal } from '@/components/shared'

const EMPRESAS_EXPERIENCIA = [
  'Conta Azul',
  'Omie',
  'Cisco',
  'TOTVS',
  'Microsoft',
  'Salesforce',
]

export function HistoriaSobre() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Story */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand/10 rounded-full mb-6">
                <Rocket size={16} weight="duotone" className="text-brand" />
                <span className="text-sm font-medium text-brand">Nossa História</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                15+ anos de experiência em{' '}
                <span className="text-brand">operações de receita</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A Zopu nasceu da visão de fundadores com <strong className="text-gray-900">mais de 15 anos de experiência</strong> em
                  empresas líderes de tecnologia e gestão empresarial.
                </p>
                <p>
                  Trabalhamos em gigantes como <strong className="text-gray-900">Conta Azul, Omie, Cisco, TOTVS, Microsoft e Salesforce</strong>,
                  onde aprendemos o que funciona — e o que não funciona — na implementação de tecnologia para vendas.
                </p>
                <p>
                  Essa experiência nos mostrou que o problema nunca é a ferramenta.
                  O problema está na <strong className="text-gray-900">forma como ela é implementada e adotada</strong>.
                </p>
              </div>
            </Reveal>

            {/* Logos/Companies */}
            <Reveal delay={0.3}>
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-4">Experiência em:</p>
                <div className="flex flex-wrap gap-2">
                  {EMPRESAS_EXPERIENCIA.map((empresa) => (
                    <span
                      key={empresa}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {empresa}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column - Mission Card */}
          <div>
            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                    <Target size={22} weight="duotone" className="text-brand" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand uppercase tracking-wide">Nossa Missão</span>
                    <h3 className="text-lg font-bold text-gray-900">Por que existimos</h3>
                  </div>
                </div>

                <blockquote className="text-lg sm:text-xl font-medium text-gray-900 leading-relaxed">
                  &ldquo;Existimos para <span className="text-brand">libertar pessoas de ineficiências</span> e{' '}
                  <span className="text-brand">destravar o crescimento</span> dos negócios.&rdquo;
                </blockquote>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center">
                      <Buildings size={20} weight="duotone" className="text-brand" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Acreditamos que</p>
                      <p className="text-gray-900 font-medium">Tecnologia deve servir pessoas, não o contrário.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
