import { MetadataRoute } from 'next'

const BASE_URL = 'https://zopu.com.br'

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
      url: `${BASE_URL}/licencas-bitrix24`,
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

  // Páginas de soluções por vertical
  const solutionPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/solucoes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/solucoes/crm-whatsapp`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/solucoes/integracoes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/solucoes/telefonia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solucoes/industrias`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solucoes/servicos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solucoes/tecnologia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solucoes/saude`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solucoes/turismo`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/solucoes/sst`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Páginas de recursos
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/recursos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/recursos/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/recursos/biblioteca`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/recursos/biblioteca/metodologias`,
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
    {
      url: `${BASE_URL}/recursos/para`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Páginas institucionais
  const institutionalPages: MetadataRoute.Sitemap = [
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
    ...solutionPages,
    ...resourcePages,
    ...institutionalPages,
  ]
}
