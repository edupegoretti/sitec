/**
 * UTM Constants for use across the application
 *
 * These are separated from the Sanity schema to avoid importing
 * client-side dependencies in server-side code.
 */

// Predefined UTM sources
export const UTM_SOURCES = [
  { title: 'Bitrix24 (Diretorio)', value: 'bitrix24' },
  { title: 'Google Ads', value: 'google' },
  { title: 'Meta Ads (Facebook/Instagram)', value: 'meta' },
  { title: 'LinkedIn Ads', value: 'linkedin' },
  { title: 'Email Marketing', value: 'email' },
  { title: 'Newsletter', value: 'newsletter' },
  { title: 'WhatsApp', value: 'whatsapp' },
  { title: 'Parceiros', value: 'partners' },
  { title: 'QR Code', value: 'qrcode' },
  { title: 'Organico', value: 'organic' },
  { title: 'Outro', value: 'other' },
] as const

// Predefined UTM mediums
export const UTM_MEDIUMS = [
  { title: 'CPC (Pago por clique)', value: 'cpc' },
  { title: 'CPM (Display)', value: 'cpm' },
  { title: 'Social (Organico)', value: 'social' },
  { title: 'Email', value: 'email' },
  { title: 'Referral (Indicacao)', value: 'referral' },
  { title: 'Diretorio de Parceiros', value: 'partner_directory' },
  { title: 'Afiliado', value: 'affiliate' },
  { title: 'Banner', value: 'banner' },
  { title: 'Video', value: 'video' },
  { title: 'QR Code', value: 'qrcode' },
  { title: 'Outro', value: 'other' },
] as const

// Export types for use in components
export type UtmSource = (typeof UTM_SOURCES)[number]['value']
export type UtmMedium = (typeof UTM_MEDIUMS)[number]['value']
