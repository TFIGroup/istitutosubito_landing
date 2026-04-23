'use client'

import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, Target, MessageCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackPurchase } from '@/lib/tracking'

function GrazieAccontoContent() {
  useEffect(() => {
    try {
      trackPurchase('deposit', 9900)
      sessionStorage.setItem('stripe_checkout_completed', 'true')
      sessionStorage.removeItem('stripe_checkout_started')
      sessionStorage.removeItem('stripe_tier')
    } catch {}
  }, [])

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393773591545'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Ciao! Ho appena bloccato il mio posto con l\'acconto. Vorrei fissare l\'appuntamento col Capotecnico.')}`

  const steps = [
    { icon: CheckCircle, title: 'Hai bloccato il posto', color: 'var(--whatsapp-green)' },
    { icon: Clock, title: 'Il Capotecnico ti contatta entro 24h', color: 'var(--electric-blue)' },
    { icon: Target, title: 'Parlate insieme e decidi il tuo percorso', color: 'var(--premium-gold)' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[var(--whatsapp-green)] flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Posto bloccato!
          </h1>
          <p className="text-lg text-muted-foreground">
            Hai bloccato il tuo posto al prezzo attuale. Il Capotecnico ti
            contatterà entro 24 ore su WhatsApp per fissare il vostro
            appuntamento.
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="flex gap-4 p-6 bg-card rounded-lg border border-border"
              >
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: step.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Passo {index + 1}
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {step.title}
                    </h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mb-8">
          <p className="text-base text-muted-foreground">
            Hai domande? Scrivici su WhatsApp:{' '}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--whatsapp-green)] font-semibold hover:underline"
            >
              +39 377 359 1545
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Scrivi al Capotecnico
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Torna alla home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function GrazieAccontoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Caricamento...</div>
        </div>
      }
    >
      <GrazieAccontoContent />
    </Suspense>
  )
}
