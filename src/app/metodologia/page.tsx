import { Metadata } from 'next'
import {
  HeroMetodologiaGrowth,
  DorSection,
  ContextoSection,
  InsightSection,
  PilaresShowcaseSection,
  ProcessoFasesSection,
  DiferenciaisSection,
  ProvasSociaisSection,
  ProdutoSelectorSection,
  FAQMetodologia,
  CTAMetodologiaFinal,
} from '@/components/sections/metodologia'
import { DiagnosticoModal } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Metodologia Fluidsales™ | CRM que funciona e AI-Ready — Zopu',
  description:
    '50% dos CRMs falham. O seu não precisa. A metodologia que 450+ empresas usam para transformar Bitrix24 em motor de receita — com os fundamentos que fazem AI funcionar de verdade. 96% de retenção.',
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
      '50% dos CRMs falham. O seu não precisa. 450+ empresas comprovaram: processo + dados + adoção = resultado real. 96% de retenção.',
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

/**
 * Página da Metodologia Fluidsales™
 *
 * Estrutura Premium (reestruturada para melhor narrativa):
 *
 * 1. Hero - Posicionamento + visualização dos 6 pilares
 * 2. Dor - O problema que resolvemos
 * 3. Contexto - 15 anos de evolução (timeline)
 * 4. Insight - Princípio central: processo antes de ferramenta
 * 5. Pilares - 6 Pilares interativos com profundidade
 * 6. Processo - 4 Fases de entrega
 * 7. Diferenciais - Comparativo único devastador
 * 8. Provas - Números + Cases
 * 9. FAQ - Objeções
 * 10. Produtos - 3 caminhos (movido para cá)
 * 11. CTA Final
 */
export default function MetodologiaPage() {
  return (
    <main>
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

      {/* 8. Provas: Números + Cases */}
      <ProvasSociaisSection />

      {/* 9. FAQ */}
      <FAQMetodologia />

      {/* 10. Produtos: 3 caminhos */}
      <ProdutoSelectorSection />

      {/* 11. CTA Final */}
      <CTAMetodologiaFinal />
    </main>
  )
}
