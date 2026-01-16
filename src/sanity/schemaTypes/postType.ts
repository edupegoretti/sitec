import { defineField, defineType } from 'sanity'

const PERSONAS: Array<{ title: string; value: string }> = [
  { title: 'CEO / Empresário / Dono', value: 'ceo' },
  { title: 'Diretor Comercial', value: 'diretor-comercial' },
  { title: 'Gestor de Marketing', value: 'gestor-marketing' },
  { title: 'Diretor de Operações', value: 'diretor-operacoes' },
] 

const STAGES: Array<{ title: string; value: string }> = [
  { title: 'Diagnóstico', value: 'diagnostico' },
  { title: 'Estruturação', value: 'estruturacao' },
  { title: 'Implementação', value: 'implementacao' },
  { title: 'Otimização', value: 'otimizacao' },
  { title: 'Decisão', value: 'decisao' },
]

const FORMATS: Array<{ title: string; value: string }> = [
  { title: 'Artigo', value: 'artigo' },
  { title: 'Guia', value: 'guia' },
  { title: 'Playbook', value: 'playbook' },
  { title: 'Template', value: 'template' },
  { title: 'Caso', value: 'caso' },
  { title: 'Comparativo', value: 'comparativo' },
]

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
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
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(220),
      description: 'Usado em cards, meta description e no começo do artigo.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Ajuda em SEO e acessibilidade.',
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publicado em',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Autores',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'author' }],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'primaryTheme',
      title: 'Tema principal',
      type: 'reference',
      to: [{ type: 'theme' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'themes',
      title: 'Temas secundários',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'theme' }] }],
    }),
    defineField({
      name: 'interests',
      title: 'Interesses (dor/objetivo)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'interest' }] }],
    }),
    defineField({
      name: 'stage',
      title: 'Estágio (jornada)',
      type: 'string',
      options: {
        list: STAGES,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Formato',
      type: 'string',
      options: {
        list: FORMATS,
      },
      initialValue: 'artigo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'personas',
      title: 'Para quem é (persona)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: PERSONAS,
      },
    }),
    defineField({
      name: 'resourceSections',
      title: 'Distribuir em seções (Recursos)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'resourceSection' }] }],
      description: 'Use para destacar conteúdos em prateleiras específicas no site.',
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Número', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
              { title: 'Código', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({ name: 'href', title: 'URL', type: 'url', validation: (rule) => rule.required() }),
                  defineField({ name: 'blank', title: 'Abrir em nova aba', type: 'boolean', initialValue: true }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
            defineField({ name: 'caption', title: 'Legenda', type: 'string' }),
          ],
        },
        {
          name: 'contentUpgradeBlock',
          title: 'Content Upgrade',
          type: 'object',
          fields: [
            defineField({
              name: 'contentUpgrade',
              title: 'Material',
              type: 'reference',
              to: [{ type: 'contentUpgrade' }],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'variant',
              title: 'Variante visual',
              type: 'string',
              options: {
                list: [
                  { title: 'Card (padrão)', value: 'card' },
                  { title: 'Banner', value: 'banner' },
                  { title: 'Minimal', value: 'minimal' },
                ],
              },
              initialValue: 'card',
            }),
          ],
          preview: {
            select: {
              title: 'contentUpgrade.title',
              format: 'contentUpgrade.format',
            },
            prepare({ title, format }) {
              return {
                title: title || 'Content Upgrade',
                subtitle: `📦 ${format || 'Material'}`,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nextStep',
      title: 'Próximo passo (CTA)',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título', type: 'string' }),
        defineField({ name: 'description', title: 'Descrição', type: 'text', rows: 2 }),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'url',
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'label', title: 'Texto do botão', type: 'string', initialValue: 'Continuar' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'SEO title', type: 'string' }),
        defineField({ name: 'description', title: 'SEO description', type: 'text', rows: 3 }),
        defineField({ name: 'canonical', title: 'Canonical URL', type: 'url' }),
        defineField({ name: 'noindex', title: 'Não indexar (noindex)', type: 'boolean', initialValue: false }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Mais recentes',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'stage',
      media: 'coverImage',
    },
  },
})
