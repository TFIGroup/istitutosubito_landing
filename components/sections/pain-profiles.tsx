'use client'

import { UserCircle, ChevronDown } from 'lucide-react'

const profiles = [
  {
    name: 'Marco, 26 anni',
    city: 'Milano',
    context: 'Diplomato, lavora in un magazzino logistica.',
    quote:
      'Faccio 9 ore al giorno per 1.200 euro al mese. I miei amici hanno tutti la laurea e sono nella mia stessa situazione. Ho comprato 3 corsi online su Udemy, ne ho finito mezzo. Voglio un mestiere mio, qualcosa di concreto, ma non so da dove iniziare e ho paura di sprecare di nuovo soldi.',
  },
  {
    name: 'Luigi, 38 anni',
    city: 'Bologna',
    context: 'Operaio in una piccola azienda, due figli.',
    quote:
      "Sono fermo nello stesso lavoro da 12 anni, mi annoio e guadagno poco. Ma ho una famiglia, non posso mollare tutto. Ho già provato un corso di riqualificazione regionale, è stata una fregatura. Voglio qualcosa di concreto, manuale, che mi dia un'entrata in più senza dover lasciare il lavoro attuale subito.",
  },
  {
    name: 'Salvatore, 42 anni',
    city: 'Bari',
    context: 'Titolare di un negozio di telefonia.',
    quote:
      'Vendo telefoni e accessori, ma quando un cliente entra con lo schermo rotto devo mandarlo via. Vedo i ragazzi della concorrenza guadagnare 500 euro al giorno solo sulle riparazioni. Vorrei farle anch\'io, ma i corsi che ho trovato online sono solo video, e io ho bisogno di mettere le mani sui telefoni con qualcuno che mi guidi.',
  },
]

export function PainProfiles() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Ti riconosci in qualcuno di loro?
          </h2>
          <p className="text-lg text-muted-foreground">
            Sono i 3 tipi di persone che ogni mese si iscrivono al nostro corso.
            Una di queste storie potrebbe essere la tua.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {profiles.map((profile) => (
            <div
              key={profile.name}
              className="flex flex-col bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8"
            >
              {/* Avatar + name */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-16 h-16 rounded-full bg-[var(--navy)]/10 flex items-center justify-center mb-3">
                  <UserCircle className="w-9 h-9 text-[var(--navy)]/60" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {profile.name}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {profile.city}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-5" />

              {/* Context */}
              <p className="text-sm text-muted-foreground mb-4">
                {profile.context}
              </p>

              {/* Quote */}
              <blockquote className="flex-1 border-l-2 border-[var(--electric-blue)]/30 pl-4">
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  &ldquo;{profile.quote}&rdquo;
                </p>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Closing banner */}
        <div className="bg-[var(--navy)] rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Tutti e tre vogliono la stessa cosa:
          </h3>
          <p className="text-xl md:text-2xl font-bold text-white/90 mb-4">
            un mestiere vero che dia indipendenza.
          </p>
          <p className="text-white/60 mb-6">
            E tutti e tre hanno trovato la stessa risposta.
          </p>
          <ChevronDown className="w-6 h-6 text-white/40 mx-auto animate-bounce" />
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/60 text-center mt-6">
          I profili sono rappresentativi delle tipologie più frequenti di iscritti. Nomi e dettagli di fantasia.
        </p>
      </div>
    </section>
  )
}
