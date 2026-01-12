import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { Badge, Reveal } from '@/components/shared'
import { CaseDestaque, CasesGrid } from '@/components/sections/cases'
import { ZOPU_STATS, ZOPU_LINKS, CASE_DESTAQUE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Cases de Sucesso | Resultados Reais | Zopu',
  description:
    'Veja resultados reais de clientes Zopu. -87% tempo de proposta, -65% no-show, +93% acurácia de forecast. Números que comprovam nossa metodologia.',
  alternates: {
    canonical: '/cases',
  },
  openGraph: {
    title: 'Cases de Sucesso | Resultados Reais',
    description:
      'Resultados reais de clientes Zopu: -87% tempo de proposta, -65% no-show, +93% acurácia de forecast.',
  },
}

export default function CasesPage() {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-linear-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <Badge className="mb-6">Cases de sucesso</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Resultados reais
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Não prometemos. Entregamos. Veja o que nossos clientes conquistaram
                com Bitrix24 implementado como estratégia de receita.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Case Destaque - Ferro em Brasa */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Case em destaque</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {CASE_DESTAQUE.empresa}
              </h2>
              <p className="text-lg text-gray-600 mt-2">{CASE_DESTAQUE.setor}</p>
            </Reveal>
          </div>

          <CaseDestaque />
        </Container>
      </section>

      {/* Estatística destaque */}
      <section className="py-12 bg-bg-dark">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div>
              <p className="text-5xl sm:text-6xl font-bold text-brand">
                {ZOPU_STATS.retencao}
              </p>
              <p className="text-gray-400">retenção anual</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-700" />
            <div className="text-gray-300 text-lg max-w-md">
              Estes resultados explicam por que {ZOPU_STATS.retencao} dos nossos
              clientes permanecem conosco.
            </div>
          </div>
        </Container>
      </section>

      {/* Cases Grid */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="text-center mb-12">
            <Reveal>
              <Badge className="mb-4">Mais resultados</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Resultados por setor
              </h2>
            </Reveal>
          </div>

          <CasesGrid />
        </Container>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-gray-50">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-500 text-sm">
                Todos os resultados apresentados são de clientes reais da Zopu.
                Resultados individuais podem variar de acordo com a complexidade
                da operação, maturidade da equipe e adesão à metodologia.
              </p>
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
                Quer resultados assim?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Converse com um especialista e descubra o potencial da sua
                operação com Bitrix24 implementado como estratégia de receita.
              </p>
              <a
                href={ZOPU_LINKS.whatsappEspecialista}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white font-semibold rounded-xl hover:bg-brand-hover transition-colors"
              >
                Quero resultados assim
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
