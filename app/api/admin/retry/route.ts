import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminAuth } from '@/lib/admin-auth'
import { getFailedDeliveries, updateDeliveryStatus, markRetried } from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { checkoutConfirmationHtml, internalNotificationHtml } from '@/lib/email-templates'
import { getTierById } from '@/lib/tiers'

export async function POST(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
  }

  try {
    const failed = await getFailedDeliveries()
    const results: Array<{ sessionId: string; channel: string; result: string }> = []

    for (const row of failed) {
      const sessionId = row.session_id as string
      const tier = row.tier as string
      const tierData = getTierById(tier)
      const tierName = tierData?.name || tier.toUpperCase()
      const fullName = row.full_name as string
      const email = row.email as string
      const phone = row.phone as string
      const amountTotal = ((row.amount_cents as number) / 100).toFixed(0)

      // Retry email utente
      if (row.email_user_status === 'failed' && email) {
        try {
          await sendEmail({
            to: email,
            subject: 'Iscrizione confermata - Istituto Subito',
            html: checkoutConfirmationHtml({
              fullName, tierName, price: amountTotal, orderId: sessionId,
              phone, address: row.address as string, postalCode: row.postal_code as string,
              city: row.city as string, province: row.province as string,
            }),
          })
          await updateDeliveryStatus(sessionId, 'email_user', 'sent')
          results.push({ sessionId, channel: 'email_user', result: 'sent' })
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown'
          results.push({ sessionId, channel: 'email_user', result: `failed: ${msg}` })
        }
      }

      // Retry email interna
      if (row.email_internal_status === 'failed') {
        try {
          await sendEmail({
            to: 'info@istitutosubito.com',
            subject: `Nuova iscrizione - ${fullName} - ${tier.toUpperCase()}`,
            html: internalNotificationHtml({
              fullName, email, phone, tierName, tier, price: amountTotal,
              orderId: sessionId, address: row.address as string,
              postalCode: row.postal_code as string, city: row.city as string,
              province: row.province as string, deliveryNotes: row.delivery_notes as string,
              marketingConsent: row.marketing_consent as boolean,
              termsVersion: row.terms_version as string, ip: row.ip_address as string,
              timestamp: row.terms_accepted_at as string,
            }),
          })
          await updateDeliveryStatus(sessionId, 'email_internal', 'sent')
          results.push({ sessionId, channel: 'email_internal', result: 'sent' })
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown'
          results.push({ sessionId, channel: 'email_internal', result: `failed: ${msg}` })
        }
      }

      // Retry email Daniele
      if (row.email_daniele_status === 'failed') {
        try {
          await sendEmail({
            to: 'vietridaniele@gmail.com',
            subject: `CONGRATULAZIONI - €${amountTotal} incassato`,
            html: `<div style="font-family:sans-serif;text-align:center;padding:40px 20px;">
              <h1>🎉 CONGRATULAZIONI!</h1>
              <p style="font-size:36px;font-weight:800;color:#1E88E5;">&euro;${amountTotal} incassato</p>
              <p>${fullName} — ${tier.toUpperCase()} ${tierName}</p>
            </div>`,
          })
          await updateDeliveryStatus(sessionId, 'email_daniele', 'sent')
          results.push({ sessionId, channel: 'email_daniele', result: 'sent' })
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown'
          results.push({ sessionId, channel: 'email_daniele', result: `failed: ${msg}` })
        }
      }

      // Retry Cliq
      if (row.cliq_status === 'failed') {
        const zohoUrl = process.env.ZOHO_CLIQ_WEBHOOK_URL
        if (zohoUrl) {
          try {
            await fetch(zohoUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                text: `🎆 VENDITA (retry) — €${amountTotal} — ${fullName} — ${tier.toUpperCase()}`,
              }),
            })
            await updateDeliveryStatus(sessionId, 'cliq', 'sent')
            results.push({ sessionId, channel: 'cliq', result: 'sent' })
          } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown'
            results.push({ sessionId, channel: 'cliq', result: `failed: ${msg}` })
          }
        }
      }

      await markRetried(sessionId)
    }

    return NextResponse.json({
      processed: failed.length,
      results,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
