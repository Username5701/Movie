// components/MovieCard.tsx
'use client'
import { motion } from 'framer-motion'
import { Star, Play, Heart } from 'lucide-react'
import { useStore } from '@/lib/store'

interface CardProps { movie: any; onClick: (m: any) => void }

export default function MovieCard({ movie, onClick }: CardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useStore()
  const inList = isInWatchlist(movie.id)

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.03 }} 
      onClick={() => onClick(movie)} 
      className="relative cursor-pointer group rounded-xl overflow-hidden bg-surface min-w-[160px] md:min-w-[180px] flex-shrink-0"
    >
      <img 
        src={movie.poster || '/placeholder.jpg'} 
        alt={movie.title} 
        className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110" 
        loading="lazy" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {movie.badge && (
        <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded uppercase ${movie.badge === 'NEW' || movie.badge === 'Hot' ? 'bg-cta' : movie.badge === 'HD' ? 'bg-success' : 'bg-primary-start'} text-white`}>
          {movie.badge}
        </span>
      )}
      <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur text-[10px] font-mono text-accent rounded">{movie.quality}</span>
      
      {/* Play Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-primary-start/90 flex items-center justify-center shadow-lg">
          <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
        </div>
      </div>

      {/* ALWAYS VISIBLE TITLE & INFO */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
        <h3 className="text-white font-title font-semibold text-sm truncate">{movie.title}</h3>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-text-secondary">{movie.year}</span>
          <span className="flex items-center gap-0.5 text-yellow-400"><Star className="w-3 h-3 fill-current" /> {movie.rating}</span>
        </div>
      </div>

      {/* Watchlist Toggle */}
      <button 
        onClick={(e) => { e.stopPropagation(); inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie) }} 
        className="absolute top-10 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-cta"
      >
        <Heart className={`w-4 h-4 ${inList ? 'fill-cta text-cta' : ''}`} />
      </button>
    </motion.div>
  )
}