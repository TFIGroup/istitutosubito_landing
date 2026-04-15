'use client'

import { Wrench, Package, MessageCircle, Users, Briefcase, Award, Shield } from 'lucide-react'
import { content } from '@/lib/content'

const iconMap = {
  wrench: Wrench,
  package: Package,
  messageCircle: MessageCircle,
  users: Users,
  briefcase: Briefcase,
  award: Award,
  shield: Shield,
}

export function WhyUs() {
  const { whyUs } = content

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6"
          >
            {whyUs.badge}
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            {whyUs.headline}
          </h2>

          <p
            className="text-lg text-muted-foreground"
          >
            {whyUs.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUs.points.map((point, index) => {
            const Icon = iconMap[point.icon as keyof typeof iconMap]
            const href = 'href' in point ? (point.href as string) : null
            const Wrapper = href ? 'a' : 'div'
            return (
              <Wrapper
                key={index}
                {...(href ? { href } : {})}
                className={`p-6 bg-card rounded-xl border border-border${href ? ' hover:border-[var(--electric-blue)]/40 hover:shadow-md transition-all' : ''}`}
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--electric-blue)]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--electric-blue)]" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {point.description}
                </p>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
