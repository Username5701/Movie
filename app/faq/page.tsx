'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: "Is MOVIEVERSE free to use?", a: "Yes! MOVIEVERSE is completely free. You can stream and download movies and TV shows without any subscription or payment." },
  { q: "Can I download movies to watch offline?", a: "Absolutely! All titles come with multiple download quality options (360p to 1080p) so you can watch offline anytime." },
  { q: "Is there a limit to how many movies I can watch?", a: "No limits at all. Stream and download as much content as you want, whenever you want." },
  { q: "How often is new content added?", a: "We add new movies and TV shows daily. Our library is constantly updated with the latest releases and timeless classics." },
  { q: "How do I report broken links or content?", a: "Use our 'Request' page or contact us directly through the footer links. Our team responds within 24 hours." }
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <Navbar />
      <div className="pt-24 pb-12 max-w-3xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-heading font-bold mb-8 bg-gradient-to-r from-primary-start to-accent text-transparent bg-clip-text w-fit">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center p-5 text-left font-medium hover:bg-white/5 transition-colors">
                {faq.q} <ChevronDown className={`w-5 h-5 text-accent transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-text-secondary text-sm leading-relaxed border-t border-white/5 pt-3">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}