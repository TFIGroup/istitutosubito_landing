// All page content in one place for easy editing
// Edit this file to change any copy without touching JSX

export const content = {
  meta: {
    title: 'Istituto Subito | La scuola dei tecnici riparatori. Dal 2009.',
    description: 'Il primo istituto in Italia che non ti insegna a riparare smartphone. Ti insegna a guadagnare riparando. 1-to-1 col Capotecnico, licenza professionale verificabile. Powered by Subito Riparato, dal 2009.',
    keywords: 'corso riparazione smartphone, tecnico cellulari, microsaldatura, scuola tecnici riparatori, licenza tecnico smartphone, formazione professionale riparazione',
  },

  header: {
    logo: 'Istituto Subito',
    tagline: 'Powered by Subito Riparato',
    nav: [
      { label: 'Il Metodo', href: '#manifesto' },
      { label: 'Percorsi', href: '#prezzi' },
      { label: 'La Licenza', href: '#licenza' },
      { label: 'Garanzia di Rimborso', href: '#garanzia' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: 'Iscriviti Ora',
  },

  hero: {
    variants: {
      A: {
        headline: 'Diventa Tecnico Riparatore. E inizia a guadagnare subito.',
        subheadline: 'Il primo istituto in Italia che non ti insegna a riparare. Ti insegna a guadagnare riparando.',
      },
      B: {
        headline: 'Cerchiamo nuovi tecnici da formare in tutta Italia.',
        subheadline: 'Percorso 1-to-1 col Capotecnico, licenza professionale verificabile, sbocco lavorativo concreto.',
      },
    },
    description: '1-to-1 in videocall live col Capotecnico. Da casa tua, ovunque in Italia. Ti spediamo a casa tutto: kit hardware, webcam con braccio, ring light. Apri la scatola, colleghi al PC, sei pronto.',
    priceTeaser: 'Da €1.490',
    installmentTeaser: 'o 3 rate da €497 con Klarna',
    primaryCta: 'Iscriviti Ora',
    secondaryCta: 'Parla con un Capotecnico',
    trustBar: '4,9/5 su Google - Dal 2009 - 130.000+ dispositivi riparati - Ovunque in Italia',
    trustBadges: [
      { icon: 'shield', label: 'Pagamento Sicuro Stripe' },
      { icon: 'creditCard', label: 'Klarna - 3 rate senza interessi' },
      { icon: 'undo', label: 'Soddisfatto o Rimborsato', href: '#garanzia' },
      { icon: 'flag', label: 'Made in Italy - dal 2009' },
      { icon: 'package', label: 'Kit completo spedito a casa', href: '#welcome-kit' },
    ],
    licenseCaption: 'Clicca la licenza per verificarne una reale',
  },

  manifesto: {
    badge: 'Il Nostro Metodo',
    headline: 'Non ti insegniamo a riparare. Ti insegniamo a guadagnare.',
    paragraphs: [
      'Ci sono corsi che ti riempiono la testa di cose che non userai mai. Ti spiegano per ore come si legge un multimetro che nella realtà di un laboratorio aprirai forse una volta ogni cento riparazioni. Ti elencano 200 tecniche e poi ti lasciano da solo davanti al primo cliente.',
      'Noi insegniamo solo quello che si rompe davvero. Quello che entra in laboratorio ogni giorno, quello per cui i clienti pagano, quello che ti fa chiudere il mese.',
      'Lo sappiamo perché lo facciamo da 16 anni. Oltre 130.000 dispositivi riparati nei nostri due laboratori in Campania, 900 al mese. Conosciamo le 10 riparazioni che generano l\'80% del fatturato di un negozio. Ti insegniamo quelle. Tutto il resto è chiacchiera che paghi e dimentichi.',
    ],
    closingLine: 'Da 16 anni sul campo. Ora insegniamo a fare lo stesso a te.',
    stats: [
      { value: '16', label: 'Anni di attività dal 2009' },
      { value: '130.000+', label: 'Dispositivi riparati davvero' },
      { value: '900', label: 'Riparazioni al mese, ogni mese' },
    ],
  },

  firstClient: {
    badge: 'L\'esercizio dei 20 telefoni',
    headline: 'Il tuo primo cliente ce l\'hai già. Non lo sai ancora.',
    bigNumber: '2',
    paragraphs: [
      'Fai un esercizio. Oggi, guardati intorno. Tra i 20 amici, parenti e colleghi più vicini a te, almeno 2 hanno un telefono con un problema. Schermo rotto, batteria che non tiene, microfono che gracchia. Minimo 2. Probabilmente di più.',
      'Quando finisci il corso, hai già recuperato mezzo investimento solo sistemando i loro telefoni. Da lì in poi, è solo questione di quanto vuoi crescere.',
    ],
  },

  pricing: {
    badge: 'Tre percorsi - Tre licenze - Tre mercati',
    headline: 'Scegli fino a dove vuoi arrivare.',
    description: 'Tre livelli professionali con licenza fisica verificabile. Quanto guadagni dipende da quanto sai fare. Il Capotecnico ti accompagna 1-to-1 in ognuno dei percorsi.',
    tiers: [
      {
        id: 'lv1',
        code: 'LV1',
        name: 'Tecnico Riparatore',
        positioning: 'Il punto di partenza perfetto. L\'80% dei nostri studenti inizia da qui.',
        tagline: 'Il tecnico che chiude la maggior parte dei lavori che entrano in laboratorio.',
        priceFull: 1690,
        priceLaunch: 1490,
        installmentLabel: 'o 3 rate da €497 con Klarna',
        earningsRange: '€40 - €120 per riparazione',
        marketCoverage: 'La maggior parte delle riparazioni quotidiane',
        features: [
          'Kit completo spedito a casa tua, pronto all\'uso',
          'Da casa tua, ovunque in Italia',
          '30 ore 1-to-1 in videocall live col Capotecnico',
          'Calendario flessibile: scegli tu giorni e orari col Capotecnico. Disponibilità tutti i giorni della settimana.',
          'Webcam con braccio articolato e ring light, in comodato d\'uso (zero da configurare, plug-and-play)',
          'Licenza professionale LV1 verificabile via QR',
          'Supporto post-diploma per 1 mese',
        ],
        ctaPrimary: { label: 'Iscriviti Ora', type: 'checkout' as const },
        ctaSecondary: { label: 'Parla con un Capotecnico', type: 'lead' as const },
        guarantee: 'Garanzia 14 giorni - Prima lezione di prova gratuita',
        spotsRemaining: 5,
        highlighted: true,
        badge: 'PIÙ POPOLARE',
      },
      {
        id: 'lv2',
        code: 'LV2',
        name: 'Tecnico Microsaldatore',
        positioning: 'Per chi vuole andare oltre il livello base.',
        tagline: 'Il tecnico che gli altri negozi chiamano quando non sanno dove sbattere la testa.',
        priceFull: 2690,
        priceLaunch: 2490,
        installmentLabel: 'o 3 rate da €830 con Klarna',
        earningsRange: '€80 - €200 per riparazione',
        marketCoverage: 'Quasi tutto il mercato, incluso quello che gli altri rifiutano',
        features: [
          'Kit completo spedito a casa tua, pronto all\'uso',
          'Da casa tua, ovunque in Italia',
          '50 ore 1-to-1 in videocall live col Capotecnico',
          'Calendario flessibile: scegli tu giorni e orari col Capotecnico. Disponibilità tutti i giorni della settimana.',
          'Webcam con braccio articolato e ring light, in proprietà (zero da configurare, plug-and-play)',
          'Licenza professionale LV2 verificabile via QR',
          'Ti mandiamo i primi clienti per 3 mesi',
          'Supporto post-diploma per 3 mesi',
        ],
        ctaPrimary: { label: 'Iscriviti Ora', type: 'checkout' as const },
        ctaSecondary: { label: 'Parla con un Capotecnico', type: 'lead' as const },
        guarantee: 'Garanzia 14 giorni - Prima lezione di prova gratuita',
        spotsRemaining: 2,
        highlighted: false,
      },
      {
        id: 'lv3',
        code: 'LV3',
        name: 'Tecnico Master',
        positioning: 'Il livello massimo. Per chi vuole fare della riparazione una professione completa.',
        tagline: 'Il tecnico che risolve quello che nessun altro tocca. La riparazione da €300 che tutti rifiutano, la fai tu.',
        priceFull: 4190,
        priceLaunch: 3990,
        installmentLabel: 'o 3 rate da €1.330 con Klarna',
        earningsRange: '€150 - €400+ per riparazione',
        marketCoverage: '100% del mercato, incluse riparazioni che oggi vengono mandate a noi',
        features: [
          'Kit completo spedito a casa tua, pronto all\'uso',
          'Da casa tua, ovunque in Italia',
          '80 ore 1-to-1 in videocall live col Capotecnico',
          'Calendario flessibile: scegli tu giorni e orari col Capotecnico. Disponibilità tutti i giorni della settimana.',
          'Webcam con braccio articolato e ring light, in proprietà (zero da configurare, plug-and-play)',
          'Kit completo + stazione microsaldatura inclusa, in proprietà',
          'Licenza professionale LV3 verificabile via QR',
          'Ti mandiamo i primi clienti per 6 mesi',
          'Supporto post-diploma per 6 mesi',
        ],
        ctaPrimary: { label: 'Iscriviti Ora', type: 'checkout' as const },
        ctaSecondary: { label: 'Parla con un Capotecnico', type: 'lead' as const },
        guarantee: 'Garanzia 14 giorni - Prima lezione di prova gratuita',
        spotsRemaining: 1,
        highlighted: false,
      },
    ],
  },

  scarcity: {
    badge: 'Posti contati per area di mercato',
    headline: 'Perché formiamo solo 11 tecnici a trimestre.',
    paragraphs: [
      'Il mercato della riparazione è grande, ma non è infinito. In ogni area c\'è un numero limitato di dispositivi e di clienti disposti a pagare un tecnico che non conoscono.',
      'Per questo non formiamo masse di persone all\'anno. Formiamo pochi tecnici, li formiamo bene, e li accompagniamo a lavorare davvero. Connessi con noi, con i nostri clienti, con il nostro metodo. Chi si forma con noi non resta mai da solo davanti al primo cliente.',
    ],
    counterLabel: 'Posti disponibili per il prossimo trimestre',
    counterValue: 8,
    counterTotal: 11,
    breakdown: '5 posti LV1 - 2 posti LV2 - 1 posto LV3',
  },

  license: {
    badge: 'Sistema di certificazione unico in Italia',
    headline: 'Una licenza vera. Verificabile da chiunque, in tempo reale.',
    paragraphs: [
      'Quando ti diplomi non ti diamo un certificato che vale quanto la carta su cui è stampato. Ti diamo una licenza professionale fisica, con il tuo numero univoco, foto, livello tecnico e un QR code che chiunque (un cliente, un datore di lavoro, un altro tecnico) può scansionare per verificare in tempo reale che sei un tecnico certificato Istituto Subito.',
      'È l\'unica licenza del settore in Italia con un sistema di verifica pubblica online. E sta diventando lo standard di mercato.',
    ],
    features: [
      'Licenza fisica formato tessera con foto, livello e voto di competenza',
      'QR code di verifica pubblica, in tempo reale',
      'Numero seriale univoco e tracciabile',
      'Validita triennale, rinnovabile',
    ],
    demoLink: {
      label: 'Prova: scansiona o clicca per vedere una licenza vera',
      url: 'https://www.subitoriparato.com/19284725-11',
    },
  },

  whyUs: {
    badge: 'Il differenziale',
    headline: 'Perché Istituto Subito non è come gli altri corsi.',
    description: 'Sei cose che nessun altro in Italia mette insieme.',
    points: [
      {
        icon: 'users',
        title: '1-to-1 in videocall live col Capotecnico',
        description: 'Niente videocorsi preregistrati, niente classi affollate. Solo tu e un Capotecnico esperto, in diretta via videocall, su misura sui tuoi tempi e sui tuoi obiettivi. Da ovunque in Italia.',
      },
      {
        icon: 'wrench',
        title: '16 anni di esperienza vera.',
        description: 'Non insegniamo dai libri. Insegniamo da 130.000 dispositivi riparati davvero, in due laboratori attivi tutti i giorni in Campania.',
      },
      {
        icon: 'briefcase',
        title: 'Sbocco professionale concreto.',
        description: 'L\'80% dei nostri 46 diplomati ad oggi lavora nel settore: con noi, in altri negozi, o con la propria attività.',
      },
      {
        icon: 'award',
        title: 'Una licenza che vale.',
        description: 'L\'unica licenza professionale del settore con sistema di verifica pubblica via QR. Chi ti assume sa subito chi sei.',
      },
      {
        icon: 'package',
        title: 'Kit: apri la scatola. Sei già operativo.',
        description: 'Ti spediamo a casa tutto: strumenti professionali, webcam con braccio e ring light, materiale didattico. Zero da comprare, zero da configurare.',
        href: '#welcome-kit',
      },
      {
        icon: 'shield',
        title: 'Soddisfatto o Rimborsato.',
        description: 'Hai 14 giorni di garanzia soddisfatti o rimborsati. Inoltre, la prima lezione live col Capotecnico è di prova: se non ti convince, rimborso pieno entro 48 ore.',
        href: '#garanzia',
      },
    ],
  },

  paths: {
    badge: 'Cosa succede dopo che ti diplomi',
    headline: 'Tre strade. Le scegli tu, in base a dove vuoi arrivare.',
    options: [
      {
        icon: 'store',
        title: 'Apri la tua attività.',
        description: 'Diventi titolare di un laboratorio di riparazione, con il know-how e la licenza che ti danno credibilità immediata sul mercato.',
      },
      {
        icon: 'building',
        title: 'Lavora con noi.',
        description: 'I migliori diplomati possono entrare a lavorare nei nostri laboratori o ricevere riparazioni che noi giriamo loro come tecnici di fiducia.',
      },
      {
        icon: 'home',
        title: 'Lavora come autonomo.',
        description: 'Inizi da casa, dai 2 telefoni rotti dei tuoi amici, e cresci. Molti dei nostri ex studenti hanno iniziato esattamente così.',
      },
    ],
  },

  testimonials: {
    badge: 'Le voci dei nostri diplomati',
    headline: '46 diplomati. L\'80% lavora attivamente nel settore.',
    description: 'Stiamo raccogliendo le loro storie per condividerle qui. Vuoi sentirle direttamente dalla loro voce prima di decidere?',
  },

  faq: {
    badge: 'Domande frequenti',
    headline: 'Hai dubbi? Ecco le risposte.',
    questions: [
      {
        question: 'Devo avere già esperienza tecnica per iscrivermi?',
        answer: 'No. Partiamo dalle basi e ti accompagniamo passo passo. Quello che serve è la voglia di imparare un mestiere vero e di lavorare con le mani. Il resto te lo insegniamo noi, 1-to-1 col Capotecnico.',
      },
      {
        question: 'Cosa mi arriva a casa esattamente?',
        answer: 'Tutto quello che ti serve. Kit hardware professionale completo con oltre 20 strumenti (cacciaviti precisione, pinzette ESD, tappetino magnetico, spudger, multimetro, e tutto il resto), webcam con braccio articolato e ring light per le lezioni live, materiali didattici digitali e accesso al gruppo WhatsApp. Spedizione tracciata in tutta Italia, da 2 a 5 giorni lavorativi. Apri la scatola, colleghi la webcam al PC, e sei pronto per la prima lezione live col Capotecnico. Zero da comprare, zero da configurare.',
      },
      {
        question: 'Perché non vendete il programma dettagliato del corso?',
        answer: 'Perché non esiste un programma uguale per tutti. Il Capotecnico costruisce il percorso con te, sulla base del tuo livello di partenza e di dove vuoi arrivare. Insegniamo solo quello che ti serve per lavorare e guadagnare, non un elenco di argomenti che paghi e dimentichi. Ci sono corsi che ti spiegano per ore come si usa un multimetro che nella realtà aprirai una volta ogni cento riparazioni. Noi no.',
      },
      {
        question: 'Quanto tempo ci metto a finire il corso?',
        answer: 'Dipende dal tuo ritmo. Le lezioni durano minimo 2 ore ciascuna, ma c\'è flessibilità. Il calendario lo decidi tu insieme al Capotecnico: scegli i giorni e gli orari che ti vanno meglio, con disponibilità tutti i giorni della settimana. Puoi fare 2 lezioni a settimana e finire in 3-4 mesi, oppure accelerare con 3-4 lezioni a settimana e finire prima. Ti adeguiamo ai tuoi tempi, non il contrario.',
      },
      {
        question: 'Posso scegliere gli orari delle lezioni?',
        answer: 'Sì, il calendario è completamente flessibile. Concordi direttamente con il Capotecnico i giorni e gli orari che preferisci. Abbiamo disponibilità tutti i giorni della settimana, mattina e pomeriggio. Se un giorno non puoi, sposti senza problemi. Il corso si adegua alla tua vita, non il contrario.',
      },
      {
        question: 'Il corso è online o in presenza?',
        answer: 'Il corso si svolge in videocall live 1-to-1 col Capotecnico, con calendario flessibile concordato sui tuoi tempi. NON sono videocorsi preregistrati: è una vera lezione in diretta. Il kit hardware ti arriva a casa, ovunque tu sia in Italia. L\'esame finale e la consegna licenza avvengono in sessione live online registrata, valida a tutti gli effetti.',
      },
      {
        question: 'La webcam come funziona? Devo comprarne una io?',
        answer: 'No, la webcam te la spediamo noi col kit. È una webcam professionale con braccio articolato flessibile e ring light integrato, plug-and-play su Mac, Windows e Chromebook. Si fissa al tuo banco di lavoro in 30 secondi e si posiziona dall\'alto, così il Capotecnico durante le lezioni live vede esattamente quello che fai con le mani sul tappetino. Per LV1 ti viene fornita in comodato d\'uso per la durata del corso. Per LV2 e LV3 è tua, te la tieni anche dopo il diploma. Zero pensieri tecnici: apri la scatola e funziona.',
      },
      {
        question: 'Posso pagare a rate?',
        answer: 'Sì, fino a 3 rate senza interessi con Klarna o Scalapay, direttamente in fase di iscrizione su Stripe. Per importi più alti possiamo valutare piani di pagamento personalizzati: parlane col Capotecnico in fase di iscrizione.',
      },
      {
        question: 'E se mi accorgo che non fa per me?',
        answer: 'Hai 14 giorni di garanzia soddisfatti o rimborsati. Inoltre, la prima lezione live col Capotecnico è di prova: se non ti convince, rimborso pieno entro 48 ore. Vogliamo solo studenti motivati, non clienti pentiti.',
      },
      {
        question: 'Posso davvero trovare lavoro dopo?',
        answer: 'L\'80% dei nostri 46 diplomati ad oggi lavora nel settore: con noi nei nostri laboratori, in altri negozi di riparazione, o con la propria attività autonoma. Non garantiamo posti di lavoro a tutti (non sarebbe onesto), ma proprio per questo selezioniamo pochi corsisti per trimestre, così possiamo accompagnarli realmente nei primi mesi di attività.',
      },
      {
        question: 'Cosa rende la vostra licenza diversa da altri certificati?',
        answer: 'È l\'unica del settore in Italia con un sistema di verifica pubblica online. Ogni licenza ha un numero univoco e un QR code che chiunque può scansionare per vedere in tempo reale che il tecnico è certificato, il livello, la validità. Un cliente o un datore di lavoro verifica in 2 secondi. Per provare, scansiona il QR di una licenza reale: lo trovi qui in pagina.',
      },
      {
        question: 'Chi e "Subito Riparato"?',
        answer: 'Subito Riparato è la nostra azienda madre: due laboratori di riparazione attivi in Campania (Nocera Inferiore e Cava de\' Tirreni) dal 2009. Oltre 130.000 dispositivi riparati, 900 al mese. Istituto Subito è la scuola che nasce da quell\'esperienza concreta, non dai libri, dal lavoro vero di tutti i giorni.',
      },
    ],
  },

  finalCta: {
    headline: 'Pronto a imparare un mestiere vero?',
    description: 'Posti limitati per il prossimo trimestre. Chi parte ora, lavora nei prossimi mesi.',
    primaryCta: 'Iscriviti Ora',
    secondaryCta: 'Parla con un Capotecnico',
    reassurance: 'Garanzia 14 giorni - Prima lezione di prova gratuita - Pagamento sicuro Stripe - Klarna 3 rate',
  },

  footer: {
    logo: 'Istituto Subito',
    tagline: 'La scuola dei tecnici riparatori. Powered by Subito Riparato, dal 2009.',
    sedeOperativa: {
      label: 'SEDE OPERATIVA',
      line1: 'Via S. D\'Alessandro, 61',
      line2: '84014 Nocera Inferiore (SA)',
    },
    contacts: {
      phone: '+39 377 359 1545',
      phoneHref: 'tel:+393773591545',
      whatsapp: 'WhatsApp',
      whatsappHref: 'https://wa.me/393773591545?text=Ciao,%20vorrei%20informazioni%20sui%20corsi',
      email: 'info@istitutosubito.com',
      emailHref: 'mailto:info@istitutosubito.com',
    },
    links: {
      corso: [
        { label: 'LV1 - Tecnico Riparatore', href: '#prezzi' },
        { label: 'LV2 - Tecnico Microsaldatore', href: '#prezzi' },
        { label: 'LV3 - Tecnico Master', href: '#prezzi' },
        { label: 'Verifica una licenza', href: 'https://www.subitoriparato.com/19284725-11' },
      ],
      supporto: [
        { label: 'FAQ', href: '#faq' },
        { label: 'Parla con un Capotecnico', href: '#lead' },
        { label: 'Contatto WhatsApp', href: 'https://wa.me/393773591545?text=Ciao,%20vorrei%20informazioni%20sui%20corsi' },
        { label: 'Contatto email', href: 'mailto:info@istitutosubito.com' },
      ],
      legale: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookie' },
        { label: 'Termini e Condizioni', href: '/termini' },
        { label: 'Diritto di Recesso', href: '/recesso' },
      ],
    },
    legal: {
      line1: 'CR Store S.r.l. · P.IVA IT08955511210 · REA NA-997450',
      line2: 'Sede legale: Via R. Vastola, 5, 80040 Poggiomarino (NA)',
      line3: '\u00A9 2026 CR Store S.r.l. · Tutti i diritti riservati',
      line4: 'Marchi \'Istituto Subito\' e \'Subito Riparato\' di proprieta\' CR Store S.r.l.',
    },
  },

  grazie: {
    headline: 'Benvenuto in Istituto Subito.',
    subheadline: 'Il tuo percorso per diventare tecnico riparatore inizia ora.',
    steps: [
      {
        number: '1',
        title: 'Email di benvenuto in arrivo',
        description: 'Controlla la tua casella email (anche la cartella spam). Trovi tutto: ricevuta di pagamento, dettagli del percorso, prossimi passi.',
      },
      {
        number: '2',
        title: 'Il Capotecnico ti contatta entro 24 ore',
        description: 'Riceverai un messaggio WhatsApp dal Capotecnico per concordare insieme il calendario delle prime lezioni 1-to-1 e rispondere a ogni tua domanda.',
      },
      {
        number: '3',
        title: 'Spedizione kit hardware',
        description: 'Il kit professionale ti arriva a casa entro pochi giorni, con tracking via email. Da quel momento sei pronto a iniziare a lavorare sui dispositivi veri.',
      },
    ],
    whatsappCta: 'Scrivi subito al Capotecnico',
    backHome: 'Torna alla home',
  },

  leadModal: {
    headline: 'Aspetta. Parliamone prima.',
    subheadline: 'Lascia il tuo numero e un Capotecnico ti richiama entro 24 ore. Senza impegno, senza spam, senza vendite forzate. Solo per capire se questo percorso fa per te.',
    fields: {
      name: 'Il tuo nome',
      phone: 'Numero WhatsApp',
      city: 'Città',
      interest: 'Quale livello ti interessa?',
      motivation: 'Cosa ti interessa di più?',
    },
    interestOptions: [
      { value: 'lv1', label: 'LV1 - Tecnico Riparatore (€1.490)' },
      { value: 'lv2', label: 'LV2 - Tecnico Microsaldatore (€2.490)' },
      { value: 'lv3', label: 'LV3 - Tecnico Master (€3.990)' },
      { value: 'unsure', label: 'Non lo so ancora, voglio capire' },
    ],
    motivationOptions: [
      'Cambio lavoro completo',
      'Secondo reddito / lavoro extra',
      'Aprire una mia attività',
      'Hobby con possibile sviluppo professionale',
    ],
    cta: 'Richiamatemi',
    privacy: 'Ti contattiamo solo via WhatsApp o telefono. Niente spam, mai. I tuoi dati restano nostri.',
    successTitle: 'Perfetto, ci sentiamo presto.',
    successMessage: 'Un Capotecnico ti contatta entro 24 ore su WhatsApp. Se vuoi anticipare, scrivici tu intanto.',
    whatsappCta: 'Scrivi su WhatsApp adesso',
  },

  stickyBar: {
    price: 'Da €1.490',
    cta: 'Iscriviti',
    whatsapp: 'WhatsApp',
  },

  abandonmentBanner: {
    message: 'Hai lasciato un\'iscrizione a meta. Riprendi da dove avevi interrotto.',
    cta: 'Completa iscrizione',
  },

  socialProof: {
    enabled: true,
    intervalSeconds: 30,
    placeholderNote: '[I nomi sono placeholder. Sostituire con iscrizioni reali appena disponibili. Tenere realistici geograficamente: target ads attualmente Campania + nazionale.]',
    items: [
      { name: 'Marco', city: 'Salerno', tier: 'LV2', timeAgo: '2 ore fa' },
      { name: 'Giulia', city: 'Napoli', tier: 'LV1', timeAgo: '4 ore fa' },
      { name: 'Antonio', city: 'Caserta', tier: 'LV1', timeAgo: '6 ore fa' },
      { name: 'Francesca', city: 'Roma', tier: 'LV2', timeAgo: '8 ore fa' },
      { name: 'Davide', city: 'Milano', tier: 'LV3', timeAgo: '12 ore fa' },
      { name: 'Simone', city: 'Bari', tier: 'LV1', timeAgo: '14 ore fa' },
      { name: 'Alessia', city: 'Torino', tier: 'LV2', timeAgo: '18 ore fa' },
      { name: 'Luca', city: 'Palermo', tier: 'LV1', timeAgo: '22 ore fa' },
    ],
  },
}

export type Content = typeof content
