import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

import { dataset, projectId, siteUrl, studioTitle } from './src/sanity/lib/env'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

const plugins = [
  deskTool({ structure }),
  presentationTool({
    previewUrl: {
      initial: siteUrl,
      previewMode: {
        enable: '/api/draft-mode/enable',
      },
    },
    resolve: {
      locations: {
        post: {
          select: { title: 'title', slug: 'slug.current' },
          resolve: (value: any) => {
            if (!value?.slug) {
              return { message: 'Defina o slug para habilitar o preview.', tone: 'critical' }
            }
            return {
              locations: [{ title: value?.title ?? 'Post', href: `/recursos/blog/${value.slug}` }],
            }
          },
        },
        theme: {
          select: { title: 'title', slug: 'slug.current' },
          resolve: (value: any) => {
            if (!value?.slug) return null
            return { locations: [{ title: value?.title ?? 'Tema', href: `/recursos/tema/${value.slug}` }] }
          },
        },
        interest: {
          select: { title: 'title', slug: 'slug.current' },
          resolve: (value: any) => {
            if (!value?.slug) return null
            return { locations: [{ title: value?.title ?? 'Interesse', href: `/recursos/interesse/${value.slug}` }] }
          },
        },
        series: {
          select: { title: 'title', slug: 'slug.current' },
          resolve: (value: any) => {
            if (!value?.slug) return null
            return { locations: [{ title: value?.title ?? 'Série', href: `/recursos/series/${value.slug}` }] }
          },
        },
        author: {
          select: { name: 'name', slug: 'slug.current' },
          resolve: (value: any) => {
            if (!value?.slug) return null
            return { locations: [{ title: value?.name ?? 'Autor', href: `/recursos/autores/${value.slug}` }] }
          },
        },
      },
    },
  }),
]

if (process.env.NODE_ENV === 'development') {
  plugins.push(visionTool())
}

export default defineConfig({
  name: 'default',
  title: studioTitle,
  projectId,
  dataset,
  basePath: '/studio',
  plugins,
  schema: {
    types: schemaTypes,
  },
})
