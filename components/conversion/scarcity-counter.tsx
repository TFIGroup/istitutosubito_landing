'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { scarcity, getSpotsRemaining, isUrgent } from '@/lib/scarcity'
import { cn } from '@/lib/utils'

export function ScarcityCounter() {
  const spotsRemaining = getSpotsRemaining()
  const urgent = isUrgent()

  if (!scarcity.enabled) return null

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "p-6 md:p-8 rounded-2xl border-2 text-center",
            urgent
              ? "bg-red-50 border-red-200"
              : "bg-card border-border"
          )}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className={cn(
              "w-5 h-5",
              urgent ? "text-red-500" : "text-[var(--electric-blue)]"
            )} />
            <span className="text-sm font-medium text-muted-foreground">
              {scarcity.messages.spotsLabel}
            </span>
          </div>
          <div className={cn(
            "text-5xl md:text-6xl font-bold",
            urgent ? "text-red-500 animate-pulse" : "text-foreground"
          )}>
            {spotsRemaining}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            su {scarcity.maxSpots} disponibili questo mese
          </p>

          {/* Urgent Message */}
          {urgent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {scarcity.messages.urgentMessage}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
