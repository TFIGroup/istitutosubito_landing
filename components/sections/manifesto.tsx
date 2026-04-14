'use client'

import Image from 'next/image'
import { content } from '@/lib/content'

export function Manifesto() {
  const { manifesto } = content

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Image Side */}
          <div
            className="relative aspect-square rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/microscopio-SVTdrxIWIimvIYPulFj25062r1CPg3.jpg"
              alt="Microscopio professionale per riparazioni di precisione"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6"
            >
              {manifesto.badge}
            </div>

            {/* Headline */}
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance"
            >
              {manifesto.headline}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-lg text-muted-foreground">
              {manifesto.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {manifesto.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-card rounded-xl border border-border"
            >
              <div className="text-4xl md:text-5xl font-bold text-[var(--electric-blue)] mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
