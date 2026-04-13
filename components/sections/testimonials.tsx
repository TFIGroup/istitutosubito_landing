'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TestimonialsProps {
  onOpenLeadModal: () => void
}

export function Testimonials({ onOpenLeadModal }: TestimonialsProps) {
  return (
    <section id="testimonianze" className="py-16 md:py-24 bg-[var(--navy)] text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8"
          >
            Le voci dei nostri diplomati
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance"
          >
            46 diplomati.<br />
            <span className="text-[var(--premium-gold)]">L&apos;80% lavora attivamente nel settore.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Stiamo raccogliendo le loro storie per condividerle qui. 
            Vuoi sentirle direttamente dalla loro voce prima di decidere?
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={onOpenLeadModal}
              className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white text-lg px-8 py-6 h-auto"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Parla con un Capotecnico
            </Button>
          </motion.div>

          {/* Small text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm text-white/60 mt-6"
          >
            Ti mettiamo in contatto diretto con un nostro ex studente.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
