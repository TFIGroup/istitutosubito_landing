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
      containerClasses="fixed bottom-0 left-0 right-0 z-[100] bg-[var(--navy)] text-white p-4 md:p-5 shadow-2xl"
      contentClasses="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6"
      buttonWrapperClasses="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0"
      buttonClasses="bg-[var(--electric-blue)] hover:bg-[var(--electric-blue-hover)] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer text-sm w-full sm:w-auto"
      declineButtonClasses="border border-white/30 hover:bg-white/10 text-white font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer text-sm w-full sm:w-auto"
      ariaAcceptLabel="Accetto tutti i cookie"
      ariaDeclineLabel="Accetto solo i cookie necessari"
    >
      <p className="text-sm leading-relaxed flex-1">
        Questo sito utilizza cookie tecnici e di profilazione. Proseguendo accetti l&apos;uso dei cookie.{' '}
        <Link href="/cookie" className="underline hover:no-underline text-white/90">
          Cookie Policy
        </Link>
      </p>
    </CookieConsent>
  )
}
