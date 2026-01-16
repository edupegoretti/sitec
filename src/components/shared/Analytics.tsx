'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// GTM Container ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MR4N7SDW'

// CookieYes ID for cookie consent
const COOKIEYES_ID = process.env.NEXT_PUBLIC_COOKIEYES_ID || '6e449b35cc3b5f3f8d0292281110b939'

// Tipos para eventos de conversão (enviados via dataLayer para GTM)
export type ConversionEvent =
  | 'cta_whatsapp_click'
  | 'cta_teste_gratis_click'
  | 'cta_especialista_click'
  | 'video_play'
  | 'page_scroll_50'
  | 'page_scroll_90'
  | 'form_submit'
  | 'lead_generated'

// Função para enviar eventos ao dataLayer (GTM processa e envia ao GA4)
export function trackConversion(event: ConversionEvent, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...params,
    })
  }
}

// Função para rastrear page views via dataLayer
function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
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

    // Também envia UTMs para o dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'utm_captured',
        ...utms,
      })
    }
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

// Componente de Analytics com GTM e CookieYes
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

  return (
    <>
      {/* CookieYes - Cookie Consent Banner (deve carregar antes do GTM) */}
      <Script
        id="cookieyes"
        src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`}
        strategy="beforeInteractive"
      />

      {/* Google Tag Manager - Head Script */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    </>
  )
}

// Componente noscript do GTM (deve ser usado no body)
export function GTMNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

// Tipos para window.dataLayer são declarados em src/lib/analytics.ts
