import type { Metadata } from 'next'
import { RevenuePerformancePage } from '@/components/revops/RevenuePerformancePage'

export const metadata: Metadata = {
  title: 'Mapa de Performance de Receita™ | Maturidade no Bitrix24 — Zopu',
  description:
    'Mapa visual da maturidade de receita: funil, flywheel e NRR conectados no Bitrix24. Entenda seu nível e o próximo passo.',
  alternates: {
    canonical: '/mapadeperformance',
  },
  openGraph: {
    title: 'Mapa de Performance de Receita™ | Maturidade no Bitrix24 — Zopu',
    description:
      'Mapa visual da maturidade de receita: funil, flywheel e NRR conectados no Bitrix24. Entenda seu nível e o próximo passo.',
    images: ['/og/growth-architecture-methodology.png'],
  },
}

export default function RevenuePerformancePageRoute() {
  return <RevenuePerformancePage />
}
