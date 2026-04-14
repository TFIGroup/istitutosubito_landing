'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { content } from '@/lib/content'

export function FAQ() {
  const { faq } = content

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--electric-blue)]/10 text-[var(--electric-blue)] text-sm font-medium mb-6"
          >
            {faq.badge}
          </div>

          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            {faq.headline}
          </h2>
        </div>

        {/* Accordion */}
        <div>
          <Accordion type="single" collapsible className="space-y-4">
            {faq.questions.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 data-[state=open]:bg-muted/50"
              >
                <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
