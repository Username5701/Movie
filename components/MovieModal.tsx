'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Download, Heart, Share, Star } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function MovieModal({ movie, onClose, onPlay }: { movie: any, onClose: () => void, onPlay: () => void }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useStore()
  const inList = isInWatchlist(movie.id)

  return (
    <AnimatePresence>
      {movie && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto" onClick={onClose}>
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-surface rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative h-64 md:h-80">
              <img src={movie.backdrop} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
              <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 md:p-8 -mt-16 relative z-10">
              <div className="flex flex-col md:flex-row gap-6">
                <img src={movie.poster} alt={movie.title} className="w-32 md:w-40 rounded-xl shadow-lg border border-white/10" />
                <div className="flex-1">
                  <h2 className="text-3xl font-heading font-bold mb-2">{movie.title}</h2>
                  <div className="flex flex-wrap gap-2 text-sm text-text-secondary mb-4">
                    <span>{movie.year}</span><span>•</span><span>{movie.duration}</span><span>•</span>
                    <span className="flex items-center gap-1 text-yellow-400"><Star className="w-3 h-3 fill-current" /> {movie.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">{movie.genres.map((g: string) => <span key={g} className="px-3 py-1 bg-primary-start/10 text-accent rounded-full text-xs font-medium border border-primary-start/30">{g}</span>)}</div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-4">{movie.description}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button onClick={onPlay} className="px-6 py-2.5 bg-cta hover:bg-red-700 text-white rounded-full font-bold flex items-center gap-2 transition-all"><Play className="w-4 h-4" fill="white" /> Stream Now</button>
                    <button className="px-6 py-2.5 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold flex items-center gap-2 transition-all"><Download className="w-4 h-4" /> Download</button>
                    <button onClick={() => inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)} className={`p-2.5 rounded-full border transition-all ${inList ? 'border-cta text-cta bg-cta/10' : 'border-white/20 hover:border-white'}`}><Heart className={`w-4 h-4 ${inList ? 'fill-cta' : ''}`} /></button>
                    <button className="p-2.5 rounded-full border border-white/20 hover:border-white transition-all"><Share className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {['360p','480p','720p','1080p'].map(q => <button key={q} className="p-3 bg-white/5 hover:bg-primary-start/20 border border-white/10 hover:border-primary-start/50 rounded-lg transition-all text-center"><div className="font-mono font-bold text-sm">{q}</div><div className="text-text-secondary text-xs mt-1">MP4</div></button>)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}