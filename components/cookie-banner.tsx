'use client'

import CookieConsent from 'react-cookie-consent'
import Link from 'next/link'
import { CONSENT_COOKIE_NAME, notifyConsentChange } from '@/lib/consent'

export function CookieBanner() {
  return (
    <CookieConsent
      cookieName={CONSENT_COOKIE_NAME}
      cookieValue="all"
      declineCookieValue="necessary"
      enableDeclineButton
      expires={180}
      buttonText="Accetto"
      declineButtonText="Solo necessari"
      onAccept={() => notifyConsentChange()}
      onDecline={() => notifyConsentChange()}
      disableStyles
      containerClasses="fixed inset-x-0 bottom-0 z-[100] bg-[var(--navy)] text-white px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:px-6 md:pt-4 md:pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-2xl"
      contentClasses="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
      buttonWrapperClasses="flex flex-row gap-2 w-full md:w-auto shrink-0"
      buttonClasses="flex-1 md:flex-none bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer text-xs md:text-sm md:px-5 md:py-2"
      declineButtonClasses="flex-1 md:flex-none border border-white/30 hover:bg-white/10 text-white/90 font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer text-xs md:text-sm md:px-5 md:py-2"
      ariaAcceptLabel="Accetto tutti i cookie"
      ariaDeclineLabel="Accetto solo i cookie necessari"
    >
      <p className="text-xs md:text-sm leading-snug flex-1">
        Questo sito utilizza cookie tecnici e di profilazione. Proseguendo accetti l&apos;uso dei cookie.{' '}
        <Link href="/cookie" className="underline hover:no-underline text-white/90 whitespace-nowrap">
          Cookie Policy
        </Link>
      </p>
    </CookieConsent>
  )
}
