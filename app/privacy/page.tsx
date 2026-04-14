import { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'
import { TERMS_VERSION, TERMS_LAST_UPDATED } from '@/lib/terms-version'

export const metadata: Metadata = {
  title: 'Privacy Policy — Istituto Subito',
  description: 'Informativa sulla privacy e trattamento dati personali di CR Store S.r.l. (Istituto Subito).',
}

export default function PrivacyPage() {
  return (
    <LegalLayout>
      <h1>Privacy Policy</h1>
      <p><strong>Versione {TERMS_VERSION} — Ultimo aggiornamento: {TERMS_LAST_UPDATED}</strong></p>

      <h2>1. Titolare del Trattamento</h2>
      <p>Il Titolare del trattamento dei dati personali e&apos;:</p>
      <p>
        <strong>CR Store S.r.l.</strong><br />
        Sede legale: Via R. Vastola, 5 - 80040 Poggiomarino (NA)<br />
        Sede operativa: Via S. D&apos;Alessandro, 61 - 84014 Nocera Inferiore (SA)<br />
        P.IVA: IT08955511210<br />
        REA: NA-997450<br />
        Email: <a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a><br />
        Telefono: <a href="tel:+39389967650">+39 389 967 7650</a>
      </p>
      <p>CR Store S.r.l. opera con i marchi commerciali &quot;Istituto Subito&quot; e &quot;Subito Riparato&quot;.</p>

      <h2>2. Tipologie di Dati Raccolti</h2>
      <p>Raccogliamo le seguenti tipologie di dati personali:</p>
      <h3>Dati forniti volontariamente dall&apos;Utente:</h3>
      <ul>
        <li>Nome e cognome</li>
        <li>Indirizzo email</li>
        <li>Numero di telefono</li>
        <li>Citta&apos; di residenza</li>
        <li>Informazioni relative all&apos;interesse formativo</li>
        <li>Dati di pagamento (gestiti tramite Stripe, vedi sezione 7)</li>
      </ul>
      <h3>Dati raccolti automaticamente:</h3>
      <ul>
        <li>Indirizzo IP</li>
        <li>Tipo di browser e dispositivo</li>
        <li>Pagine visitate e tempo di permanenza</li>
        <li>Cookie tecnici e di profilazione (vedi <a href="/cookie">Cookie Policy</a>)</li>
      </ul>

      <h2>3. Finalita&apos; del Trattamento</h2>
      <p>I dati personali sono trattati per le seguenti finalita&apos;:</p>
      <ol type="a">
        <li><strong>Erogazione del servizio formativo</strong> — gestione iscrizioni, fornitura del corso, rilascio della licenza professionale</li>
        <li><strong>Gestione contrattuale e amministrativa</strong> — fatturazione, adempimenti fiscali, supporto post-vendita</li>
        <li><strong>Comunicazioni di servizio</strong> — invio di informazioni operative relative al corso, modifiche orari, materiali didattici</li>
        <li><strong>Marketing diretto</strong> (previo consenso esplicito) — invio di comunicazioni promozionali su nuovi corsi e iniziative</li>
        <li><strong>Adempimento obblighi di legge</strong> — risposta a richieste delle autorita&apos;, conservazione dati fiscali</li>
      </ol>

      <h2>4. Base Giuridica del Trattamento</h2>
      <p>Le basi giuridiche del trattamento sono:</p>
      <ul>
        <li><strong>Esecuzione del contratto</strong> (art. 6.1.b GDPR) per le finalita&apos; a, b, c</li>
        <li><strong>Consenso dell&apos;Utente</strong> (art. 6.1.a GDPR) per la finalita&apos; d</li>
        <li><strong>Obbligo legale</strong> (art. 6.1.c GDPR) per la finalita&apos; e</li>
      </ul>

      <h2>5. Modalita&apos; del Trattamento</h2>
      <p>Il trattamento avviene con strumenti elettronici e cartacei, con misure di sicurezza adeguate per garantire integrita&apos;, riservatezza e disponibilita&apos; dei dati.</p>
      <p>I dati sono conservati su server ubicati nell&apos;Unione Europea (infrastruttura Vercel/Stripe) o, ove necessario, su server extra-UE in conformita&apos; a clausole contrattuali standard approvate dalla Commissione Europea.</p>

      <h2>6. Periodo di Conservazione</h2>
      <p>I dati sono conservati per il tempo strettamente necessario alle finalita&apos; per cui sono stati raccolti:</p>
      <ul>
        <li><strong>Dati contrattuali</strong>: 10 anni dalla fine del rapporto (obbligo fiscale)</li>
        <li><strong>Dati di marketing</strong>: fino a revoca del consenso</li>
        <li><strong>Dati di navigazione e cookie</strong>: secondo i termini indicati nella <a href="/cookie">Cookie Policy</a></li>
        <li><strong>Lead non convertiti</strong>: massimo 24 mesi</li>
      </ul>

      <h2>7. Soggetti Terzi e Trasferimento Dati</h2>
      <p>I dati possono essere comunicati a:</p>
      <ul>
        <li><strong>Stripe Payments Europe Ltd</strong> (Irlanda) — per la gestione dei pagamenti</li>
        <li><strong>Vercel Inc.</strong> (USA, con clausole contrattuali standard UE) — per l&apos;hosting del sito</li>
        <li><strong>Google LLC</strong> (USA, clausole standard UE) — per analytics e servizi pubblicitari</li>
        <li><strong>Meta Platforms Ireland Ltd</strong> — per analytics, pixel di conversione e comunicazioni pubblicitarie</li>
        <li><strong>Consulenti fiscali, legali e amministrativi</strong> — per adempimenti obbligatori</li>
      </ul>
      <p>I dati non sono ceduti a terzi per finalita&apos; commerciali.</p>

      <h2>8. Diritti dell&apos;Interessato</h2>
      <p>In conformita&apos; al GDPR (artt. 15-22), l&apos;Utente ha diritto a:</p>
      <ul>
        <li><strong>Accesso</strong> ai propri dati</li>
        <li><strong>Rettifica</strong> di dati inesatti</li>
        <li><strong>Cancellazione</strong> (&quot;diritto all&apos;oblio&quot;)</li>
        <li><strong>Limitazione</strong> del trattamento</li>
        <li><strong>Portabilita&apos;</strong> dei dati</li>
        <li><strong>Opposizione</strong> al trattamento</li>
        <li><strong>Revoca del consenso</strong> in qualsiasi momento</li>
        <li><strong>Reclamo</strong> all&apos;Autorita&apos; Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>)</li>
      </ul>
      <p>Per esercitare i diritti, scrivere a: <strong><a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a></strong></p>
      <p>Le richieste sono evase entro 30 giorni.</p>

      <h2>9. Modifiche alla Privacy Policy</h2>
      <p>CR Store S.r.l. si riserva il diritto di modificare la presente Privacy Policy in qualsiasi momento. Le modifiche saranno comunicate sul sito.</p>

      <hr />

      <p>Per qualsiasi dubbio o richiesta: <strong><a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a></strong></p>
    </LegalLayout>
  )
}
