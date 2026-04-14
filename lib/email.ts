import 'server-only'
import nodemailer from 'nodemailer'

const transporter = (() => {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || '465')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    console.warn('⚠ SMTP non configurato — le email non verranno inviate.')
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
})()

const FROM = process.env.SMTP_FROM || 'Istituto Subito <noreply@subitoriparato.com>'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>
}

export async function sendEmail(options: SendEmailOptions) {
  if (!transporter) {
    console.warn('SMTP non configurato, email non inviata:', options.subject)
    return
  }
  await transporter.sendMail({
    from: FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  })
}

// Notifica interna quando un utente compila il form (pre-pagamento)
export async function sendInternalNotification(data: {
  tier: string
  fullName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  province: string
  deliveryNotes?: string
  marketingConsent: boolean
  timestamp: string
  ip: string
  userAgent: string
  termsVersion: string
  sessionId: string
}) {
  const html = `
    <h2>Nuovo checkout iniziato</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Tier:</td><td>${data.tier.toUpperCase()}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Nome:</td><td>${data.fullName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${data.email}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Telefono:</td><td>+39 ${data.phone}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Indirizzo:</td><td>${data.address}, ${data.postalCode} ${data.city} (${data.province})</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Note:</td><td>${data.deliveryNotes || '-'}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Marketing:</td><td>${data.marketingConsent ? 'Si' : 'No'}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Termini v.:</td><td>${data.termsVersion}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">IP:</td><td>${data.ip}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Timestamp:</td><td>${data.timestamp}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Session:</td><td>${data.sessionId}</td></tr>
    </table>
    <p><a href="https://dashboard.stripe.com/search?query=${data.sessionId}">Apri in Stripe Dashboard</a></p>
  `

  await sendEmail({
    to: 'info@istitutosubito.com',
    subject: `Nuovo checkout iniziato - ${data.fullName} - ${data.tier.toUpperCase()}`,
    html,
  })
}
