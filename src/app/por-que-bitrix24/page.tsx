import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, X, Plus, ChevronDown } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal, Button, CategoryIcon } from '@/components/shared'
import { FAQJsonLd } from '@/components/seo'
import {
  CategorySectionA,
  CategorySectionB,
  CategorySectionD,
  FAQGrid,
  RelatedPages,
  CaseDestaque,
} from '@/components/sections'
import {
  BITRIX24_TOOL_CATEGORIES,
  BITRIX24_GLOBAL_STATS,
  FAQ_POR_QUE_BITRIX24,
  ZOPU_LINKS,
  ZOPU_STATS,
} from '@/lib/constants'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Bitrix24: Guia Completo [2026] — Preços, Recursos, CRM e Automação',
  description:
    'Tudo sobre Bitrix24: preços em reais, recursos de CRM, automação, WhatsApp, IA CoPilot. Comparativo com HubSpot e Salesforce. Guia atualizado por parceiro Gold oficial.',
  keywords: [
    'Bitrix24',
    'Bitrix24 preço',
    'Bitrix24 Brasil',
    'Bitrix24 CRM',
    'Bitrix24 gratuito',
    'Bitrix24 vale a pena',
    'CRM completo',
    'Bitrix24 vs HubSpot',
    'Bitrix24 vs Salesforce',
    'plataforma all-in-one',
    'CoPilot IA Bitrix24',
  ],
  alternates: {
    canonical: '/por-que-bitrix24',
  },
  openGraph: {
    title: 'Bitrix24: Guia Completo [2026] — Preços, Recursos e CRM',
    description:
      '7 categorias de ferramentas explicadas. CRM, Projetos, IA, Comunicação, Marketing, RH e Sites em uma única plataforma. Comparativo completo.',
    type: 'article',
    images: [
      {
        url: '/images/og-bitrix24-guia.png',
        width: 1200,
        height: 630,
        alt: 'Guia Completo Bitrix24 - Zopu',
      },
    ],
  },
}

// Os IDs das categorias sao identicos aos nomes dos icones
type CategoryIconType = 'crm' | 'copilot' | 'projetos' | 'comunicacao' | 'marketing' | 'rh' | 'sites'

// Dados para comparativo
type ComparativoValue = true | false | 'addon'

const COMPARATIVO_DETALHADO: Array<{
  recurso: string
  hubspot: ComparativoValue
  salesforce: ComparativoValue
  bitrix: ComparativoValue
}> = [
  { recurso: 'CRM Completo', hubspot: true, salesforce: true, bitrix: true },
  { recurso: 'Gestão de Projetos', hubspot: false, salesforce: 'addon', bitrix: true },
  { recurso: 'Chat & Vídeo Ilimitado', hubspot: 'addon', salesforce: 'addon', bitrix: true },
  { recurso: 'IA Nativa (sem custo extra)', hubspot: 'addon', salesforce: 'addon', bitrix: true },
  { recurso: 'Email Marketing', hubspot: true, salesforce: 'addon', bitrix: true },
  { recurso: 'Automação de Processos', hubspot: 'addon', salesforce: 'addon', bitrix: true },
  { recurso: 'Usuários Ilimitados', hubspot: false, salesforce: false, bitrix: true },
]

function ComparativoCell({
  value,
  tone = 'default',
  size = 'md',
}: {
  value: ComparativoValue
  tone?: 'default' | 'highlight'
  size?: 'sm' | 'md'
}) {
  const circleSize = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
  const circleIconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  if (value === true) {
    const circleBg = tone === 'highlight' ? 'bg-brand/10' : 'bg-green-100'
    const iconColor = tone === 'highlight' ? 'text-brand' : 'text-green-600'
    const strokeWidth = tone === 'highlight' ? 2.75 : 3

    return (
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full',
          circleSize,
          circleBg
        )}
        aria-label="Incluso no plano"
        title="Incluso no plano"
      >
        <Check className={cn(circleIconSize, iconColor)} strokeWidth={strokeWidth} />
      </span>
    )
  }

  if (value === false) {
    return (
      <span
        className={cn('inline-flex items-center justify-center rounded-full bg-gray-100', circleSize)}
        aria-label="Nao disponivel"
        title="Nao disponivel"
      >
        <X className={cn(circleIconSize, 'text-gray-400')} strokeWidth={2.75} />
      </span>
    )
  }

  const pillPadding = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1'

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-amber-200/70 bg-amber-50 text-xs font-semibold text-amber-700',
        pillPadding
      )}
      aria-label="Add-on pago"
      title="Add-on pago"
    >
      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
      Add-on
    </span>
  )
}

