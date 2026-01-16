import { Metadata } from 'next'
import { Container } from '@/components/layout'
import { PlanosBitrix24Content } from './PlanosBitrix24Content'

export const metadata: Metadata = {
  title: 'Planos e Preços Bitrix24 [Janeiro 2026] — Tabela Comparativa Completa',
  description:
    'Compare todos os planos Bitrix24 em reais: Free, Basic, Standard, Professional e Enterprise. Tabela comparativa completa com todas as funcionalidades. 20% de desconto no plano anual.',
  keywords: [
    'Bitrix24 preço',
    'Bitrix24 planos',
    'Bitrix24 quanto custa',
    'comparativo Bitrix24',
    'Bitrix24 Standard',
    'Bitrix24 Professional',
    'Bitrix24 Enterprise',
    'tabela de preços Bitrix24',
    'Bitrix24 features',
    'Bitrix24 funcionalidades',
  ],
  alternates: {
    canonical: '/planos-bitrix24',
  },
  openGraph: {
    title: 'Planos e Preços Bitrix24 [2026] — Tabela Comparativa',
    description:
      'Compare todos os planos Bitrix24: Free, Standard, Professional e Enterprise. Veja preços em reais e todas as funcionalidades de cada plano.',
    type: 'website',
  },
}

export default function PlanosBitrix24Page() {
  return (
    <main className="min-h-screen bg-white">
      <Container>
        <PlanosBitrix24Content />
      </Container>
    </main>
  )
}
