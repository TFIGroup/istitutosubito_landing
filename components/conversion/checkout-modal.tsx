'use client'

import { useCallback, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, ChevronRight, ChevronLeft, Check, Phone, Mail, MapPin, CreditCard } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { checkoutFormSchema, type CheckoutFormData } from '@/lib/checkout-schema'
import { TERMS_VERSION } from '@/lib/terms-version'
import { PROVINCE_ITALIANE } from '@/lib/province'
import { getTierById } from '@/lib/tiers'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Step = 1 | 2 | 3 | 4

const STEPS = [
  { num: 1, label: 'Cellulare', icon: Phone },
  { num: 2, label: 'Email', icon: Mail },
  { num: 3, label: 'Spedizione', icon: MapPin },
  { num: 4, label: 'Pagamento', icon: CreditCard },
] as const

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  tierId: string | null
  onCheckoutAbandoned?: (tierId: string) => void
}

// Salva lead parziale (fire-and-forget)
function savePartialLead(data: { tier?: string; phone?: string; email?: string; fullName?: string; step: string }) {
  fetch('/api/lead-partial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {})
}

export function CheckoutModal({ isOpen, onClose, tierId, onCheckoutAbandoned }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData | null>(null)

  const tierData = tierId ? getTierById(tierId) : null

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onChange',
    defaultValues: {
      tier: (tierId as 'lv1' | 'lv2' | 'lv3') || 'lv1',
      marketingConsent: false,
      deliveryNotes: '',
    },
  })

  const { register, handleSubmit, formState: { errors }, reset, watch, trigger } = form

  // Reset quando cambia tier
  useEffect(() => {
    if (tierId && isOpen) {
      form.setValue('tier', tierId as 'lv1' | 'lv2' | 'lv3')
    }
  }, [tierId, isOpen, form])

  const phone = watch('phone')
  const email = watch('email')
  const fullName = watch('fullName')
  const termsAccepted = watch('termsAccepted')
  const recessoWaiverAccepted = watch('recessoWaiverAccepted')

  // Step 1 → 2: salva telefono
  const goToStep2 = async () => {
    const valid = await trigger('phone')
    if (!valid) return
    savePartialLead({ tier: tierId || undefined, phone, step: 'phone' })
    setStep(2)
  }

  // Step 2 → 3: salva email
  const goToStep3 = async () => {
    const valid = await trigger(['email', 'fullName'])
    if (!valid) return
    savePartialLead({ tier: tierId || undefined, phone, email, fullName, step: 'email' })
    setStep(3)
  }

  // Step 3 → 4: submit completo, apri Stripe embedded checkout
  const onFormSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    setError(null)
    try {
      // Verifica che l'API risponda prima di passare a step 4
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, tier: tierId, termsVersion: TERMS_VERSION }),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'Errore durante la creazione del checkout')
        return
      }
      setFormData(data)
      // Marca il checkout Stripe come avviato (per recovery modal post-abbandono)
      try {
        sessionStorage.setItem('stripe_checkout_started', 'true')
        if (tierId) sessionStorage.setItem('stripe_tier', tierId)
        sessionStorage.setItem('stripe_checkout_user', JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
        }))
      } catch {}
      setStep(4)
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
      body: JSON.stringify({ ...formData, tier: tierId, termsVersion: TERMS_VERSION }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    return data.clientSecret
  }, [tierId, formData])

  const handleClose = () => {
    const wasOnStripeStep = step === 4
    const abandonedTier = tierId
    setStep(1)
    setError(null)
    setFormData(null)
    reset()
    onClose()
    if (wasOnStripeStep && abandonedTier && onCheckoutAbandoned) {
      let completed = false
      try {
        completed = sessionStorage.getItem('stripe_checkout_completed') === 'true'
      } catch {}
      if (!completed) onCheckoutAbandoned(abandonedTier)
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-[var(--electric-blue)] focus:border-transparent transition-shadow'
  const labelClass = 'block text-sm font-semibold text-foreground mb-1.5'
  const errorClass = 'text-xs text-destructive mt-1'
  const hintClass = 'text-xs text-muted-foreground mt-1.5'

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

          {/* Modal: piu grande, full screen su mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[92vh] bg-white md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {step < 4 ? `Iscrizione ${tierData?.name || ''}` : 'Pagamento sicuro'}
                </h2>
                {tierData && step < 4 && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    &euro;{tierData.priceFormatted} · oppure 3 rate da &euro;{tierData.installmentFormatted}
                  </p>
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

            {/* Stepper visivo */}
            <div className="flex items-center justify-between px-6 py-3 border-b bg-muted/30 shrink-0">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                const isActive = step === s.num
                const isDone = step > s.num
                return (
                  <div key={s.num} className="flex items-center gap-1.5 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isDone ? 'bg-green-500 text-white' :
                      isActive ? 'bg-[var(--electric-blue)] text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-xs font-medium hidden sm:inline ${isActive ? 'text-[var(--electric-blue)]' : isDone ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 rounded ${isDone ? 'bg-green-500' : 'bg-muted'}`} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {/* ===== STEP 1: Telefono ===== */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-8"
                  >
                    <div className="max-w-sm mx-auto space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[var(--electric-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Phone className="w-7 h-7 text-[var(--electric-blue)]" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">Il tuo numero WhatsApp</h3>
                        <p className="text-sm text-muted-foreground">Il Capotecnico ti contatta qui entro 24h per organizzare le lezioni</p>
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClass}>Numero cellulare</label>
                        <div className="flex">
                          <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-muted text-sm text-muted-foreground font-medium">+39</span>
                          <input
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            autoFocus
                            {...register('phone')}
                            className={`${inputClass} rounded-l-none text-lg`}
                            placeholder="389 967 7650"
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); goToStep2() } }}
                          />
                        </div>
                        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                        <p className={hintClass}>Non condivideremo il tuo numero con nessuno</p>
                      </div>

                      <button
                        type="button"
                        onClick={goToStep2}
                        className="w-full py-3.5 bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-base cursor-pointer"
                      >
                        Continua
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ===== STEP 2: Email + Nome ===== */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-8"
                  >
                    <div className="max-w-sm mx-auto space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[var(--electric-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mail className="w-7 h-7 text-[var(--electric-blue)]" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-1">I tuoi dati</h3>
                        <p className="text-sm text-muted-foreground">Per conferma iscrizione e materiale del corso</p>
                      </div>

                      <div>
                        <label htmlFor="fullName" className={labelClass}>Nome completo</label>
                        <input id="fullName" type="text" autoFocus {...register('fullName')} className={inputClass} placeholder="Mario Rossi" />
                        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input id="email" type="email" {...register('email')} className={inputClass} placeholder="mario@esempio.com" />
                        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                        <p className={hintClass}>Ti invieremo la conferma e il PDF dei termini qui</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-4 py-3.5 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={goToStep3}
                          className="flex-1 py-3.5 bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-base cursor-pointer"
                        >
                          Continua
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== STEP 3: Indirizzo + Termini ===== */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-8"
                  >
                    <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-lg mx-auto space-y-5">
                      <input type="hidden" {...register('tier')} value={tierId!} />

                      <div className="text-center mb-2">
                        <h3 className="text-xl font-bold text-foreground mb-1">Spedizione e conferma</h3>
                        <p className="text-sm text-muted-foreground">Dove ti spediamo il kit hardware professionale</p>
                      </div>

                      {/* Indirizzo */}
                      <div>
                        <label htmlFor="address" className={labelClass}>Indirizzo (via, civico)</label>
                        <input id="address" type="text" autoFocus {...register('address')} className={inputClass} placeholder="Via Roma, 10" />
                        {errors.address && <p className={errorClass}>{errors.address.message}</p>}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label htmlFor="postalCode" className={labelClass}>CAP</label>
                          <input id="postalCode" type="text" inputMode="numeric" maxLength={5} {...register('postalCode')} className={inputClass} placeholder="80100" />
                          {errors.postalCode && <p className={errorClass}>{errors.postalCode.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="city" className={labelClass}>Citta</label>
                          <input id="city" type="text" {...register('city')} className={inputClass} placeholder="Napoli" />
                          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="province" className={labelClass}>Prov.</label>
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
                        <label htmlFor="deliveryNotes" className={labelClass}>Note consegna <span className="text-muted-foreground font-normal">(opzionale)</span></label>
                        <textarea id="deliveryNotes" rows={2} {...register('deliveryNotes')} className={inputClass} placeholder="Citofono, piano, orari preferiti..." />
                      </div>

                      {/* Checkbox termini */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" {...register('termsAccepted')} className="mt-0.5 w-5 h-5 rounded border-border accent-[var(--electric-blue)] shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            Dichiaro di aver letto e accetto i{' '}
                            <a href="/termini" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] underline">Termini e Condizioni</a>
                            {' '}e la{' '}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] underline">Privacy Policy</a>.
                            {' '}Confermo di aver compreso il{' '}
                            <a href="/recesso" target="_blank" rel="noopener noreferrer" className="text-[var(--electric-blue)] underline">Diritto di Recesso</a>.
                          </span>
                        </label>
                        {errors.termsAccepted && <p className={errorClass}>{errors.termsAccepted.message}</p>}

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" {...register('recessoWaiverAccepted')} className="mt-0.5 w-5 h-5 rounded border-border accent-[var(--electric-blue)] shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            Chiedo che il corso inizi subito (spedizione kit + prima lezione). Ai sensi dell&apos;art. 59 D.lgs 206/2005, perdo il recesso dopo la prima lezione live. Mantengo la garanzia &quot;Prima Lezione di Prova&quot; (rimborso entro 48h).
                          </span>
                        </label>
                        {errors.recessoWaiverAccepted && <p className={errorClass}>{errors.recessoWaiverAccepted.message}</p>}

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" {...register('marketingConsent')} className="mt-0.5 w-5 h-5 rounded border-border accent-[var(--electric-blue)] shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            Acconsento a ricevere comunicazioni promozionali (puoi disiscriverti in ogni momento).
                          </span>
                        </label>
                      </div>

                      {/* Errore */}
                      {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                          {error}
                        </div>
                      )}

                      {/* Riepilogo + CTA: sticky su mobile */}
                      <div className="sticky bottom-0 bg-white pt-4 pb-2 -mx-6 px-6 border-t border-border md:static md:border-0 md:mx-0 md:px-0 md:pt-2 md:pb-0">
                        {tierData && (
                          <div className="bg-muted/50 rounded-xl p-3 text-center mb-4">
                            <span className="text-lg font-bold text-foreground">&euro;{tierData.priceFormatted}</span>
                            <span className="text-sm text-muted-foreground ml-2">oppure 3 rate da &euro;{tierData.installmentFormatted}</span>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-4 py-3.5 border border-border rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            type="submit"
                            disabled={!termsAccepted || !recessoWaiverAccepted || isSubmitting}
                            className="flex-1 py-3.5 bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-base cursor-pointer"
                          >
                            {isSubmitting ? 'Caricamento...' : 'Checkout'}
                            {!isSubmitting && <Lock className="w-4 h-4" />}
                          </button>
                        </div>

                        <p className="text-center text-xs text-muted-foreground mt-3">
                          Pagamento sicuro Stripe · 14 giorni di garanzia · Prima lezione di prova
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ===== STEP 4: Stripe Embedded Checkout ===== */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    {error ? (
                      <div className="text-center py-12">
                        <p className="text-destructive mb-4">{error}</p>
                        <button
                          onClick={() => { setError(null); setStep(3) }}
                          className="text-sm text-muted-foreground hover:text-foreground underline cursor-pointer"
                        >
                          Torna indietro
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
