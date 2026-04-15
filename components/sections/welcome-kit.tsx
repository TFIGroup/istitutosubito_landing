'use client'

import Image from 'next/image'

const kitBlocks = [
  {
    emoji: '📦',
    title: 'Kit professionale',
    description: 'Tutti gli strumenti che usano i tecnici nei nostri laboratori. Spedito a casa, pronto all\'uso.',
  },
  {
    emoji: '📸',
    title: 'Setup videocall incluso',
    description: 'Webcam con braccio articolato e ring light, plug-and-play. Il Capotecnico ti vede lavorare dall\'alto, come se fosse al tuo fianco.',
  },
  {
    emoji: '📱',
    title: 'Telefoni su cui esercitarti',
    description: 'Materia prima reale per imparare. Smonta, sbaglia, riprova. Senza paura di rompere niente di tuo.',
  },
  {
    emoji: '🎓',
    title: 'Tutto il resto incluso',
    description: 'Materiali didattici, gruppo WhatsApp dei corsisti, supporto diretto col Capotecnico. Niente da comprare a parte, mai.',
  },
]

export function WelcomeKit() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Apri la scatola. Sei già operativo.
          </h2>
          <p className="text-lg text-muted-foreground">
            Quando ti iscrivi ti spediamo a casa tutto quello che serve per imparare. Apri, colleghi, parti. Niente da comprare, niente da configurare.
          </p>
        </div>

        {/* Two columns: image + grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: kit image (placeholder fino a foto reale) */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src="/images/kit-completo.jpg"
              alt="Kit completo Istituto Subito aperto e pronto all'uso"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
            {/* Fallback se immagine non caricata */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
              <span className="text-6xl mb-4">📦</span>
              <span className="text-sm font-medium">Foto kit in arrivo</span>
            </div>
          </div>

          {/* Right: 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {kitBlocks.map((block) => (
              <div
                key={block.title}
                className="bg-muted/50 rounded-xl p-5 border border-border"
              >
                <span className="text-2xl mb-3 block">{block.emoji}</span>
                <h3 className="font-semibold text-foreground mb-1.5">{block.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{block.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="mt-12 bg-[var(--navy)]/5 rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Tutto già incluso nel prezzo del corso.
          </h3>
          <p className="text-muted-foreground">
            Niente upsell nascosti. Quello che vedi è quello che ricevi a casa.
          </p>
        </div>
      </div>
    </section>
  )
}
