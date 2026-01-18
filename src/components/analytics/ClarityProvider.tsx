'use client'

import { useEffect, useCallback } from 'react'
import Clarity from '@microsoft/clarity'

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

// Declare CookieYes types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CookieYes?: any
  }
}

export function ClarityProvider() {
  const initClarity = useCallback(() => {
    if (CLARITY_PROJECT_ID && typeof window !== 'undefined') {
      Clarity.init(CLARITY_PROJECT_ID)
    }
  }, [])

  useEffect(() => {
    if (!CLARITY_PROJECT_ID) return

    // Check if CookieYes has already given consent for analytics
    const checkConsent = () => {
      // CookieYes stores consent in a cookie named 'cookieyes-consent'
      const consentCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('cookieyes-consent='))

      if (consentCookie) {
        try {
          const consentValue = decodeURIComponent(consentCookie.split('=')[1])
          // Check if analytics consent is given (consent:yes or analytics:yes)
          if (consentValue.includes('analytics:yes') || consentValue.includes('consent:yes')) {
            initClarity()
            return true
          }
        } catch {
          // If parsing fails, don't initialize
        }
      }
      return false
    }

    // Check existing consent
    if (checkConsent()) return

    // Listen for consent changes from CookieYes
    const handleConsentUpdate = () => {
      checkConsent()
    }

    // CookieYes dispatches this event when consent is updated
    document.addEventListener('cookieyes_consent_update', handleConsentUpdate)

    // Also check periodically for the first few seconds (in case event is missed)
    const interval = setInterval(() => {
      if (checkConsent()) {
        clearInterval(interval)
      }
    }, 1000)

    // Clear interval after 10 seconds
    const timeout = setTimeout(() => clearInterval(interval), 10000)

    return () => {
      document.removeEventListener('cookieyes_consent_update', handleConsentUpdate)
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [initClarity])

  return null
}
