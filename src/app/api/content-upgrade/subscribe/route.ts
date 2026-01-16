import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, contentUpgradeId, contentUpgradeSlug, contentUpgradeTitle } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    if (!contentUpgradeId) {
      return NextResponse.json({ error: 'Content upgrade não especificado' }, { status: 400 })
    }

    if (!client) {
      return NextResponse.json({ error: 'Sanity client não configurado' }, { status: 500 })
    }

    // 1. Buscar content upgrade no Sanity para pegar URL do arquivo e tag
    const contentUpgrade = await client.fetch(
      groq`*[_type == "contentUpgrade" && _id == $id][0] {
        title,
        format,
        "fileUrl": file.asset->url,
        externalUrl,
        emailTag
      }`,
      { id: contentUpgradeId }
    )

    if (!contentUpgrade) {
      return NextResponse.json({ error: 'Content upgrade não encontrado' }, { status: 404 })
    }

    const downloadUrl = contentUpgrade.externalUrl || contentUpgrade.fileUrl
    const emailTag = contentUpgrade.emailTag || `content-upgrade-${contentUpgradeSlug}`

    // Log para debugging
    console.log('[Content Upgrade] New download request:', {
      email,
      contentUpgradeId,
      contentUpgradeTitle: contentUpgradeTitle || contentUpgrade.title,
      format: contentUpgrade.format,
      tag: emailTag,
      downloadUrl: downloadUrl ? 'available' : 'not-set',
    })

    // TODO: Integrar com ferramenta de email marketing
    // O código abaixo é um template para diferentes integrações:
    //
    // ========== OPÇÃO 1: ActiveCampaign (Recomendado) ==========
    // const activeCampaignApiKey = process.env.ACTIVECAMPAIGN_API_KEY
    // const activeCampaignBaseUrl = process.env.ACTIVECAMPAIGN_BASE_URL
    //
    // // Criar/atualizar contato
    // await fetch(`${activeCampaignBaseUrl}/api/3/contacts`, {
    //   method: 'POST',
    //   headers: {
    //     'Api-Token': activeCampaignApiKey!,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     contact: {
    //       email,
    //       fieldValues: [
    //         { field: 'LAST_CONTENT_UPGRADE', value: contentUpgradeTitle },
    //       ],
    //     },
    //   }),
    // })
    //
    // // Adicionar tag
    // await fetch(`${activeCampaignBaseUrl}/api/3/contactTags`, {
    //   method: 'POST',
    //   headers: { 'Api-Token': activeCampaignApiKey!, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     contactTag: { contact: contactId, tag: tagId },
    //   }),
    // })
    //
    // ========== OPÇÃO 2: Resend (Simples) ==========
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    // })
    //
    // await resend.emails.send({
    //   from: 'Zopu <conteudo@zopu.com.br>',
    //   to: email,
    //   subject: `Seu material: ${contentUpgrade.title}`,
    //   html: `
    //     <h1>Seu material está pronto!</h1>
    //     <p>Clique abaixo para baixar:</p>
    //     <a href="${downloadUrl}">Baixar ${contentUpgrade.title}</a>
    //   `,
    // })
    //
    // ========== OPÇÃO 3: Brevo (SendinBlue) ==========
    // const brevoApiKey = process.env.BREVO_API_KEY
    // await fetch('https://api.brevo.com/v3/contacts', {
    //   method: 'POST',
    //   headers: {
    //     'api-key': brevoApiKey!,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email,
    //     attributes: { CONTENT_UPGRADE: contentUpgradeTitle },
    //     listIds: [listId],
    //     updateEnabled: true,
    //   }),
    // })

    return NextResponse.json({
      success: true,
      message: 'Inscricao realizada com sucesso',
      // Opcional: retornar URL para download direto (se preferir não depender do email)
      // downloadUrl,
    })
  } catch (error) {
    console.error('[Content Upgrade] Error:', error)
    return NextResponse.json({ error: 'Erro ao processar inscricao' }, { status: 500 })
  }
}
