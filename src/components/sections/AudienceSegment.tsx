'use client'

import { Container } from '@/components/layout'
import { Badge, Reveal, Button } from '@/components/shared'
import { Users, Building2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function AudienceSegment() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <Badge className="mb-4">Para quem é</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Escolha seu caminho
            </h2>
            <p className="text-lg text-gray-600">
              Soluções específicas para cada momento da sua empresa.
            </p>
          </Reveal>
        </div>

        {/* Cards de segmentação */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* PMEs */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 hover:border-gray-300 shadow-sm hover:shadow-card-hover transition-all duration-300 ease-out-expo hover:-translate-y-1 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-brand/10 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-brand" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Para PMEs</h3>
                  <p className="text-gray-500 text-sm">A partir de 5 usuários</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 grow">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">CRM Express em 30 dias</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">Preço fixo em reais</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">IA CoPilot nativa do Bitrix24</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Economia média de R$ 3.381/mês
                  </span>
                </li>
              </ul>

              <Link
                href="/#produtos"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-300 ease-out-expo shadow-sm hover:shadow-card-hover"
              >
                Ver soluções para PMEs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          {/* Enterprise */}
          <Reveal delay={0.2}>
            <div className="bg-bg-dark rounded-2xl p-8 border border-bg-dark shadow-elevated h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Para Enterprise
                  </h3>
                  <p className="text-gray-400 text-sm">100 a 5.000+ usuários</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 grow">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Customização profunda</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">
                    Integrações SAP, TOTVS, ERPs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">SSO, auditoria, compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-300">Account manager dedicado</span>
                </li>
              </ul>

              <Link
                href="/bitrix24-enterprise"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 ease-out-expo shadow-sm hover:shadow-card-hover"
              >
                Falar com especialista Enterprise
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
