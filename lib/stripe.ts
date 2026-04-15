import 'server-only'

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.warn('⚠ STRIPE_SECRET_KEY non configurata. Il checkout non funzionerà.')
}

export const stripe = key ? new Stripe(key) : null
