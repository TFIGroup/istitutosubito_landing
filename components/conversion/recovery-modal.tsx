'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, CheckCircle2, Phone, Target } from 'lucide-react'

interface RecoveryModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLeadModal: () => void
  tierId?: string | null
}

export function RecoveryModal({ isOpen, onClose, onOpenLeadModal, tierId }: RecoveryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDepositCheckout = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      let userData: {
        fullName?: string
        email?: string
        phone?: string
      } = {}
      try {
        const raw = sessionStorage.getItem('stripe_checkout_user')
        if (raw) userData = JSON.parse(raw)
      } catch {}

      const response = await fetch('/api/checkout/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tierId || 'lv1',
          ...userData,
        }),
      })
      const result = await response.json()
      if (!response.ok || !result.url) {
        setError(result.error || 'Errore durante la creazione del checkout')
        setIsSubmitting(false)
        return
      }
      window.location.href = result.url
    } catch {
      setError('Errore di connessione. Riprova.')
      setIsSubmitting(false)
    }
  }

  const handleLeadFallback = () => {
    onClose()
    onOpenLeadModal()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[70]"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[92vh] bg-white md:rounded-2xl shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)]/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[var(--electric-blue)]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Blocca il tuo posto con €99
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer shrink-0"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 md:p-8 space-y-6">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Non sei sicuro di procedere adesso? Nessun problema. Blocca il
                  tuo posto con soli €99 e fissa un appuntamento con il
                  Capotecnico per parlare del tuo percorso. Ti aiuterà a capire
                  se questo corso fa per te.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[var(--whatsapp-green)] shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm md:text-base">
                      €99 interamente rimborsabili se ti presenti
                      all&apos;appuntamento
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-6 h-6 text-[var(--electric-blue)] shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm md:text-base">
                      Parli direttamente col Capotecnico, senza impegno
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-[var(--premium-gold)] shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm md:text-base">
                      Il tuo posto resta bloccato al prezzo attuale
                    </span>
                  </li>
                </ul>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Dopo il pagamento di €99 ti contattiamo entro 24 ore per
                  fissare l&apos;appuntamento. Se non ti presenti per 2 volte
                  consecutive, l&apos;acconto non è rimborsabile.
                </p>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
                    {error}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t bg-white p-6 space-y-3 shrink-0">
              <button
                type="button"
                onClick={handleDepositCheckout}
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-base md:text-lg cursor-pointer"
              >
                {isSubmitting ? 'Caricamento...' : 'Blocca il posto con €99'}
                {!isSubmitting && <Lock className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 border border-border hover:bg-muted text-foreground font-medium rounded-xl transition-colors cursor-pointer"
              >
                No grazie, ci penso
              </button>

              <button
                type="button"
                onClick={handleLeadFallback}
                className="w-full text-sm text-[var(--electric-blue)] hover:underline cursor-pointer"
              >
                Preferisci parlare prima con un Capotecnico?
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
