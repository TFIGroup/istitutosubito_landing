'use client'

import { Check, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { content } from '@/lib/content'
import { TIERS, type Tier } from '@/lib/tiers'
import { cn } from '@/lib/utils'

interface PricingProps {
  onSelectTier: (tierId: string) => void
  onOpenLeadModal: () => void
  loadingTier?: string | null
}

export function Pricing({ onSelectTier, onOpenLeadModal, loadingTier }: PricingProps) {
  const { pricing } = content

  return (
    <section id="prezzi" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6"
          >
            {pricing.badge}
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            {pricing.headline}
          </h2>

          <p
            className="text-lg text-muted-foreground"
          >
            {pricing.description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              index={index}
              onSelectCheckout={() => onSelectTier(tier.id)}
              onSelectLead={onOpenLeadModal}
              isLoading={loadingTier === tier.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  tier: Tier
  index: number
  onSelectCheckout: () => void
  onSelectLead: () => void
  isLoading?: boolean
}

function PricingCard({ tier, index, onSelectCheckout, onSelectLead, isLoading }: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 md:p-8',
        tier.popular
          ? 'border-[var(--premium-gold)] bg-[var(--premium-gold-light)] shadow-xl scale-105 z-10'
          : 'border-border bg-card'
      )}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--premium-gold)] text-[var(--navy)] text-sm font-semibold rounded-full">
          Piu Popolare
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {tier.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{tier.tagline}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3">
          <span className="text-lg md:text-xl text-muted-foreground line-through">
            €{tier.priceFullFormatted}
          </span>
          <span className="text-4xl md:text-5xl font-bold text-foreground">
            €{tier.priceFormatted}
          </span>
        </div>
        <div className="inline-block mt-2 px-3 py-1 rounded-full bg-[var(--whatsapp-green)]/10 text-[var(--whatsapp-green)] text-xs font-semibold">
          Risparmia €{(Number(tier.priceFullFormatted.replace('.', '')) - Number(tier.priceFormatted.replace('.', ''))).toLocaleString('it-IT')}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          o 3 rate da €{tier.installmentFormatted}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground text-center mb-6">
        {tier.description}
      </p>

      {/* Features */}
      <div className="flex-1 space-y-3 mb-8">
        {tier.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[var(--whatsapp-green)] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        {/* Primary CTA */}
        <Button
          size="lg"
          onClick={onSelectCheckout}
          disabled={isLoading}
          className={cn(
            'w-full text-lg py-6 h-auto',
            tier.popular
              ? 'bg-[var(--navy)] hover:bg-[var(--navy-light)] text-white'
              : 'bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white'
          )}
        >
          {isLoading ? 'Caricamento...' : tier.ctaPrimary.label}
        </Button>
        
        {/* Secondary CTA (only for LV2 and LV3) */}
        {tier.ctaSecondary && (
          <Button
            size="lg"
            variant="outline"
            onClick={onSelectLead}
            className="w-full text-base py-5 h-auto border-[var(--whatsapp-green)] text-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green)] hover:text-white"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {tier.ctaSecondary.label}
          </Button>
        )}
      </div>
    </div>
  )
}
