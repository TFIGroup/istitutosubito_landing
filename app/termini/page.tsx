import { Metadata } from 'next'
import { LegalLayout } from '@/components/legal-layout'

export const metadata: Metadata = {
  title: 'Termini e Condizioni — Istituto Subito',
  description: 'Condizioni generali di vendita dei servizi formativi di CR Store S.r.l. (Istituto Subito).',
}

export default function TerminiPage() {
  return (
    <LegalLayout>
      <h1>Termini e Condizioni di Vendita</h1>
      <p><strong>Ultimo aggiornamento: 14 gennaio 2026</strong></p>

      <h2>1. Premessa</h2>
      <p>Le presenti Condizioni Generali di Vendita disciplinano l&apos;acquisto dei servizi formativi offerti tramite il sito istitutosubito.com (di seguito &quot;Sito&quot;) da parte di CR Store S.r.l. (di seguito &quot;Venditore&quot; o &quot;Istituto Subito&quot;).</p>
      <p>
        <strong>Venditore:</strong> CR Store S.r.l.<br />
        Sede legale: Via R. Vastola, 5 - 80040 Poggiomarino (NA)<br />
        P.IVA: IT08955511210 — REA: NA-997450<br />
        Email: <a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a> — Tel: <a href="tel:+39389967650">+39 389 967 7650</a>
      </p>

      <h2>2. Oggetto</h2>
      <p>Il Venditore offre corsi di formazione professionale a distanza per tecnici riparatori smartphone, articolati su tre livelli (LV1, LV2, LV3), con rilascio di Licenza Professionale verificabile a seguito del superamento dell&apos;esame finale.</p>

      <h2>3. Modalita&apos; di Erogazione del Servizio</h2>
      <p>Il corso si svolge in modalita&apos; videoconferenza live 1-to-1 con un docente qualificato (denominato &quot;Capotecnico&quot;). Il calendario delle lezioni e&apos; concordato individualmente tra studente e docente. Il kit hardware professionale viene spedito al domicilio dell&apos;iscritto.</p>

      <h2>4. Prezzi e Pagamento</h2>
      <p>I prezzi indicati sul Sito si intendono in Euro e includono IVA se dovuta. Il pagamento avviene tramite la piattaforma Stripe (carta di credito, debito, Klarna per pagamento rateale).</p>
      <p>E&apos; possibile, in alternativa, riservare il proprio posto con un acconto, contattando preventivamente il Venditore. Il saldo verra&apos; concordato successivamente.</p>

      <h2>5. Conferma dell&apos;Ordine</h2>
      <p>A seguito del pagamento, l&apos;Utente ricevera&apos; email di conferma con i dettagli dell&apos;iscrizione. Il Capotecnico contattera&apos; lo studente entro 24-48 ore lavorative per definire il calendario delle lezioni.</p>

      <h2>6. Diritto di Recesso</h2>
      <p>L&apos;Utente consumatore ha diritto di recedere dal contratto entro 14 giorni dalla conferma dell&apos;iscrizione, senza dover fornire motivazione, secondo quanto previsto dal D.lgs 206/2005 (Codice del Consumo).</p>
      <p>Per i dettagli completi, consultare la pagina dedicata: <a href="/recesso">Diritto di Recesso</a>.</p>

      <h2>7. Garanzia &quot;Prima Lezione di Prova&quot;</h2>
      <p>Oltre al diritto di recesso legale, il Venditore offre una garanzia commerciale aggiuntiva: la <strong>prima lezione live col Capotecnico e&apos; di prova</strong>. Se non convince, l&apos;Utente puo&apos; richiedere il rimborso totale entro 48 ore dalla prima lezione, scrivendo a <a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a>.</p>

      <h2>8. Esame e Licenza</h2>
      <p>Al termine del percorso, lo studente sostiene un esame teorico-pratico davanti all&apos;Ente di Certificazione Tecnica Subito Riparato. Il superamento dell&apos;esame da&apos; diritto al rilascio della Licenza Professionale di livello corrispondente, valida 3 anni e rinnovabile.</p>
      <p>L&apos;esito dell&apos;esame e&apos; insindacabile. In caso di mancato superamento, lo studente puo&apos; ripetere l&apos;esame nei termini stabiliti dall&apos;Ente.</p>

      <h2>9. Obblighi dello Studente</h2>
      <p>Lo studente si impegna a:</p>
      <ul>
        <li>Partecipare attivamente alle lezioni concordate</li>
        <li>Custodire il kit hardware ricevuto in comodato d&apos;uso (LV1)</li>
        <li>Non cedere a terzi le credenziali di accesso</li>
        <li>Non registrare/diffondere il contenuto delle lezioni live senza autorizzazione</li>
      </ul>

      <h2>10. Limitazioni di Responsabilita&apos;</h2>
      <p>Il Venditore non garantisce risultati economici specifici post-corso. La capacita&apos; di trovare lavoro o avviare attivita&apos; autonoma dipende da impegno, capacita&apos; personali e condizioni di mercato.</p>
      <p>I dati statistici riportati sul Sito (es. percentuali di occupazione dei diplomati) si riferiscono ai diplomati passati e non costituiscono promessa di risultato.</p>

      <h2>11. Foro Competente</h2>
      <p>Per qualsiasi controversia derivante dalla presente, il foro competente e&apos; quello del Consumatore (luogo di residenza o domicilio elettivo) o, in subordine, il Foro di Nocera Inferiore.</p>

      <h2>12. Modifiche</h2>
      <p>Il Venditore si riserva il diritto di modificare le presenti Condizioni in qualsiasi momento. Le modifiche si applicheranno solo agli ordini successivi alla pubblicazione.</p>

      <hr />

      <p>Per chiarimenti: <strong><a href="mailto:info@istitutosubito.com">info@istitutosubito.com</a></strong> — Tel. <strong><a href="tel:+39389967650">+39 389 967 7650</a></strong></p>
    </LegalLayout>
  )
}
