'use client'

import Link from 'next/link'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import { content } from '@/lib/content'

export function Footer() {
  const { footer } = content

  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Colonna 1:Brand & contatti operativi */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold mb-3 block">
              {footer.logo}
            </Link>
            <p className="text-white/60 text-sm mb-5">
              {footer.tagline}
            </p>

            {/* Sede operativa */}
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 text-white/70" />
                <span className="text-sm font-semibold text-white/90">{footer.sedeOperativa.label}</span>
              </div>
              <p className="text-sm text-white/60 pl-5.5">{footer.sedeOperativa.line1}</p>
              <p className="text-sm text-white/60 pl-5.5">{footer.sedeOperativa.line2}</p>
            </div>

            {/* Contatti */}
            <div className="space-y-2">
              <a
                href={footer.contacts.phoneHref}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {footer.contacts.phone}
              </a>
              <a
                href={footer.contacts.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--whatsapp-green)] hover:text-[var(--whatsapp-green-hover)] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {footer.contacts.whatsapp}
              </a>
              <a
                href={footer.contacts.emailHref}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {footer.contacts.email}
              </a>
            </div>
          </div>

          {/* Colonna 2:Il Corso */}
          <div>
            <h4 className="font-semibold mb-4">Il Corso</h4>
            <ul className="space-y-2">
              {footer.links.corso.map((link, index) => (
                <li key={`corso-${index}`}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3:Supporto */}
          <div>
            <h4 className="font-semibold mb-4">Supporto</h4>
            <ul className="space-y-2">
              {footer.links.supporto.map((link, index) => (
                <li key={`supporto-${index}`}>
                  {link.href.startsWith('http') || link.href.startsWith('mailto:') ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 4:Legale */}
          <div>
            <h4 className="font-semibold mb-4">Legale</h4>
            <ul className="space-y-2">
              {footer.links.legale.map((link, index) => (
                <li key={`legale-${index}`}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar:dati legali */}
        <div className="pt-8 border-t border-white/10 space-y-1 text-xs text-white/50">
          <p>{footer.legal.line1}</p>
          <p>{footer.legal.line2}</p>
          <p>{footer.legal.line3}</p>
          <p>{footer.legal.line4}</p>
        </div>
      </div>
    </footer>
  )
}
