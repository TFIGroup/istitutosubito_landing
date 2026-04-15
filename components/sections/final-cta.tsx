'use client'

import Image from 'next/image'
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
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e8e15a0-08fd-4880-ae7d-b7567ff80be4.JPG-HevLxkwyZNOtJ1nRQPEsR7DWHqnvqn.jpeg"
          alt="Aula di formazione professionale con postazioni attrezzate"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/95 via-[var(--navy)]/85 to-[var(--electric-blue)]/70" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Scarcity */}
        {scarcity.enabled && (
          <div
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
          </div>
        )}

        {/* Headline */}
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance"
        >
          {finalCta.headline}
        </h2>

        <p
          className="text-lg text-white/80 mb-8"
        >
          {finalCta.description}
        </p>

        {/* CTAs */}
        <div
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
            onClick={onOpenLeadModal}
            className="w-full sm:w-auto bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white text-lg px-8 py-6 h-auto"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {finalCta.secondaryCta}
          </Button>
        </div>

        <p className="text-white/50 text-sm mt-6">
          1-to-1 in videocall live col Capotecnico · Kit completo a casa tua · Zero pensieri tecnici
        </p>
      </div>
    </section>
  )
}
