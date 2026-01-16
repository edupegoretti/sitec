import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret para proteger a rota de revalidação
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, path, tag, type } = body

    // Verificar secret (opcional, mas recomendado em produção)
    if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    // Revalidar por tag (ex: 'post') - { expire: 0 } para expiração imediata
    if (tag) {
      revalidateTag(tag, { expire: 0 })
      return NextResponse.json({ revalidated: true, tag })
    }

    // Revalidar por path específico (ex: '/recursos/blog/meu-artigo')
    if (path) {
      revalidatePath(path, type === 'layout' ? 'layout' : 'page')
      return NextResponse.json({ revalidated: true, path })
    }

    // Revalidar todas as páginas de blog
    revalidateTag('post', { expire: 0 })
    revalidatePath('/recursos/blog', 'layout')

    return NextResponse.json({ revalidated: true, message: 'All blog content revalidated' })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}

// GET para facilitar teste no browser
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  const tag = searchParams.get('tag')
  const secret = searchParams.get('secret')

  // Verificar secret
  if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    if (tag) {
      revalidateTag(tag, { expire: 0 })
      return NextResponse.json({ revalidated: true, tag })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    // Default: revalidar todos os posts
    revalidateTag('post', { expire: 0 })
    return NextResponse.json({ revalidated: true, message: 'All posts revalidated' })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
