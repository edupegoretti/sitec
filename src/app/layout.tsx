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
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zopu - Arquitetura de Receita no Bitrix24',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arquitetura de Receita no Bitrix24 | Gold Partner | Zopu',
    description:
      'Gold Partner Bitrix24. Arquitetura de Receita com processo, dados e adocao para operacao comercial previsivel.',
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
