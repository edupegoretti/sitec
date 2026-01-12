import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { ComparativoZopu, PilaresZopu, GarantiaZopuCard } from '@/components/sections/zopu-vs-parceiros'
import { ZOPU_STATS, ZOPU_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Zopu vs Outros Parceiros Bitrix24 — Comparativo de Metodologia e Retenção',
  description:
    'Compare parceiros Bitrix24: Zopu tem 96% de retenção anual vs média de mercado de 60%. Metodologia Metodologia Fluidsales™, Fluidz Academy (9.500+ certificados), SLA de 2 minutos.',
  keywords: [
    'comparativo parceiros Bitrix24',
    'melhor parceiro Bitrix24',
    'Zopu vs concorrentes',
    'parceiro Bitrix24 confiável',
    'implementador Bitrix24 Brasil',
    'consultoria Bitrix24 avaliação',
  ],
  alternates: {
    canonical: '/zopu-vs-outros-parceiros',
  },
  openGraph: {
    title: 'Zopu vs Outros Parceiros Bitrix24 — Comparativo',
    description:
      '96% de retenção vs 60% da média. Veja a diferença em metodologia, suporte e adoção real.',
    type: 'website',
    images: [
      {
        url: '/images/og-zopu-vs-parceiros.png',
        width: 1200,
        height: 630,
        alt: 'Zopu vs Outros Parceiros Bitrix24 - Comparativo',
      },
    ],
  },
}

const CERTIFICACOES = [
  { src: '/images/bitrix24screen/gold-partner.png', alt: 'Gold Partner Bitrix24' },
  { src: '/images/bitrix24screen/aicpasoc2.webp', alt: 'AICPA SOC 2 Type II' },
  { src: '/images/bitrix24screen/pmp.webp', alt: 'PMP Certified' },
  { src: '/images/bitrix24screen/awscertified.webp', alt: 'AWS Certified' },
  { src: '/images/bitrix24screen/googlegenai.png', alt: 'Google Gen AI' },
]

export default function ZopuVsOutrosPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Por que Zopu</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                O parceiro Bitrix24 que{' '}
                <span className="text-brand">entrega resultado</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Não competimos por volume. Competimos por qualidade.
                E {ZOPU_STATS.retencao} de retenção prova isso.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Estatística Destaque */}
      <section className="py-12 bg-bg-dark">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Reveal>
              <div>
                <p className="text-5xl font-bold text-brand">{ZOPU_STATS.retencao}</p>
                <p className="text-gray-400 mt-2">retenção anual</p>
                <p className="text-xs text-gray-500 mt-1">referência entre parceiros Bitrix24</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="text-5xl font-bold text-white">{ZOPU_STATS.clientes}</p>
                <p className="text-gray-400 mt-2">clientes ativos</p>
                <p className="text-xs text-gray-500 mt-1">em {ZOPU_STATS.paises} países</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <p className="text-5xl font-bold text-white">{ZOPU_STATS.alunosFluidz}</p>
                <p className="text-gray-400 mt-2">profissionais certificados</p>
                <p className="text-xs text-gray-500 mt-1">via Fluidz Academy</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Tabela Comparativa Premium */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Comparativo</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                O que nos diferencia
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja por que empresas que buscam resultado escolhem a Zopu
              </p>
            </Reveal>
          </div>

          <ComparativoZopu />
        </Container>
      </section>

      {/* Pilares Zopu */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Nossa essência</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Os pilares da Zopu
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Por que 96% dos clientes renovam conosco
              </p>
            </Reveal>
          </div>

          <PilaresZopu />
        </Container>
      </section>

      {/* Metodologia */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <Badge className="mb-4">Metodologia</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Processo estruturado,{' '}
                  <span className="text-brand">resultado previsível</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Nossa metodologia acontece em fases (30 a 90 dias), conforme o escopo.
                  Foi testada e validada em mais de 450 clientes, com entregas claras e métricas definidas.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold shrink-0">
                      30
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Primeiros 30 dias</p>
                      <p className="text-sm text-gray-600">Operação funcionando, time treinado, WhatsApp integrado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-brand/80 text-white flex items-center justify-center font-bold shrink-0">
                      60
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Até 60 dias</p>
                      <p className="text-sm text-gray-600">Automações avançadas, CoPilot ativo, processos otimizados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-brand/60 text-white flex items-center justify-center font-bold shrink-0">
                      90+
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">60+ dias</p>
                      <p className="text-sm text-gray-600">Escala, integrações complexas, governança e autonomia do time</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/revopslaunch"
                  className="inline-flex items-center gap-2 text-brand font-semibold mt-6 hover:gap-3 transition-all"
                >
                  Conhecer metodologia completa
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <GarantiaZopuCard />
          </div>
        </Container>
      </section>

      {/* Certificações */}
      <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-100">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <Badge className="mb-4">Credenciais</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Certificações e reconhecimentos
              </h2>
              <p className="text-gray-600">
                Profissionalismo comprovado por certificações internacionais
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {CERTIFICACOES.map((cert) => (
                <Image
                  key={cert.alt}
                  src={cert.src}
                  alt={cert.alt}
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-bg-dark">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Se você está em dúvida, nós te ajudamos a decidir
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Converse com um especialista e descubra por que {ZOPU_STATS.retencao} dos
                nossos clientes renovam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <a
                  href={ZOPU_LINKS.whatsappEspecialista}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-2xl hover:bg-brand-hover transition-all shadow-lg shadow-brand/20 hover:-translate-y-1"
                >
                  Falar com especialista
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/revopslaunch"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-colors"
                >
                  Ver metodologia
                </Link>
              </div>

              {/* Badges de certificação */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">
                  Certificações e credenciais
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
                  {CERTIFICACOES.map((cert) => (
                    <Image
                      key={cert.alt}
                      src={cert.src}
                      alt={cert.alt}
                      width={64}
                      height={64}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain opacity-50 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
