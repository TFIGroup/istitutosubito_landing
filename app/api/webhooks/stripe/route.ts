import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { sendEmail } from '@/lib/email'
import { checkoutConfirmationHtml, internalNotificationHtml } from '@/lib/email-templates'
import { generateTermsPdf } from '@/lib/generate-terms-pdf'
import { getTierById } from '@/lib/tiers'
import { saveCheckoutEvent, updateDeliveryStatus } from '@/lib/db'

// Notifica Zoho Cliq con fuochi d'artificio
async function notifyCliq(sessionId: string, data: {
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
  if (!zohoUrl) {
    await updateDeliveryStatus(sessionId, 'cliq', 'failed', 'ZOHO_CLIQ_WEBHOOK_URL non configurato')
    return
  }

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
    await updateDeliveryStatus(sessionId, 'cliq', 'sent')
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown'
    await updateDeliveryStatus(sessionId, 'cliq', 'failed', msg)
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = stripe!.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${errorMessage}`)
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const meta = session.metadata || {}

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

      // 0. Salva nel database
      try {
        await saveCheckoutEvent({
          session_id: session.id,
          tier,
          full_name: fullName,
          email,
          phone,
          address,
          postal_code: postalCode,
          city,
          province,
          delivery_notes: deliveryNotes,
          marketing_consent: marketingConsent,
          terms_version: termsVersion,
          terms_accepted_at: timestamp,
          ip_address: ip,
          user_agent: meta.user_agent || '',
          amount_cents: session.amount_total || 0,
        })
      } catch (dbErr) {
        console.error('Errore salvataggio DB (non bloccante):', dbErr)
      }

      // 1. Notifica Zoho Cliq
      await notifyCliq(session.id, {
        fullName, tier, tierName, amount: amountTotal,
        email, phone, city, province, sessionId: session.id,
      })

      // 2. Genera PDF dei termini
      let pdfBuffer: Buffer | null = null
      try {
        pdfBuffer = await generateTermsPdf({
          fullName, email, phone, address, postalCode, city, province,
          tierName, tier, price: amountTotal, orderId: session.id,
          timestamp, ip, termsVersion,
        })
      } catch (pdfErr) {
        console.error('Errore generazione PDF:', pdfErr)
      }

      const pdfAttachment = pdfBuffer ? [{
        filename: `Termini-Iscrizione-IstitutoSubito-${session.id.slice(-8)}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf' as const,
      }] : undefined

      // 3. Email conferma utente
      if (email) {
        try {
          await sendEmail({
            to: email,
            subject: 'Iscrizione confermata - Istituto Subito',
            html: checkoutConfirmationHtml({
              fullName, tierName, price: amountTotal, orderId: session.id,
              phone, address, postalCode, city, province,
            }),
            attachments: pdfAttachment,
          })
          await updateDeliveryStatus(session.id, 'email_user', 'sent')
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown'
          console.error('Errore email utente:', msg)
          await updateDeliveryStatus(session.id, 'email_user', 'failed', msg)
        }
      }

      // 4. Email interna info@
      try {
        await sendEmail({
          to: 'info@istitutosubito.com',
          subject: `Nuova iscrizione - ${fullName} - ${tier.toUpperCase()}`,
          html: internalNotificationHtml({
            fullName, email, phone, tierName, tier, price: amountTotal,
            orderId: session.id, address, postalCode, city, province,
            deliveryNotes, marketingConsent, termsVersion, ip, timestamp,
          }),
          attachments: pdfAttachment,
        })
        await updateDeliveryStatus(session.id, 'email_internal', 'sent')
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown'
        console.error('Errore email interna:', msg)
        await updateDeliveryStatus(session.id, 'email_internal', 'failed', msg)
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
        await updateDeliveryStatus(session.id, 'email_daniele', 'sent')
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown'
        console.error('Errore email Daniele:', msg)
        await updateDeliveryStatus(session.id, 'email_daniele', 'failed', msg)
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
