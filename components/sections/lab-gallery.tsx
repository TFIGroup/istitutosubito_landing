'use client'

import Image from 'next/image'

const labImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5b947b54-f96b-4df4-9d9d-5ae8dc5947a9.JPG-UBfGZPjNH1ezGi0aQRo4k41UsyFI7U.jpeg',
    alt: 'Microscopio RELIFE con smartphone smontati',
    caption: 'Microscopio Professionale',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/412cd0b4-fb59-41e1-9442-1510241fd76d%202.JPG-LmwPxwIzhbz9wDb6bSFhW3wLNjwWD4.jpeg',
    alt: 'Tecnici al lavoro nel laboratorio Subito Riparato',
    caption: 'Formazione in Laboratorio',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0f1f78dc-2aa3-4c92-8fc5-d11b3cf26a9e.JPG-1p6QxoVcQCLCpFbAxymENs1ItSlw2L.jpeg',
    alt: 'Postazione saldatura con alimentatore e strumenti professionali',
    caption: 'Stazione Saldatura',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dbc083e9-a17d-4838-9a7a-10651a41a913%202.JPG-ei1yILXlQnqdBmQCcAYi3QdFLQlvRg.jpeg',
    alt: 'Attrezzatura professionale per micro-saldatura',
    caption: 'Micro-Saldatura',
  },
]

export function LabGallery() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6"
          >
            Il Nostro Laboratorio
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            Attrezzature Professionali di Ultima Generazione
          </h2>

          <p
            className="text-lg text-muted-foreground mb-3"
          >
            Imparerai utilizzando le stesse attrezzature dei centri assistenza autorizzati:
            microscopi professionali, stazioni di saldatura, macchine laser e molto altro.
          </p>
          <p className="text-sm text-muted-foreground/80 italic">
            I laboratori che vedi sono la nostra sede corsi a Nocera Inferiore: 100 mq attrezzati dedicati alla formazione. Puoi frequentare qui in presenza, oppure da casa tua in videocall live col Capotecnico, ovunque tu sia in Italia.
          </p>
        </div>

        {/* Gallery Grid - 2x2 on mobile, single row on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {labImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium text-sm">
                  {image.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
