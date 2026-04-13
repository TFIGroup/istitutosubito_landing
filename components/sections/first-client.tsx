'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2, Clock, Euro, Briefcase } from 'lucide-react'

export function FirstClient() {
  return (
    <section id="corso" className="py-20 md:py-28 bg-[var(--navy)] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--premium-gold)] text-[var(--navy)] text-sm font-semibold mb-6">
              La Promessa
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Il Tuo Primo Cliente<br />
              <span className="text-[var(--premium-gold)]">Entro 2 Settimane</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Non ti insegniamo teoria. Ti insegniamo a riparare i guasti che i clienti 
              portano ogni giorno. Dopo sole 2 settimane di corso, sarai pronto a 
              gestire la tua prima riparazione pagata.
            </p>
            
            {/* Results Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Clock className="w-6 h-6 text-[var(--premium-gold)] mx-auto mb-2" />
                <div className="text-2xl font-bold">2</div>
                <div className="text-xs text-white/60">Settimane</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Euro className="w-6 h-6 text-[var(--premium-gold)] mx-auto mb-2" />
                <div className="text-2xl font-bold">50-80</div>
                <div className="text-xs text-white/60">Euro/riparazione</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                <Briefcase className="w-6 h-6 text-[var(--premium-gold)] mx-auto mb-2" />
                <div className="text-2xl font-bold">80%</div>
                <div className="text-xs text-white/60">Trova lavoro</div>
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
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
            
            {/* Floating testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 md:left-6 bg-white text-foreground rounded-xl p-4 shadow-xl max-w-xs"
            >
              <p className="text-sm italic mb-2">
                {'"Dopo 10 giorni ho riparato il mio primo schermo. Il cliente mi ha pagato 70 euro."'}
              </p>
              <p className="text-xs font-semibold text-[var(--electric-blue)]">
                Marco T. - Diplomato LV1
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
