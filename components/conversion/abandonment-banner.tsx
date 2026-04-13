'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { content } from '@/lib/content'

const ABANDONMENT_KEY = 'istituto_subito_checkout_started'
const BANNER_DISMISSED_KEY = 'istituto_subito_banner_dismissed'

interface AbandonmentBannerProps {
  onContinue: () => void
}

export function AbandonmentBanner({ onContinue }: AbandonmentBannerProps) {
  const [showBanner, setShowBanner] = useState(false)
  const { abandonmentBanner } = content

  useEffect(() => {
    // Check if user previously started checkout but didn't complete
    const checkoutStarted = localStorage.getItem(ABANDONMENT_KEY)
    const bannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY)
    
    if (checkoutStarted && !bannerDismissed) {
      // Show banner after a short delay
      const timeout = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      
      return () => clearTimeout(timeout)
    }
  }, [])

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true')
  }

  const handleContinue = () => {
    setShowBanner(false)
    localStorage.removeItem(ABANDONMENT_KEY)
    localStorage.removeItem(BANNER_DISMISSED_KEY)
    onContinue()
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-[var(--premium-gold)] text-[var(--navy)]"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-sm font-medium flex-1">
              {abandonmentBanner.message}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleContinue}
                className="bg-[var(--navy)] hover:bg-[var(--navy-light)] text-white"
              >
                {abandonmentBanner.cta}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-[var(--navy)]/10 rounded transition-colors"
                aria-label="Chiudi banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper to mark checkout as started (call this when user clicks checkout)
export function markCheckoutStarted(email?: string) {
  const data = {
    timestamp: new Date().toISOString(),
    email: email || null,
  }
  localStorage.setItem(ABANDONMENT_KEY, JSON.stringify(data))
}

// Helper to clear abandonment state (call this on successful checkout)
export function clearAbandonmentState() {
  localStorage.removeItem(ABANDONMENT_KEY)
  localStorage.removeItem(BANNER_DISMISSED_KEY)
}
