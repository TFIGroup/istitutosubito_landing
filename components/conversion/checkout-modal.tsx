'use client'

import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  tierId: string | null
}

export function CheckoutModal({ isOpen, onClose, tierId }: CheckoutModalProps) {
  const [error, setError] = useState<string | null>(null)

  const fetchClientSecret = useCallback(async () => {
    if (!tierId) throw new Error('No tier selected')

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: tierId }),
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error || 'Errore durante il checkout')
      throw new Error(data.error)
    }

    return data.clientSecret
  }, [tierId])

  const handleClose = () => {
    setError(null)
    onClose()
  }

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-2 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-foreground">
                Completa l&apos;iscrizione
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Checkout Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {error ? (
                <div className="text-center py-12">
                  <p className="text-destructive mb-4">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-sm text-muted-foreground hover:text-foreground underline cursor-pointer"
                  >
                    Riprova
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
