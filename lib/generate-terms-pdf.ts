import 'server-only'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

interface TermsPdfData {
  fullName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  province: string
  tierName: string
  tier: string
  price: string
  orderId: string
  timestamp: string
  ip: string
  termsVersion: string
}

export async function generateTermsPdf(data: TermsPdfData): Promise<Buffer> {
  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontSize = 10
  const lineHeight = 14
  const margin = 50
  const navy = rgb(0.039, 0.145, 0.251) // #0A2540
  const gray = rgb(0.4, 0.4, 0.4)

  // Helper per aggiungere pagina e scrivere testo
  function addPage() {
    const page = pdf.addPage([595, 842]) // A4
    return page
  }

  function drawFooter(page: ReturnType<typeof addPage>) {
    const footerText = 'CR Store S.r.l. - P.IVA IT08955511210 - REA NA-997450'
    page.drawText(footerText, {
      x: margin,
      y: 30,
      size: 7,
      font,
      color: gray,
    })
  }

  // Formatta timestamp in italiano
  const date = new Date(data.timestamp)
  const mesi = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre']
  const timestampIt = `${date.getDate()} ${mesi[date.getMonth()]} ${date.getFullYear()} alle ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')} CET`

  // ===== PAGINA 1 — Riepilogo iscrizione =====
  const p1 = addPage()
  let y = 792

  p1.drawText('ISTITUTO SUBITO', { x: margin, y, size: 18, font: fontBold, color: navy })
  y -= 16
  p1.drawText('La scuola dei tecnici riparatori. Powered by Subito Riparato, dal 2009.', { x: margin, y, size: 8, font, color: gray })
  y -= 40

  p1.drawText('Conferma Iscrizione', { x: margin, y, size: 16, font: fontBold, color: navy })
  y -= 24
  p1.drawText(data.tierName, { x: margin, y, size: 14, font: fontBold, color: navy })
  y -= 30

  // Dati utente
  const fields = [
    ['Nome:', data.fullName],
    ['Email:', data.email],
    ['Telefono:', `+39 ${data.phone}`],
    ['Indirizzo spedizione:', `${data.address}, ${data.postalCode} ${data.city} (${data.province})`],
    ['Corso:', `${data.tier.toUpperCase()} - ${data.tierName}`],
    ['Prezzo:', `EUR ${data.price}`],
    ['ID Transazione Stripe:', data.orderId],
    ['Data pagamento:', timestampIt],
    ['Versione termini:', data.termsVersion],
  ]

  for (const [label, value] of fields) {
    p1.drawText(label, { x: margin, y, size: fontSize, font: fontBold, color: navy })
    p1.drawText(value, { x: margin + 160, y, size: fontSize, font, color: gray })
    y -= lineHeight + 4
  }

  drawFooter(p1)

  // ===== PAGINA 2-3 — Termini accettati =====
  const termsText = `TERMINI E CONDIZIONI ACCETTATI AL MOMENTO DEL CHECKOUT

Versione: ${data.termsVersion}
Accettati il: ${timestampIt}
IP di accettazione: ${data.ip}
Utente: ${data.fullName} (${data.email})

---

TERMINI E CONDIZIONI DI VENDITA

1. PREMESSA
Le presenti Condizioni Generali di Vendita disciplinano l'acquisto dei servizi formativi offerti tramite il sito istitutosubito.com da parte di CR Store S.r.l.

Venditore: CR Store S.r.l.
Sede legale: Via R. Vastola, 5 - 80040 Poggiomarino (NA)
P.IVA: IT08955511210 - REA: NA-997450
Email: info@istitutosubito.com - Tel: +39 389 967 7650

2. OGGETTO
Il Venditore offre corsi di formazione professionale a distanza per tecnici riparatori smartphone, articolati su tre livelli (LV1, LV2, LV3), con rilascio di Licenza Professionale verificabile a seguito del superamento dell'esame finale.

3. MODALITA' DI EROGAZIONE
Il corso si svolge in modalita' videoconferenza live 1-to-1 con un docente qualificato (denominato "Capotecnico"). Il calendario delle lezioni e' concordato individualmente tra studente e docente. Il kit hardware professionale viene spedito al domicilio dell'iscritto.

4. PREZZI E PAGAMENTO
I prezzi indicati sul Sito si intendono in Euro e includono IVA se dovuta. Il pagamento avviene tramite la piattaforma Stripe.

5. CONFERMA DELL'ORDINE
A seguito del pagamento, l'Utente ricevera' email di conferma con i dettagli dell'iscrizione. Il Capotecnico contattera' lo studente entro 24-48 ore lavorative.

6. DIRITTO DI RECESSO
L'Utente consumatore ha diritto di recedere dal contratto entro 14 giorni dalla conferma dell'iscrizione, senza dover fornire motivazione, secondo il D.lgs 206/2005.

7. GARANZIA "PRIMA LEZIONE DI PROVA"
Oltre al diritto di recesso legale, il Venditore offre una garanzia commerciale aggiuntiva: la prima lezione live col Capotecnico e' di prova. Rimborso totale entro 48 ore dalla prima lezione se non convince.

8. ESAME E LICENZA
Al termine del percorso, lo studente sostiene un esame teorico-pratico. Il superamento da' diritto al rilascio della Licenza Professionale, valida 3 anni e rinnovabile.

9. OBBLIGHI DELLO STUDENTE
Lo studente si impegna a partecipare alle lezioni concordate, custodire il kit hardware, non cedere credenziali e non diffondere contenuti senza autorizzazione.

10. LIMITAZIONI DI RESPONSABILITA'
Il Venditore non garantisce risultati economici specifici post-corso. I dati statistici sul Sito si riferiscono ai diplomati passati e non costituiscono promessa di risultato.

11. FORO COMPETENTE
Foro del Consumatore o, in subordine, Foro di Nocera Inferiore.

---

CLAUSOLA DI RINUNCIA AL RECESSO (ART. 59 D.LGS 206/2005)

L'utente ${data.fullName} ha dichiarato:

"Chiedo espressamente che l'esecuzione del corso (spedizione kit, accesso piattaforma e prima lezione live col Capotecnico) inizi prima della scadenza dei 14 giorni di recesso. Ai sensi dell'art. 59 D.lgs 206/2005, riconosco che perdero il diritto di recesso una volta completata la prima lezione live. Mantengo comunque la garanzia commerciale 'Prima Lezione di Prova' (rimborso entro 48h dalla prima lezione)."

Accettata il: ${timestampIt}
IP: ${data.ip}`

  // Split terms text into lines and pages
  const maxWidth = 595 - margin * 2
  const lines = termsText.split('\n')
  let currentPage = addPage()
  y = 792

  for (const line of lines) {
    if (y < 50) {
      drawFooter(currentPage)
      currentPage = addPage()
      y = 792
    }

    const isBold = line === line.toUpperCase() && line.trim().length > 0 && !line.startsWith('---')

    if (line === '---') {
      currentPage.drawLine({
        start: { x: margin, y: y + 2 },
        end: { x: 595 - margin, y: y + 2 },
        thickness: 0.5,
        color: gray,
      })
      y -= lineHeight
      continue
    }

    // Wrap long lines
    const words = line.split(' ')
    let currentLine = ''
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const width = (isBold ? fontBold : font).widthOfTextAtSize(testLine, fontSize)
      if (width > maxWidth && currentLine) {
        if (y < 50) {
          drawFooter(currentPage)
          currentPage = addPage()
          y = 792
        }
        currentPage.drawText(currentLine, {
          x: margin, y, size: fontSize,
          font: isBold ? fontBold : font,
          color: isBold ? navy : gray,
        })
        y -= lineHeight
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) {
      if (y < 50) {
        drawFooter(currentPage)
        currentPage = addPage()
        y = 792
      }
      currentPage.drawText(currentLine, {
        x: margin, y, size: fontSize,
        font: isBold ? fontBold : font,
        color: isBold ? navy : gray,
      })
    }
    y -= lineHeight
  }

  drawFooter(currentPage)

  const pdfBytes = await pdf.save()
  return Buffer.from(pdfBytes)
}