// FAQ data for Schema markup
const FAQ_SCHEMA_DATA = FAQ_POR_QUE_BITRIX24.map((faq) => ({
  question: faq.pergunta,
  answer: faq.resposta,
}))

export default function PorQueBitrix24Page() {
  // Categorias separadas para diferentes layouts
  const [crm, copilot, projetos, comunicacao, marketing, rh, sites] = BITRIX24_TOOL_CATEGORIES

  return (
    <main className="pt-20 lg:pt-24">
      {/* FAQ Schema for SEO */}
      <FAQJsonLd faqs={FAQ_SCHEMA_DATA} />

      {/* =============================================
          SECAO 1: HERO EDUCACIONAL
          ============================================= */}
      <section className="relative bg-white overflow-hidden pb-8">
        <div className="absolute inset-0 bg-linear-to-b from-white via-white to-gray-50/30" />

        <Container>
          <div className="relative pt-12 sm:pt-16 lg:pt-20 text-center max-w-4xl mx-auto">
            <Reveal>
              <Badge className="mb-6">Guia Completo</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
                Bitrix24: A plataforma completa.{' '}
                <span className="text-brand">Explicada.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                7 categorias. +35 ferramentas. Tudo o que você precisa saber antes de decidir.
              </p>
            </Reveal>

            {/* Ilustração: 7 ícones Phosphor duotone */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-10">
                {BITRIX24_TOOL_CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="group flex flex-col items-center gap-3 transition-all duration-300 ease-out-expo hover:-translate-y-2"
                  >
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-all duration-300 ease-out-expo"
                      style={{ backgroundColor: `${cat.cor}15` }}
                    >
                      <CategoryIcon
                        category={cat.id as CategoryIconType}
                        size={36}
                        color={cat.cor}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                      {cat.nome.split(' ')[0]}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Scroll indicator */}
            <Reveal delay={0.4}>
              <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
                <span className="text-sm">Role para explorar</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =============================================
          SECAO 2: HERO STAT + BADGES
          ============================================= */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F5F5F7]">
        <Container>
          {/* Hero Stat - Inspirado em bitrix24.com.br */}
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-sm sm:text-base text-gray-500 mb-3 font-medium">
                Mais de
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-linear-to-b from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                  15.000.000
                </span>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-medium mt-2">
                organizações já escolheram o Bitrix24
              </p>
            </div>
          </Reveal>

          {/* Platform Stats */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {BITRIX24_GLOBAL_STATS.ferramentas}
                </p>
                <p className="text-sm text-gray-500">ferramentas integradas</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {BITRIX24_GLOBAL_STATS.integracoes}
                </p>
                <p className="text-sm text-gray-500">integrações disponíveis</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300" />
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">7</p>
                <p className="text-sm text-gray-500">categorias de soluções</p>
              </div>
            </div>
          </Reveal>

          {/* Badges de credibilidade - tamanho grande */}
          <Reveal delay={0.3}>
            <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-gray-200/80 shadow-card">
              <p className="text-sm text-gray-500 text-center mb-8 uppercase tracking-wider font-semibold">
                Veja por que empresas confiam no Bitrix24
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12">
                <Image
                  src="/images/bitrix24screen/b24bedges/g2highperformer.webp"
                  alt="G2 High Performer Badge"
                  width={96}
                  height={96}
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
                <Image
                  src="/images/bitrix24screen/b24bedges/g2business.webp"
                  alt="G2 Best Business Software Badge"
                  width={96}
                  height={96}
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
                <Image
                  src="/images/bitrix24screen/b24bedges/capterracrm.png"
                  alt="Capterra Best CRM Software Badge"
                  width={96}
                  height={96}
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
                <Image
                  src="/images/bitrix24screen/b24bedges/capterratask.png"
                  alt="Capterra Best Task Management Badge"
                  width={96}
                  height={96}
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
                <Image
                  src="/images/bitrix24screen/b24bedges/capterrabmanagement.webp"
                  alt="Capterra Best Business Management Badge"
                  width={96}
                  height={96}
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
                <Image
                  src="/images/bitrix24screen/b24bedges/frontrunner.png"
                  alt="Capterra Frontrunner Badge"
                  width={96}
                  height={96}
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =============================================
          SECAO 3: CRM & VENDAS
          ============================================= */}
      <CategorySectionA
        category={crm}
        imagePosition="left"
        background="white"
        imageSrc="/images/bitrix24screen/bitrix24-leads.png"
      />

      {/* =============================================
          SECAO 4: IA COPILOT
          ============================================= */}
      <CategorySectionA
        category={copilot}
        imagePosition="right"
        background="gray"
        imageSrc="/images/bitrix24screen/bitrix24copilot.gif"
      />

      {/* =============================================
          SECAO 5: PROJETOS & TAREFAS
          ============================================= */}
      <CategorySectionA
        category={projetos}
        imagePosition="left"
        background="white"
        imageSrc="/images/bitrix24screen/bitrix24tarefas.gif"
      />

      {/* =============================================
          SECAO 6: COMUNICACAO
          ============================================= */}
      <CategorySectionA
        category={comunicacao}
        imagePosition="right"
        background="gray"
        imageSrc="/images/bitrix24screen/bitrix24comunicacao.gif"
      />

      {/* =============================================
          SECAO 7: MARKETING
          ============================================= */}
      <CategorySectionA
        category={marketing}
        imagePosition="left"
        background="white"
        imageSrc="/images/bitrix24screen/bitrix24marketing.webp"
      />

      {/* =============================================
          SECAO 8: RH & AUTOMACAO
          ============================================= */}
      <CategorySectionA
        category={rh}
        imagePosition="right"
        background="gray"
        imageSrc="/images/bitrix24screen/bitrix24rhautomacao.webp"
      />

      {/* =============================================
          SECAO 9: SITES & E-COMMERCE
          ============================================= */}
      <CategorySectionA
        category={sites}
        imagePosition="left"
        background="white"
        imageSrc="/images/bitrix24screen/bitrix24sites.webp"
      />

      {/* =============================================
          SECAO 10: COMPARATIVO DE MERCADO
          ============================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <Container>
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <Badge className="mb-4">Comparativo</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Mesmo poder.{' '}
                <span className="text-brand">Uma fração do custo.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Compare o Bitrix24 com as principais plataformas do mercado.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-5xl mx-auto">
              {/* Tabela Desktop */}
              <div className="hidden lg:block bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <caption className="sr-only">
                      Comparativo de funcionalidades entre HubSpot, Salesforce e Bitrix24
                    </caption>

                    <thead className="bg-gray-50/80 backdrop-blur-sm">
                      <tr className="divide-x divide-gray-100">
                        <th
                          scope="col"
                          className="text-left p-6 text-sm font-semibold text-gray-600"
                        >
                          Recurso
                        </th>
                        <th scope="col" className="p-6 text-center">
                          <div className="flex flex-col items-center gap-0.5">
                            <p className="text-sm font-semibold text-gray-900">HubSpot</p>
                            <p className="text-xs text-gray-500">Enterprise</p>
                          </div>
                        </th>
                        <th scope="col" className="p-6 text-center">
                          <div className="flex flex-col items-center gap-0.5">
                            <p className="text-sm font-semibold text-gray-900">Salesforce</p>
                            <p className="text-xs text-gray-500">Professional</p>
                          </div>
                        </th>
                        <th scope="col" className="p-6 text-center bg-brand/5">
                          <div className="flex flex-col items-center gap-1">
                            <Badge size="sm" className="mb-0.5">
                              Melhor escolha
                            </Badge>
                            <p className="text-sm font-bold text-brand">Bitrix24</p>
                            <p className="text-xs text-brand/70">Professional</p>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {COMPARATIVO_DETALHADO.map((item, index) => (
                        <tr
                          key={item.recurso}
                          className={cn(
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30',
                            'divide-x divide-gray-100 hover:bg-gray-50/60 transition-colors duration-300 ease-out-expo'
                          )}
                        >
                          <th
                            scope="row"
                            className="text-left p-5 text-sm font-medium text-gray-700"
                          >
                            {item.recurso}
                          </th>
                          <td className="p-5 text-center">
                            <ComparativoCell value={item.hubspot} />
                          </td>
                          <td className="p-5 text-center">
                            <ComparativoCell value={item.salesforce} />
                          </td>
                          <td className="p-5 text-center bg-brand/5">
                            <ComparativoCell value={item.bitrix} tone="highlight" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cards Mobile */}
              <div className="lg:hidden space-y-4">
                {COMPARATIVO_DETALHADO.map((item) => (
                  <div
                    key={item.recurso}
                    className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5"
                  >
                    <p className="text-sm font-semibold text-gray-900 mb-4">{item.recurso}</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-3 text-center">
                        <p className="text-xs text-gray-500 mb-2">HubSpot</p>
                        <ComparativoCell value={item.hubspot} size="sm" />
                      </div>
                      <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-3 text-center">
                        <p className="text-xs text-gray-500 mb-2">Salesforce</p>
                        <ComparativoCell value={item.salesforce} size="sm" />
                      </div>
                      <div className="rounded-xl bg-brand/5 border border-gray-200/80 p-3 text-center">
                        <p className="text-xs text-brand font-semibold mb-2">Bitrix24</p>
                        <ComparativoCell value={item.bitrix} tone="highlight" size="sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preco (mais premium que rodape dentro da tabela) */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">HubSpot</p>
                      <p className="text-xs text-gray-500">Enterprise</p>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Preco mensal</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">$800+</p>
                  <p className="text-sm text-gray-500 mt-1">por mes</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Salesforce</p>
                      <p className="text-xs text-gray-500">Professional</p>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Preco mensal</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">$150</p>
                  <p className="text-sm text-gray-500 mt-1">por usuario</p>
                </div>

                <div className="bg-brand rounded-2xl p-6 text-white shadow-button hover:shadow-button-hover transition-all duration-300 ease-out-expo hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold">Bitrix24</p>
                      <p className="text-xs text-white/70">Professional</p>
                    </div>
                    <Badge variant="dark" size="sm">
                      Preco fixo
                    </Badge>
                  </div>
                  <p className="text-3xl font-bold">R$ fixo</p>
                  <p className="text-sm text-white/80 mt-1">usuarios ilimitados</p>
                </div>
              </div>

              {/* Legenda */}
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-2">
                  <ComparativoCell value={true} size="sm" /> Incluso no plano
                </span>
                <span className="flex items-center gap-2">
                  <ComparativoCell value="addon" size="sm" /> Add-on pago
                </span>
                <span className="flex items-center gap-2">
                  <ComparativoCell value={false} size="sm" /> Nao disponivel
                </span>
              </div>

              <p className="text-center text-xs text-gray-400 mt-4">
                *Precos consultados em dezembro/2024. Valores podem variar conforme plano e regiao.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =============================================
          SECAO 11: FAQ COMPLETO
          ============================================= */}
      <FAQGrid faqs={FAQ_POR_QUE_BITRIX24} />

      {/* =============================================
          SECAO 12: PAGINAS RELACIONADAS
          ============================================= */}
      <RelatedPages />

      {/* =============================================
          SECAO 13: CASE DE SUCESSO
          ============================================= */}
      <CaseDestaque />

      {/* =============================================
          SECAO 14: CTA FINAL SUAVE
          ============================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <Container>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Quer ver como funciona na prática?
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-xl text-gray-300 mb-10">
                Diagnóstico gratuito de 15 minutos. Sem compromisso.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 ease-out-expo shadow-elevated hover:shadow-elevated-hover hover:-translate-y-1"
                >
                  Falar com especialista
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-out-expo" />
                </a>
              </div>
            </Reveal>

            {/* Trust indicators */}
            <Reveal delay={0.3}>
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Gold Partner oficial Bitrix24
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  {ZOPU_STATS.retencao} retencao
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  {ZOPU_STATS.clientes} clientes
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  )
}
