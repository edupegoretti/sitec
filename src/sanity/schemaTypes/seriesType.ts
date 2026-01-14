import { defineField, defineType } from 'sanity'

export const seriesType = defineType({
  name: 'series',
  title: 'Série / Trilha',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome',
      type: 'string',
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
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'posts',
      title: 'Posts (ordem da trilha)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroImage',
    },
  },
})

