import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Footer } from '@/components/sections/footer'
import { content } from '@/lib/content'

interface LegalLayoutProps {
  children: React.ReactNode
}

export function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <>
      {/* Header semplificato — solo logo + link Home */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[var(--navy)]">
                {content.header.logo}
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla home
            </Link>
          </div>
        </div>
      </header>

      {/* Contenuto legale */}
      <main className="min-h-[60vh] py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <div className="prose prose-neutral max-w-none
            prose-headings:text-foreground prose-headings:font-bold
            prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mb-2
            prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-a:text-[var(--electric-blue)] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-[var(--electric-blue)] prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-pre:bg-muted prose-pre:text-foreground prose-pre:text-sm
            prose-hr:border-border
          ">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
