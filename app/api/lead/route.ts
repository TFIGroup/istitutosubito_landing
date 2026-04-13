import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(2, 'Nome richiesto'),
  phone: z.string().min(10, 'Numero di telefono non valido'),
  interest: z.enum(['lv1', 'lv2', 'lv3']),
  motivation: z.string().min(1, 'Seleziona una motivazione'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const result = leadSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, phone, interest, motivation } = result.data

    // Log the lead (always useful for debugging)
    console.log('=== NEW LEAD ===')
    console.log('Name:', name)
    console.log('Phone:', phone)
    console.log('Interest:', interest)
    console.log('Motivation:', motivation)
    console.log('================')

    // Send to Zoho Cliq if webhook URL is configured
    const zohoWebhookUrl = process.env.ZOHO_CLIQ_WEBHOOK_URL
    
    if (zohoWebhookUrl) {
      try {
        await fetch(zohoWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: `Nuovo lead! ${name} - ${phone} - Interesse: ${interest.toUpperCase()} - ${motivation}`,
            name,
            phone,
            interest: interest.toUpperCase(),
            motivation,
            source: 'landing_exit_modal',
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (webhookError) {
        console.error('Failed to send to Zoho Cliq:', webhookError)
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
    })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}
