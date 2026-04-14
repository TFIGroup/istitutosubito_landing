interface CheckoutConfirmationData {
  fullName: string
  tierName: string
  price: string
  orderId: string
  phone: string
  address: string
  postalCode: string
  city: string
  province: string
}

export function checkoutConfirmationHtml(data: CheckoutConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:#0A2540;padding:24px 32px;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">Istituto Subito</h1>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">La scuola dei tecnici riparatori. Powered by Subito Riparato, dal 2009.</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <h2 style="color:#0A2540;margin:0 0 8px;font-size:20px;">Iscrizione confermata</h2>
            <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px;">
              Ciao <strong>${data.fullName}</strong>,<br>
              hai completato l'iscrizione al corso <strong>${data.tierName}</strong>.
            </p>

            <!-- Riepilogo -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;border-radius:8px;padding:16px;margin:0 0 24px;">
              <tr><td style="padding:8px 16px;font-size:14px;color:#555;">Corso:</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#0A2540;">${data.tierName}</td></tr>
              <tr><td style="padding:8px 16px;font-size:14px;color:#555;">Totale:</td><td style="padding:8px 16px;font-size:14px;font-weight:600;color:#0A2540;">&euro;${data.price}</td></tr>
              <tr><td style="padding:8px 16px;font-size:14px;color:#555;">ID Ordine:</td><td style="padding:8px 16px;font-size:14px;color:#0A2540;font-family:monospace;">${data.orderId}</td></tr>
            </table>

            <!-- Prossimi step -->
            <h3 style="color:#0A2540;margin:0 0 12px;font-size:16px;">Prossimi passi</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:32px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#1E88E5;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;">1</span>
                </td>
                <td style="padding:8px 0 8px 8px;font-size:14px;color:#555;line-height:1.5;">
                  <strong>Email di conferma</strong> — questa email e' la tua ricevuta. Conservala.
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:32px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#1E88E5;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;">2</span>
                </td>
                <td style="padding:8px 0 8px 8px;font-size:14px;color:#555;line-height:1.5;">
                  <strong>Il Capotecnico ti contatta</strong> su WhatsApp al +39&nbsp;${data.phone} entro 24h per concordare il calendario delle lezioni.
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:32px;">
                  <span style="display:inline-block;width:24px;height:24px;background:#1E88E5;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;">3</span>
                </td>
                <td style="padding:8px 0 8px 8px;font-size:14px;color:#555;line-height:1.5;">
                  <strong>Spedizione kit hardware</strong> al tuo indirizzo: ${data.address}, ${data.postalCode} ${data.city} (${data.province}). Arrivo entro pochi giorni.
                </td>
              </tr>
            </table>

            <p style="color:#555;font-size:14px;line-height:1.6;margin:24px 0 0;">
              In allegato trovi i <strong>Termini e Condizioni accettati</strong> in formato PDF.
            </p>

            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

            <p style="color:#888;font-size:13px;margin:0;">
              Per qualsiasi domanda: <a href="mailto:info@istitutosubito.com" style="color:#1E88E5;">info@istitutosubito.com</a> — <a href="tel:+39389967650" style="color:#1E88E5;">+39 389 967 7650</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f9fa;padding:16px 32px;border-top:1px solid #eee;">
            <p style="color:#aaa;font-size:11px;margin:0;line-height:1.5;">
              CR Store S.r.l. — P.IVA IT08955511210 — REA NA-997450<br>
              Sede legale: Via R. Vastola, 5 — 80040 Poggiomarino (NA)
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

interface InternalNotificationData {
  fullName: string
  email: string
  phone: string
  tierName: string
  tier: string
  price: string
  orderId: string
  address: string
  postalCode: string
  city: string
  province: string
  deliveryNotes: string
  marketingConsent: boolean
  termsVersion: string
  ip: string
  timestamp: string
}

export function internalNotificationHtml(data: InternalNotificationData): string {
  return `
<h2>Nuova iscrizione completata (pagamento ricevuto)</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Tier:</td><td>${data.tier.toUpperCase()} - ${data.tierName}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Prezzo:</td><td>&euro;${data.price}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Nome:</td><td>${data.fullName}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${data.email}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Telefono:</td><td>+39 ${data.phone}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Indirizzo:</td><td>${data.address}, ${data.postalCode} ${data.city} (${data.province})</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Note consegna:</td><td>${data.deliveryNotes || '-'}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Marketing:</td><td>${data.marketingConsent ? 'Si' : 'No'}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Termini v.:</td><td>${data.termsVersion}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">IP:</td><td>${data.ip}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Timestamp:</td><td>${data.timestamp}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Stripe ID:</td><td>${data.orderId}</td></tr>
</table>
<p><a href="https://dashboard.stripe.com/search?query=${data.orderId}">Apri in Stripe Dashboard</a></p>`
}
