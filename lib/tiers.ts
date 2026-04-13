// Pricing Tiers Configuration
// Edit this file to change pricing, features, and tier details

export interface TierCta {
  label: string
  type: 'checkout' | 'lead'
}

export interface Tier {
  id: 'lv1' | 'lv2' | 'lv3'
  name: string
  tagline: string
  price: number
  priceFormatted: string
  installmentPrice: number
  installmentFormatted: string
  stripePriceEnvVar: string
  popular: boolean
  features: string[]
  ctaPrimary: TierCta
  ctaSecondary?: TierCta
  description: string
}

export const TIERS: Tier[] = [
  {
    id: 'lv1',
    name: 'LV1 - Tecnico Riparatore',
    tagline: 'Il tecnico che chiude la maggior parte dei lavori che entrano in laboratorio.',
    price: 149000, // in cents for Stripe
    priceFormatted: '1.490',
    installmentPrice: 49700,
    installmentFormatted: '497',
    stripePriceEnvVar: 'STRIPE_PRICE_LV1',
    popular: false,
    features: [
      '30 ore 1-to-1 col Capotecnico',
      'Calendario flessibile, costruito su di te',
      'Kit hardware professionale in comodato d\'uso',
      'Licenza professionale LV1 verificabile via QR',
      'Supporto post-diploma per 1 mese',
      'Esame finale e consegna licenza',
    ],
    ctaPrimary: { label: 'Iscriviti Ora', type: 'checkout' },
    description: 'Perfetto per chi parte da zero e vuole iniziare a guadagnare subito con le riparazioni piu richieste.',
  },
  {
    id: 'lv2',
    name: 'LV2 - Tecnico Microsaldatore',
    tagline: 'Il tecnico che gli altri negozi chiamano quando non sanno dove sbattere la testa.',
    price: 249000,
    priceFormatted: '2.490',
    installmentPrice: 83000,
    installmentFormatted: '830',
    stripePriceEnvVar: 'STRIPE_PRICE_LV2',
    popular: true,
    features: [
      '50 ore 1-to-1 col Capotecnico',
      'Calendario flessibile + priorita di prenotazione',
      'Kit hardware professionale in proprieta (te lo tieni)',
      'Licenza professionale LV2 verificabile via QR',
      'Ti mandiamo i primi clienti per 3 mesi',
      'Supporto post-diploma per 3 mesi',
    ],
    ctaPrimary: { label: 'Iscriviti Ora', type: 'checkout' },
    ctaSecondary: { label: 'Parla con un Capotecnico', type: 'lead' },
    description: 'Il corso completo per diventare un tecnico riparatore professionista con competenze avanzate.',
  },
  {
    id: 'lv3',
    name: 'LV3 - Tecnico Master',
    tagline: 'Il tecnico che risolve quello che nessun altro tocca. La riparazione da 300 euro che tutti rifiutano, la fai tu.',
    price: 399000,
    priceFormatted: '3.990',
    installmentPrice: 133000,
    installmentFormatted: '1.330',
    stripePriceEnvVar: 'STRIPE_PRICE_LV3',
    popular: false,
    features: [
      '80 ore 1-to-1 col Capotecnico',
      'Massima priorita sul calendario',
      'Kit completo + stazione microsaldatura inclusa, in proprieta',
      'Licenza professionale LV3 verificabile via QR',
      'Ti mandiamo i primi clienti per 6 mesi',
      'Priorita assoluta sui lavori complessi che giriamo dal nostro laboratorio',
    ],
    ctaPrimary: { label: 'Iscriviti Ora', type: 'checkout' },
    ctaSecondary: { label: 'Parla con un Capotecnico', type: 'lead' },
    description: 'Per chi vuole diventare un maestro assoluto delle riparazioni e aprire il proprio laboratorio.',
  },
]

export function getTierById(id: string): Tier | undefined {
  return TIERS.find(tier => tier.id === id)
}

export function getTierPrice(id: string): number {
  const tier = getTierById(id)
  return tier?.price ?? 0
}
