import 'server-only'
import { NextRequest } from 'next/server'

/**
 * Verifica che la richiesta abbia l'API key admin corretta.
 * Header: Authorization: Bearer <ADMIN_API_KEY>
 */
export function verifyAdminAuth(request: NextRequest): boolean {
  const key = process.env.ADMIN_API_KEY
  if (!key) return false

  const auth = request.headers.get('authorization')
  if (!auth) return false

  const token = auth.replace('Bearer ', '').trim()
  // Confronto a tempo costante per evitare timing attacks
  if (token.length !== key.length) return false

  let mismatch = 0
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ key.charCodeAt(i)
  }
  return mismatch === 0
}
