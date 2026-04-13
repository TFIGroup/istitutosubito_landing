'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StickyDesktopCTAProps {
  onCheckout: () => void
  isLoading?: boolean
}

export function StickyDesktopCTA({ onCheckout, isLoading }: StickyDesktopCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (approximately 600px)
      setIsVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 hidden md:block"
        >
          <Button
            size="lg"
            onClick={onCheckout}
            disabled={isLoading}
            className={cn(
              "bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white",
              "shadow-lg shadow-[var(--electric-blue)]/25",
              "text-lg px-6 py-6 h-auto font-semibold",
              "flex items-center gap-2"
            )}
          >
            {isLoading ? 'Caricamento...' : 'Iscriviti Ora'}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
