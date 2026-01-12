import { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'
import {
  ChartBar,
  Eye,
  Gauge,
  TrendUp,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Bitrix24 para Gestores e CEOs | Visibilidade Total | Zopu',
  description:
    'Dashboard executivo, métricas de receita, previsibilidade de pipeline. Tome decisões baseadas em dados, não em achismos.',
  alternates: {
    canonical: '/para/gestores',
  },
  openGraph: {
    title: 'Bitrix24 para Gestores e CEOs | Visibilidade Total',
    description:
      'Dashboard executivo, métricas de receita, previsibilidade. Decisões baseadas em dados.',
  },
}

const challenges = [
  {
    challenge: 'Não sei o que está no pipeline',
    outcome: 'Dashboard em tempo real com forecast',
  },
  {
    challenge: 'Vendedor diz uma coisa, sistema diz outra',
    outcome: 'Dados automáticos, sem digitação manual',
  },
  {
    challenge: 'Não consigo prever a receita do mês',
    outcome: 'Forecast com 93% de acurácia',
  },
  {
    challenge: 'CRM anterior foi abandonado',
    outcome: '96% de retenção anual comprova adoção',
  },
]

const benefits = [
  {
    icon: Eye,
    title: 'Visibilidade Total',
    description: 'Veja o pipeline, atividades e métricas sem depender de ninguém.',
  },
  {
    icon: ChartBar,
    title: 'Métricas de Receita',
    description: 'Conversão, ciclo de vendas, ticket médio, LTV. Tudo em um lugar.',
  },
  {
    icon: Gauge,
    title: 'Forecast Confiável',
    description: 'Previsão de receita baseada em dados históricos e pipeline atual.',
  },
  {
    icon: TrendUp,
    title: 'ROI Mensurável',
    description: 'Acompanhe o retorno do investimento em tempo real.',
  },
  {
    icon: Clock,
    title: 'Economia de Tempo',
    description: 'Menos reuniões de status. Os dados estão sempre atualizados.',
  },
  {
    icon: ShieldCheck,
    title: 'Governança',
    description: 'Histórico completo, auditoria, controle de acessos.',
  },
]

const metrics = [
  { value: ZOPU_STATS.retencao, label: 'retenção anual', highlight: true },
  { value: ZOPU_STATS.diasParaFuncionar, label: 'dias para funcionar', suffix: ' dias' },
  { value: ZOPU_STATS.clientes, label: 'empresas atendidas' },
]

export default function GestoresPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Para Gestores e CEOs</Badge>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Visibilidade total.{' '}
                <span className="text-brand">Decisões precisas.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Pare de pedir relatórios. Dashboard executivo com métricas de receita,
                pipeline e performance do time em tempo real.
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
                  href="/revopslaunch"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Ver metodologia
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 bg-bg-dark">
        <Container>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={0.1 * index}>
                <div>
                  <p className={`text-4xl sm:text-5xl font-bold ${metric.highlight ? 'text-brand' : 'text-white'}`}>
                    {metric.value}{metric.suffix || ''}
                  </p>
                  <p className="text-gray-400 mt-2">{metric.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Desafios → Resultados */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Cenário atual</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                De onde você está para onde quer chegar
              </h2>
            </Reveal>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {challenges.map((item, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-500 text-lg">✕</span>
                  </div>
                  <p className="text-gray-600 flex-1">{item.challenge}</p>
                  <ArrowRight size={20} className="text-gray-400 shrink-0" />
                  <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} weight="fill" className="text-green-500" />
                  </div>
                  <p className="text-gray-900 font-medium flex-1">{item.outcome}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefícios */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">O que você ganha</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Controle total da operação
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Reveal key={benefit.title} delay={0.1 * index}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 h-full">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={24} weight="duotone" className="text-brand" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Diferencial */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Por que a Zopu</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                O problema não é a ferramenta. É a implementação.
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {ZOPU_STATS.taxaFalha} dos CRMs falham não por falta de recursos, mas por implementação
                inadequada. Por isso {ZOPU_STATS.retencao} dos nossos clientes renovam ano após ano.
              </p>
              <Link
                href="/zopu-vs-outros-parceiros"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
              >
                Por que a Zopu é diferente
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-bg-dark">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Pronto para ter visibilidade real?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Converse com um especialista e veja como estruturar sua operação de receita.
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
