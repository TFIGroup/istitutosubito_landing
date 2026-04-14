'use client'

import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { checkoutFormSchema, type CheckoutFormData } from '@/lib/checkout-schema'
import { TERMS_VERSION } from '@/lib/terms-version'
import { PROVINCE_ITALIANE } from '@/lib/province'
import { getTierById } from '@/lib/tiers'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  tierId: string | null
}

export function CheckoutModal({ isOpen, onClose, tierId }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData | null>(null)

  const tierData = tierId ? getTierById(tierId) : null

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onChange',
    defaultValues: {
      tier: (tierId as 'lv1' | 'lv2' | 'lv3') || 'lv1',
      marketingConsent: false,
      deliveryNotes: '',
    },
  })

  const termsAccepted = watch('termsAccepted')
  const recessoWaiverAccepted = watch('recessoWaiverAccepted')

  const onFormSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tier: tierId,
          termsVersion: TERMS_VERSION,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'Errore durante la creazione del checkout')
        return
      }
      setFormData(data)
      setStep(2)
    } catch {
      setError('Errore di connessione. Riprova.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchClientSecret = useCallback(async () => {
    if (!tierId || !formData) throw new Error('Dati mancanti')
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        tier: tierId,
        termsVersion: TERMS_VERSION,
      }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    return data.clientSecret
  }, [tierId, formData])

  const handleClose = () => {
    setStep(1)
    setError(null)
    setFormData(null)
    reset()
    onClose()
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)] focus:border-transparent'
  const labelClass = 'block text-sm font-medium text-foreground mb-1'
  const errorClass = 'text-xs text-destructive mt-1'
  const hintClass = 'text-xs text-muted-foreground mt-1'

  return (
    <AnimatePresence>
      {isOpen && tierId && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Modal — full screen su mobile, centrato su desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[90vh] bg-white md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {step === 1 ? `Iscrizione ${tierData?.name || ''}` : 'Pagamento sicuro'}
                </h2>
                {step === 1 && (
                  <p className="text-sm text-muted-foreground">Pochi dati per iniziare</p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-3 px-4 py-3 border-b bg-muted/30 shrink-0">
              <div className={`flex items-center gap-1.5 text-sm font-medium ${step === 1 ? 'text-[var(--electric-blue)]' : 'text-muted-foreground'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-[var(--electric-blue)] text-white' : 'bg-muted text-muted-foreground'}`}>1</span>
                Dati
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <div className={`flex items-center gap-1.5 text-sm font-medium ${step === 2 ? 'text-[var(--electric-blue)]' : 'text-muted-foreground'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-[var(--electric-blue)] text-white' : 'bg-muted text-muted-foreground'}`}>2</span>
                Pagamento
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {step === 1 ? (
                <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 space-y-4">
                  <input type="hidden" {...register('tier')} value={tierId} />

                  {/* Nome */}
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Nome completo</label>
                    <input id="fullName" type="text" {...register('fullName')} className={inputClass} placeholder="Mario Rossi" />
                    {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input id="email" type="email" {...register('email')} className={inputClass} placeholder="mario@esempio.com" />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    <p className={hintClass}>Ti invieremo conferma e materiale del corso qui</p>
                  </div>

                  {/* Telefono */}
                  <div>
                    <label htmlFor="phone" className={labelClass}>Numero cellulare (WhatsApp)</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border bg-muted text-sm text-muted-foreground">+39</span>
                      <input id="phone" type="tel" {...register('phone')} className={`${inputClass} rounded-l-none`} placeholder="3899677650" />
                    </div>
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                    <p className={hintClass}>Il Capotecnico ti contatta su questo numero entro 24h</p>
                  </div>

                  {/* Indirizzo spedizione */}
                  <fieldset className="space-y-3">
                    <legend className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <span>Dove ti spediamo il kit hardware</span>
                    </legend>

                    <div>
                      <label htmlFor="address" className={labelClass}>Indirizzo (via, civico)</label>
                      <input id="address" type="text" {...register('address')} className={inputClass} placeholder="Via Roma, 10" />
                      {errors.address && <p className={errorClass}>{errors.address.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="postalCode" className={labelClass}>CAP</label>
                        <input id="postalCode" type="text" inputMode="numeric" maxLength={5} {...register('postalCode')} className={inputClass} placeholder="80100" />
                        {errors.postalCode && <p className={errorClass}>{errors.postalCode.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="province" className={labelClass}>Provincia</label>
                        <select id="province" {...register('province')} className={inputClass}>
                          <option value="">--</option>
                          {PROVINCE_ITALIANE.map(p => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                        {errors.province && <p className={errorClass}>{errors.province.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className={labelClass}>Citta</label>
                      <input id="city" type="text" {...register('city')} className={inputClass} placeholder="Napoli" />
                      {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="deliveryNotes" className={labelClass}>Note consegna <span className="text-muted-foreground font-normal">(opzionale)</span></label>
                      <textarea id="deliveryNotes" rows={2} {...register('deliveryNotes')} className={inputClass} placeholder="Citofono, piano, orari preferiti..." />
                    </div>
                  </fieldset>

                  {/* Checkbox termini */}
                  <div className="space-y-3 pt-2 border-t border-border">
                    {/* Termini e Condizioni */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register('termsAccepted')} className="mt-1 w-4 h-4 rounded border-border accent-[var(--electric-blue)] shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Dichiaro di aver letto e accetto integralmente i{' '}
                        <a href="/termini" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] underline">Termini e Condizioni di Vendita</a>
                        {' '}e la{' '}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] underline">Privacy Policy</a>.
                        {' '}Confermo di aver compreso il{' '}
                        <a href="/recesso" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] underline">Diritto di Recesso</a>
                        {' '}secondo il Codice del Consumo.
                      </span>
                    </label>
                    {errors.termsAccepted && <p className={errorClass}>{errors.termsAccepted.message}</p>}

                    {/* Rinuncia recesso art. 59 */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register('recessoWaiverAccepted')} className="mt-1 w-4 h-4 rounded border-border accent-[var(--electric-blue)] shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Chiedo espressamente che l&apos;esecuzione del corso (spedizione kit, accesso piattaforma e prima lezione live col Capotecnico) inizi prima della scadenza dei 14 giorni di recesso. Ai sensi dell&apos;art. 59 D.lgs 206/2005, riconosco che perdero il diritto di recesso una volta completata la prima lezione live. Mantengo comunque la garanzia commerciale &quot;Prima Lezione di Prova&quot; (rimborso entro 48h dalla prima lezione).
                      </span>
                    </label>
                    {errors.recessoWaiverAccepted && <p className={errorClass}>{errors.recessoWaiverAccepted.message}</p>}

                    {/* Marketing opzionale */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register('marketingConsent')} className="mt-1 w-4 h-4 rounded border-border accent-[var(--electric-blue)] shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        Acconsento a ricevere comunicazioni promozionali su nuovi corsi e iniziative di Istituto Subito (puoi disiscriverti in ogni momento).
                      </span>
                    </label>
                  </div>

                  {/* Riepilogo prezzo */}
                  {tierData && (
                    <div className="bg-muted/50 rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-foreground">
                        Totale: &euro;{tierData.priceFormatted}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        oppure 3 rate da &euro;{tierData.installmentFormatted} con Klarna
                      </p>
                    </div>
                  )}

                  {/* Errore */}
                  {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Bottone submit — sticky su mobile */}
                  <div className="sticky bottom-0 bg-white pt-3 pb-2 -mx-4 px-4 border-t border-border md:static md:border-0 md:mx-0 md:px-0 md:pt-0 md:pb-0">
                    <button
                      type="submit"
                      disabled={!termsAccepted || !recessoWaiverAccepted || isSubmitting}
                      className="w-full py-3 px-6 bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? 'Caricamento...' : 'Continua al pagamento sicuro'}
                      {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                    </button>
                    <div className="flex items-center justify-center gap-3 mt-3 text-xs text-muted-foreground">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pagamento sicuro Stripe</span>
                      <span>·</span>
                      <span>14 giorni di garanzia</span>
                      <span>·</span>
                      <span>Prima lezione di prova</span>
                    </div>
                  </div>
                </form>
              ) : (
                /* Step 2 — Stripe Embedded Checkout */
                <div className="p-4">
                  {error ? (
                    <div className="text-center py-12">
                      <p className="text-destructive mb-4">{error}</p>
                      <button
                        onClick={() => { setError(null); setStep(1) }}
                        className="text-sm text-muted-foreground hover:text-foreground underline cursor-pointer"
                      >
                        Torna al form
                      </button>
                    </div>
                  ) : (
                    <EmbeddedCheckoutProvider
                      stripe={stripePromise}
                      options={{ fetchClientSecret }}
                    >
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
