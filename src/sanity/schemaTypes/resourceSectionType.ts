import { defineField, defineType } from 'sanity'

export const resourceSectionType = defineType({
  name: 'resourceSection',
  title: 'Seção (Recursos)',
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
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})

