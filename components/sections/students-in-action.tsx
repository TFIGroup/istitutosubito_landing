'use client'

import Image from 'next/image'
import { CheckCircle2, Video } from 'lucide-react'
import { content } from '@/lib/content'

export function StudentsInAction() {
  const { manifesto } = content
  
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Image Side */}
          <div
            className="relative"
          >
            <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/questa.png"
                alt="Lezione videocall live: il Capotecnico vede il banco di lavoro dall'alto"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating Badge */}
            <div
              className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-white rounded-xl shadow-xl p-4 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--electric-blue)] flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">Live</div>
                  <div className="text-sm text-muted-foreground">1-to-1 col Capotecnico</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className="lg:pl-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--premium-gold-light)] text-[var(--navy)] text-sm font-medium mb-6">
              Formazione 1-to-1
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Impari Solo Quello Che Si Rompe Davvero
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Dal primo giorno lavori su dispositivi reali che ti spediremo noi insieme al kit completo di strumenti e webcam, fianco a fianco col Capotecnico.
              Niente classi affollate, niente teoria inutile. Solo pratica mirata sulle riparazioni
              che il mercato richiede ogni giorno.
            </p>

            <ul className="space-y-4">
              {[
                'Formazione individuale 1-to-1 col Capotecnico',
                '16 anni di esperienza su 130.000+ dispositivi',
                'Kit professionale incluso in ogni corso',
                'Lezioni da minimo 2 ore, con flessibilità. Il calendario lo costruisci tu insieme al Capotecnico.',
                'Supporto WhatsApp anche dopo il diploma',
                '80% dei diplomati trova lavoro entro 6 mesi',
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--whatsapp-green)] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
