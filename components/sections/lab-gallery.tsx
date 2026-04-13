'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const labImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e8e15a0-08fd-4880-ae7d-b7567ff80be4.JPG-HevLxkwyZNOtJ1nRQPEsR7DWHqnvqn.jpeg',
    alt: 'Aula di formazione con postazioni attrezzate',
    caption: 'Aula Formativa',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/microscopio-SVTdrxIWIimvIYPulFj25062r1CPg3.jpg',
    alt: 'Microscopio professionale RELIFE per riparazioni di precisione',
    caption: 'Microscopio RELIFE',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4493b412-867a-4948-82c0-55abe47ef683.JPG-3UkH8yKfMjOdNwkGFZvgh3JoMuxR1u.jpeg',
    alt: 'Macchina laser professionale per riparazioni avanzate',
    caption: 'Macchina Laser',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0f1f78dc-2aa3-4c92-8fc5-d11b3cf26a9e.JPG-1p6QxoVcQCLCpFbAxymENs1ItSlw2L.jpeg',
    alt: 'Postazione saldatura con alimentatore e strumenti professionali',
    caption: 'Stazione Saldatura',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/412cd0b4-fb59-41e1-9442-1510241fd76d%202.JPG-LmwPxwIzhbz9wDb6bSFhW3wLNjwWD4.jpeg',
    alt: 'Smartphone smontati su tappetino antistatico blu',
    caption: 'Area Riparazione',
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6"
          >
            Il Nostro Laboratorio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            Attrezzature Professionali di Ultima Generazione
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Imparerai utilizzando le stesse attrezzature dei centri assistenza autorizzati: 
            microscopi professionali, stazioni di saldatura, macchine laser e molto altro.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {labImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium text-sm">
                  {image.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Large Feature Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 relative aspect-[21/9] rounded-xl overflow-hidden"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d00b9179-1691-4268-b374-8d6a2aadc589-3ltQfgWzjEdn6DLY1pTdlC2YuKQ732.jpg"
            alt="Panoramica del laboratorio di riparazione smartphone"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/80 to-transparent flex items-center p-8 md:p-12">
            <div className="max-w-md text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                {"In ogni guasto, una sfida."}
              </h3>
              <p className="text-lg md:text-xl text-white/90">
                {"In ogni riparazione, un successo."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
