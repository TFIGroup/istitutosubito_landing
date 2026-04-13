'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { scarcity } from '@/lib/scarcity'
import { cn } from '@/lib/utils'

export function ScarcityCounter() {
  const spotsRemaining = scarcity.spotsRemaining
  const urgent = spotsRemaining <= scarcity.urgentThreshold

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
          {/* Spots Remaining */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className={cn(
              "w-6 h-6",
              urgent ? "text-red-500" : "text-[var(--electric-blue)]"
            )} />
            <span className="text-lg font-medium text-muted-foreground">
              Posti rimasti
            </span>
          </div>
          
          <div className={cn(
            "text-6xl md:text-7xl font-bold mb-2",
            urgent ? "text-red-500" : "text-foreground"
          )}>
            {spotsRemaining}
          </div>
          
          <p className="text-muted-foreground">
            Prossimo trimestre
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
