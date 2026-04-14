'use client'

import { Home, Building2, Store } from 'lucide-react'
import { content } from '@/lib/content'

const iconMap = {
  home: Home,
  building: Building2,
  store: Store,
}

export function Paths() {
  const { paths } = content

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--premium-gold-light)] text-[var(--navy)] text-sm font-medium mb-6"
          >
            {paths.badge}
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            {paths.headline}
          </h2>
        </div>

        {/* Paths Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {paths.options.map((option, index) => {
            const Icon = iconMap[option.icon as keyof typeof iconMap]
            return (
              <div
                key={index}
                className="text-center p-8 bg-card rounded-xl border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--navy)] flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {option.title}
                </h3>
                <p className="text-muted-foreground">
                  {option.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
