'use client'

import { useState, useEffect, useCallback } from 'react'
import { LeadModal } from './lead-modal'

const EXIT_MODAL_SHOWN_KEY = 'istituto_subito_exit_modal_shown'

interface ExitIntentModalProps {
  enabled?: boolean
}

export function ExitIntentModal({ enabled = true }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleExitIntent = useCallback(() => {
    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem(EXIT_MODAL_SHOWN_KEY)
    if (alreadyShown) return

    setIsOpen(true)
    sessionStorage.setItem(EXIT_MODAL_SHOWN_KEY, 'true')
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Desktop: mouse leaves viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        handleExitIntent()
      }
    }

    // Mobile: trigger after 30 seconds
    const mobileTimeout = setTimeout(() => {
      if (window.innerWidth < 768) {
        handleExitIntent()
      }
    }, 30000)

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(mobileTimeout)
    }
  }, [enabled, handleExitIntent])

  return (
    <LeadModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  )
}
