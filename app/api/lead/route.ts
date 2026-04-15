import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(2, 'Nome richiesto'),
  phone: z.string().min(10, 'Numero di telefono non valido'),
  interest: z.enum(['lv1', 'lv2', 'lv3']),
  motivation: z.string().min(1, 'Seleziona una motivazione'),
})

const TIER_NAMES: Record<string, string> = {
  lv1: 'LV1 - Tecnico Riparatore (€1.490)',
  lv2: 'LV2 - Tecnico Microsaldatore (€2.490)',
  lv3: 'LV3 - Tecnico Master (€3.990)',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = leadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, phone, interest, motivation } = result.data
    const timestamp = new Date().toISOString()
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    console.log('=== NUOVO LEAD ===')
    console.log('Nome:', name)
    console.log('Telefono:', phone)
    console.log('Interesse:', interest)
    console.log('Motivazione:', motivation)
    console.log('IP:', ip)
    console.log('==================')

    // Manda a Zoho Cliq
    const zohoWebhookUrl = process.env.ZOHO_CLIQ_WEBHOOK_URL
    if (zohoWebhookUrl) {
      const message = [
        `📞 NUOVO LEAD - Vuole parlare con un Capotecnico`,
        ``,
        `👤 ${name}`,
        `📱 ${phone}`,
        `📋 Interesse: ${TIER_NAMES[interest] || interest.toUpperCase()}`,
        `💬 Motivazione: ${motivation}`,
        ``,
        `⏰ Richiamare entro 24h su WhatsApp`,
      ].join('\n')

      try {
        await fetch(zohoWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message }),
        })
      } catch (webhookError) {
        console.error('Errore invio Zoho Cliq:', webhookError)
      }
    }

    // Manda email notifica interna
    try {
      const { sendEmail } = await import('@/lib/email')
      await sendEmail({
        to: 'info@istitutosubito.com',
        subject: `Nuovo lead - ${name} - ${interest.toUpperCase()}`,
        html: `
          <h2>Nuovo lead dal sito</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Nome:</td><td>${name}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Telefono:</td><td>${phone}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Interesse:</td><td>${TIER_NAMES[interest] || interest.toUpperCase()}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Motivazione:</td><td>${motivation}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">IP:</td><td>${ip}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Timestamp:</td><td>${timestamp}</td></tr>
          </table>
          <p><strong>Richiamare entro 24h su WhatsApp.</strong></p>
        `,
      })
    } catch {
      // Non blocca
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
