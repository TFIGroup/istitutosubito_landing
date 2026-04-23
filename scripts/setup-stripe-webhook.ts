/**
 * Crea il webhook endpoint su Stripe live puntato a istitutosubito.com.
 * Lanciare con: npx tsx scripts/setup-stripe-webhook.ts
 */
import Stripe from 'stripe'
import fs from 'node:fs'
import path from 'node:path'

const envPath = path.resolve(process.cwd(), '.env.production.live')
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)="(.*)"$/)
  if (m) process.env[m[1]] = m[2]
}

const secret = process.env.STRIPE_SECRET_KEY
if (!secret?.startsWith('sk_live_')) {
  console.error('❌ STRIPE_SECRET_KEY non è live')
  process.exit(1)
}

const stripe = new Stripe(secret)
const ENDPOINT_URL = 'https://istitutosubito.com/api/webhooks/stripe'

async function main() {
  // Se esiste già un endpoint per questo URL, riutilizzalo (Stripe non ritorna il secret in quel caso — solo alla create)
  const existing = await stripe.webhookEndpoints.list({ limit: 100 })
  const match = existing.data.find((e) => e.url === ENDPOINT_URL)

  if (match) {
    console.log(`⚠ Webhook già esistente: ${match.id}`)
    console.log(`   URL: ${match.url}`)
    console.log(`   Status: ${match.status}`)
    console.log('\nSe serve il secret (whsec_...), cancella l\'endpoint esistente dalla dashboard Stripe e rilancia questo script.')
    console.log('Oppure vai su https://dashboard.stripe.com/webhooks, apri l\'endpoint, click "Reveal signing secret".')
    return
  }

  const endpoint = await stripe.webhookEndpoints.create({
    url: ENDPOINT_URL,
    enabled_events: [
      'checkout.session.completed',
      'checkout.session.expired',
      'payment_intent.succeeded',
      'payment_intent.payment_failed',
    ],
    description: 'Istituto Subito - landing production webhook',
  })

  console.log(`\n✓ Webhook creato: ${endpoint.id}`)
  console.log(`  URL: ${endpoint.url}`)
  console.log(`  Events: ${endpoint.enabled_events.join(', ')}`)
  console.log(`\n🔑 SIGNING SECRET (aggiungilo come STRIPE_WEBHOOK_SECRET in Vercel):`)
  console.log(`   ${endpoint.secret}`)
  console.log()
}

main().catch((err) => {
  console.error('❌ Errore:', err)
  process.exit(1)
})
