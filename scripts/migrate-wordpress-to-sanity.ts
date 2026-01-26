/**
 * WordPress to Sanity Migration Script
 *
 * Migra posts do WordPress para o Sanity, preservando:
 * - Slugs originais (CRÍTICO para SEO)
 * - Conteúdo convertido para Portable Text
 * - Imagens de capa
 * - Datas de publicação
 *
 * Uso:
 *   npx tsx scripts/migrate-wordpress-to-sanity.ts
 *
 * Configuração necessária:
 *   - WORDPRESS_URL: URL do WordPress (pode ser IP direto)
 *   - SANITY_API_WRITE_TOKEN no .env.local
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Carregar variáveis de ambiente
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// ============================================
// CONFIGURAÇÃO - AJUSTE AQUI
// ============================================

// URL do WordPress (com arquivo hosts configurado ou IP direto)
const WORDPRESS_URL = 'http://zopu.com.br'

// Autor padrão para os posts (ID do autor no Sanity)
const DEFAULT_AUTHOR_ID = '2l4RXs9oktDatuxANQh586' // Equipe Zopu

// Tema padrão para os posts (ID do tema no Sanity)
// Vendas é um bom tema genérico para posts de CRM/Bitrix24
const DEFAULT_THEME_ID = 'zBz5oNGKwCo0uwU2GFKKXg' // Vendas

// ============================================

// Cliente Sanity
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Tipos
interface WPPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media: number
  categories: number[]
  tags: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
    'wp:term'?: Array<Array<{
      id: number
      name: string
      slug: string
    }>>
  }
}

interface WPMedia {
  id: number
  source_url: string
  alt_text: string
  title: { rendered: string }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Remove tags HTML e decodifica entidades
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .trim()
}

/**
 * Converte HTML do WordPress para Portable Text do Sanity
 */
function htmlToPortableText(html: string): any[] {
  const blocks: any[] = []

  // Limpar o HTML
  let content = html
    .replace(/\r\n/g, '\n')
    .replace(/\n\n+/g, '\n\n')

  // Dividir por parágrafos e elementos de bloco
  const paragraphs = content.split(/(?:<\/p>|<\/h[1-6]>|<\/blockquote>|<\/ul>|<\/ol>)/i)

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim()
    if (!trimmed) continue

    // Detectar tipo de bloco
    let style = 'normal'
    let listItem: string | undefined
    let text = trimmed

    // Headers
    const h2Match = trimmed.match(/<h2[^>]*>(.*)/i)
    const h3Match = trimmed.match(/<h3[^>]*>(.*)/i)
    const h4Match = trimmed.match(/<h4[^>]*>(.*)/i)
    const blockquoteMatch = trimmed.match(/<blockquote[^>]*>(.*)/i)
    const ulMatch = trimmed.match(/<ul[^>]*>(.*)/i)
    const olMatch = trimmed.match(/<ol[^>]*>(.*)/i)

    if (h2Match) {
      style = 'h2'
      text = h2Match[1]
    } else if (h3Match) {
      style = 'h3'
      text = h3Match[1]
    } else if (h4Match) {
      style = 'h3' // Sanity não tem h4, usar h3
      text = h4Match[1]
    } else if (blockquoteMatch) {
      style = 'blockquote'
      text = blockquoteMatch[1]
    } else if (ulMatch || olMatch) {
      // Processar lista
      const listType = ulMatch ? 'bullet' : 'number'
      const listContent = ulMatch ? ulMatch[1] : olMatch![1]
      const items = listContent.match(/<li[^>]*>(.*?)<\/li>/gi) || []

      for (const item of items) {
        const itemText = stripHtml(item.replace(/<li[^>]*>/i, '').replace(/<\/li>/i, ''))
        if (itemText) {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            listItem: listType,
            level: 1,
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: itemText,
                marks: [],
              },
            ],
            markDefs: [],
          })
        }
      }
      continue
    }

    // Remover tag de abertura do parágrafo
    text = text.replace(/<p[^>]*>/i, '')

    // Extrair texto limpo
    const cleanText = stripHtml(text)

    if (!cleanText) continue

    // Criar bloco
    const block: any = {
      _type: 'block',
      _key: generateKey(),
      style,
      children: [],
      markDefs: [],
    }

    if (listItem) {
      block.listItem = listItem
      block.level = 1
    }

    // Processar formatação inline (negrito, itálico, links)
    const children = processInlineFormatting(text, block.markDefs)
    block.children = children

    blocks.push(block)
  }

  // Se não conseguiu processar, criar um bloco simples
  if (blocks.length === 0) {
    const cleanText = stripHtml(html)
    if (cleanText) {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: generateKey(),
            text: cleanText,
            marks: [],
          },
        ],
        markDefs: [],
      })
    }
  }

  return blocks
}

