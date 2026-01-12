import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { Badge, Reveal, SectionHeader } from '@/components/shared'
import { Bitrix24PlansTable } from '@/components/sections'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import { ArrowRight, Check, Lightning, Stack, Buildings } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Preços Bitrix24 [Janeiro 2026] — Tabela em Reais + Comparativo de Planos',
  description:
    'Tabela de preços Bitrix24 atualizada em reais. Plano Free (gratuito), Standard R$249/mês, Professional R$499/mês, Enterprise sob consulta. Inclui 1 ano de suporte Zopu Gold Partner.',
  keywords: [
    'Bitrix24 preço',
    'Bitrix24 quanto custa',
    'licença Bitrix24',
    'Bitrix24 grátis',
    'Bitrix24 gratuito',
    'planos Bitrix24',
    'Bitrix24 Standard',
    'Bitrix24 Professional',
    'Bitrix24 Enterprise',
    'Bitrix24 preço em reais',
  ],
  alternates: {
    canonical: '/licencas-bitrix24',
  },
  openGraph: {
    title: 'Preços Bitrix24 [2026] — Tabela Atualizada em Reais',
    description:
      'Todos os planos Bitrix24 com preços em reais: Free, Standard, Professional e Enterprise. Sem variação cambial. Suporte Gold Partner incluso.',
    type: 'website',
    images: [
      {
        url: '/images/og-precos-bitrix24.png',
        width: 1200,
        height: 630,
        alt: 'Tabela de Preços Bitrix24 - Zopu',
      },
    ],
  },
}

const implementationOptions = [
  {
    id: 'crm-express',
    nome: 'CRM Express',
    subtitulo: 'Foco em vendas',
    prazo: 'Até 30 dias',
    para: 'PMEs que precisam estruturar vendas rapidamente',
    quando: [
      'Sem CRM ou com CRM que ninguém usa',
      'Um time comercial e poucos fluxos',
      'Prioridade é começar a vender com processo',
    ],
    icon: Lightning,
    href: '/crm-express',
  },
  {
    id: 'revops-launch',
    nome: 'RevOps Launch™',
    subtitulo: 'Operação completa',
    prazo: 'Até 60 dias',
    para: 'Empresas que querem integrar marketing, vendas e pós-venda',
    quando: [
      'Mais de um time toca o pipeline',
      'Precisa unificar funil, metas e métricas',
      'Handoffs e automações são críticos',
    ],
    icon: Stack,
    href: '/revopslaunch',
  },
  {
    id: 'enterprise',
    nome: 'Metodologia Fluidsales™',
    subtitulo: 'Projetos complexos',
    prazo: 'Sob medida',
    para: 'Grandes operações com múltiplos times e integrações',
    quando: [
      'Múltiplas unidades, produtos ou regiões',
      'Integrações com ERP/BI e governança',
      'Regras de acesso e compliance elevados',
    ],
    icon: Buildings,
    href: '/fluidsales',
  },
]

export default function LicencasBitrix24Page() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 bg-linear-to-br from-[#F9FAFC] to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40" />
        <Container>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Reveal>
              <Badge className="mb-6">Gold Partner Bitrix24</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Licenças Bitrix24 em{' '}
                <span className="text-brand">reais</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Preço fixo em reais, sem surpresas de câmbio. Escolha o plano ideal
                e conte com a Zopu para a implementação.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Explicação: Licença vs Implementação */}
      <section className="py-12 bg-white border-y border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Licença */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Licença Bitrix24</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    A plataforma: CRM, automações, IA, colaboração e +35 ferramentas.
                    Você paga direto ao Bitrix24.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check weight="bold" className="w-4 h-4 text-green-500" />
                      Acesso à plataforma completa
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check weight="bold" className="w-4 h-4 text-green-500" />
                      Atualizações automáticas
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check weight="bold" className="w-4 h-4 text-green-500" />
                      Suporte técnico Bitrix24
                    </li>
                  </ul>
                </div>

                {/* Implementação */}
                <div className="bg-brand/5 rounded-2xl p-6 border border-brand/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Implementação Zopu</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Configuração estratégica, integrações, treinamento e suporte especializado.
                    É o que faz o Bitrix24 funcionar de verdade.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check weight="bold" className="w-4 h-4 text-brand" />
                      Metodologia Metodologia Fluidsales™
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check weight="bold" className="w-4 h-4 text-brand" />
                      Treinamento via Fluidz Academy
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">
                      <Check weight="bold" className="w-4 h-4 text-brand" />
                      365 dias de suporte especializado
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Planos Bitrix24 */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <SectionHeader
            label="Licenças Bitrix24"
            title="Compare os planos"
            description="Preço fixo em reais, sem variação cambial. Todos os planos incluem CRM, automações e IA."
          />
          <Bitrix24PlansTable />
        </Container>
      </section>

      {/* Implementação Zopu */}
      <section className="py-16 sm:py-24 bg-[#F9FAFC]">
        <Container>
          <SectionHeader
            label="Implementação Especializada"
            title="Escolha como implementar"
            description="A licença é o começo. A implementação é o que faz acontecer."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {implementationOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <Reveal key={option.id} delay={0.1 * index}>
                  <Link
                    href={option.href}
                    className="block bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand/30 hover:shadow-lg transition-all duration-300 h-full group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                        <Icon size={24} weight="duotone" className="text-brand" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{option.nome}</h3>
                        <p className="text-sm text-gray-500">{option.subtitulo}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{option.para}</p>

                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                        Quando faz sentido
                      </p>
                      <ul className="space-y-2">
                        {option.quando.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check weight="bold" className="w-4 h-4 text-brand mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-brand">{option.prazo}</span>
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>

          {/* CTA */}
          <Reveal delay={0.4}>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Não sabe qual combinação é ideal para você?
              </p>
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
              >
                Falar com especialista
                <ArrowRight size={20} />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Por que comprar conosco */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Por que comprar Bitrix24 com a Zopu?
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-brand mb-2">R$</div>
                  <p className="text-gray-600 text-sm">Preço fixo em reais, sem surpresas de câmbio</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-brand mb-2">{ZOPU_STATS.retencao}</div>
                  <p className="text-gray-600 text-sm">Clientes que renovam todo ano</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-brand mb-2">365</div>
                  <p className="text-gray-600 text-sm">Dias de suporte especializado inclusos</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gray-500 text-sm mt-8">
                Como Gold Partner oficial, oferecemos as mesmas condições do Bitrix24
                com o diferencial da implementação estratégica e suporte em português.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  )
}
