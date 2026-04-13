// Pricing Tiers Configuration
// Edit this file to change pricing, features, and tier details

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
  notIncluded?: string[]
  cta: string
  description: string
}

export const TIERS: Tier[] = [
  {
    id: 'lv1',
    name: 'Livello 1',
    tagline: 'Riparazioni Essenziali',
    price: 149000, // in cents for Stripe
    priceFormatted: '1.490',
    installmentPrice: 49700,
    installmentFormatted: '497',
    stripePriceEnvVar: 'STRIPE_PRICE_LV1',
    popular: false,
    features: [
      'Sostituzione display iPhone e Samsung',
      'Sostituzione batterie',
      'Riparazione connettori di ricarica',
      'Kit attrezzi professionale incluso',
      'Accesso community Telegram esclusiva',
      'Certificato Tecnico LV1',
      'Assistenza WhatsApp 90 giorni',
    ],
    notIncluded: [
      'Microsoldering',
      'Riparazioni scheda madre',
      'Recupero dati avanzato',
    ],
    cta: 'Inizia con LV1',
    description: 'Perfetto per chi parte da zero e vuole iniziare a guadagnare subito con le riparazioni più richieste.',
  },
  {
    id: 'lv2',
    name: 'Livello 2',
    tagline: 'Tecnico Completo',
    price: 249000,
    priceFormatted: '2.490',
    installmentPrice: 83000,
    installmentFormatted: '830',
    stripePriceEnvVar: 'STRIPE_PRICE_LV2',
    popular: true,
    features: [
      'Tutto il LV1 incluso',
      'Microsoldering base e intermedio',
      'Diagnostica avanzata con multimetro',
      'Riparazione schede madri iPhone',
      'Sostituzione chip audio e ricarica',
      'Face ID e Touch ID repair',
      'Kit microsoldering professionale incluso',
      'Certificato Tecnico LV2',
      'Assistenza WhatsApp 6 mesi',
      'Accesso a fornitori verificati',
    ],
    cta: 'Scegli LV2',
    description: 'Il corso completo per diventare un tecnico riparatore professionista con competenze avanzate.',
  },
  {
    id: 'lv3',
    name: 'Livello 3',
    tagline: 'Master Microsoldering',
    price: 399000,
    priceFormatted: '3.990',
    installmentPrice: 133000,
    installmentFormatted: '1.330',
    stripePriceEnvVar: 'STRIPE_PRICE_LV3',
    popular: false,
    features: [
      'Tutto il LV1 e LV2 incluso',
      'Microsoldering avanzato',
      'Reballing BGA',
      'Recupero dati da dispositivi danneggiati',
      'Riparazione circuiti complessi',
      'Sblocco iCloud (metodi legali)',
      'Formazione business: aprire un lab',
      'Stazione di saldatura professionale inclusa',
      'Certificato Master Technician',
      'Assistenza WhatsApp 12 mesi',
      'Mentorship 1-to-1 con il Capotecnico',
    ],
    cta: 'Diventa Master',
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
