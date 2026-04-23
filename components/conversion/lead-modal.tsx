'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { content } from '@/lib/content'
import { trackLead } from '@/lib/tracking'

const leadSchema = z.object({
  phone: z
    .string()
    .regex(/^\d+$/, 'Solo cifre, senza spazi o simboli')
    .min(9, 'Numero troppo corto')
    .max(11, 'Numero troppo lungo'),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { leadModal } = content

  useEffect(() => {
    if (isOpen) trackLead()
  }, [isOpen])

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393773591545'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    // Salva lead parziale in Cliq (best-effort, non bloccante)
    try {
      await fetch('/api/lead-partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: data.phone, step: 'whatsapp_direct' }),
      })
    } catch {}

    const text = encodeURIComponent(
      'Ciao Istituto Subito, vi contatto dal sito e vorrei informazioni sui corsi',
    )
    window.location.href = `https://wa.me/${waNumber}?text=${text}`
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => reset(), 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50 flex items-center justify-center md:block"
          >
            <div className="relative bg-card rounded-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={handleClose}
                className="sticky top-3 right-3 float-right -mb-10 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-background transition-colors shadow-sm cursor-pointer"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-[var(--whatsapp-green)]/10 flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-7 h-7 text-[var(--whatsapp-green)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {leadModal.headline}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {leadModal.subheadline}
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      {leadModal.phoneLabel}
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-muted text-sm text-muted-foreground font-medium">
                        +39
                      </span>
                      <input
                        id="lead-phone"
                        type="tel"
                        inputMode="numeric"
                        autoFocus
                        {...register('phone')}
                        placeholder="377 359 1545"
                        className={`w-full px-4 py-3 rounded-r-xl border bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-[var(--whatsapp-green)] focus:border-transparent transition-shadow ${errors.phone ? 'border-destructive' : 'border-border'}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-base md:text-lg cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Apertura...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        {leadModal.cta}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    {leadModal.privacy}
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
