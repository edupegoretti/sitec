import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { CASE_DESTAQUE, ZOPU_LINKS } from '@/lib/constants'
import {
  Play,
  Quotes,
  ArrowRight,
  CheckCircle,
  TrendUp,
  Users,
  Target,
  ChartLineUp,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Case Ferro em Brasa | +20% Conversão | Zopu',
  description:
    'Como a Ferro em Brasa aumentou 20% a taxa de conversão com estruturação de SDR, Closer e CS usando Bitrix24. Case completo com depoimento do proprietário.',
  alternates: {
    canonical: '/cases/ferro-em-brasa',
  },
  openGraph: {
    title: 'Case Ferro em Brasa | +20% Conversão',
    description:
      'Como a Ferro em Brasa aumentou 20% a taxa de conversão com Bitrix24 implementado pela Zopu.',
  },
}

const timeline = [
  {
    fase: 'Contexto',
    titulo: 'E-commerce em crescimento',
    descricao: 'Ferro em Brasa é especializada em identificação bovina personalizada. Com o crescimento da equipe comercial, o CRM básico não atendia mais.',
  },
  {
    fase: 'Problema',
    titulo: 'Sem previsibilidade comercial',
    descricao: CASE_DESTAQUE.desafio.descricao,
  },
  {
    fase: 'Abordagem',
    titulo: 'Estruturação completa',
    descricao: CASE_DESTAQUE.solucao.descricao,
  },
  {
    fase: 'Resultado',
    titulo: '+20% de conversão',
    descricao: CASE_DESTAQUE.resultado.descricao,
  },
]

const entregas = [
  {
    icon: Users,
    titulo: 'Estrutura SDR + Closer',
    descricao: 'Separação clara de papéis: pré-vendas qualifica, closer fecha.',
  },
  {
    icon: Target,
    titulo: 'Playbooks de vendas',
    descricao: 'Roteiros e processos documentados para cada etapa do funil.',
  },
  {
    icon: ChartLineUp,
    titulo: 'Dashboard de métricas',
    descricao: 'Visibilidade em tempo real de conversão, ciclo e forecast.',
  },
  {
    icon: TrendUp,
    titulo: 'Automações',
    descricao: 'Tarefas automáticas, alertas de SLA e follow-ups programados.',
  },
]

export default function CaseFerroEmBrasaPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
              >
                ← Voltar para cases
              </Link>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Reveal>
                  <Badge className="mb-4">{CASE_DESTAQUE.setor}</Badge>
                </Reveal>

                <Reveal delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    {CASE_DESTAQUE.empresa}
                  </h1>
                </Reveal>

                <Reveal delay={0.2}>
                  <p className="text-xl text-gray-600 mb-6">
                    {CASE_DESTAQUE.desafio.titulo}
                  </p>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-brand">{CASE_DESTAQUE.resultado.metricaPrincipal}</p>
                      <p className="text-sm text-gray-500">{CASE_DESTAQUE.resultado.metricaLabel}</p>
                    </div>
                    <div className="h-12 w-px bg-gray-200" />
                    <a
                      href={CASE_DESTAQUE.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
                    >
                      <Play size={20} weight="fill" />
                      Assistir depoimento
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.4}>
                <a
                  href={CASE_DESTAQUE.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-video rounded-2xl overflow-hidden bg-gray-900 group"
                >
                  {/* YouTube thumbnail - usando maxresdefault do vídeo */}
                  <Image
                    src="https://img.youtube.com/vi/IhrMZZRuH54/maxresdefault.jpg"
                    alt="Depoimento João - Ferro em Brasa"
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={32} weight="fill" className="text-white ml-1" />
                    </div>
                  </div>
                </a>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                A jornada
              </h2>
            </Reveal>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <Reveal key={item.fase} delay={0.1 * index}>
                  <div className="flex gap-6">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-brand">{index + 1}</span>
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="w-px h-16 bg-gray-200 mx-auto mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">
                        {item.fase}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.titulo}</h3>
                      <p className="text-gray-600">{item.descricao}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* O que entregamos */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Entregas</Badge>
              <h2 className="text-3xl font-bold text-gray-900">
                O que foi implementado
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {entregas.map((entrega, index) => {
              const Icon = entrega.icon
              return (
                <Reveal key={entrega.titulo} delay={0.1 * index}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 h-full text-center">
                    <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Icon size={24} weight="duotone" className="text-brand" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{entrega.titulo}</h3>
                    <p className="text-sm text-gray-600">{entrega.descricao}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Resultados extras */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <Badge className="mb-4">Resultados</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Além do +20% de conversão
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {CASE_DESTAQUE.resultado.extras.map((extra, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={24} weight="fill" className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-700">{extra}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Depoimento */}
      <section className="py-16 sm:py-24 bg-bg-dark">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <Quotes size={48} weight="fill" className="text-brand mx-auto mb-6" />
              <blockquote className="text-2xl sm:text-3xl font-medium text-white mb-6 leading-relaxed">
                "{CASE_DESTAQUE.depoimento.texto}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-brand">
                    {CASE_DESTAQUE.depoimento.autor.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">{CASE_DESTAQUE.depoimento.autor}</p>
                  <p className="text-sm text-gray-400">{CASE_DESTAQUE.depoimento.cargo}</p>
                </div>
              </div>

              <a
                href={CASE_DESTAQUE.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
              >
                <Play size={20} weight="fill" />
                Assistir depoimento completo
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quer resultados como esses?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Converse com um especialista e descubra como podemos estruturar
                sua operação comercial.
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
                <Link
                  href="/cases"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Ver outros cases
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
