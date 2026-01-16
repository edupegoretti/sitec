import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { Fustat, JetBrains_Mono } from 'next/font/google'
import { Header, Footer } from '@/components/layout'
import { Analytics, GTMNoScript } from '@/components/shared'
import { OrganizationJsonLd, LocalBusinessJsonLd } from '@/components/seo'
import './globals.css'

// Bitrix24 CRM Widget - carrega em todas as páginas
const BITRIX24_WIDGET_URL = 'https://cdn.bitrix24.com.br/b19877839/crm/site_button/loader_1_d9m6kl.js'

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
    default: 'Arquitetura de Receita no Bitrix24 | Gold Partner | Zopu',
    template: '%s | Zopu',
  },
  description:
    'Gold Partner Bitrix24. Arquitetura de Receita com processo, dados e adocao para operacao comercial previsivel. +450 clientes, +9.500 certificados.',
  keywords: [
    'Bitrix24',
    'Arquitetura de Receita',
    'RevOps',
    'Bitrix24 Brasil',
    'Gold Partner Bitrix24',
    'implementacao Bitrix24',
    'treinamento Bitrix24',
    'CRM',
    'CRM para PME',
    'CRM WhatsApp',
    'Fluidsales',
    'Fluidz',
    'WhatsZopu',
  ],
  authors: [{ name: 'Zopu' }],
  creator: 'Zopu',
  publisher: 'Zopu',
  icons: {
    icon: '/images/favzopu.png',
    shortcut: '/images/favzopu.png',
    apple: '/images/favzopu.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://zopu.com.br',
    siteName: 'Zopu',
    title: 'Arquitetura de Receita no Bitrix24 | Gold Partner | Zopu',
    description:
      'Gold Partner Bitrix24. Arquitetura de Receita com processo, dados e adocao para operacao comercial previsivel.',
    images: [
      {
        url: '/images/logo-zopu.png',
        width: 512,
        height: 512,
        alt: 'Zopu - Arquitetura de Receita no Bitrix24',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arquitetura de Receita no Bitrix24 | Gold Partner | Zopu',
    description:
      'Gold Partner Bitrix24. Arquitetura de Receita com processo, dados e adocao para operacao comercial previsivel.',
    images: ['/images/logo-zopu.png'],
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
  // verification: {
  //   google: 'SEU-CODIGO-GOOGLE-SEARCH-CONSOLE-AQUI',
  // },
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
        {/* GTM noscript - para browsers sem JavaScript */}
        <GTMNoScript />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Header />
        <div className="pt-16 lg:pt-20">{children}</div>
        <Footer />

        {/* Bitrix24 CRM Widget - Chat/WhatsApp button */}
        <Script
          id="bitrix24-widget"
          strategy="afterInteractive"
          src={`${BITRIX24_WIDGET_URL}?${Math.floor(Date.now() / 60000)}`}
        />
      </body>
    </html>
  )
}
