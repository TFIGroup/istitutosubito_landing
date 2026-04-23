'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, MessageCircle, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { content } from '@/lib/content'

const leadSchema = z.object({
  name: z.string().min(2, 'Inserisci il tuo nome'),
  phone: z.string().min(10, 'Inserisci un numero valido'),
  interest: z.enum(['lv1', 'lv2', 'lv3']),
  motivation: z.string().min(1, 'Seleziona una motivazione'),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTier?: 'lv1' | 'lv2' | 'lv3'
}

export function LeadModal({ isOpen, onClose, defaultTier = 'lv2' }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { leadModal } = content

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393XXXXXXXXX'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      interest: defaultTier,
    },
  })

  const selectedInterest = watch('interest')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Ciao, vorrei informazioni sul corso ${selectedInterest?.toUpperCase() || 'LV2'}`)}`

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      console.error('Lead submission error:', error)
      // Still show success to not discourage user
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Reset after animation
    setTimeout(() => {
      setIsSuccess(false)
      reset()
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-50 flex items-center justify-center md:block"
          >
            <div className="relative bg-card rounded-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button (sticky: sempre visibile anche scrollando) */}
              <button
                onClick={handleClose}
                className="sticky top-3 right-3 float-right -mb-10 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-background transition-colors shadow-sm cursor-pointer"
                aria-label="Chiudi"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-8">
                {!isSuccess ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {leadModal.headline}
                      </h3>
                      <p className="text-muted-foreground">
                        {leadModal.subheadline}
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                          {leadModal.fields.name}
                        </label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="Mario Rossi"
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                          {leadModal.fields.phone}
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          placeholder="+39 333 123 4567"
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Interest Level */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {leadModal.fields.interest}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['lv1', 'lv2', 'lv3'] as const).map((level) => (
                            <label
                              key={level}
                              className={`flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedInterest === level
                                  ? 'border-[var(--electric-blue)] bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]'
                                  : 'border-border hover:border-muted-foreground'
                              }`}
                            >
                              <input
                                type="radio"
                                value={level}
                                {...register('interest')}
                                className="sr-only"
                              />
                              <span className="font-medium">{level.toUpperCase()}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Motivation */}
                      <div>
                        <label htmlFor="motivation" className="block text-sm font-medium text-foreground mb-1">
                          {leadModal.fields.motivation}
                        </label>
                        <select
                          id="motivation"
                          {...register('motivation')}
                          className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground ${
                            errors.motivation ? 'border-destructive' : 'border-input'
                          }`}
                        >
                          <option value="">Seleziona...</option>
                          {leadModal.motivationOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.motivation && (
                          <p className="text-sm text-destructive mt-1">{errors.motivation.message}</p>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white py-6 h-auto text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Invio in corso...
                          </>
                        ) : (
                          leadModal.cta
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        {leadModal.privacy}
                      </p>
                    </form>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[var(--whatsapp-green)]/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[var(--whatsapp-green)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {leadModal.successTitle}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {leadModal.successMessage}
                    </p>
                    <Button
                      asChild
                      className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white"
                    >
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {leadModal.whatsappCta}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
