// Tier types and helpers. Fonte di verità: content.ts
import { content } from '@/lib/content'

type ContentTier = (typeof content.pricing.tiers)[number]

export interface Tier {
  id: ContentTier['id']
  code: string
  name: string
  positioning: string
  tagline: string
  price: number // in cents for Stripe
  priceFormatted: string
  priceFullFormatted: string
  installmentFormatted: string
  popular: boolean
  features: string[]
  ctaPrimary: { label: string; type: 'checkout' | 'lead' }
  ctaSecondary?: { label: string; type: 'checkout' | 'lead' }
  description: string
  guarantee: string
  badge?: string
}

// Map content.ts pricing launch prices (in EUR) to Stripe cents
const PRICE_MAP: Record<string, { price: number; priceFormatted: string; priceFullFormatted: string; installmentFormatted: string }> = {
  lv1: { price: 149000, priceFormatted: '1.490', priceFullFormatted: '1.690', installmentFormatted: '497' },
  lv2: { price: 249000, priceFormatted: '2.490', priceFullFormatted: '2.690', installmentFormatted: '830' },
  lv3: { price: 399000, priceFormatted: '3.990', priceFullFormatted: '4.190', installmentFormatted: '1.330' },
}

export const TIERS: Tier[] = content.pricing.tiers.map((t) => ({
  id: t.id,
  code: t.code,
  name: t.name,
  positioning: t.positioning,
  tagline: t.tagline,
  price: PRICE_MAP[t.id].price,
  priceFormatted: PRICE_MAP[t.id].priceFormatted,
  priceFullFormatted: PRICE_MAP[t.id].priceFullFormatted,
  installmentFormatted: PRICE_MAP[t.id].installmentFormatted,
  popular: t.highlighted,
  features: t.features,
  ctaPrimary: t.ctaPrimary,
  ctaSecondary: 'ctaSecondary' in t ? t.ctaSecondary : undefined,
  description: t.tagline,
  guarantee: t.guarantee,
  badge: 'badge' in t ? (t.badge as string) : undefined,
}))

export function getTierById(id: string): Tier | undefined {
  return TIERS.find(tier => tier.id === id)
}

export function getTierPrice(id: string): number {
  const tier = getTierById(id)
  return tier?.price ?? 0
}

// Prodotto deposito €99 per recovery checkout (non mostrato nel pricing pubblico)
export const DEPOSIT_PRODUCT = {
  id: 'deposit',
  name: 'Acconto Blocca Posto',
  price: 9900, // cents
  priceFormatted: '99',
  stripePriceId: process.env.STRIPE_DEPOSIT_PRICE_ID,
  description: 'Blocca il tuo posto e parla col Capotecnico',
} as const
