import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import {
  ChartLineUp,
  WhatsappLogo,
  Robot,
  Target,
  Timer,
  TrendUp,
  CheckCircle,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Bitrix24 para Times Comerciais | Venda Mais, Perca Menos | Zopu',
  description:
    'CRM que seu time comercial vai realmente usar. Pipeline visual, WhatsApp integrado, automações que economizam tempo. Resultados em 30 dias.',
  alternates: {
    canonical: '/para/comercial',
  },
  openGraph: {
    title: 'Bitrix24 para Times Comerciais | Venda Mais, Perca Menos',
    description:
      'CRM que seu time comercial vai realmente usar. Pipeline visual, WhatsApp integrado, automações. Resultados em 30 dias.',
  },
}

const painPoints = [
  {
    problema: 'Leads se perdem no WhatsApp pessoal',
    solucao: 'WhatsApp corporativo integrado ao CRM',
  },
  {
    problema: 'Vendedor esquece de fazer follow-up',
    solucao: 'Tarefas automáticas e lembretes',
  },
  {
    problema: 'Gestor descobre os problemas quando já é tarde',
    solucao: 'Dashboard em tempo real',
  },
  {
    problema: 'Proposta demora dias para sair',
    solucao: 'Geração automática de propostas',
  },
]

const features = [
  {
    icon: ChartLineUp,
    title: 'Pipeline Visual',
    description: 'Arraste e solte. Veja exatamente onde cada negócio está.',
  },
  {
    icon: WhatsappLogo,
    title: 'WhatsApp Integrado',
    description: 'Histórico completo no CRM. Nada se perde.',
  },
  {
    icon: Robot,
    title: 'IA CoPilot',
    description: 'Resumos automáticos, próximos passos sugeridos.',
  },
  {
    icon: Target,
    title: 'Metas e Comissões',
    description: 'Acompanhe metas individuais e de equipe.',
  },
  {
    icon: Timer,
    title: 'Automações',
    description: 'Follow-ups, alertas e tarefas sem esforço manual.',
  },
  {
    icon: TrendUp,
    title: 'Relatórios',
    description: 'Conversão, ciclo de vendas, forecast.',
  },
]

const results = [
  { metric: '-87%', label: 'tempo de proposta' },
  { metric: '-65%', label: 'no-shows' },
  { metric: '+93%', label: 'acurácia de forecast' },
]

export default function ComercialPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Para Times Comerciais</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                O CRM que seu time{' '}
                <span className="text-brand">vai usar de verdade</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Pipeline visual, WhatsApp integrado, automações que economizam tempo.
                Resultados visíveis em {ZOPU_STATS.diasParaFuncionar} dias.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20"
                >
                  Falar com especialista
                  <ArrowRight size={20} />
                </a>
                <Link
                  href="/crm-express"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Ver CRM Express
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Dores → Soluções */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">O problema</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Reconhece alguma dessas situações?
              </h2>
            </Reveal>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {painPoints.map((item, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-500 text-lg">✕</span>
                  </div>
                  <p className="text-gray-600 flex-1">{item.problema}</p>
                  <ArrowRight size={20} className="text-gray-400 shrink-0" />
                  <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} weight="fill" className="text-green-500" />
                  </div>
                  <p className="text-gray-900 font-medium flex-1">{item.solucao}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Funcionalidades</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Tudo que seu time precisa
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Reveal key={feature.title} delay={0.1 * index}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} weight="duotone" className="text-brand" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Resultados */}
      <section className="py-16 sm:py-24 bg-bg-dark">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Resultados de clientes reais
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {results.map((result, index) => (
              <Reveal key={result.label} delay={0.1 * index}>
                <div className="text-center">
                  <p className="text-5xl font-bold text-brand mb-2">{result.metric}</p>
                  <p className="text-gray-400">{result.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Pronto para transformar suas vendas?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Converse com um especialista e veja como estruturar sua operação comercial em {ZOPU_STATS.diasParaFuncionar} dias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
                >
                  Falar com especialista
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
