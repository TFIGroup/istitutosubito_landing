import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

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
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${errorMessage}`)
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      
      console.log('=== CHECKOUT COMPLETED ===')
      console.log('Session ID:', session.id)
      console.log('Customer Email:', session.customer_email)
      console.log('Amount Total:', session.amount_total)
      console.log('Metadata:', session.metadata)
      console.log('========================')

      // TODO: Implement the following integrations:
      // 1. Send data to Google Sheets
      // 2. Send notification to Zoho Cliq
      // 3. Trigger welcome email
      // 4. Add to CRM

      // Example webhook payload for Zoho Cliq:
      // const zohoWebhookUrl = process.env.ZOHO_CLIQ_WEBHOOK_URL
      // if (zohoWebhookUrl) {
      //   await fetch(zohoWebhookUrl, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       text: `Nuova iscrizione! ${session.customer_email} - ${session.metadata?.tier}`,
      //       email: session.customer_email,
      //       tier: session.metadata?.tier,
      //       amount: session.amount_total,
      //     }),
      //   })
      // }

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
