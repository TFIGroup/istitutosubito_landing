'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { content } from '@/lib/content'

export function Testimonials() {
  const { testimonials } = content

  return (
    <section id="testimonianze" className="py-16 md:py-24 bg-[var(--navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6"
          >
            {testimonials.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-balance"
          >
            {testimonials.headline}
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[var(--electric-blue)] mb-4 opacity-50" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--premium-gold)] text-[var(--premium-gold)]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/90 mb-4 leading-relaxed">
                {review.text}
              </p>

              {/* Result Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-[var(--whatsapp-green)]/20 text-[var(--whatsapp-green)] text-sm font-medium rounded-full mb-4">
                {review.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-sm font-semibold">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-medium">{review.name}</div>
                  <div className="text-sm text-white/60">
                    {review.location} · {review.tier}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
