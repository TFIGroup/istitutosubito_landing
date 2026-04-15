import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getTierById } from '@/lib/tiers'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe non è configurato. Aggiungi STRIPE_SECRET_KEY in .env.local' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { tier, email } = body as { tier: string; email?: string }

    if (!tier || !['lv1', 'lv2', 'lv3'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier specified' },
        { status: 400 }
      )
    }

    const tierData = getTierById(tier)
    if (!tierData) {
      return NextResponse.json(
        { error: 'Tier not found' },
        { status: 404 }
      )
    }

    // Get the price ID from environment variables
    const priceIdEnvVar = `STRIPE_PRICE_${tier.toUpperCase()}`
    const priceId = process.env[priceIdEnvVar]

    // Get the base URL for redirects
    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Create embedded checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      ui_mode: 'embedded_page',
      return_url: `${baseUrl}/grazie?session_id={CHECKOUT_SESSION_ID}`,
      locale: 'it',
      metadata: {
        tier,
        source: 'landing',
      },
      ...(email && { customer_email: email }),
    }

    // Use price ID if available, otherwise use price_data
    if (priceId) {
      sessionConfig.line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ]
    } else {
      // Fallback to price_data for development/testing
      sessionConfig.line_items = [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Istituto Subito - ${tierData.name}`,
              description: tierData.tagline,
            },
            unit_amount: tierData.price,
          },
          quantity: 1,
        },
      ]
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({ clientSecret: session.client_secret })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Checkout session error:', message, error)
    return NextResponse.json(
      { error: `Checkout error: ${message}` },
      { status: 500 }
    )
  }
}
