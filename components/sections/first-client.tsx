'use client'

import Image from 'next/image'
import { CheckCircle2, Euro, Briefcase } from 'lucide-react'

export function FirstClient() {
  return (
    <section id="corso" className="py-20 md:py-28 bg-[var(--navy)] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--premium-gold)] text-[var(--navy)] text-sm font-semibold mb-6">
              La Realta
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Il tuo primo cliente<br />
              <span className="text-[var(--premium-gold)]">ce l&apos;hai gia.</span><br />
              <span className="text-white/80 text-2xl md:text-3xl">Non lo sai ancora.</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Fai un esercizio. Oggi, guardati intorno. Tra i 20 amici, parenti e 
              colleghi piu vicini a te, almeno 2 hanno un telefono con un problema. 
              Schermo rotto, batteria che non tiene, microfono che gracchia. Minimo 2. 
              Probabilmente di piu. Quando finisci il corso, hai gia recuperato mezzo 
              investimento solo sistemando i loro telefoni.
            </p>
            
            {/* Results Grid - only 2 boxes */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Euro className="w-6 h-6 text-[var(--premium-gold)] mx-auto mb-2" />
                <div className="text-2xl font-bold">40-120</div>
                <div className="text-xs text-white/60">Euro/riparazione</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Briefcase className="w-6 h-6 text-[var(--premium-gold)] mx-auto mb-2" />
                <div className="text-2xl font-bold">80%</div>
                <div className="text-xs text-white/60">dei 46 diplomati oggi lavora nel settore</div>
              </div>
            </div>
            
            {/* Checklist */}
            <ul className="space-y-3">
              {[
                'Impari solo riparazioni che il mercato paga',
                'Pratica su dispositivi reali dal giorno 1',
                'Supporto WhatsApp anche dopo il diploma',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--whatsapp-green)] flex-shrink-0" />
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/412cd0b4-fb59-41e1-9442-1510241fd76d%202.JPG-LmwPxwIzhbz9wDb6bSFhW3wLNjwWD4.jpeg"
                alt="Riparazione smartphone professionale in corso"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
