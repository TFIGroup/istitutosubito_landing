'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Check, QrCode, Shield, ExternalLink } from 'lucide-react'
import { content } from '@/lib/content'
import { Button } from '@/components/ui/button'

export function License() {
  const { license } = content

  return (
    <section id="licenza" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[var(--premium-gold-light)] text-[var(--navy)] rounded-full mb-4">
              {license.badge}
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {license.headline}
            </h2>
            
            <div className="space-y-4 mb-8">
              {license.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {license.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--electric-blue)]/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-[var(--electric-blue)]" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Demo Link */}
            {license.demoLink && (
              <Button
                asChild
                variant="outline"
                className="gap-2 border-[var(--electric-blue)] text-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/10"
              >
                <a href={license.demoLink.url} target="_blank" rel="noopener noreferrer">
                  <QrCode className="w-4 h-4" />
                  {license.demoLink.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </motion.div>
          
          {/* License Card Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)]/20 to-[var(--premium-gold)]/20 rounded-3xl transform rotate-3" />
            
            {/* License Card Mock */}
            <div className="relative bg-gradient-to-br from-[var(--navy)] to-[var(--navy-light)] rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg">ISTITUTO SUBITO</h3>
                  <p className="text-white/60 text-sm">Licenza Professionale</p>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[var(--premium-gold)]" />
                </div>
              </div>
              
              {/* Card Content */}
              <div className="flex gap-4 mb-6">
                {/* Photo placeholder */}
                <div className="w-20 h-24 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white/40 text-xs text-center">FOTO<br/>TECNICO</span>
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-white/60 text-xs">NOME</span>
                    <p className="text-white font-medium">Mario Rossi</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-white/60 text-xs">LIVELLO</span>
                    <p className="text-[var(--premium-gold)] font-bold">LV2 - Microsaldatore</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-xs">NUMERO LICENZA</span>
                    <p className="text-white font-mono text-sm">IS-2024-00847</p>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-white/60 text-xs">VERIFICA ONLINE</span>
                  <p className="text-white text-sm">subitoriparato.com/verifica</p>
                </div>
                <div className="w-16 h-16 bg-white rounded-lg p-2">
                  <div className="w-full h-full bg-[var(--navy)] rounded grid grid-cols-5 gap-0.5 p-1">
                    {/* Simple QR code pattern */}
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`rounded-sm ${
                          [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i) 
                            ? 'bg-white' 
                            : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Validity badge */}
              <div className="absolute -bottom-3 -right-3 bg-[var(--premium-gold)] text-[var(--navy)] px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                VALIDA
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
