'use client'

import Image from 'next/image'
import { Shield, CreditCard, Undo2, Flag, MessageCircle, Star } from 'lucide-react'
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
      {/* Background Image - close up riparazione senza testo */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/412cd0b4-fb59-41e1-9442-1510241fd76d%202.JPG-LmwPxwIzhbz9wDb6bSFhW3wLNjwWD4.jpeg"
          alt="Riparazione smartphone professionale"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/95 via-[var(--navy)]/85 to-[var(--navy)]/70" />
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
              onClick={onOpenLeadModal}
              className="w-full sm:w-auto bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {hero.secondaryCta}
            </Button>
          </div>

          {/* Google Reviews Badge - Social Proof */}
          <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white font-bold text-lg">4.9</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-white/30" />
            <a 
              href="https://share.google/jctGdFe0ugTXK4qvw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 text-sm font-medium hover:text-white transition-colors"
            >
              2.512 recensioni Google →
            </a>
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
