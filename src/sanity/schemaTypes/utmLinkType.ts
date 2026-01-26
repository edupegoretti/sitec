import { defineField, defineType } from 'sanity'
import { Link } from '@phosphor-icons/react'
import { UTM_SOURCES, UTM_MEDIUMS } from '@/lib/utm-constants'

/**
 * UTM Link schema for storing generated UTM links
 *
 * Used by the admin UTM Builder tool to persist link history
 */

export const utmLinkType = defineType({
  name: 'utmLink',
  title: 'UTM Link',
  type: 'document',
  icon: Link,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome descritivo',
      type: 'string',
      description: 'Ex: "Black Friday 2024 - Google Ads", "Bitrix24 Partner Directory"',
      validation: (rule) => rule.required().min(3).max(100),
    }),
    defineField({
      name: 'baseUrl',
      title: 'URL de destino',
      type: 'url',
      description: 'Deve ser uma URL do dominio zopu.com.br',
      validation: (rule) =>
        rule.required().custom((url) => {
          if (!url) return true
          try {
            const parsed = new URL(url)
            if (!parsed.hostname.endsWith('zopu.com.br')) {
              return 'URL deve ser do dominio zopu.com.br'
            }
            return true
          } catch {
            return 'URL invalida'
          }
        }),
    }),
    defineField({
      name: 'utmSource',
      title: 'utm_source',
      type: 'string',
      description: 'Origem do trafego (ex: google, bitrix24, facebook)',
      options: {
        list: UTM_SOURCES.map((s) => ({ title: s.title, value: s.value })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'utmMedium',
      title: 'utm_medium',
      type: 'string',
      description: 'Meio/canal (ex: cpc, email, referral)',
      options: {
        list: UTM_MEDIUMS.map((m) => ({ title: m.title, value: m.value })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'utmCampaign',
      title: 'utm_campaign',
      type: 'string',
      description: 'Nome da campanha (sem espacos, use hifen ou underline)',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(100)
          .regex(/^[a-z0-9_-]+$/i, {
            name: 'slug',
            invert: false,
          })
          .error('Use apenas letras, numeros, hifen e underline'),
    }),
    defineField({
      name: 'utmTerm',
      title: 'utm_term (opcional)',
      type: 'string',
      description: 'Palavras-chave (para anuncios de busca)',
    }),
    defineField({
      name: 'utmContent',
      title: 'utm_content (opcional)',
      type: 'string',
      description: 'Para diferenciar anuncios/links (ex: botao-azul, banner-topo)',
    }),
    defineField({
      name: 'generatedUrl',
      title: 'URL Gerada',
      type: 'url',
      description: 'URL completa com parametros UTM',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      source: 'utmSource',
      campaign: 'utmCampaign',
    },
    prepare({ title, source, campaign }) {
      return {
        title: title || 'UTM Link',
        subtitle: `${source || '?'} / ${campaign || '?'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Mais recentes',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Nome A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
