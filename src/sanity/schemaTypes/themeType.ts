import { defineField, defineType } from 'sanity'

export const themeType = defineType({
  name: 'theme',
  title: 'Tema',
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
      title: 'Descrição (para SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      description: 'Usado para ordenar temas nos menus.',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})

