'use client'

import { Check, MessageCircle, ArrowUpRight } from 'lucide-react'
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

  const heroTier = TIERS.find((t) => t.id === 'lv1')
  const upgradeTiers = TIERS.filter((t) => t.id !== 'lv1')

  return (
    <section id="prezzi" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6">
            {pricing.badge}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {pricing.headline}
          </h2>

          <p className="text-lg text-muted-foreground">
            {pricing.description}
          </p>
        </div>

        {/* Hero LV1 */}
        {heroTier && (
          <div className="max-w-5xl mx-auto mb-14 md:mb-16">
            <HeroPricingCard
              tier={heroTier}
              onSelectCheckout={() => onSelectTier(heroTier.id)}
              onSelectLead={onOpenLeadModal}
              isLoading={loadingTier === heroTier.id}
            />
          </div>
        )}

        {/* Upgrade tiers: LV2 + LV3 */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-3">
              Livelli avanzati
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Vuoi arrivare più in alto?
            </h3>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Due livelli di specializzazione per chi vuole aumentare il margine per riparazione o coprire il 100% del mercato.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {upgradeTiers.map((tier) => (
              <CompactPricingCard
                key={tier.id}
                tier={tier}
                onSelectCheckout={() => onSelectTier(tier.id)}
                onSelectLead={onOpenLeadModal}
                isLoading={loadingTier === tier.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface PricingCardProps {
  tier: Tier
  onSelectCheckout: () => void
  onSelectLead: () => void
  isLoading?: boolean
}

function HeroPricingCard({ tier, onSelectCheckout, onSelectLead, isLoading }: PricingCardProps) {
  const saving = Number(tier.priceFullFormatted.replace('.', '')) - Number(tier.priceFormatted.replace('.', ''))

  return (
    <div className="relative rounded-3xl border-2 border-[var(--electric-blue)] bg-gradient-to-br from-[var(--electric-blue)]/5 via-white to-white shadow-2xl overflow-hidden">
      {/* Top highlight bar */}
      <div className="h-1.5 bg-gradient-to-r from-[var(--electric-blue)] via-[var(--electric-blue)] to-[var(--electric-blue-hover)]" />

      {/* Badge */}
      {tier.badge && (
        <div className="absolute top-6 right-6 md:top-8 md:right-8 px-3 py-1 bg-[var(--electric-blue)] text-white text-xs font-bold rounded-full shadow-md tracking-wide">
          {tier.badge}
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-0">
        {/* Left: Identity + Price */}
        <div className="lg:col-span-2 p-7 md:p-10 lg:border-r lg:border-[var(--electric-blue)]/15">
          <div className="inline-block px-2.5 py-1 rounded-md bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-xs font-bold tracking-wider mb-3">
            {tier.code}
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {tier.name}
          </h3>

          <p className="text-sm md:text-base font-semibold text-[var(--electric-blue)] leading-relaxed mb-3">
            {tier.positioning}
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {tier.tagline}
          </p>

          <div className="pt-4 border-t border-border/60">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-base text-muted-foreground line-through">
                €{tier.priceFullFormatted}
              </span>
              <span className="text-5xl md:text-6xl font-bold text-foreground leading-none">
                €{tier.priceFormatted}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 mt-3">
              <div className="px-2.5 py-1 rounded-md bg-[var(--whatsapp-green)]/15 text-[var(--whatsapp-green)] text-xs font-bold">
                Risparmia €{saving.toLocaleString('it-IT')}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              o 3 rate da €{tier.installmentFormatted} con Klarna
            </p>
          </div>
        </div>

        {/* Right: Features + CTAs */}
        <div className="lg:col-span-3 p-7 md:p-10 bg-white">
          <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Cosa ricevi
          </p>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
            {tier.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-[var(--whatsapp-green)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground leading-snug">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Button
              size="lg"
              onClick={onSelectCheckout}
              disabled={isLoading}
              className="w-full text-base md:text-lg py-6 h-auto bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white font-semibold shadow-md"
            >
              {isLoading ? 'Caricamento...' : tier.ctaPrimary.label}
            </Button>

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

            <p className="text-xs text-center text-muted-foreground pt-1">
              {tier.guarantee}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompactPricingCard({ tier, onSelectCheckout, onSelectLead, isLoading }: PricingCardProps) {
  const saving = Number(tier.priceFullFormatted.replace('.', '')) - Number(tier.priceFormatted.replace('.', ''))

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-border bg-card p-6 md:p-7 transition-shadow hover:shadow-lg hover:border-foreground/20'
      )}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-bold tracking-wider">
            {tier.code}
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <h4 className="text-xl md:text-2xl font-bold text-foreground mb-1.5">
          {tier.name}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tier.positioning}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-sm text-muted-foreground line-through">
          €{tier.priceFullFormatted}
        </span>
        <span className="text-3xl md:text-4xl font-bold text-foreground leading-none">
          €{tier.priceFormatted}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-5">
        o 3 rate da €{tier.installmentFormatted} · Risparmia €{saving.toLocaleString('it-IT')}
      </p>

      {/* Features */}
      <div className="flex-1 space-y-2 mb-6 pt-4 border-t border-border">
        {tier.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-[var(--whatsapp-green)] flex-shrink-0 mt-0.5" />
            <span className="text-xs md:text-sm text-muted-foreground leading-snug">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="space-y-2">
        <Button
          size="lg"
          onClick={onSelectCheckout}
          disabled={isLoading}
          variant="outline"
          className="w-full py-4 h-auto border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white font-semibold"
        >
          {isLoading ? 'Caricamento...' : tier.ctaPrimary.label}
        </Button>

        {tier.ctaSecondary && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onSelectLead}
            className="w-full text-sm text-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green)]/10"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {tier.ctaSecondary.label}
          </Button>
        )}
      </div>
    </div>
  )
}
