import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { content } from '@/lib/content'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: content.meta.keywords,
  generator: 'v0.app',
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.title,
    description: content.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A2540',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="it" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <head>
        {/* Meta Pixel */}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

// Tracking helper functions - import these where needed
export function trackInitiateCheckout(tier: string, value: number) {
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: (action: string, event: string, data?: Record<string, unknown>) => void }).fbq) {
    (window as unknown as { fbq: (action: string, event: string, data?: Record<string, unknown>) => void }).fbq('track', 'InitiateCheckout', {
      content_name: `Corso ${tier.toUpperCase()}`,
      value: value / 100,
      currency: 'EUR',
    })
  }

  // GA4
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (action: string, event: string, data?: Record<string, unknown>) => void }).gtag) {
    (window as unknown as { gtag: (action: string, event: string, data?: Record<string, unknown>) => void }).gtag('event', 'begin_checkout', {
      value: value / 100,
      currency: 'EUR',
      items: [{ item_name: `Corso ${tier.toUpperCase()}` }],
    })
  }
}

export function trackPurchase(tier: string, value: number, transactionId: string) {
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: (action: string, event: string, data?: Record<string, unknown>) => void }).fbq) {
    (window as unknown as { fbq: (action: string, event: string, data?: Record<string, unknown>) => void }).fbq('track', 'Purchase', {
      content_name: `Corso ${tier.toUpperCase()}`,
      value: value / 100,
      currency: 'EUR',
    })
  }

  // GA4
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (action: string, event: string, data?: Record<string, unknown>) => void }).gtag) {
    (window as unknown as { gtag: (action: string, event: string, data?: Record<string, unknown>) => void }).gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value / 100,
      currency: 'EUR',
      items: [{ item_name: `Corso ${tier.toUpperCase()}` }],
    })
  }
}

export function trackLead(tier: string) {
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: (action: string, event: string, data?: Record<string, unknown>) => void }).fbq) {
    (window as unknown as { fbq: (action: string, event: string, data?: Record<string, unknown>) => void }).fbq('track', 'Lead', {
      content_name: `Interesse ${tier.toUpperCase()}`,
    })
  }

  // GA4
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (action: string, event: string, data?: Record<string, unknown>) => void }).gtag) {
    (window as unknown as { gtag: (action: string, event: string, data?: Record<string, unknown>) => void }).gtag('event', 'generate_lead', {
      value: 0,
      currency: 'EUR',
    })
  }
}
