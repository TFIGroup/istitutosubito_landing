import { z } from 'zod'

export const checkoutFormSchema = z.object({
  tier: z.enum(['lv1', 'lv2', 'lv3']),
  fullName: z.string().min(2, 'Inserisci il tuo nome completo').regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome non valido'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().min(10, 'Inserisci un numero di telefono valido').regex(/^\d{6,15}$/, 'Solo cifre, senza spazi o simboli'),
  address: z.string().min(3, 'Inserisci via e numero civico'),
  postalCode: z.string().regex(/^\d{5}$/, 'CAP deve essere di 5 cifre'),
  city: z.string().min(2, 'Inserisci la citta'),
  province: z.string().length(2, 'Seleziona la provincia'),
  deliveryNotes: z.string().max(500).optional().default(''),
  termsAccepted: z.literal(true, { errorMap: () => ({ message: 'Devi accettare i Termini e Condizioni' }) }),
  recessoWaiverAccepted: z.literal(true, { errorMap: () => ({ message: 'Devi accettare la clausola di rinuncia recesso' }) }),
  marketingConsent: z.boolean().default(false),
})

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>

// Server-side schema (same + metadata added server-side)
export const checkoutRequestSchema = checkoutFormSchema
