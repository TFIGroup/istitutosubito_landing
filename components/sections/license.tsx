'use client'

import Image from 'next/image'
import { Check, QrCode, ExternalLink } from 'lucide-react'
import { content } from '@/lib/content'
import { Button } from '@/components/ui/button'

export function License() {
  const { license } = content

  return (
    <section id="licenza" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
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
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--electric-blue)]/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-[var(--electric-blue)]" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
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
          </div>

          {/* License Card — Foto reale */}
          <div className="relative">
            {/* Immagine principale: mano che tiene la licenza in laboratorio */}
            <a
              href={license.demoLink?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/licenza-mano.png"
                  alt="Licenza Professionale Tecnico Smartphone — esempio reale tenuta in mano in laboratorio"
                  width={800}
                  height={533}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {license.demoLink?.label || 'Clicca per verificare una licenza reale'}
              </p>
            </a>

            {/* Dettaglio close-up della licenza */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-border">
              <Image
                src="/licenza-daniele-vietri.png"
                alt="Licenza Professionale Tecnico Smartphone — Daniele Vietri, LV3, 95/100, numero 19284725-11"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
