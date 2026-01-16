import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Sanity Webhook Secret (configurar no Sanity Dashboard)
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

type SanityWebhookPayload = {
  _type: string
  _id: string
  slug?: { current: string }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar assinatura do webhook (se configurado)
    const signature = request.headers.get('sanity-webhook-signature')
    if (SANITY_WEBHOOK_SECRET && signature !== SANITY_WEBHOOK_SECRET) {
      console.warn('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const body: SanityWebhookPayload = await request.json()
    const { _type, slug } = body

    console.log(`[Sanity Webhook] Received: ${_type}`, body)

    // Revalidar baseado no tipo de documento - { expire: 0 } para expiração imediata
    switch (_type) {
      case 'post':
        revalidateTag('post', { expire: 0 })
        if (slug?.current) {
          revalidatePath(`/recursos/blog/${slug.current}`)
        }
        revalidatePath('/recursos/blog')
        revalidatePath('/recursos')
        break

      case 'contentUpgrade':
        // Content upgrades afetam posts que os usam
        revalidateTag('post', { expire: 0 })
        break

      case 'theme':
        revalidateTag('theme', { expire: 0 })
        revalidatePath('/recursos/blog')
        if (slug?.current) {
          revalidatePath(`/recursos/tema/${slug.current}`)
        }
        break

      case 'interest':
        revalidateTag('interest', { expire: 0 })
        if (slug?.current) {
          revalidatePath(`/recursos/interesse/${slug.current}`)
        }
        break

      case 'author':
        revalidateTag('author', { expire: 0 })
        if (slug?.current) {
          revalidatePath(`/recursos/autores/${slug.current}`)
        }
        break

      case 'series':
        revalidateTag('series', { expire: 0 })
        if (slug?.current) {
          revalidatePath(`/recursos/series/${slug.current}`)
        }
        break

      default:
        // Revalidar tudo por segurança
        revalidateTag('post', { expire: 0 })
        revalidateTag('theme', { expire: 0 })
        revalidateTag('interest', { expire: 0 })
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      slug: slug?.current,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Sanity Webhook] Error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
