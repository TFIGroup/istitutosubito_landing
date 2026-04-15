import { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'

export const metadata: Metadata = {
  title: 'Cookie Policy - Istituto Subito',
  description: 'Informativa sull\'uso dei cookie sul sito istitutosubito.com di CR Store S.r.l.',
}

export default function CookiePage() {
  return (
    <LegalLayout>
      <h1>Cookie Policy</h1>
      <p><strong>Ultimo aggiornamento: 14 gennaio 2026</strong></p>

      <h2>Cosa sono i cookie</h2>
      <p>I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell&apos;utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva.</p>

      <h2>Cookie utilizzati su questo sito</h2>

      <h3>Cookie tecnici (sempre attivi)</h3>
      <p>Necessari al funzionamento del sito, non richiedono consenso:</p>
      <ul>
        <li>Cookie di sessione</li>
        <li>Cookie per la preferenza lingua</li>
        <li>Cookie di sicurezza Cloudflare/Vercel</li>
      </ul>

      <h3>Cookie analitici</h3>
      <p>Utilizzati per raccogliere informazioni anonime sull&apos;uso del sito:</p>
      <ul>
        <li><strong>Google Analytics 4</strong> (anonimizzato)</li>
      </ul>

      <h3>Cookie di marketing/profilazione (richiedono consenso)</h3>
      <p>Utilizzati per mostrare annunci pubblicitari personalizzati:</p>
      <ul>
        <li><strong>Meta Pixel</strong> (Facebook/Instagram)</li>
        <li><strong>Google Ads remarketing</strong></li>
      </ul>

      <h3>Cookie di terze parti</h3>
      <ul>
        <li><strong>Stripe</strong>: per la gestione dei pagamenti durante il checkout</li>
      </ul>

      <h2>Gestione del consenso</h2>
      <p>Al primo accesso al sito, viene mostrato un banner che permette di:</p>
      <ul>
        <li>Accettare tutti i cookie</li>
        <li>Rifiutare i cookie non essenziali</li>
        <li>Personalizzare le preferenze</li>
      </ul>
      <p>Il consenso puo&apos; essere modificato in qualsiasi momento cliccando il link &quot;Gestisci cookie&quot; nel footer.</p>

      <h2>Disabilitare i cookie dal browser</h2>
      <p>L&apos;utente puo&apos; disabilitare i cookie modificando le impostazioni del browser:</p>
      <ul>
        <li><strong>Chrome</strong>: Impostazioni &rarr; Privacy e sicurezza &rarr; Cookie</li>
        <li><strong>Firefox</strong>: Impostazioni &rarr; Privacy e sicurezza</li>
        <li><strong>Safari</strong>: Preferenze &rarr; Privacy</li>
        <li><strong>Edge</strong>: Impostazioni &rarr; Cookie e autorizzazioni sito</li>
      </ul>

      <h2>Titolare del Trattamento</h2>
      <p>CR Store S.r.l. · P.IVA IT08955511210<br />
      Email: <a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a></p>
      <p>Per maggiori informazioni vedi la <a href="/privacy">Privacy Policy</a> completa.</p>
    </LegalLayout>
  )
}
