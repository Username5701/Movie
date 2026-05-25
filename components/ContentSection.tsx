'use client'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'

export default function ContentSection({ title, movies, badge }: { title: string, movies: any[], badge?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState({ left: false, right: true })

  const check = () => {
    if (scrollRef.current) {
      setCanScroll({ left: scrollRef.current.scrollLeft > 10, right: scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10 })
    }
  }

  useEffect(() => { check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check) }, [])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' })
    setTimeout(check, 400)
  }

  return (
    <section className="py-10 relative group">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mb-5">
        <h2 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-text-secondary">{title}</h2>
        <a href="#" className="text-sm font-medium text-accent hover:text-primary-end transition-colors flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></a>
      </div>
      <div className="relative max-w-7xl mx-auto">
        {canScroll.left && <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="w-5 h-5" /></button>}
        <div ref={scrollRef} onScroll={check} className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-2">
          {movies.map(m => <MovieCard key={m.id} movie={{ ...m, badge: m.badge || badge }} onClick={() => {}} />)}
        </div>
        {canScroll.right && <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5" /></button>}
      </div>
    </section>
  )
}