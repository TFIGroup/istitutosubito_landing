'use client'

type FbqFn = (action: string, event: string, data?: Record<string, unknown>) => void
type GtagFn = (action: string, event: string, data?: Record<string, unknown>) => void

function getFbq(): FbqFn | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { fbq?: FbqFn }
  return w.fbq ?? null
}

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { gtag?: GtagFn }
  return w.gtag ?? null
}

export function trackPageView() {
  getFbq()?.('track', 'PageView')
}

export function trackLead(tier?: string) {
  getFbq()?.('track', 'Lead', tier ? { content_name: `Interesse ${tier.toUpperCase()}` } : undefined)
  getGtag()?.('event', 'generate_lead', { value: 0, currency: 'EUR' })
}

export function trackInitiateCheckout(tier: string, valueCents: number) {
  const value = valueCents / 100
  getFbq()?.('track', 'InitiateCheckout', {
    content_name: `Corso ${tier.toUpperCase()}`,
    value,
    currency: 'EUR',
  })
  getGtag()?.('event', 'begin_checkout', {
    value,
    currency: 'EUR',
    items: [{ item_name: `Corso ${tier.toUpperCase()}` }],
  })
}

export function trackPurchase(tier: string, valueCents: number, transactionId?: string) {
  const value = valueCents / 100
  getFbq()?.('track', 'Purchase', {
    content_name: `Corso ${tier.toUpperCase()}`,
    value,
    currency: 'EUR',
  })
  getGtag()?.('event', 'purchase', {
    transaction_id: transactionId,
    value,
    currency: 'EUR',
    items: [{ item_name: `Corso ${tier.toUpperCase()}` }],
  })
}
