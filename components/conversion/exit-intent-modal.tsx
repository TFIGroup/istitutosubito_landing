'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { LeadModal } from './lead-modal'

const EXIT_MODAL_SHOWN_KEY = 'istituto_subito_exit_modal_shown'
const MIN_TIME_ON_PAGE_MS = 60_000 // 60s minimo prima di considerare exit-intent

interface ExitIntentModalProps {
  enabled?: boolean
}

export function ExitIntentModal({ enabled = true }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const mountedAt = useRef<number>(Date.now())

  const handleExitIntent = useCallback(() => {
    // Non trigger se l'utente non e' stato sulla pagina almeno 60s
    if (Date.now() - mountedAt.current < MIN_TIME_ON_PAGE_MS) return
    if (sessionStorage.getItem(EXIT_MODAL_SHOWN_KEY)) return

    setIsOpen(true)
    sessionStorage.setItem(EXIT_MODAL_SHOWN_KEY, 'true')
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Solo desktop: mouse verso l'alto fuori dal viewport (indica intento di chiudere tab)
    // Niente auto-popup su mobile: troppo invasivo senza segnale di exit chiaro
    const isDesktop = window.matchMedia('(min-width: 768px) and (hover: hover)').matches
    if (!isDesktop) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        handleExitIntent()
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [enabled, handleExitIntent])

  return (
    <LeadModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  )
}
