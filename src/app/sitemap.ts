import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { authorSlugsQuery, interestSlugsQuery, postSlugsQuery, seriesSlugsQuery, themeSlugsQuery } from '@/sanity/lib/queries'
import { isSanityConfigured } from '@/sanity/lib/env'

const BASE_URL = 'https://www.zopu.com.br'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()

  // Páginas estáticas principais
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/por-que-bitrix24`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/planos-bitrix24`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/por-que-zopu`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/crm-express`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/revopslaunch`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/mapadeperformance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/bitrix24-para-pmes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/bitrix24-enterprise`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/bitrix24-vs-outras-ferramentas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/zopu-vs-outros-parceiros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cases`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cases/ferro-em-brasa`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/metodologia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // Páginas de persona
  const personaPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/para/comercial`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/para/gestores`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/para/ti`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]


  // Páginas de recursos (apenas as que estão acessíveis via menu)
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/recursos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recursos/biblioteca`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/recursos/biblioteca/zopucast`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/recursos/biblioteca/webinars-bitrix24`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
  ]

  // Fetch Sanity content only if configured
  let blogPages: MetadataRoute.Sitemap = []
  let themePages: MetadataRoute.Sitemap = []
  let interestPages: MetadataRoute.Sitemap = []
  let seriesPages: MetadataRoute.Sitemap = []
  let authorPages: MetadataRoute.Sitemap = []

  if (isSanityConfigured) {
    const [postSlugs, themeSlugs, interestSlugs, seriesSlugs, authorSlugs] = await Promise.all([
      sanityFetch<Array<{ slug: string; _updatedAt?: string }>>({ query: postSlugsQuery, tags: ['post'], revalidate: 3600 }),
      sanityFetch<Array<{ slug: string; _updatedAt?: string }>>({ query: themeSlugsQuery, tags: ['theme'], revalidate: 3600 }),
      sanityFetch<Array<{ slug: string; _updatedAt?: string }>>({ query: interestSlugsQuery, tags: ['interest'], revalidate: 3600 }),
      sanityFetch<Array<{ slug: string; _updatedAt?: string }>>({ query: seriesSlugsQuery, tags: ['series'], revalidate: 3600 }),
      sanityFetch<Array<{ slug: string; _updatedAt?: string }>>({ query: authorSlugsQuery, tags: ['author'], revalidate: 3600 }),
    ])

    blogPages = postSlugs.map((item) => ({
      url: `${BASE_URL}/blog/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    themePages = themeSlugs.map((item) => ({
      url: `${BASE_URL}/recursos/tema/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : currentDate,
      changeFrequency: 'monthly',
      priority: 0.55,
    }))

    interestPages = interestSlugs.map((item) => ({
      url: `${BASE_URL}/recursos/interesse/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : currentDate,
      changeFrequency: 'monthly',
      priority: 0.55,
    }))

    seriesPages = seriesSlugs.map((item) => ({
      url: `${BASE_URL}/recursos/series/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    }))

    authorPages = authorSlugs.map((item) => ({
      url: `${BASE_URL}/recursos/autores/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : currentDate,
      changeFrequency: 'monthly',
      priority: 0.45,
    }))
  }

  // Páginas de recursos por persona e estágio removidas do sitemap
  // (não estão acessíveis via menu principal)

  // Páginas institucionais
  const institutionalPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/contato`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/seguranca`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/trabalhe-conosco`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [
    ...mainPages,
    ...personaPages,
    ...resourcePages,
    ...blogPages,
    ...themePages,
    ...interestPages,
    ...seriesPages,
    ...authorPages,
    ...institutionalPages,
  ]
}
