import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bitrix24 vs HubSpot vs Salesforce [2026] — Comparativo Completo de CRMs',
  description:
    'Comparativo imparcial e atualizado: Bitrix24, HubSpot, Salesforce, Pipedrive, Monday, Zoho. Preços em reais, recursos, curva de aprendizado. Descubra qual CRM é melhor para sua empresa.',
  keywords: [
    'Bitrix24 vs HubSpot',
    'Bitrix24 vs Salesforce',
    'Bitrix24 vs Pipedrive',
    'Bitrix24 vs Zoho',
    'comparativo CRM',
    'melhor CRM Brasil',
    'qual CRM escolher',
    'CRM mais barato',
    'HubSpot ou Bitrix24',
    'Salesforce ou Bitrix24',
  ],
  alternates: {
    canonical: '/bitrix24-vs-outras-ferramentas',
  },
  openGraph: {
    title: 'Bitrix24 vs HubSpot vs Salesforce [2026] — Comparativo',
    description:
      'Compare CRMs lado a lado: preços, recursos, implementação. Calculadora de economia inclusa.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/images/og-comparativo-crm.png',
        width: 1200,
        height: 630,
        alt: 'Comparativo CRM - Bitrix24 vs HubSpot vs Salesforce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitrix24 vs HubSpot vs Salesforce [2026]',
    description:
      'Compare features e preços lado a lado. Calculadora de economia inclusa.',
    images: ['/images/og-comparativo-crm.png'],
  },
}

export default function ComparativoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