/**
 * Processa formatação inline (negrito, itálico, links)
 */
function processInlineFormatting(html: string, markDefs: any[]): any[] {
  const children: any[] = []

  // Simplificar: apenas extrair texto limpo por enquanto
  // Uma implementação completa precisaria de um parser HTML robusto
  const text = stripHtml(html)

  if (text) {
    children.push({
      _type: 'span',
      _key: generateKey(),
      text,
      marks: [],
    })
  }

  return children
}

/**
 * Gera uma chave única para blocos do Sanity
 */
function generateKey(): string {
  return Math.random().toString(36).substring(2, 12)
}

/**
 * Faz upload de uma imagem para o Sanity
 */
async function uploadImageToSanity(imageUrl: string, filename: string): Promise<string | null> {
  try {
    console.log(`  📷 Baixando imagem: ${imageUrl}`)

    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.log(`  ⚠️  Falha ao baixar imagem: ${response.status}`)
      return null
    }

    const buffer = await response.arrayBuffer()
    const asset = await sanityClient.assets.upload('image', Buffer.from(buffer), {
      filename,
    })

    console.log(`  ✅ Imagem enviada: ${asset._id}`)
    return asset._id
  } catch (error) {
    console.log(`  ⚠️  Erro ao processar imagem: ${error}`)
    return null
  }
}

/**
 * Busca todos os posts do WordPress
 */
async function fetchWordPressPosts(): Promise<WPPost[]> {
  const allPosts: WPPost[] = []
  let page = 1
  const perPage = 100

  console.log('📥 Buscando posts do WordPress...\n')

  while (true) {
    const url = `${WORDPRESS_URL}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`
    console.log(`  Página ${page}: ${url}`)

    try {
      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 400) {
          // Fim dos posts
          break
        }
        throw new Error(`HTTP ${response.status}`)
      }

      const posts = await response.json() as WPPost[]

      if (posts.length === 0) {
        break
      }

      allPosts.push(...posts)
      console.log(`  ✅ ${posts.length} posts encontrados`)

      // Verificar se há mais páginas
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
      if (page >= totalPages) {
        break
      }

      page++
    } catch (error) {
      console.log(`  ❌ Erro: ${error}`)
      break
    }
  }

  console.log(`\n📊 Total: ${allPosts.length} posts encontrados\n`)
  return allPosts
}

/**
 * Verifica se um post já existe no Sanity pelo slug
 */
async function postExistsInSanity(slug: string): Promise<boolean> {
  const query = `count(*[_type == "post" && slug.current == $slug])`
  const count = await sanityClient.fetch(query, { slug })
  return count > 0
}

/**
 * Cria um post no Sanity
 */
