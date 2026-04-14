import 'server-only'
import { sql } from '@vercel/postgres'

// Inizializza la tabella se non esiste
export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS checkout_events (
      id SERIAL PRIMARY KEY,
      session_id TEXT UNIQUE NOT NULL,
      tier TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      delivery_notes TEXT DEFAULT '',
      marketing_consent BOOLEAN DEFAULT FALSE,
      terms_version TEXT NOT NULL,
      terms_accepted_at TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      user_agent TEXT DEFAULT '',
      amount_cents INTEGER NOT NULL,
      stripe_payment_status TEXT DEFAULT 'completed',

      -- Status invii (pending, sent, failed)
      email_user_status TEXT DEFAULT 'pending',
      email_user_error TEXT,
      email_internal_status TEXT DEFAULT 'pending',
      email_internal_error TEXT,
      email_daniele_status TEXT DEFAULT 'pending',
      email_daniele_error TEXT,
      cliq_status TEXT DEFAULT 'pending',
      cliq_error TEXT,

      -- Retry tracking
      retry_count INTEGER DEFAULT 0,
      last_retry_at TIMESTAMPTZ,

      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export interface CheckoutEvent {
  session_id: string
  tier: string
  full_name: string
  email: string
  phone: string
  address: string
  postal_code: string
  city: string
  province: string
  delivery_notes: string
  marketing_consent: boolean
  terms_version: string
  terms_accepted_at: string
  ip_address: string
  user_agent: string
  amount_cents: number
}

export async function saveCheckoutEvent(event: CheckoutEvent) {
  await initDb()
  await sql`
    INSERT INTO checkout_events (
      session_id, tier, full_name, email, phone,
      address, postal_code, city, province, delivery_notes,
      marketing_consent, terms_version, terms_accepted_at,
      ip_address, user_agent, amount_cents
    ) VALUES (
      ${event.session_id}, ${event.tier}, ${event.full_name}, ${event.email}, ${event.phone},
      ${event.address}, ${event.postal_code}, ${event.city}, ${event.province}, ${event.delivery_notes},
      ${event.marketing_consent}, ${event.terms_version}, ${event.terms_accepted_at},
      ${event.ip_address}, ${event.user_agent}, ${event.amount_cents}
    )
    ON CONFLICT (session_id) DO NOTHING
  `
}

export async function updateDeliveryStatus(
  sessionId: string,
  channel: 'email_user' | 'email_internal' | 'email_daniele' | 'cliq',
  status: 'sent' | 'failed',
  error?: string
) {
  const errorVal = error || null
  switch (channel) {
    case 'email_user':
      await sql`UPDATE checkout_events SET email_user_status = ${status}, email_user_error = ${errorVal}, updated_at = NOW() WHERE session_id = ${sessionId}`
      break
    case 'email_internal':
      await sql`UPDATE checkout_events SET email_internal_status = ${status}, email_internal_error = ${errorVal}, updated_at = NOW() WHERE session_id = ${sessionId}`
      break
    case 'email_daniele':
      await sql`UPDATE checkout_events SET email_daniele_status = ${status}, email_daniele_error = ${errorVal}, updated_at = NOW() WHERE session_id = ${sessionId}`
      break
    case 'cliq':
      await sql`UPDATE checkout_events SET cliq_status = ${status}, cliq_error = ${errorVal}, updated_at = NOW() WHERE session_id = ${sessionId}`
      break
  }
}

export async function getFailedDeliveries() {
  await initDb()
  const result = await sql`
    SELECT * FROM checkout_events
    WHERE (
      email_user_status = 'failed' OR
      email_internal_status = 'failed' OR
      email_daniele_status = 'failed' OR
      cliq_status = 'failed'
    )
    AND retry_count < 1
    ORDER BY created_at DESC
    LIMIT 50
  `
  return result.rows
}

export async function markRetried(sessionId: string) {
  await sql`
    UPDATE checkout_events
    SET retry_count = retry_count + 1, last_retry_at = NOW(), updated_at = NOW()
    WHERE session_id = ${sessionId}
  `
}

export async function getAllEvents(limit = 50) {
  await initDb()
  const result = await sql`
    SELECT * FROM checkout_events
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return result.rows
}
