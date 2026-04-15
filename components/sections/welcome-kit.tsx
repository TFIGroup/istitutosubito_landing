'use client'

import Image from 'next/image'

const kitBlocks = [
  {
    emoji: '📦',
    title: 'Kit hardware professionale',
    description:
      "Cacciaviti di precisione, pinzette ESD, tappetino magnetico, spudger, multimetro digitale e tutti gli strumenti per le 10 riparazioni più richieste. Oltre 20 strumenti professionali, già pronti all'uso.",
  },
  {
    emoji: '📸',
    title: 'Webcam, braccio e ring light',
    description:
      "Webcam plug-and-play con braccio articolato e luce led integrata. Si fissa al banco di lavoro in 30 secondi, posizionata dall'alto: il Capotecnico vede esattamente quello che fai durante le lezioni live. Zero da configurare, zero da comprare.",
  },
  {
    emoji: '📚',
    title: 'Materiale didattico digitale',
    description:
      "Schede di riparazione passo-passo, video tutorial di approfondimento e accesso al gruppo WhatsApp dei corsisti. Tutto disponibile dal giorno dell'iscrizione.",
  },
  {
    emoji: '📞',
    title: 'Contatto diretto col Capotecnico',
    description:
      'Numero WhatsApp dedicato per domande tra una lezione e l\'altra. Risposte rapide, supporto reale, mai chatbot.',
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
            Quando ti iscrivi ti spediamo a casa tutto quello che serve per
            imparare. Apri, colleghi, parti. Niente da comprare, niente da
            configurare.
          </p>
        </div>

        {/* Two columns: image + grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: lab/kit image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/412cd0b4-fb59-41e1-9442-1510241fd76d%202.JPG-LmwPxwIzhbz9wDb6bSFhW3wLNjwWD4.jpeg"
              alt="Strumenti professionali e smartphone sul banco di lavoro"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {kitBlocks.map((block) => (
              <div
                key={block.title}
                className="bg-muted/50 rounded-xl p-5 border border-border"
              >
                <span className="text-2xl mb-3 block">{block.emoji}</span>
                <h3 className="font-semibold text-foreground mb-1.5">
                  {block.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signal row */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          Spedizione tracciata da 2 a 5 giorni lavorativi. In tutta Italia. Apri la scatola e sei operativo.
        </p>
      </div>
    </section>
  )
}
