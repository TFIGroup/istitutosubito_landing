'use client'

import { motion } from 'framer-motion'
import { Star, ExternalLink, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TestimonialsProps {
  onOpenLeadModal: () => void
}

// Recensioni REALI di corsisti da Google Maps
const realReviews = [
  {
    name: 'Diego Serio',
    text: 'Ho frequentato di recente il corso di Subito Riparato e sono rimasto estremamente soddisfatto. Il corso è stato strutturato in modo eccellente, con lezioni chiare, concise e piene di informazioni utili. Gli istruttori sono stati competenti, appassionati e sempre disponibili. In poco tempo ho acquisito le conoscenze e le competenze necessarie per riparare autonomamente i miei smartphone.',
    highlight: 'Un caloroso ringraziamento ai professori Vincenzo e Giovanni per tutti gli insegnamenti e le tecniche!',
    link: 'https://maps.app.goo.gl/GDHdkCH4RJ7F6Srx8',
  },
  {
    name: 'Nello Papa',
    text: 'Ho appena finito il Corso di formazione Tecnico Smartphone di livello 1. I coach Giovanni e Vincenzo sono persone preparate che mettono passione nel proprio lavoro e la trasmettono. Ti seguono passo passo attraverso lezioni progressive e ben preparate. Ad oggi ho già iniziato a riparare autonomamente e non ci avrei scommesso.',
    highlight: 'In questa azienda il Fallimento non è contemplato.',
    link: 'https://maps.app.goo.gl/GdwmLx1WFJrMwT7c9',
  },
  {
    name: 'Mattia Zuottolo',
    text: 'Sono veramente contento di aver fatto il corso di livello 1 qui, gli istruttori Vincenzo e Giovanni sono sempre disponibili, preparatissimi e non si smentiscono mai! Non vedo l\'ora di applicare tutto quello che ho imparato.',
    highlight: 'Preparatissimi e sempre disponibili',
    link: 'https://maps.app.goo.gl/wCMWNx3ciJsff3yX9',
  },
  {
    name: 'Antonello Martorelli',
    text: 'Ho fatto un corso di formazione presso questa azienda per imparare a riparare smartphone e sono rimasto piacevolmente sorpreso dalla professionalità e serietà dimostrate.',
    highlight: 'Consiglio ampiamente per iniziare una carriera in questo ambito.',
    link: 'https://maps.app.goo.gl/TSzWqkDBqTtSMn7c6',
  },
  {
    name: 'AGS',
    text: 'Ho frequentato uno dei loro corsi mi hanno portato a conoscere il mondo delle riparazioni hardware di ogni tipo di dispositivo. Sono molto competenti e professionali.',
    highlight: 'Molto competenti e professionali',
    link: 'https://maps.app.goo.gl/WW66wv4vVyHcQ1xP6',
  },
  {
    name: 'Nello Vicidomini',
    text: 'Ho seguito il corso di formazione di lvl 1 con il professore Vincenzo molto gentile e cordiale. Anche se sono piccolo (15 anni) ho imparato molte cose grazie a lui. Ringrazio anche Carmine gentilissimo, si è messo sempre a disposizione.',
    highlight: 'Anche a 15 anni ho imparato molte cose',
    link: 'https://maps.app.goo.gl/FR9WoMw283v761qn7',
  },
]

export function Testimonials({ onOpenLeadModal }: TestimonialsProps) {
  return (
    <section id="testimonianze" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--premium-gold-light)] text-[var(--navy)] text-sm font-medium mb-6"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Recensioni verificate Google
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Cosa dicono i nostri corsisti
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Recensioni reali di chi ha completato il corso. Clicca per verificarle su Google Maps.
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {realReviews.map((review, index) => (
            <motion.a
              key={review.name}
              href={review.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group bg-card rounded-xl p-6 border border-border hover:border-[var(--electric-blue)] hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                {review.text}
              </p>

              {/* Highlight */}
              <p className="text-foreground font-semibold text-sm mb-4 italic">
                &ldquo;{review.highlight}&rdquo;
              </p>

              {/* Author + Link */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-medium text-foreground">{review.name}</span>
                <span className="text-xs text-muted-foreground group-hover:text-[var(--electric-blue)] flex items-center gap-1 transition-colors">
                  Verifica su Google <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            Vuoi parlare direttamente con un nostro ex corsista?
          </p>
          <Button
            size="lg"
            onClick={onOpenLeadModal}
            className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Parla con un Capotecnico
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
