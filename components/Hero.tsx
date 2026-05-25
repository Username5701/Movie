'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Star } from 'lucide-react'

const featured = [
  { id: 1, title: 'Galactic Frontier', year: 2026, rating: 8.7, duration: '2h 14m', genres: ['Sci-Fi','Action'], desc: 'In a distant galaxy, a rogue explorer discovers an ancient alien artifact that holds the key to humanity\'s survival.', poster: 'https://picsum.photos/seed/hero1/1920/1080' },
  { id: 2, title: 'The Last Kingdom', year: 2025, rating: 9.1, duration: '2h 45m', genres: ['Drama','History'], desc: 'A medieval epic chronicling the final days of a legendary kingdom. Betrayal and honor collide.', poster: 'https://picsum.photos/seed/hero2/1920/1080' },
  { id: 3, title: 'Neon Shadows', year: 2026, rating: 8.4, duration: '1h 58m', genres: ['Crime','Thriller'], desc: 'In a rain-soaked cyberpunk city, a detective hunts a serial killer who leaves digital clues.', poster: 'https://picsum.photos/seed/hero3/1920/1080' },
  { id: 4, title: 'Whispers of the Heart', year: 2025, rating: 8.9, duration: '2h 05m', genres: ['Romance','Fantasy'], desc: 'Two souls who can hear each other\'s thoughts across dimensions risk everything to be together.', poster: 'https://picsum.photos/seed/hero4/1920/1080' },
  { id: 5, title: 'Velocity Strike', year: 2026, rating: 7.8, duration: '2h 22m', genres: ['Action','Adventure'], desc: 'An elite squad must infiltrate a high-speed train carrying a stolen quantum weapon.', poster: 'https://picsum.photos/seed/hero5/1920/1080' }
]

export default function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % featured.length), 8000)
    return () => clearInterval(t)
  }, [])

  const movie = featured[idx]

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 w-full">
        <motion.div key={movie.title} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 bg-cta text-xs font-bold rounded uppercase tracking-wide">Featured</span>
            <span className="flex items-center gap-1 text-yellow-400"><Star className="w-4 h-4 fill-current" /> {movie.rating} IMDb</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-4 leading-tight max-w-2xl">{movie.title}</h1>
          <div className="flex flex-wrap gap-3 text-text-secondary text-sm mb-6">
            <span>{movie.year}</span><span>•</span><span>{movie.duration}</span><span>•</span>{movie.genres.join(' • ')}
          </div>
          <p className="text-text-secondary max-w-xl mb-8 line-clamp-3">{movie.desc}</p>
          <div className="flex gap-4">
            <button className="px-8 py-3.5 bg-cta hover:bg-red-700 text-white rounded-full font-bold flex items-center gap-2 shadow-xl shadow-cta/40 transition-all hover:scale-105"><Play className="w-5 h-5" fill="white" /> Watch Now</button>
            <button className="px-8 py-3.5 border border-white/30 hover:bg-white/10 text-white rounded-full font-bold flex items-center gap-2 transition-all">Download</button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {featured.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-16 bg-primary-start' : 'w-8 bg-white/30 hover:bg-white/50'}`} />
        ))}
      </div>
    </section>
  )
}