'use client'

import Image from 'next/image'
import { Package, Camera, MessageCircle } from 'lucide-react'

const kitBlocks = [
  {
    icon: Package,
    title: 'Kit hardware professionale',
    description:
      "Cacciaviti di precisione, pinzette ESD, tappetino magnetico, spudger, multimetro digitale e tutti gli strumenti per le 10 riparazioni più richieste. Oltre 20 strumenti professionali, già pronti all'uso.",
  },
  {
    icon: Camera,
    title: 'Webcam, braccio e ring light',
    description:
      "Webcam plug-and-play con braccio articolato e luce led integrata. Si fissa al banco di lavoro in 30 secondi, posizionata dall'alto: il Capotecnico vede esattamente quello che fai durante le lezioni live. Zero da configurare, zero da comprare.",
  },
  {
    icon: MessageCircle,
    title: 'Contatto diretto col Capotecnico',
    description:
      'Numero WhatsApp dedicato per domande tra una lezione e l\'altra. Risposte rapide, supporto reale, mai chatbot.',
  },
]

export function WelcomeKit() {
  return (
    <section id="welcome-kit" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Apri la scatola. Sei già operativo.
          </h2>
          <p className="text-lg text-muted-foreground">
            Quando ti iscrivi ti spediamo a casa tutto quello che serve per
            imparare. Apri, colleghi, parti. Niente da comprare, niente da
            configurare.
          </p>
        </div>

        {/* Image */}
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-muted mb-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/412cd0b4-fb59-41e1-9442-1510241fd76d%202.JPG-LmwPxwIzhbz9wDb6bSFhW3wLNjwWD4.jpeg"
            alt="Tecnici al lavoro nel laboratorio Subito Riparato"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* 3 blocks row */}
        <div className="grid md:grid-cols-3 gap-6">
          {kitBlocks.map((block) => {
            const Icon = block.icon
            return (
              <div
                key={block.title}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--electric-blue)]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {block.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {block.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust signal row */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          Spedizione tracciata da 2 a 5 giorni lavorativi. In tutta Italia. Apri la scatola e sei operativo.
        </p>
      </div>
    </section>
  )
}
