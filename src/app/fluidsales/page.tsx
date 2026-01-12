import type { Metadata } from 'next'
import { RevenuePerformancePage } from '@/components/revops/RevenuePerformancePage'

export const metadata: Metadata = {
  title: 'Metodologia Fluidsales™ | Metodologia Enterprise para Bitrix24 — Zopu',
  description:
    'Metodologia completa para operações enterprise. Modelo operacional do lead ao renewal: funil + flywheel + NRR dentro do Bitrix24.',
  alternates: {
    canonical: '/fluidsales',
  },
  openGraph: {
    title: 'Metodologia Fluidsales™ | Metodologia Enterprise para Bitrix24 — Zopu',
    description:
      'Metodologia completa para operações enterprise. Modelo operacional do lead ao renewal: funil + flywheel + NRR dentro do Bitrix24.',
    images: ['/og/growth-architecture-methodology.png'],
  },
}

export default function RevenuePerformancePageRoute() {
  return <RevenuePerformancePage />
}
