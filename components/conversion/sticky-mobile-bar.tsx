'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { content } from '@/lib/content'

interface StickyMobileBarProps {
  onCheckout: () => void
  isLoading?: boolean
}

export function StickyMobileBar({ onCheckout, isLoading }: StickyMobileBarProps) {
  const { stickyBar } = content
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393XXXXXXXXX'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Ciao Istituto Subito, vi contatto dal sito e vorrei informazioni sul corso')}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border p-3 safe-area-inset-bottom">
      <div className="flex gap-3">
        <Button
          onClick={onCheckout}
          disabled={isLoading}
          className="flex-1 bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white font-semibold"
        >
          {isLoading ? 'Caricamento...' : `${stickyBar.cta} ${stickyBar.price}`}
        </Button>
        <Button
          asChild
          variant="outline"
          className="bg-[var(--whatsapp-green)] hover:bg-[var(--whatsapp-green-hover)] text-white border-0"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5" />
          </a>
        </Button>
      </div>
    </div>
  )
}
