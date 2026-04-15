import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema flessibile: salva qualsiasi combinazione di dati parziali
const partialLeadSchema = z.object({
  tier: z.string().optional(),
  phone: z.string().min(6).optional(),
  email: z.string().email().optional(),
  fullName: z.string().min(2).optional(),
  step: z.string(), // quale step ha completato: 'phone', 'email', 'details'
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = partialLeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const data = parsed.data
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const timestamp = new Date().toISOString()

    // Log per audit + recupero lead
    console.log('=== LEAD PARZIALE ===')
    console.log('Step:', data.step)
    console.log('Tier:', data.tier || '-')
    console.log('Telefono:', data.phone || '-')
    console.log('Email:', data.email || '-')
    console.log('Nome:', data.fullName || '-')
    console.log('IP:', ip)
    console.log('Timestamp:', timestamp)
    console.log('====================')

    // Notifica Zoho Cliq se configurato (stessa pipeline di Carmine)
    const zohoWebhookUrl = process.env.ZOHO_CLIQ_WEBHOOK_URL
    if (zohoWebhookUrl && data.phone) {
      try {
        await fetch(zohoWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `Lead checkout (step: ${data.step}) · Tel: +39${data.phone}${data.email ? ` · Email: ${data.email}` : ''}${data.fullName ? ` · Nome: ${data.fullName}` : ''} · Tier: ${data.tier || '?'}`,
          }),
        })
      } catch (e) {
        console.error('Zoho Cliq notification failed:', e)
      }
    }

    // Notifica email interna (best-effort)
    try {
      const { sendEmail } = await import('@/lib/email')
      await sendEmail({
        to: 'info@istitutosubito.com',
        subject: `Lead parziale (${data.step}) - ${data.phone ? '+39' + data.phone : data.email || 'anonimo'}`,
        html: `
          <h3>Lead parziale dal checkout</h3>
          <p><strong>Step completato:</strong> ${data.step}</p>
          <p><strong>Telefono:</strong> ${data.phone ? '+39' + data.phone : '-'}</p>
          <p><strong>Email:</strong> ${data.email || '-'}</p>
          <p><strong>Nome:</strong> ${data.fullName || '-'}</p>
          <p><strong>Tier:</strong> ${data.tier || '-'}</p>
          <p><strong>IP:</strong> ${ip}</p>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><em>Questo lead ha iniziato il checkout ma non ha completato il pagamento. Contattare su WhatsApp.</em></p>
        `,
      })
    } catch {
      // Non blocca: l'email potrebbe non essere configurata
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
