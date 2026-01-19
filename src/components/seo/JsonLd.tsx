// Organization Schema - para a empresa Zopu
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zopu',
    alternateName: 'Zopu Tecnologia',
    description:
      'Parceiro Gold Bitrix24 com a maior taxa de retenção do mundo (96% anual). Especialistas em Revenue Intelligence e implementação de CRM.',
    url: 'https://zopu.com.br',
    logo: 'https://zopu.com.br/images/logo-zopu.png',
    image: 'https://zopu.com.br/images/logo-zopu.png',
    sameAs: [
      'https://br.linkedin.com/company/zopu',
      'https://www.instagram.com/souzopu/',
      'https://www.youtube.com/channel/UCD6akPmq0-7MGC-DSPjDjsw',
      'https://www.bitrix24.com.br/partners/brazil/zopu.php',
      'https://www.facebook.com/souzopu',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+55-0800-042-9000',
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+55-47-3307-9280',
        contactType: 'sales',
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Rio Grande do Sul, 385',
      addressLocality: 'Joinville',
      addressRegion: 'SC',
      postalCode: '89203-570',
      addressCountry: 'BR',
    },
    award: ['Gold Partner Bitrix24', '96% Taxa de Retenção Anual', '450+ Clientes Ativos'],
    slogan: 'O parceiro Bitrix24 com menor churn do mundo',
    foundingDate: '2009',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100,
    },
    knowsAbout: [
      'Bitrix24',
      'CRM',
      'Revenue Operations',
      'Revenue Intelligence',
      'Sales Automation',
      'Marketing Automation',
      'WhatsApp Business Integration',
    ],
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// LocalBusiness Schema - para buscas locais
export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://zopu.com.br/#localbusiness',
    name: 'Zopu - Parceiro Gold Bitrix24',
    description: 'Implementação de Bitrix24 com Metodologia Fluidsales. 96% de retenção anual. Atendimento em todo Brasil.',
    url: 'https://zopu.com.br',
    telephone: '+55-47-3307-9280',
    email: 'contato@zopu.com.br',
    priceRange: '$$',
    image: 'https://zopu.com.br/images/logo-zopu.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Rio Grande do Sul, 385',
      addressLocality: 'Joinville',
      addressRegion: 'SC',
      postalCode: '89203-570',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -26.3047,
      longitude: -48.8494,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brazil',
    },
    sameAs: [
      'https://br.linkedin.com/company/zopu',
      'https://www.instagram.com/souzopu/',
      'https://www.youtube.com/channel/UCD6akPmq0-7MGC-DSPjDjsw',
      'https://www.bitrix24.com.br/partners/brazil/zopu.php',
      'https://www.facebook.com/souzopu',
    ],
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// FAQ Schema - para páginas com perguntas frequentes
interface FAQItem {
  question: string
  answer: string
}

interface FAQJsonLdProps {
  faqs: FAQItem[]
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// Product Schema - para páginas de licenças/preços
interface ProductJsonLdProps {
  name: string
  description: string
  price: string
  priceCurrency?: string
  image?: string
}

export function ProductJsonLd({
  name,
  description,
  price,
  priceCurrency = 'BRL',
  image,
}: ProductJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || 'https://zopu.com.br/images/bitrix24-logo.png',
    brand: {
      '@type': 'Brand',
      name: 'Bitrix24',
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Zopu',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// HowTo Schema - para páginas de implementação
interface HowToStep {
  name: string
  text: string
  url?: string
}

interface HowToJsonLdProps {
  name: string
  description: string
  totalTime?: string
  steps: HowToStep[]
}

export function HowToJsonLd({ name, description, totalTime, steps }: HowToJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime: totalTime || 'P30D',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// Article Schema - para posts de blog
interface ArticleJsonLdProps {
  title: string
  description?: string
  url: string
  image?: string | string[]
  datePublished: string
  dateModified?: string
  authorName: string | string[]
  section?: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  section,
}: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: (Array.isArray(authorName) ? authorName : [authorName]).map((name) => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'Zopu',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zopu.com.br/images/logo-zopu.png',
      },
    },
    articleSection: section,
  }

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(schema)}
    </script>
  )
}

// Service Schema - para páginas de serviços
interface ServiceJsonLdProps {
  name: string
  description: string
  provider?: string
  areaServed?: string
}

export function ServiceJsonLd({
  name,
  description,
  provider = 'Zopu',
  areaServed = 'Brazil',
}: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://zopu.com.br',
    },
    areaServed: {
      '@type': 'Country',
      name: areaServed,
    },
    serviceType: 'CRM Implementation',
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// AggregateRating Schema - para páginas de cases/reviews
interface AggregateRatingJsonLdProps {
  itemName: string
  ratingValue: number
  ratingCount: number
  bestRating?: number
}

export function AggregateRatingJsonLd({
  itemName,
  ratingValue,
  ratingCount,
  bestRating = 5,
}: AggregateRatingJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      ratingCount,
      bestRating,
    },
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}

// WebPage Schema - schema genérico para páginas
interface WebPageJsonLdProps {
  name: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}

export function WebPageJsonLd({
  name,
  description,
  url,
  datePublished,
  dateModified,
}: WebPageJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    datePublished: datePublished || '2024-01-01',
    dateModified: dateModified || new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: 'Zopu',
      url: 'https://zopu.com.br',
    },
  }

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(schema)}
    </script>
  )
}
