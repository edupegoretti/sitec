export type AnalyticsEventName =
  | 'rpm_hero_cta_primary_click'
  | 'rpm_hero_cta_secondary_click'
  | 'rpm_diagram_stage_hover'
  | 'rpm_diagram_stage_open'
  | 'rpm_toggle_business_model'
  | 'rpm_toggle_show_formulas'
  | 'rpm_faq_open'
  | 'rpm_final_cta_primary_click'
  | 'rpm_final_cta_whatsapp_click'
  | 'rpm_final_cta_trial_click'

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>

type DataLayerEvent = AnalyticsPayload & { event: AnalyticsEventName }

declare global {
  interface Window {
    dataLayer?: unknown[] & { push: (event: DataLayerEvent | unknown) => void }
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date | AnalyticsEventName,
      params?: AnalyticsPayload | Record<string, unknown>
    ) => void
  }
}

export function trackEvent(name: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === 'undefined') {
    return
  }
  const event: DataLayerEvent = { event: name, ...(payload ?? {}) }
  window.dataLayer?.push(event)
  window.gtag?.('event', name, payload)
}
