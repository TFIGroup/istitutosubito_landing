'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { CheckCircle, Mail, MessageCircle, Package, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { content } from '@/lib/content'

function GrazieContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const { grazie } = content
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393XXXXXXXXX'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Ciao! Ho appena completato l\'iscrizione al corso.')}`

  const stepIcons = [Mail, MessageCircle, Package]

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[var(--whatsapp-green)] flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {grazie.headline}
          </h1>
          <p className="text-lg text-muted-foreground">
            {grazie.subheadline}
          </p>
          {sessionId && (
            <p className="text-sm text-muted-foreground mt-2">
              ID Ordine: {sessionId.slice(0, 20)}...
            </p>
          )}
        </div>

        {/* Next Steps */}
        <div className="grid gap-6 mb-12">
          {grazie.steps.map((step, index) => {
            const Icon = stepIcons[index]
            return (
              <div
                key={step.number}
                className="flex gap-4 p-6 bg-card rounded-lg border border-border"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[var(--electric-blue)] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[var(--electric-blue)]">
                      Passo {step.number}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              {grazie.whatsappCta}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <ArrowLeft className="w-5 h-5 mr-2" />
              {grazie.backHome}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function GraziePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Caricamento...</div>
      </div>
    }>
      <GrazieContent />
    </Suspense>
  )
}
