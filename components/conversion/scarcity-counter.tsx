'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users } from 'lucide-react'
import { scarcity, getTimeRemaining, getSpotsRemaining, isUrgent } from '@/lib/scarcity'
import { cn } from '@/lib/utils'

export function ScarcityCounter() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())
  const spotsRemaining = getSpotsRemaining()
  const urgent = isUrgent()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!scarcity.enabled) return null

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "p-6 md:p-8 rounded-2xl border-2",
            urgent
              ? "bg-red-50 border-red-200"
              : "bg-card border-border"
          )}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Spots Remaining */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
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
            </div>

            {/* Countdown */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Clock className="w-5 h-5 text-[var(--electric-blue)]" />
                <span className="text-sm font-medium text-muted-foreground">
                  {scarcity.messages.closingMessage}
                </span>
              </div>
              <div className="flex justify-center md:justify-start gap-3">
                <CountdownUnit value={timeRemaining.days} label="Giorni" />
                <CountdownUnit value={timeRemaining.hours} label="Ore" />
                <CountdownUnit value={timeRemaining.minutes} label="Min" />
                <CountdownUnit value={timeRemaining.seconds} label="Sec" />
              </div>
            </div>
          </div>

          {/* Urgent Message */}
          {urgent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
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

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 md:w-16 md:h-16 bg-[var(--navy)] text-white rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
    </div>
  )
}
