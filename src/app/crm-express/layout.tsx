import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRM Express — Bitrix24 Funcionando em 30 Dias | Zopu',
  description:
    'Implementação rápida de Bitrix24: CRM, pipeline de vendas, WhatsApp integrado em até 30 dias. Ideal para PMEs de R$1M-10M/ano. Metodologia comprovada por parceiro Gold.',
  keywords: [
    'implementação Bitrix24',
    'CRM rápido',
    'Bitrix24 30 dias',
    'CRM para PME',
    'CRM Express',
    'implementação CRM rápida',
    'Bitrix24 WhatsApp',
    'CRM vendas',
  ],
  alternates: {
    canonical: '/crm-express',
  },
  openGraph: {
    title: 'CRM Express — Bitrix24 em 30 Dias',
    description:
      'Seu Bitrix24 entregando resultado em até 30 dias. CRM, pipeline, WhatsApp integrado. Implementação por parceiro Gold.',
    type: 'website',
    images: [
      {
        url: '/images/og-crm-express.png',
        width: 1200,
        height: 630,
        alt: 'CRM Express - Bitrix24 em 30 dias - Zopu',
      },
    ],
  },
}

export default function CRMExpressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
