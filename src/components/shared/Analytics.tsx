'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// ID do GA4 - substituir pelo ID real em produção
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Tipos para eventos de conversão
export type ConversionEvent =
  | 'cta_whatsapp_click'
  | 'cta_teste_gratis_click'
  | 'cta_especialista_click'
  | 'video_play'
  | 'page_scroll_50'
  | 'page_scroll_90'

// Função para rastrear eventos de conversão
export function trackConversion(event: ConversionEvent, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, {
      ...params,
      send_to: GA_MEASUREMENT_ID,
    })
  }
}

// Função para rastrear page views
function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Salvar UTMs no localStorage
function saveUTMs(searchParams: URLSearchParams) {
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  const utms: Record<string, string> = {}

  utmParams.forEach((param) => {
    const value = searchParams.get(param)
    if (value) {
      utms[param] = value
    }
  })

  if (Object.keys(utms).length > 0) {
    localStorage.setItem('zopu_utms', JSON.stringify(utms))
    localStorage.setItem('zopu_utms_timestamp', Date.now().toString())
  }
}

// Recuperar UTMs salvos
export function getSavedUTMs(): Record<string, string> | null {
  if (typeof window === 'undefined') return null

  const utms = localStorage.getItem('zopu_utms')
  const timestamp = localStorage.getItem('zopu_utms_timestamp')

  if (!utms || !timestamp) return null

  // UTMs expiram em 30 dias
  const thirtyDays = 30 * 24 * 60 * 60 * 1000
  if (Date.now() - parseInt(timestamp) > thirtyDays) {
    localStorage.removeItem('zopu_utms')
    localStorage.removeItem('zopu_utms_timestamp')
    return null
  }

  try {
    return JSON.parse(utms)
  } catch {
    return null
  }
}

// Componente de Analytics
export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views e salvar UTMs
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackPageView(url)

    // Salvar UTMs se presentes
    if (searchParams) {
      saveUTMs(searchParams)
    }
  }, [pathname, searchParams])

  // Não carregar em desenvolvimento (opcional)
  if (process.env.NODE_ENV === 'development' && !GA_MEASUREMENT_ID.startsWith('G-')) {
    return null
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Tipos para window.gtag e dataLayer são declarados em src/lib/analytics.ts
