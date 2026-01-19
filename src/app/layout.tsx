import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { Fustat, JetBrains_Mono } from 'next/font/google'
import { Header, Footer } from '@/components/layout'
import { Analytics, GTMNoScript, Bitrix24Widget } from '@/components/shared'
import { ClarityProvider } from '@/components/analytics'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import { OrganizationJsonLd, LocalBusinessJsonLd } from '@/components/seo'
import './globals.css'

// CookieYes ID for cookie consent
const COOKIEYES_ID = '6e449b35cc3b5f3f8d0292281110b939'

// Ahrefs Analytics
const AHREFS_KEY = 'OrEX3CJLaoPUCmSZ2tpNfg'

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
        {/* Disable browser scroll restoration - comprehensive fix for mobile */}
        <Script
          id="scroll-restoration-fix"
          strategy="beforeInteractive"
        >{`(function(){if(history.scrollRestoration)history.scrollRestoration='manual';function fix(){window.scrollTo({top:0,left:0,behavior:'instant'})}fix();document.addEventListener('DOMContentLoaded',fix);window.addEventListener('load',function(){fix();setTimeout(fix,100);setTimeout(fix,300)})})();`}</Script>
        {/* CookieYes - Cookie Consent Banner (deve carregar primeiro) */}
        <Script
          id="cookieyes"
          src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`}
          strategy="beforeInteractive"
        />
        {/* Ahrefs Analytics */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          strategy="afterInteractive"
        />
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
        <SpeedInsights />
        <VercelAnalytics />
        <ClarityProvider />

        {/* Bitrix24 CRM Widget - Apenas desktop */}
        <Bitrix24Widget />
      </body>
    </html>
  )
}
