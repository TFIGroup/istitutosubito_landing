import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { sendEmail } from '@/lib/email'
import { checkoutConfirmationHtml, internalNotificationHtml } from '@/lib/email-templates'
import { generateTermsPdf } from '@/lib/generate-terms-pdf'
import { getTierById } from '@/lib/tiers'

// Notifica Zoho Cliq con fuochi d'artificio
async function notifyCliq(data: {
  fullName: string
  tier: string
  tierName: string
  amount: string
  email: string
  phone: string
  city: string
  province: string
  sessionId: string
}) {
  const zohoUrl = process.env.ZOHO_CLIQ_WEBHOOK_URL
  if (!zohoUrl) return

  const message = [
    `🎆🎆🎆 VENDITA! 🎆🎆🎆`,
    ``,
    `💰 Incassati €${data.amount}`,
    `📋 Corso: ${data.tier.toUpperCase()} - ${data.tierName}`,
    `👤 ${data.fullName}`,
    `📧 ${data.email}`,
    `📱 +39 ${data.phone}`,
    `📍 ${data.city} (${data.province})`,
    ``,
    `🔗 https://dashboard.stripe.com/search?query=${data.sessionId}`,
    ``,
    `🎉🎉🎉 GRANDE! 🎉🎉🎉`,
  ].join('\n')

  try {
    await fetch(zohoUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    })
    console.log('Notifica Cliq inviata')
  } catch (err) {
    console.error('Errore notifica Cliq:', err)
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe!.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${errorMessage}`)
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const meta = session.metadata || {}

      console.log('=== CHECKOUT COMPLETED ===')
      console.log('Session ID:', session.id)
      console.log('Customer Email:', session.customer_email)
      console.log('Amount Total:', session.amount_total)
      console.log('Metadata:', meta)
      console.log('========================')

      // Estrai dati dalla metadata
      const tier = meta.tier || 'lv1'
      const tierData = getTierById(tier)
      const tierName = tierData?.name || tier.toUpperCase()
      const fullName = meta.full_name || 'Studente'
      const email = session.customer_email || meta.email || ''
      const phone = meta.phone || ''
      const address = meta.address || ''
      const postalCode = meta.postal_code || ''
      const city = meta.city || ''
      const province = meta.province || ''
      const deliveryNotes = meta.delivery_notes || ''
      const marketingConsent = meta.marketing_consent === 'true'
      const termsVersion = meta.terms_version || '1.0-2026-04-14'
      const ip = meta.ip_address || 'unknown'
      const timestamp = meta.terms_accepted_at || new Date().toISOString()
      const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(0) : '0'

      // 1. Notifica Zoho Cliq con fuochi d'artificio
      await notifyCliq({
        fullName,
        tier,
        tierName,
        amount: amountTotal,
        email,
        phone,
        city,
        province,
        sessionId: session.id,
      })

      // 2. Genera PDF dei termini accettati
      let pdfBuffer: Buffer | null = null
      try {
        pdfBuffer = await generateTermsPdf({
          fullName,
          email,
          phone,
          address,
          postalCode,
          city,
          province,
          tierName,
          tier,
          price: amountTotal,
          orderId: session.id,
          timestamp,
          ip,
          termsVersion,
        })
      } catch (pdfErr) {
        console.error('Errore generazione PDF:', pdfErr)
      }

      // 3. Email conferma all'utente
      if (email) {
        try {
          await sendEmail({
            to: email,
            subject: 'Iscrizione confermata - Istituto Subito',
            html: checkoutConfirmationHtml({
              fullName,
              tierName,
              price: amountTotal,
              orderId: session.id,
              phone,
              address,
              postalCode,
              city,
              province,
            }),
            attachments: pdfBuffer ? [{
              filename: `Termini-Iscrizione-IstitutoSubito-${session.id.slice(-8)}.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf',
            }] : undefined,
          })
          console.log('Email conferma inviata a:', email)
        } catch (emailErr) {
          console.error('Errore invio email conferma:', emailErr)
        }
      }

      // 4. Email interna a info@istitutosubito.com
      try {
        await sendEmail({
          to: 'info@istitutosubito.com',
          subject: `Nuova iscrizione - ${fullName} - ${tier.toUpperCase()}`,
          html: internalNotificationHtml({
            fullName,
            email,
            phone,
            tierName,
            tier,
            price: amountTotal,
            orderId: session.id,
            address,
            postalCode,
            city,
            province,
            deliveryNotes,
            marketingConsent,
            termsVersion,
            ip,
            timestamp,
          }),
          attachments: pdfBuffer ? [{
            filename: `Termini-Iscrizione-IstitutoSubito-${session.id.slice(-8)}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          }] : undefined,
        })
        console.log('Email interna inviata a info@istitutosubito.com')
      } catch (emailErr) {
        console.error('Errore invio email interna:', emailErr)
      }

      // 5. Email CONGRATULAZIONI a Daniele
      try {
        await sendEmail({
          to: 'vietridaniele@gmail.com',
          subject: `CONGRATULAZIONI - €${amountTotal} incassato`,
          html: `
            <div style="font-family:sans-serif;max-width:500px;margin:0 auto;text-align:center;padding:40px 20px;">
              <h1 style="font-size:48px;margin:0;">🎉</h1>
              <h1 style="color:#0A2540;font-size:28px;margin:16px 0 8px;">CONGRATULAZIONI!</h1>
              <p style="font-size:36px;font-weight:800;color:#1E88E5;margin:0;">&euro;${amountTotal} incassato</p>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
              <table style="width:100%;text-align:left;font-size:14px;color:#555;">
                <tr><td style="padding:6px 0;font-weight:600;">Corso:</td><td>${tier.toUpperCase()} - ${tierName}</td></tr>
                <tr><td style="padding:6px 0;font-weight:600;">Studente:</td><td>${fullName}</td></tr>
                <tr><td style="padding:6px 0;font-weight:600;">Email:</td><td>${email}</td></tr>
                <tr><td style="padding:6px 0;font-weight:600;">Telefono:</td><td>+39 ${phone}</td></tr>
                <tr><td style="padding:6px 0;font-weight:600;">Citta:</td><td>${city} (${province})</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
              <a href="https://dashboard.stripe.com/search?query=${session.id}" style="display:inline-block;background:#1E88E5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Apri in Stripe</a>
            </div>
          `,
        })
        console.log('Email congratulazioni inviata a Daniele')
      } catch (emailErr) {
        console.error('Errore invio email congratulazioni:', emailErr)
      }

      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('Checkout session expired:', session.id)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
