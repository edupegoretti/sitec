import { defineField, defineType } from 'sanity'

const CONTENT_UPGRADE_FORMATS = [
  { title: 'Checklist', value: 'checklist' },
  { title: 'Template', value: 'template' },
  { title: 'PDF / Guia', value: 'pdf' },
  { title: 'Planilha', value: 'spreadsheet' },
  { title: 'Swipe File', value: 'swipefile' },
]

export const contentUpgradeType = defineType({
  name: 'contentUpgrade',
  title: 'Content Upgrade',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Material',
      type: 'string',
      description: 'Ex: "Checklist: 7 sinais de que seu CRM precisa de revisão"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Formato',
      type: 'string',
      options: {
        list: CONTENT_UPGRADE_FORMATS,
        layout: 'radio',
      },
      initialValue: 'checklist',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline do CTA',
      type: 'string',
      description: 'Ex: "Quer levar isso na prática?"',
      initialValue: 'Quer levar isso na prática?',
    }),
    defineField({
      name: 'description',
      title: 'Descrição curta',
      type: 'text',
      rows: 2,
      description: 'Benefício principal em 1-2 frases',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'O que inclui',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3-5 bullets do que o visitante vai receber',
    }),
    defineField({
      name: 'file',
      title: 'Arquivo',
      type: 'file',
      options: {
        accept: '.pdf,.xlsx,.xls,.doc,.docx,.zip',
      },
      description: 'Upload do arquivo para download',
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL Externa (alternativa)',
      type: 'url',
      description: 'Se preferir hospedar em outro lugar (Notion, Google Drive)',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do botão',
      type: 'string',
      initialValue: 'Quero o material gratuito',
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Mensagem de agradecimento',
      type: 'text',
      rows: 2,
      initialValue: 'Pronto! Verifique seu email para acessar o material.',
    }),
    defineField({
      name: 'emailTag',
      title: 'Tag para Email Marketing',
      type: 'string',
      description: 'Tag para segmentação na ferramenta de email (ex: "download-checklist-crm")',
    }),
  ],
  orderings: [
    {
      title: 'Título',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      format: 'format',
    },
    prepare({ title, format }) {
      const formatIcons: Record<string, string> = {
        checklist: '✅',
        template: '📋',
        pdf: '📄',
        spreadsheet: '📊',
        swipefile: '💡',
      }
      return {
        title,
        subtitle: `${formatIcons[format] || '📦'} ${format?.charAt(0).toUpperCase()}${format?.slice(1) || 'Material'}`,
      }
    },
  },
})
