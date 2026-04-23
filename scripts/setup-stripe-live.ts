/**
 * One-off: crea i 4 prodotti live su Stripe (LV1, LV2, LV3, Deposit).
 * Lanciare con: npx tsx scripts/setup-stripe-live.ts
 * Richiede: .env.production.live (vercel env pull --environment=production)
 */
import Stripe from 'stripe'
import fs from 'node:fs'
import path from 'node:path'

const envPath = path.resolve(process.cwd(), '.env.production.live')
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.production.live non trovato. Esegui prima: vercel env pull .env.production.live --environment=production')
  process.exit(1)
}
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)="(.*)"$/)
  if (m) process.env[m[1]] = m[2]
}

const secret = process.env.STRIPE_SECRET_KEY
if (!secret?.startsWith('sk_live_')) {
  console.error('❌ STRIPE_SECRET_KEY non è live (deve iniziare con sk_live_)')
  process.exit(1)
}

const stripe = new Stripe(secret)

const products = [
  {
    key: 'LV1',
    name: 'Istituto Subito - LV1 Tecnico Riparatore',
    description: 'Corso online 1-to-1 con Capotecnico. Kit hardware professionale + Licenza LV1 verificabile.',
    unitAmount: 149000,
  },
  {
    key: 'LV2',
    name: 'Istituto Subito - LV2 Tecnico Microsaldatore',
    description: 'Corso online 1-to-1 con Capotecnico. Kit microsaldatura + Licenza LV2 verificabile.',
    unitAmount: 249000,
  },
  {
    key: 'LV3',
    name: 'Istituto Subito - LV3 Tecnico Master',
    description: 'Corso online 1-to-1 con Capotecnico. Kit completo + Licenza LV3 verificabile.',
    unitAmount: 399000,
  },
  {
    key: 'DEPOSIT',
    name: 'Istituto Subito - Acconto Blocca Posto',
    description: 'Acconto rimborsabile al 100% dopo la Call Conoscitiva col Capotecnico.',
    unitAmount: 9900,
  },
]

async function main() {
  const results: { key: string; productId: string; priceId: string }[] = []

  for (const p of products) {
    console.log(`\n📦 Creo ${p.key}: ${p.name}`)
    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      metadata: { source: 'setup-stripe-live', tier: p.key.toLowerCase() },
    })
    console.log(`   product: ${product.id}`)

    const price = await stripe.prices.create({
      product: product.id,
      currency: 'eur',
      unit_amount: p.unitAmount,
      metadata: { tier: p.key.toLowerCase() },
    })
    console.log(`   price:   ${price.id}  (€${p.unitAmount / 100})`)

    results.push({ key: p.key, productId: product.id, priceId: price.id })
  }

  console.log('\n\n========================================')
  console.log('RIEPILOGO — copia questi in Vercel env:')
  console.log('========================================')
  for (const r of results) {
    const envVar = r.key === 'DEPOSIT' ? 'STRIPE_DEPOSIT_PRICE_ID' : `STRIPE_PRICE_${r.key}`
    console.log(`${envVar}=${r.priceId}`)
  }
  console.log('========================================\n')
}

main().catch((err) => {
  console.error('❌ Errore:', err)
  process.exit(1)
})
