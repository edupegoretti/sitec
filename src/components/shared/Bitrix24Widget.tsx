'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Bitrix24 CRM Widget - carrega apenas no desktop
const BITRIX24_WIDGET_URL = 'https://cdn.bitrix24.com.br/b19877839/crm/site_button/loader_1_d9m6kl.js'

// Breakpoint para considerar desktop (768px = md no Tailwind)
const DESKTOP_BREAKPOINT = 768

export function Bitrix24Widget() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Verifica se é desktop
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }

    // Verifica inicialmente
    checkIsDesktop()

    // Escuta mudanças de tamanho (caso usuário redimensione)
    window.addEventListener('resize', checkIsDesktop)

    return () => {
      window.removeEventListener('resize', checkIsDesktop)
    }
  }, [])

  // Não renderiza nada no servidor ou se não for desktop
  if (!mounted || !isDesktop) {
    return null
  }

  return (
    <Script
      id="bitrix24-widget"
      strategy="afterInteractive"
      src={`${BITRIX24_WIDGET_URL}?${Math.floor(Date.now() / 60000)}`}
    />
  )
}
