'use client'

import { useState, useCallback, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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
import { LabGallery } from '@/components/sections/lab-gallery'
import { WelcomeKit } from '@/components/sections/welcome-kit'
import { StudentsInAction } from '@/components/sections/students-in-action'
import { License } from '@/components/sections/license'
import { TrustProof } from '@/components/sections/trust-proof'
import { Guarantee } from '@/components/sections/guarantee'

// Conversion Components
import { StickyMobileBar } from '@/components/conversion/sticky-mobile-bar'
import { StickyDesktopCTA } from '@/components/conversion/sticky-desktop-cta'
import { SocialProofToast } from '@/components/conversion/social-proof-toast'
import { AbandonmentBanner, markCheckoutStarted } from '@/components/conversion/abandonment-banner'
import { ScarcityCounter } from '@/components/conversion/scarcity-counter'
import { LeadModal } from '@/components/conversion/lead-modal'
import { ExitIntentModal } from '@/components/conversion/exit-intent-modal'
import { CheckoutModal } from '@/components/conversion/checkout-modal'

// Tiny component that uses useSearchParams, isolated in its own Suspense
// so it doesn't block the entire page from being statically prerendered
function CheckoutCancelledHandler() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    if (searchParams.get('checkout') === 'cancelled') {
      toast({
        title: 'Checkout annullato',
        description: 'Puoi riprovare quando vuoi.',
        variant: 'default',
      })
    }
  }, [searchParams, toast])

  return null
}

export default function LandingPage() {
  const [checkoutTierId, setCheckoutTierId] = useState<string | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  const handleCheckout = useCallback((tierId: string = 'lv2') => {
    markCheckoutStarted()
    setCheckoutTierId(tierId)
  }, [])

  const handleOpenLeadModal = useCallback(() => {
    setIsLeadModalOpen(true)
  }, [])

  return (
    <>
      {/* Handle ?checkout=cancelled without blocking SSR */}
      <Suspense fallback={null}>
        <CheckoutCancelledHandler />
      </Suspense>

      {/* Abandonment Banner */}
      <AbandonmentBanner onContinue={() => handleCheckout('lv2')} />

      {/* Main Content */}
      <Header />

      <main>
        <Hero
          onCheckout={() => document.getElementById('prezzi')?.scrollIntoView({ behavior: 'smooth' })}
          onOpenLeadModal={handleOpenLeadModal}
        />

        <TrustProof />

        <Manifesto />

        <StudentsInAction />

        <FirstClient />

        <LabGallery />

        <WelcomeKit />

        <Pricing
          onSelectTier={handleCheckout}
          onOpenLeadModal={handleOpenLeadModal}
          loadingTier={null}
        />

        <ScarcityCounter />

        <License />

        <WhyUs />

        <Paths />

        <Testimonials onOpenLeadModal={handleOpenLeadModal} />

        <Guarantee />

        <FAQ />

        <FinalCTA
          onCheckout={() => handleCheckout('lv2')}
          onOpenLeadModal={handleOpenLeadModal}
        />
      </main>

      <Footer />

      {/* Conversion Components */}
      <StickyMobileBar
        onCheckout={() => handleCheckout('lv2')}
        isLoading={false}
      />
      <StickyDesktopCTA
        onCheckout={() => handleCheckout('lv2')}
        isLoading={false}
      />
      <SocialProofToast />
      <ExitIntentModal />

      {/* Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      {/* Checkout Modal (include step form + recovery €99 + pagamento acconto) */}
      <CheckoutModal
        isOpen={checkoutTierId !== null}
        onClose={() => setCheckoutTierId(null)}
        tierId={checkoutTierId}
        onOpenLeadModal={handleOpenLeadModal}
      />

      {/* Mobile bottom spacing for sticky bar */}
      <div className="h-20 md:hidden" />
    </>
  )
}
