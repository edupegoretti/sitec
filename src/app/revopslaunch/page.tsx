import { Metadata } from 'next'
import {
  HeroMetodologia,
  VantagensSection,
  FrameworkVisual,
  FluidzShowcase,
  AdaptacaoSection,
  CTAMetodologia,
} from '@/components/sections/metodologia-redesign'

export const metadata: Metadata = {
  title: 'RevOps: Marketing, Vendas e Pós-vendas em Uma Operação de Receita [2026]',
  description:
    'RevOps (Revenue Operations) une Marketing, Vendas e Customer Success em uma única operação de receita. Implementamos com Bitrix24 em até 60 dias. 96% de retenção anual.',
  keywords: [
    'RevOps',
    'Revenue Operations',
    'operação de receita',
    'o que é RevOps',
    'implementação RevOps',
    'RevOps Bitrix24',
    'unificar marketing vendas',
    'operação comercial integrada',
    'Metodologia Fluidsales',
    'RevOps Launch',
    'alinhar times comerciais',
  ],
  alternates: {
    canonical: '/revopslaunch',
  },
  openGraph: {
    title: 'RevOps: Operação de Receita Unificada com Bitrix24',
    description:
      'Marketing, Vendas e Pós-vendas trabalhando juntos. Implementação em 60 dias com metodologia Metodologia Fluidsales™.',
    type: 'article',
    images: [
      {
        url: '/images/og-revops-launch.png',
        width: 1200,
        height: 630,
        alt: 'RevOps - Operação de Receita Unificada - Zopu',
      },
    ],
  },
}

export default function MetodologiaPage() {
  return (
    <main>
      {/* Hero: Visão de sucesso + RevOpsFunnel */}
      <HeroMetodologia />

      {/* Vantagens da metodologia */}
      <VantagensSection />

      {/* Framework: As 3 fases */}
      <FrameworkVisual />

      {/* Fluidz: motor de adoção */}
      <FluidzShowcase />

      {/* Escolha seu escopo */}
      <AdaptacaoSection />

      {/* CTA Final com stats consolidados */}
      <CTAMetodologia />
    </main>
  )
}
