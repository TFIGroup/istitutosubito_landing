'use client'

import { motion } from 'framer-motion'
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6"
          >
            {pricing.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            {pricing.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            {pricing.description}
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              index={index}
              onCheckout={() => onSelectTier(tier.id)}
              onLead={onOpenLeadModal}
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
  onCheckout: () => void
  onLead: () => void
  isLoading?: boolean
}

function PricingCard({ tier, index, onCheckout, onLead, isLoading }: PricingCardProps) {
  const handlePrimary = tier.ctaPrimary.type === 'checkout' ? onCheckout : onLead
  const handleSecondary = tier.ctaSecondary?.type === 'checkout' ? onCheckout : onLead

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.1 }}
      className={cn(
        'relative flex flex-col rounded-2xl border p-6 md:p-8',
        tier.popular
          ? 'border-[var(--premium-gold)] bg-[var(--premium-gold-light)] shadow-xl scale-105 z-10'
          : 'border-border bg-card'
      )}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--premium-gold)] text-[var(--navy)] text-sm font-semibold rounded-full">
          {tier.badge}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-[var(--electric-blue)] mb-1">{tier.code}</p>
        <h3 className="text-2xl font-bold text-foreground mb-1">
          {tier.name}
        </h3>
        <p className="text-muted-foreground text-sm">{tier.tagline}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl md:text-5xl font-bold text-foreground">
            &euro;{tier.priceFormatted}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          o 3 rate da &euro;{tier.installmentFormatted}
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 space-y-3 mb-8">
        {tier.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[var(--whatsapp-green)] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button
        size="lg"
        onClick={handlePrimary}
        disabled={isLoading}
        aria-label={`${tier.ctaPrimary.label} - ${tier.name}`}
        className={cn(
          'w-full text-lg py-6 h-auto',
          tier.popular
            ? 'bg-[var(--navy)] hover:bg-[var(--navy-light)] text-white'
            : 'bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white'
        )}
      >
        {isLoading ? 'Caricamento...' : tier.ctaPrimary.label}
      </Button>

      {/* Secondary — link testuale */}
      {tier.ctaSecondary && (
        <button
          onClick={handleSecondary}
          aria-label={`${tier.ctaSecondary.label} - ${tier.name}`}
          className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center cursor-pointer"
        >
          oppure {tier.ctaSecondary.label.toLowerCase()} &rarr;
        </button>
      )}

      {/* Guarantee */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        {tier.guarantee}
      </p>
    </motion.div>
  )
}