async function createSanityPost(wpPost: WPPost): Promise<void> {
  const slug = wpPost.slug

  console.log(`\n📝 Processando: "${stripHtml(wpPost.title.rendered)}"`)
  console.log(`   Slug: ${slug}`)

  // Verificar se já existe
  const exists = await postExistsInSanity(slug)
  if (exists) {
    console.log(`   ⏭️  Já existe no Sanity, pulando...`)
    return
  }

  // Preparar dados
  const title = stripHtml(wpPost.title.rendered)
  const excerpt = stripHtml(wpPost.excerpt.rendered).substring(0, 220)
  const body = htmlToPortableText(wpPost.content.rendered)
  const publishedAt = new Date(wpPost.date).toISOString()

  // Upload da imagem de capa
  let coverImageRef: string | null = null
  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0]
  if (featuredMedia?.source_url) {
    coverImageRef = await uploadImageToSanity(
      featuredMedia.source_url,
      `${slug}-cover.jpg`
    )
  }

  // Montar documento
  const doc: any = {
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    excerpt,
    publishedAt,
    stage: 'diagnostico', // Valor padrão
    format: 'artigo', // Valor padrão
    body,
  }

  // Adicionar imagem de capa se existir
  if (coverImageRef) {
    doc.coverImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: coverImageRef },
      alt: featuredMedia?.alt_text || title,
    }
  }

  // Adicionar autor se configurado
  if (DEFAULT_AUTHOR_ID) {
    doc.authors = [{ _type: 'reference', _ref: DEFAULT_AUTHOR_ID }]
  }

  // Adicionar tema se configurado
  if (DEFAULT_THEME_ID) {
    doc.primaryTheme = { _type: 'reference', _ref: DEFAULT_THEME_ID }
  }

  // Criar no Sanity
  try {
    const created = await sanityClient.create(doc)
    console.log(`   ✅ Criado no Sanity: ${created._id}`)
  } catch (error) {
    console.log(`   ❌ Erro ao criar: ${error}`)
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('═'.repeat(60))
  console.log('  WordPress → Sanity Migration')
  console.log('═'.repeat(60))
  console.log()

  // Verificar configuração
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN não configurado no .env.local')
    console.error('   Crie um token em: https://www.sanity.io/manage')
    process.exit(1)
  }

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID não configurado')
    process.exit(1)
  }

  console.log(`📡 WordPress URL: ${WORDPRESS_URL}`)
  console.log(`📦 Sanity Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`📂 Sanity Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)
  console.log()

  // Avisos sobre configuração
  if (!DEFAULT_AUTHOR_ID) {
    console.log('⚠️  DEFAULT_AUTHOR_ID não configurado - posts serão criados sem autor')
  }
  if (!DEFAULT_THEME_ID) {
    console.log('⚠️  DEFAULT_THEME_ID não configurado - posts serão criados sem tema')
  }
  console.log()

  // Buscar posts do WordPress
  const wpPosts = await fetchWordPressPosts()

  if (wpPosts.length === 0) {
    console.log('❌ Nenhum post encontrado no WordPress')
    console.log('   Verifique se o arquivo hosts está configurado corretamente')
    process.exit(1)
  }

  // Exportar lista de slugs para referência
  const slugList = wpPosts.map(p => ({
    slug: p.slug,
    title: stripHtml(p.title.rendered),
    date: p.date,
  }))

  const slugListPath = path.resolve(process.cwd(), 'scripts/wordpress-posts-list.json')
  fs.writeFileSync(slugListPath, JSON.stringify(slugList, null, 2))
  console.log(`📋 Lista de posts salva em: ${slugListPath}\n`)

  // Confirmar migração
  console.log('═'.repeat(60))
  console.log(`  Pronto para migrar ${wpPosts.length} posts`)
  console.log('═'.repeat(60))
  console.log()
  console.log('Os seguintes posts serão migrados:')
  wpPosts.slice(0, 10).forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.slug}`)
  })
  if (wpPosts.length > 10) {
    console.log(`  ... e mais ${wpPosts.length - 10} posts`)
  }
  console.log()

  // Migrar cada post
  console.log('🚀 Iniciando migração...\n')

  let success = 0
  let skipped = 0
  let failed = 0

  for (const wpPost of wpPosts) {
    try {
      const exists = await postExistsInSanity(wpPost.slug)
      if (exists) {
        skipped++
        console.log(`⏭️  ${wpPost.slug} (já existe)`)
        continue
      }

      await createSanityPost(wpPost)
      success++
    } catch (error) {
      failed++
      console.log(`❌ ${wpPost.slug}: ${error}`)
    }
  }

  // Resumo final
  console.log()
  console.log('═'.repeat(60))
  console.log('  Migração Concluída!')
  console.log('═'.repeat(60))
  console.log()
  console.log(`  ✅ Migrados: ${success}`)
  console.log(`  ⏭️  Pulados (já existiam): ${skipped}`)
  console.log(`  ❌ Falhas: ${failed}`)
  console.log()
  console.log('Próximos passos:')
  console.log('  1. Acesse o Sanity Studio e revise os posts importados')
  console.log('  2. Adicione autores e temas manualmente se necessário')
  console.log('  3. Faça deploy do site para aplicar as mudanças')
  console.log()
}

// Executar
main().catch(console.error)
