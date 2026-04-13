'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useToast } from '@/hooks/use-toast'

// Sections
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { Manifesto } from '@/components/sections/manifesto'
import { FirstClient } from '@/components/sections/first-client'
import { Pricing } from '@/components/sections/pricing'
import { WhyUs } from '@/components/sections/why-us'
import { Paths } from '@/components/sections/paths'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { FinalCTA } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'

// Conversion Components
import { StickyMobileBar } from '@/components/conversion/sticky-mobile-bar'
import { StickyDesktopCTA } from '@/components/conversion/sticky-desktop-cta'
import { SocialProofToast } from '@/components/conversion/social-proof-toast'
import { AbandonmentBanner, markCheckoutStarted } from '@/components/conversion/abandonment-banner'
import { ScarcityCounter } from '@/components/conversion/scarcity-counter'
import { LeadModal } from '@/components/conversion/lead-modal'
import { ExitIntentModal } from '@/components/conversion/exit-intent-modal'

function LandingPageContent() {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [loadingTier, setLoadingTier] = useState<string | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const { toast } = useToast()
  const searchParams = useSearchParams()

  // Handle cancelled checkout
  useEffect(() => {
    if (searchParams.get('checkout') === 'cancelled') {
      toast({
        title: 'Checkout annullato',
        description: 'Puoi riprovare quando vuoi.',
        variant: 'default',
      })
    }
  }, [searchParams, toast])

  const handleCheckout = useCallback(async (tierId: string = 'lv2') => {
    setIsCheckoutLoading(true)
    setLoadingTier(tierId)
    markCheckoutStarted()

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tierId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: 'Errore',
        description: 'Si e verificato un errore. Riprova piu tardi.',
        variant: 'destructive',
      })
      setIsCheckoutLoading(false)
      setLoadingTier(null)
    }
  }, [toast])

  const handleOpenLeadModal = useCallback(() => {
    setIsLeadModalOpen(true)
  }, [])

  return (
    <>
      {/* Abandonment Banner */}
      <AbandonmentBanner onContinue={() => handleCheckout('lv2')} />

      {/* Main Content */}
      <Header />
      
      <main>
        <Hero
          onCheckout={() => handleCheckout('lv2')}
          onOpenLeadModal={handleOpenLeadModal}
          isLoading={isCheckoutLoading}
        />
        
        <Manifesto />
        
        <FirstClient />
        
        <Pricing
          onSelectTier={handleCheckout}
          loadingTier={loadingTier}
        />
        
        <ScarcityCounter />
        
        <WhyUs />
        
        <Paths />
        
        <Testimonials />
        
        <FAQ />
        
        <FinalCTA
          onCheckout={() => handleCheckout('lv2')}
          onOpenLeadModal={handleOpenLeadModal}
          isLoading={isCheckoutLoading}
        />
      </main>

      <Footer />

      {/* Conversion Components */}
      <StickyMobileBar
        onCheckout={() => handleCheckout('lv2')}
        isLoading={isCheckoutLoading}
      />
      <StickyDesktopCTA
        onCheckout={() => handleCheckout('lv2')}
        isLoading={isCheckoutLoading}
      />
      <SocialProofToast />
      <ExitIntentModal />
      
      {/* Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      {/* Mobile bottom spacing for sticky bar */}
      <div className="h-20 md:hidden" />
    </>
  )
}

export default function LandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Caricamento...</div>
      </div>
    }>
      <LandingPageContent />
    </Suspense>
  )
}
