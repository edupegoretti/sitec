import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email invalido' },
        { status: 400 }
      )
    }

    // TODO: Integrate with email service (Resend, Mailchimp, etc.)
    // For now, just log and return success
    console.log('[Newsletter] New subscription:', email)

    // Example Resend integration:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID!,
    // })

    return NextResponse.json(
      { success: true, message: 'Inscricao realizada com sucesso' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Newsletter] Error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar inscricao' },
      { status: 500 }
    )
  }
}
