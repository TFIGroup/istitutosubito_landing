'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { content } from '@/lib/content'

export function Footer() {
  const { footer } = content
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393XXXXXXXXX'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Ciao, vorrei informazioni sul corso')}`

  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold mb-4 block">
              {footer.logo}
            </Link>
            <p className="text-white/60 text-sm mb-4">
              {footer.tagline}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--whatsapp-green)] hover:text-[var(--whatsapp-green-hover)] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            
            {/* Addresses */}
            {footer.addresses && (
              <div className="mt-4 space-y-3">
                {footer.addresses.map((addr, index) => (
                  <div key={index} className="text-sm">
                    <p className="text-white/80 font-medium">{addr.label}</p>
                    <p className="text-white/50">{addr.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Corso */}
          <div>
            <h4 className="font-semibold mb-4">Il Corso</h4>
            <ul className="space-y-2">
              {footer.links.corso.map((link, index) => (
                <li key={`corso-${index}`}>
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

          {/* Supporto */}
          <div>
            <h4 className="font-semibold mb-4">Supporto</h4>
            <ul className="space-y-2">
              {footer.links.supporto.map((link, index) => (
                <li key={`supporto-${index}`}>
                  {link.label === 'WhatsApp' ? (
                    <a
                      href={whatsappLink}
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

          {/* Legale */}
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>{footer.copyright}</p>
          <p>{footer.vatInfo}</p>
        </div>
      </div>
    </footer>
  )
}
