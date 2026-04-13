'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

export function FirstClient() {
  const { firstClient } = content

  return (
    <section id="corso" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Big Number Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="text-[200px] md:text-[280px] font-bold text-[var(--electric-blue)] leading-none select-none">
                {firstClient.bigNumber}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                <span className="text-lg md:text-xl font-medium text-muted-foreground">
                  su 20 hanno il telefono rotto
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--premium-gold-light)] text-[var(--navy)] text-sm font-medium mb-6">
              {firstClient.badge}
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {firstClient.headline}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4">
              {firstClient.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
