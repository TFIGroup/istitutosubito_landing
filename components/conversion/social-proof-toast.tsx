'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UserCheck } from 'lucide-react'
import { content } from '@/lib/content'

const { socialProof } = content

export function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const showNextNotification = useCallback(() => {
    if (isDismissed) return

    setIsVisible(true)

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false)

      // Move to next entry
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % socialProof.items.length)
      }, 500)
    }, 5000)
  }, [isDismissed])

  useEffect(() => {
    if (!socialProof.enabled || isDismissed) return

    // Show first notification after a delay
    const initialTimeout = setTimeout(() => {
      showNextNotification()
    }, 5000)

    // Set up interval for subsequent notifications
    const interval = setInterval(() => {
      showNextNotification()
    }, socialProof.intervalSeconds * 1000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [isDismissed, showNextNotification])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  const currentEntry = socialProof.items[currentIndex]

  if (!socialProof.enabled) return null

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 md:bottom-8 left-4 z-40 max-w-sm"
        >
          <div className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border shadow-lg">
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-[var(--whatsapp-green)]/10 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-5 h-5 text-[var(--whatsapp-green)]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{currentEntry.name}</span>
                {' da '}
                <span className="font-medium">{currentEntry.city}</span>
                {' si è iscritto al '}
                <span className="font-semibold text-[var(--electric-blue)]">{currentEntry.tier}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentEntry.timeAgo}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Chiudi notifica"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
