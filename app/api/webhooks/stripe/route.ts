import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { sendEmail } from '@/lib/email'
import { checkoutConfirmationHtml, internalNotificationHtml } from '@/lib/email-templates'
import { generateTermsPdf } from '@/lib/generate-terms-pdf'
import { getTierById } from '@/lib/tiers'

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

      // Genera PDF dei termini accettati
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
          tierName: tierData?.name || tier.toUpperCase(),
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

      // Invia email conferma all'utente
      if (email) {
        try {
          await sendEmail({
            to: email,
            subject: 'Iscrizione confermata - Istituto Subito',
            html: checkoutConfirmationHtml({
              fullName,
              tierName: tierData?.name || tier.toUpperCase(),
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

      // Invia email interna copia a info@istitutosubito.com
      try {
        await sendEmail({
          to: 'info@istitutosubito.com',
          subject: `Nuova iscrizione - ${fullName} - ${tier.toUpperCase()}`,
          html: internalNotificationHtml({
            fullName,
            email,
            phone,
            tierName: tierData?.name || tier.toUpperCase(),
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
