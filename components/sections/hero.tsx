'use client'

import Image from 'next/image'
import { Shield, CreditCard, Undo2, Flag, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { content } from '@/lib/content'
import { scarcity, isUrgent, getSpotsRemaining } from '@/lib/scarcity'
import { cn } from '@/lib/utils'

const trustBadgeIcons = {
  shield: Shield,
  creditCard: CreditCard,
  undo: Undo2,
  flag: Flag,
}

interface HeroProps {
  onCheckout: () => void
  onOpenLeadModal: () => void
  isLoading?: boolean
}

export function Hero({ onCheckout, onOpenLeadModal, isLoading }: HeroProps) {
  const { hero } = content
  
  // Get hero variant from env var, default to 'A'
  const variant = (process.env.NEXT_PUBLIC_HERO_VARIANT as 'A' | 'B') || 'A'
  const headline = hero.variants[variant]
  
  const spotsRemaining = getSpotsRemaining()
  const urgent = isUrgent()
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393XXXXXXXXX'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Ciao, vorrei informazioni sul corso')}`

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2026-02-12-17-50-28-UdDLGQmFl3lhzClSkg9AZYmQ1VH9P9.jpg"
          alt="Riparazione smartphone professionale"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/95 via-[var(--navy)]/80 to-[var(--navy)]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Scarcity Badge */}
          {scarcity.enabled && (
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6",
              urgent 
                ? "bg-red-500/20 text-red-300 animate-pulse" 
                : "bg-white/10 text-white/90"
            )}>
              <span className={cn(
                "w-2 h-2 rounded-full",
                urgent ? "bg-red-400" : "bg-[var(--whatsapp-green)]"
              )} />
              {scarcity.messages.spotsLabel}: {spotsRemaining}
            </div>
          )}

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-balance">
            {headline.headline}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-6">
            {headline.subheadline}
          </p>

          {/* Description */}
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            {hero.description}
          </p>

          {/* Price Teaser */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8">
            <span className="text-3xl md:text-4xl font-bold text-white">
              {hero.priceTeaser}
            </span>
            <span className="text-lg text-white/60">
              {hero.installmentTeaser}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={onCheckout}
              disabled={isLoading}
              className="w-full sm:w-auto bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white text-lg px-8 py-6 h-auto"
            >
              {isLoading ? 'Caricamento...' : hero.primaryCta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onOpenLeadModal}
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {hero.secondaryCta}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hero.trustBadges.map((badge) => {
              const Icon = trustBadgeIcons[badge.icon as keyof typeof trustBadgeIcons]
              return (
                <div
                  key={badge.label}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <Icon className="w-5 h-5 text-white/70" />
                  <span className="text-sm text-white/80">{badge.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" className="w-full h-12">
          <path
            d="M0 48h1440V0C1200 32 960 48 720 48S240 32 0 0v48z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </section>
  )
}
