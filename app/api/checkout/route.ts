import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getTierById } from '@/lib/tiers'
import { checkoutRequestSchema } from '@/lib/checkout-schema'
import { TERMS_VERSION } from '@/lib/terms-version'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe non e\' configurato. Aggiungi STRIPE_SECRET_KEY in .env.local' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const parsed = checkoutRequestSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]
      return NextResponse.json(
        { error: firstError?.message || 'Dati non validi' },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Verifica checkbox obbligatorie (doppio check server-side)
    if (!data.termsAccepted || !data.recessoWaiverAccepted) {
      return NextResponse.json(
        { error: 'Termini obbligatori non accettati' },
        { status: 400 }
      )
    }

    const tierData = getTierById(data.tier)
    if (!tierData) {
      return NextResponse.json(
        { error: 'Tier non trovato' },
        { status: 404 }
      )
    }

    // Cattura metadata richiesta
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const timestamp = new Date().toISOString()
    const termsVersion = body.termsVersion || TERMS_VERSION

    // Log completo per audit trail (OPZIONE C: zero-setup)
    console.log('=== CHECKOUT FORM SUBMITTED ===')
    console.log('Timestamp:', timestamp)
    console.log('IP:', ip)
    console.log('User-Agent:', userAgent)
    console.log('Tier:', data.tier)
    console.log('Nome:', data.fullName)
    console.log('Email:', data.email)
    console.log('Telefono:', data.phone)
    console.log('Indirizzo:', data.address, data.postalCode, data.city, data.province)
    console.log('Note consegna:', data.deliveryNotes)
    console.log('Termini accettati:', data.termsAccepted)
    console.log('Rinuncia recesso accettata:', data.recessoWaiverAccepted)
    console.log('Consenso marketing:', data.marketingConsent)
    console.log('Versione termini:', termsVersion)
    console.log('==============================')

    // Stripe metadata (max 50 chiavi, max 500 char per valore)
    const stripeMetadata: Record<string, string> = {
      tier: data.tier,
      source: 'landing',
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      postal_code: data.postalCode,
      city: data.city,
      province: data.province,
      delivery_notes: (data.deliveryNotes || '').slice(0, 500),
      terms_accepted: 'true',
      terms_accepted_at: timestamp,
      terms_version: termsVersion,
      recesso_waiver_accepted: 'true',
      marketing_consent: String(data.marketingConsent),
      ip_address: ip,
      user_agent: userAgent.slice(0, 500),
    }

    // Get the price ID from environment variables
    const priceIdEnvVar = `STRIPE_PRICE_${data.tier.toUpperCase()}`
    const priceId = process.env[priceIdEnvVar]

    // Get the base URL for redirects
    const baseUrl = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Create embedded checkout session
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      ui_mode: 'embedded_page',
      return_url: `${baseUrl}/grazie?session_id={CHECKOUT_SESSION_ID}`,
      locale: 'it',
      metadata: stripeMetadata,
      customer_email: data.email,
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

    // Invio notifica interna via email (best-effort, non blocca il checkout)
    try {
      const { sendInternalNotification } = await import('@/lib/email')
      await sendInternalNotification({
        ...data,
        timestamp,
        ip,
        userAgent,
        termsVersion,
        sessionId: session.id,
      })
    } catch (emailErr) {
      console.error('Email notifica interna fallita (non bloccante):', emailErr)
    }

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
