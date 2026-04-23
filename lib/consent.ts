'use client'

export type ConsentLevel = 'all' | 'necessary' | null

const COOKIE_NAME = 'cookie_consent'
export const CONSENT_COOKIE_NAME = COOKIE_NAME
export const CONSENT_CHANGE_EVENT = 'cookie-consent-changed'

export function getConsent(): ConsentLevel {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  if (!match) return null
  const val = decodeURIComponent(match[1])
  if (val === 'all' || val === 'necessary') return val
  return null
}

export function notifyConsentChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

export function subscribeConsent(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener(CONSENT_CHANGE_EVENT, cb)
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, cb)
}
