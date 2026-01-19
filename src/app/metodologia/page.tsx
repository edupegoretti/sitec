import { Metadata } from 'next'
import {
  HeroMetodologiaGrowth,
  DorSection,
  ContextoSection,
  InsightSection,
  PilaresShowcaseSection,
  ProcessoFasesSection,
  DiferenciaisSection,
  ProdutoSelectorSection,
  FAQMetodologia,
  CTAMetodologiaFinal,
} from '@/components/sections/metodologia'
import { DiagnosticoModal } from '@/components/shared'
import { FAQJsonLd, HowToJsonLd } from '@/components/seo'
import { GROWTH_ARCHITECTURE_FAQ } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Metodologia Fluidsales™ | CRM que funciona e AI-Ready — Zopu',
  description:
    '70% dos CRMs falham. O seu não precisa. A metodologia que 450+ empresas usam para transformar Bitrix24 em motor de receita — com os fundamentos que fazem AI funcionar de verdade. 96% de retenção.',
  keywords: [
    'Metodologia Fluidsales',
    'metodologia CRM',
    'implementação Bitrix24',
    'CRM que funciona',
    'RevOps',
    'Revenue Operations',
    'adoção de CRM',
    'processo de vendas',
    'CRM AI-Ready',
    'Zopu',
  ],
  alternates: {
    canonical: '/metodologia',
  },
  openGraph: {
    title: 'Metodologia Fluidsales™ | CRM que funciona — e AI-Ready',
    description:
      '70% dos CRMs falham. O seu não precisa. 450+ empresas comprovaram: processo + dados + adoção = resultado real. 96% de retenção.',
    type: 'website',
    images: [
      {
        url: '/images/og-metodologia.png',
        width: 1200,
        height: 630,
        alt: 'Metodologia Fluidsales™ - Metodologia Zopu',
      },
    ],
  },
}

// FAQ data for Schema markup
const FAQ_SCHEMA_DATA = GROWTH_ARCHITECTURE_FAQ.map((faq) => ({
  question: faq.pergunta,
  answer: faq.resposta,
}))

// HowTo Schema - Implementation steps
const HOWTO_STEPS = [
  {
    name: 'Diagnóstico',
    text: 'Mapeamento completo do processo atual, identificação de gargalos e definição de objetivos claros para a implementação do CRM.',
  },
  {
    name: 'Arquitetura',
    text: 'Desenho do modelo operacional, definição de funis, automações e integrações necessárias baseado na metodologia Fluidsales™.',
  },
  {
    name: 'Implementação',
    text: 'Configuração técnica do Bitrix24, migração de dados, setup de automações e integrações com sistemas existentes.',
  },
  {
    name: 'Capacitação',
    text: 'Treinamento hands-on com a equipe através da plataforma Fluidz, certificação e criação de playbooks de uso.',
  },
]

/**
 * Página da Metodologia Fluidsales™
 *
 * Estrutura Premium:
 *
 * 1. Hero - Posicionamento + visualização dos 6 pilares
 * 2. Dor - O problema que resolvemos
 * 3. Contexto - 15 anos de evolução (timeline)
 * 4. Insight - Princípio central: processo antes de ferramenta
 * 5. Pilares - 6 Pilares interativos com profundidade
 * 6. Processo - 4 Fases de entrega
 * 7. Diferenciais - Comparativo único
 * 8. FAQ - Objeções
 * 9. Produtos - 3 caminhos
 * 10. CTA Final
 */
export default function MetodologiaPage() {
  return (
    <main>
      {/* Schema Markup for SEO */}
      <FAQJsonLd faqs={FAQ_SCHEMA_DATA} />
      <HowToJsonLd
        name="Como implementar CRM com a Metodologia Fluidsales™"
        description="Processo de implementação de CRM Bitrix24 em 4 fases: diagnóstico, arquitetura, implementação e capacitação. Operação funcionando em 30 a 60 dias."
        totalTime="P30D"
        steps={HOWTO_STEPS}
      />

      {/* Lead Magnet - Diagnóstico de CRM */}
      <DiagnosticoModal />

      {/* 1. Hero: Posicionamento + visualização dos 6 pilares */}
      <HeroMetodologiaGrowth />

      {/* 2. Dor: O problema que resolvemos */}
      <DorSection />

      {/* 3. Contexto: 15 anos de evolução da metodologia */}
      <ContextoSection />

      {/* 4. Insight: Princípio central - processo antes de ferramenta */}
      <InsightSection />

      {/* 5. Pilares: 6 Pilares interativos com profundidade */}
      <div id="pilares">
        <PilaresShowcaseSection />
      </div>

      {/* 6. Processo: 4 Fases de entrega */}
      <ProcessoFasesSection />

      {/* 7. Diferenciais: Comparativo único */}
      <DiferenciaisSection />

      {/* 8. FAQ */}
      <FAQMetodologia />

      {/* 9. Produtos: 3 caminhos */}
      <ProdutoSelectorSection />

      {/* 10. CTA Final */}
      <CTAMetodologiaFinal />
    </main>
  )
}
