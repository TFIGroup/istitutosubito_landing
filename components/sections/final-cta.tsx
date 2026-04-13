'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { content } from '@/lib/content'
import { scarcity, getSpotsRemaining, isUrgent } from '@/lib/scarcity'
import { cn } from '@/lib/utils'

interface FinalCTAProps {
  onCheckout: () => void
  onOpenLeadModal: () => void
  isLoading?: boolean
}

export function FinalCTA({ onCheckout, onOpenLeadModal, isLoading }: FinalCTAProps) {
  const { finalCta } = content
  const spotsRemaining = getSpotsRemaining()
  const urgent = isUrgent()

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--electric-blue)] to-[var(--navy)]">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Scarcity */}
        {scarcity.enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6",
              urgent
                ? "bg-red-500/30 text-white animate-pulse"
                : "bg-white/20 text-white"
            )}
          >
            <span className={cn(
              "w-2 h-2 rounded-full",
              urgent ? "bg-red-400" : "bg-[var(--whatsapp-green)]"
            )} />
            {scarcity.messages.spotsLabel}: {spotsRemaining}
          </motion.div>
        )}

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance"
        >
          {finalCta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-white/80 mb-8"
        >
          {finalCta.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={onCheckout}
            disabled={isLoading}
            className="w-full sm:w-auto bg-white text-[var(--navy)] hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
          >
            {isLoading ? 'Caricamento...' : finalCta.primaryCta}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onOpenLeadModal}
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {finalCta.secondaryCta}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
