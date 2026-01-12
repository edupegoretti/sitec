import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Fustat, JetBrains_Mono } from 'next/font/google'
import { Header, Footer } from '@/components/layout'
import { Analytics } from '@/components/shared'
import { OrganizationJsonLd, LocalBusinessJsonLd } from '@/components/seo'
import './globals.css'

const fustat = Fustat({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-fustat',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zopu.com.br'),
  title: {
    default: 'Parceiro Gold Bitrix24 no Brasil | +9.500 Certificados | Zopu',
    template: '%s | Zopu',
  },
  description:
    'Líder global em retenção de clientes Bitrix24. +450 clientes, +9.500 certificados via Fluidz. Implementação em 30 dias.',
  keywords: [
    'Bitrix24',
    'Bitrix24 Brasil',
    'treinamento Bitrix24',
    'certificação Bitrix24',
    'curso Bitrix24',
    'Bitrix24 preço',
    'parceiro Bitrix24',
    'implementação Bitrix24',
    'CRM',
    'CRM para PME',
    'consultoria Bitrix24',
    'Gold Partner Bitrix24',
    'CRM WhatsApp',
    'Fluidz',
  ],
  authors: [{ name: 'Zopu' }],
  creator: 'Zopu',
  publisher: 'Zopu',
  icons: {
    icon: '/images/favzopu.png',
    shortcut: '/images/favzopu.png',
    apple: '/images/favzopu.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://zopu.com.br',
    siteName: 'Zopu',
    title: 'Parceiro Gold Bitrix24 no Brasil | +9.500 Certificados | Zopu',
    description:
      'Líder global em retenção de clientes Bitrix24. +450 clientes, +9.500 certificados via Fluidz.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zopu - Parceiro Gold Bitrix24 no Brasil com +9.500 Certificados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parceiro Gold Bitrix24 no Brasil | +9.500 Certificados | Zopu',
    description:
      'Líder global em retenção de clientes Bitrix24. +450 clientes, +9.500 certificados via Fluidz.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://zopu.com.br',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${fustat.variable} ${jetbrainsMono.variable}`}>
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Header />
        <div className="pt-16 lg:pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
