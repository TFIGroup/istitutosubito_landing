'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, MapPin, Shield, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const googleReviews = [
  {
    name: 'Alessandro Lolli',
    date: '09/08/2023',
    rating: 5,
    text: 'Hanno accettato una sfida che nessun altro osava affrontare. Il mio cellulare era finito nell\'acqua salata ed era completamente fuori uso. Con una competenza straordinaria, non solo hanno recuperato tutti i dati, ma hanno anche clonato il dispositivo originale su uno nuovo.',
    highlight: 'Recupero dati da acqua salata',
  },
  {
    name: 'Paride Lolli',
    date: '09/08/2023', 
    rating: 5,
    text: 'Hanno risolto un problema che era irrisolvibile per l\'assistenza ufficiale Samsung e per altri laboratori su Roma. Gestione all\'americana rapida, diretta ed efficiente. Prezzo onestissimo, rapporto qualità prezzo inarrivabile.',
    highlight: 'Risolto caso impossibile',
  },
  {
    name: 'Cesare Amodio',
    date: '28/07/2023',
    rating: 5,
    text: 'Professionalità, rapidità e cortesia. Consiglio vivamente.',
    highlight: 'Servizio eccellente',
  },
]

export function TrustProof() {
  return (
    <section className="py-16 md:py-24 bg-white" id="chi-siamo">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Main Trust Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-4">
            Impari da Chi Ripara Davvero
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Istituto Subito nasce dall&apos;esperienza di Subito Riparato, il laboratorio 
            di riparazione smartphone più recensito della Campania.
          </p>
        </motion.div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '2.512', label: 'Recensioni Google', icon: Star, color: 'text-yellow-500' },
            { value: '16', label: 'Anni di Esperienza', icon: Clock, color: 'text-[var(--electric-blue)]' },
            { value: '130K+', label: 'Dispositivi Riparati', icon: Shield, color: 'text-[var(--whatsapp-green)]' },
            { value: '2', label: 'Sedi in Campania', icon: MapPin, color: 'text-[var(--premium-gold)]' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-xl"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-3xl md:text-4xl font-bold text-[var(--navy)]">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--navy)] rounded-2xl p-8 md:p-12"
        >
          {/* Google Badge */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-2xl font-bold">4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-white/70 text-sm">2.512 recensioni verificate su Google</p>
              </div>
            </div>
            <Button 
              className="bg-white text-[var(--navy)] hover:bg-white/90 gap-2"
              asChild
            >
              <a 
                href="https://share.google/jctGdFe0ugTXK4qvw" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Leggi tutte le recensioni →
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {googleReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/10 backdrop-blur rounded-xl p-6"
              >
                {/* Highlight Badge */}
                <div className="inline-block px-3 py-1 bg-[var(--premium-gold)] text-[var(--navy)] text-xs font-semibold rounded-full mb-4">
                  {review.highlight}
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-4">
                  &quot;{review.text}&quot;
                </p>
                
                {/* Author */}
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{review.name}</span>
                  <span className="text-white/50 text-xs">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
            <MapPin className="w-6 h-6 text-[var(--electric-blue)] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground">Sede Nocera Inferiore</h4>
              <p className="text-muted-foreground text-sm">Via S. D&apos;Alessandro, 61 - 84014 Nocera Inferiore (SA)</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
            <MapPin className="w-6 h-6 text-[var(--electric-blue)] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-foreground">Sede Cava de&apos; Tirreni</h4>
              <p className="text-muted-foreground text-sm">Via A. Sorrentino, 35 - 84013 Cava de&apos; Tirreni (SA)</p>
            </div>
          </div>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <strong className="text-foreground">Non siamo una scuola teorica.</strong> Siamo tecnici che riparano 
            smartphone ogni giorno da 16 anni. Quello che insegniamo è quello che facciamo
            quotidianamente nel nostro laboratorio con clienti reali.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
