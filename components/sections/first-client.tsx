'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

export function FirstClient() {
  const { firstClient } = content

  return (
    <section id="corso" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--premium-gold-light)] text-[var(--navy)] text-sm font-medium mb-6"
          >
            {firstClient.badge}
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            {firstClient.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            {firstClient.description}
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {firstClient.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < firstClient.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-border" />
              )}

              <div className="flex flex-col items-center text-center">
                {/* Number Circle */}
                <div className="w-16 h-16 rounded-full bg-[var(--electric-blue)] text-white flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
                  {step.number}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
