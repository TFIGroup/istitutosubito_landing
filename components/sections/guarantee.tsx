'use client'

import { motion } from 'framer-motion'
import { Shield, RefreshCw, HeadphonesIcon, Award } from 'lucide-react'

const guarantees = [
  {
    icon: RefreshCw,
    title: 'Soddisfatto o Rimborsato',
    description: 'Hai 14 giorni di garanzia soddisfatti o rimborsati. Inoltre, la prima lezione live col Capotecnico è di prova: se non ti convince, rimborso pieno entro 48 ore.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Supporto Post-Diploma',
    description: 'Accesso al supporto WhatsApp dei diplomati e assistenza tecnica anche dopo aver finito il corso.',
  },
  {
    icon: Award,
    title: 'Licenza Verificabile',
    description: 'Licenza professionale con QR code verificabile online. Mostrala ai tuoi futuri clienti o datori di lavoro.',
  },
  {
    icon: Shield,
    title: 'Pagamento Sicuro',
    description: 'Paghi con Stripe, il sistema usato da Amazon e Google. Anche a rate con Klarna.',
  },
]

export function Guarantee() {
  return (
    <section className="py-16 md:py-20 bg-[var(--premium-gold-light)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--premium-gold)] text-[var(--navy)] text-sm font-semibold mb-4">
            <Shield className="w-4 h-4" />
            Garanzia Zero Rischi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy)] mb-4">
            Nessun Rischio, Solo Opportunità
          </h2>
          <p className="text-lg text-[var(--navy)]/70 max-w-2xl mx-auto">
            Sappiamo che 1.500 euro sono un investimento importante. Per questo ti offriamo 
            garanzie concrete che eliminano ogni rischio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--navy)] flex items-center justify-center mb-4">
                <guarantee.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[var(--navy)] mb-2">{guarantee.title}</h3>
              <p className="text-sm text-[var(--navy)]/70">{guarantee.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--navy)]/80 max-w-3xl mx-auto">
            <strong className="text-[var(--navy)]">Il nostro obiettivo è il tuo successo.</strong> Non guadagniamo
            nulla da studenti insoddisfatti. Per questo investiamo nella tua formazione come se fosse
            la nostra reputazione — perché lo è.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
