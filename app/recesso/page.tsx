import { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'
import { TERMS_VERSION, TERMS_LAST_UPDATED } from '@/lib/terms-version'

export const metadata: Metadata = {
  title: 'Diritto di Recesso — Istituto Subito',
  description: 'Informativa sul diritto di recesso e modulo tipo per i corsi di CR Store S.r.l. (Istituto Subito).',
}

export default function RecessoPage() {
  return (
    <LegalLayout>
      <h1>Diritto di Recesso</h1>
      <p><strong>Versione {TERMS_VERSION} — Ultimo aggiornamento: {TERMS_LAST_UPDATED}</strong></p>

      <h2>Termini del recesso</h2>
      <p>L&apos;Utente che agisce in qualita&apos; di consumatore ha diritto di recedere dal contratto entro <strong>14 giorni</strong> dalla data di conferma dell&apos;iscrizione, senza dover fornire alcuna motivazione, ai sensi degli artt. 52 e seguenti del D.lgs 206/2005 (Codice del Consumo).</p>

      <h2>Modalita&apos; di esercizio</h2>
      <p>Per esercitare il diritto di recesso, e&apos; sufficiente inviare una comunicazione scritta entro 14 giorni a:</p>
      <p>
        <strong>Email:</strong> <a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a><br />
        <strong>Posta:</strong> CR Store S.r.l., Via R. Vastola, 5 - 80040 Poggiomarino (NA)
      </p>
      <p>E&apos; possibile utilizzare il modulo tipo riportato in fondo alla pagina, ma non e&apos; obbligatorio.</p>

      <h2>Effetti del recesso</h2>
      <p>In caso di recesso valido:</p>
      <ul>
        <li>Il Venditore rimborsera&apos; tutti i pagamenti ricevuti entro <strong>14 giorni</strong> dalla comunicazione, mediante lo stesso mezzo di pagamento utilizzato dall&apos;Utente</li>
        <li>Eventuali costi di spedizione del kit hardware sono a carico dell&apos;Utente in caso di recesso</li>
        <li>L&apos;Utente deve restituire eventuale materiale ricevuto entro 14 giorni</li>
      </ul>

      <h2>Eccezioni al recesso (importante)</h2>
      <p>Ai sensi dell&apos;art. 59 del Codice del Consumo, il diritto di recesso <strong>NON si applica</strong> se:</p>
      <ul>
        <li>Lo studente ha gia&apos; iniziato la fruizione del servizio formativo (prima lezione live svolta) E ha espressamente accettato di rinunciare al recesso al momento dell&apos;iscrizione</li>
      </ul>
      <p>In tal caso, resta comunque valida la <strong>garanzia commerciale &quot;Prima Lezione di Prova&quot;</strong>: rimborso totale entro 48 ore dalla prima lezione se non convince.</p>

      <h2>Garanzia commerciale aggiuntiva</h2>
      <p>Oltre al recesso legale di 14 giorni, Istituto Subito offre la &quot;<strong>Garanzia Prima Lezione di Prova</strong>&quot;:</p>
      <blockquote>
        <p>Se la prima lezione live col Capotecnico non ti convince, hai 48 ore per richiedere il rimborso totale, senza domande.</p>
      </blockquote>
      <p>Questa garanzia si applica anche se hai gia&apos; fruito della prima lezione, ed e&apos; un&apos;estensione del diritto previsto per legge.</p>

      <h2>Modulo Tipo di Recesso</h2>
      <p>Compila e invia a <a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a>:</p>
      <pre><code>{`Spett.le CR Store S.r.l.
Via R. Vastola, 5 - 80040 Poggiomarino (NA)

Oggetto: Comunicazione di Recesso

Con la presente notifico il recesso dal contratto di iscrizione al
corso _____________________ stipulato in data _____________________

Nome e Cognome: _____________________
Email iscrizione: _____________________
Numero ordine: _____________________
Data: _____________________
Firma: _____________________`}</code></pre>

      <h2>Contatti</h2>
      <p>Per qualsiasi chiarimento sul diritto di recesso:</p>
      <p>
        Email: <strong><a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a></strong><br />
        Telefono: <strong><a href="tel:+39389967650">+39 389 967 7650</a></strong>
      </p>
    </LegalLayout>
  )
}
