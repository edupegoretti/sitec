'use client'

import Link from 'next/link'
import { Check, ArrowRight, Buildings, Info } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { Reveal, Button } from '@/components/shared'
import { ZOPU_LINKS } from '@/lib/constants'

const IDEAL_PARA = [
  'Precisa organizar vendas (pré-vendas + vendas)',
  'Time de 2 a 15 vendedores',
  'Quer resultado rápido (semanas, não meses)',
  'WhatsApp é canal importante de vendas',
  'Ainda não tem CRM ou usa planilha/CRM básico',
]

const CONSIDERE_REVOPS = [
  'Precisa conectar marketing + vendas + pós-venda',
  'Quer previsibilidade de receita (forecast)',
  'Tem CS / Customer Success estruturado',
  'Precisa medir retenção e expansão',
]

const CONSIDERE_GROWTH = [
  'Operação complexa (multi-unidade, integrações)',
  'Precisa de escopo personalizado',
  'Requisitos de compliance/segurança',
]

export function QualificacaoSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <Container>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                CRM Express é para você?
              </h2>
              <p className="text-lg text-gray-600">
                Escolha com base na sua necessidade, não no tamanho da empresa
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* CRM Express é para você */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl p-6 border-2 border-success/30 shadow-sm h-full relative">
                {/* Recommended badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-success text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Recomendado
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-6 mt-2">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Check size={20} weight="bold" className="text-success" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    CRM Express é ideal se:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {IDEAL_PARA.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check
                        size={18}
                        weight="bold"
                        className="text-success shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Considere RevOps Launch */}
            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                    <ArrowRight size={20} weight="bold" className="text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Considere RevOps Launch se:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {CONSIDERE_REVOPS.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-brand/20 flex items-center justify-center shrink-0 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/revopslaunch"
                  className="inline-flex items-center gap-2 mt-6 text-brand font-medium text-sm hover:gap-3 transition-all"
                >
                  Conhecer RevOps Launch
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </Reveal>

            {/* Considere Mapa de Performance de Receita */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Buildings size={20} weight="duotone" className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Considere o Mapa de Performance de Receita se:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {CONSIDERE_GROWTH.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/mapadeperformance"
                  className="inline-flex items-center gap-2 mt-6 text-gray-600 font-medium text-sm hover:text-gray-900 hover:gap-3 transition-all"
                >
                  Conhecer o Mapa de Performance
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Nota importante */}
          <Reveal delay={0.4}>
            <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Info size={20} weight="duotone" className="text-brand" />
                </div>
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">O tamanho da empresa não define qual produto é certo.</span>
                    {' '}Uma startup de 20 pessoas pode precisar do Mapa de Performance.
                    Uma empresa de 500 pode começar com CRM Express.
                    <span className="font-medium text-brand"> O que define é a necessidade, não o porte.</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.5}>
            <div className="text-center">
              <p className="text-gray-600 mb-4">Não sabe qual escolher?</p>
              <Button
                variant="primary"
                href={ZOPU_LINKS.whatsappEspecialista}
                showArrow
                external
              >
                Fazer diagnóstico gratuito de 20 minutos
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
