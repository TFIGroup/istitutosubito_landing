import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

const DEPOSIT_AMOUNT = 9900 // €99 in cents

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe non e\' configurato. Aggiungi STRIPE_SECRET_KEY in .env.local' },
        { status: 503 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const tier: string = typeof body.tier === 'string' ? body.tier : 'lv1'
    const fullName: string = typeof body.fullName === 'string' ? body.fullName : ''
    const email: string = typeof body.email === 'string' ? body.email : ''
    const phone: string = typeof body.phone === 'string' ? body.phone : ''
    const promoPrice: number | undefined = typeof body.promoPrice === 'number' ? body.promoPrice : undefined

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const timestamp = new Date().toISOString()
    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const stripeMetadata: Record<string, string> = {
      type: 'deposit',
      tier,
      source: 'recovery_modal',
      timestamp,
      ip_address: ip,
      user_agent: userAgent.slice(0, 500),
    }
    if (promoPrice !== undefined) stripeMetadata.promo_price = String(promoPrice)
    if (fullName) stripeMetadata.full_name = fullName
    if (email) stripeMetadata.email = email
    if (phone) stripeMetadata.phone = phone

    const depositPriceId = process.env.STRIPE_DEPOSIT_PRICE_ID

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      locale: 'it',
      metadata: stripeMetadata,
      success_url: `${baseUrl}/grazie-acconto?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
    }

    if (email) sessionConfig.customer_email = email

    if (depositPriceId) {
      sessionConfig.line_items = [{ price: depositPriceId, quantity: 1 }]
    } else {
      sessionConfig.line_items = [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Istituto Subito - Acconto Blocca Posto',
              description: 'Blocca il tuo posto e parla col Capotecnico. Rimborsabile se ti presenti all\'appuntamento.',
            },
            unit_amount: DEPOSIT_AMOUNT,
          },
          quantity: 1,
        },
      ]
    }

    console.log('=== DEPOSIT CHECKOUT CREATED ===')
    console.log('Timestamp:', timestamp)
    console.log('Tier scelto:', tier)
    console.log('Email:', email || '(assente)')
    console.log('================================')

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Deposit checkout error:', message, error)
    return NextResponse.json(
      { error: `Checkout error: ${message}` },
      { status: 500 }
    )
  }
}
