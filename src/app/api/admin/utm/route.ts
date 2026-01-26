import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { getSession } from '@/lib/auth/session'
import { apiVersion, dataset, projectId } from '@/sanity/lib/env'
import { UTM_SOURCES, UTM_MEDIUMS } from '@/lib/utm-constants'

/**
 * UTM Links API
 *
 * POST /api/admin/utm - Create a new UTM link
 * GET /api/admin/utm - List UTM link history
 *
 * All routes require authentication
 */

// Allowed domain for UTM links
const ALLOWED_DOMAIN = 'zopu.com.br'

// Create write client with token (server-side only)
function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!token) {
    console.error('[UTM API] SANITY_API_WRITE_TOKEN not configured')
    return null
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false, // Don't use CDN for write operations
  })
}

// Create read client (for fetching history)
function getReadClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  })
}

// Validate URL is from allowed domain
function isAllowedUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.hostname === ALLOWED_DOMAIN || parsed.hostname.endsWith(`.${ALLOWED_DOMAIN}`)
  } catch {
    return false
  }
}

// Generate UTM URL from parameters
function generateUtmUrl(
  baseUrl: string,
  params: {
    source: string
    medium: string
    campaign: string
    term?: string
    content?: string
  }
): string {
  const url = new URL(baseUrl)

  url.searchParams.set('utm_source', params.source)
  url.searchParams.set('utm_medium', params.medium)
  url.searchParams.set('utm_campaign', params.campaign)

  if (params.term) {
    url.searchParams.set('utm_term', params.term)
  }

  if (params.content) {
    url.searchParams.set('utm_content', params.content)
  }

  return url.toString()
}

// Slugify campaign name
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .slice(0, 100) // Limit length
}

/**
 * POST - Create a new UTM link
 */
export async function POST(request: NextRequest) {
  // Verify authentication
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, baseUrl, utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return NextResponse.json({ error: 'Nome deve ter pelo menos 3 caracteres' }, { status: 400 })
    }

    if (!baseUrl || typeof baseUrl !== 'string') {
      return NextResponse.json({ error: 'URL de destino obrigatoria' }, { status: 400 })
    }

    if (!isAllowedUrl(baseUrl)) {
      return NextResponse.json({ error: `URL deve ser do dominio ${ALLOWED_DOMAIN}` }, { status: 400 })
    }

    if (!utmSource || !UTM_SOURCES.some((s) => s.value === utmSource)) {
      return NextResponse.json({ error: 'Fonte (utm_source) invalida' }, { status: 400 })
    }

    if (!utmMedium || !UTM_MEDIUMS.some((m) => m.value === utmMedium)) {
      return NextResponse.json({ error: 'Meio (utm_medium) invalido' }, { status: 400 })
    }

    if (!utmCampaign || typeof utmCampaign !== 'string' || utmCampaign.trim().length < 2) {
      return NextResponse.json({ error: 'Campanha deve ter pelo menos 2 caracteres' }, { status: 400 })
    }

    // Get write client
    const writeClient = getWriteClient()
    if (!writeClient) {
      return NextResponse.json({ error: 'Configuracao do servidor invalida' }, { status: 500 })
    }

    // Slugify campaign name
    const slugifiedCampaign = slugify(utmCampaign)

    // Generate the full UTM URL
    const generatedUrl = generateUtmUrl(baseUrl, {
      source: utmSource,
      medium: utmMedium,
      campaign: slugifiedCampaign,
      term: utmTerm || undefined,
      content: utmContent || undefined,
    })

    // Create document in Sanity
    const document = {
      _type: 'utmLink',
      name: name.trim(),
      baseUrl,
      utmSource,
      utmMedium,
      utmCampaign: slugifiedCampaign,
      utmTerm: utmTerm || undefined,
      utmContent: utmContent || undefined,
      generatedUrl,
    }

    const result = await writeClient.create(document)

    console.log(`[UTM API] Created UTM link: ${result._id}`)

    return NextResponse.json({
      success: true,
      utmLink: {
        id: result._id,
        name: result.name,
        generatedUrl,
        utmSource,
        utmMedium,
        utmCampaign: slugifiedCampaign,
        createdAt: result._createdAt,
      },
    })
  } catch (error) {
    console.error('[UTM API] Error creating UTM link:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Erro ao criar link UTM' }, { status: 500 })
  }
}

/**
 * GET - List UTM link history
 */
export async function GET(request: NextRequest) {
  // Verify authentication
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 100)

    const readClient = getReadClient()

    // Fetch recent UTM links
    const query = `*[_type == "utmLink"] | order(_createdAt desc) [0...${limit}] {
      _id,
      name,
      baseUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      generatedUrl,
      _createdAt
    }`

    const utmLinks = await readClient.fetch(query)

    return NextResponse.json({
      success: true,
      utmLinks,
      count: utmLinks.length,
    })
  } catch (error) {
    console.error('[UTM API] Error fetching UTM links:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Erro ao buscar links UTM' }, { status: 500 })
  }
}
