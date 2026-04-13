'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

export function StudentsInAction() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/F0FBD725-466D-4925-BA70-0E66B55F2871.PNG-zYivbqK3g0jbDhAZFExnmxd6Jovwuc.png"
                alt="Studenti del corso con felpa Subito Riparato durante la formazione pratica"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 bg-white rounded-xl shadow-xl p-4 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--whatsapp-green)] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">94%</div>
                  <div className="text-sm text-muted-foreground">Tasso di occupazione</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--premium-gold-light)] text-[var(--navy)] text-sm font-medium mb-6">
              Formazione Pratica
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Impara Facendo, Non Solo Guardando
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {"Dal primo giorno metterai le mani su dispositivi reali. Niente teoria noiosa: ogni lezione e' pratica al 100%. Smonterai, diagnosticherai e riparerai smartphone proprio come in un centro assistenza professionale."}
            </p>

            <ul className="space-y-4">
              {[
                'Pratica su dispositivi reali fin dal primo giorno',
                'Rapporto 1:1 con il docente per massimo apprendimento',
                'Kit professionale incluso nel corso',
                'Accesso al laboratorio anche fuori orario',
                'Supporto continuo anche dopo il corso',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--whatsapp-green)] mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
