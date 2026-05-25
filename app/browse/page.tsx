// app/browse/page.tsx
'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MovieCard from '@/components/MovieCard'
import { api } from '@/lib/api'
import MovieModal from '@/components/MovieModal'
import VideoPlayer from '@/components/VideoPlayer'

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [playing, setPlaying] = useState<any>(null)
  
  const type = searchParams.get('type') === 'tv' ? 'tv' : 'movie'
  const page = parseInt(searchParams.get('page') || '1')
  const totalPages = 500 // TMDB max

  const fetchMovies = useCallback(async () => {
    setLoading(true)
    try {
      const res = type === 'tv' ? await api.popularTV() : await api.trending()
      setMovies(res.slice((page-1)*20, page*20))
    } catch (err) {
      console.error('Browse fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }, [type, page])

  useEffect(() => { fetchMovies() }, [fetchMovies])

  const changePage = (p: number) => {
    if (p < 1 || p > totalPages) return
    router.push(`/browse?type=${type}&page=${p}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-primary-start to-accent text-transparent bg-clip-text w-fit">
          {type === 'tv' ? 'TV Shows' : 'Movies'}
        </h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({length: 12}).map((_, i) => <div key={i} className="aspect-[2/3] bg-white/10 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movies.map(m => <MovieCard key={m.id} movie={m} onClick={setSelected} />)}
            </div>
            
            <div className="flex justify-center items-center gap-2 mt-10">
              <button onClick={() => changePage(page - 1)} disabled={page === 1} className="p-2 rounded-lg bg-surface disabled:opacity-30 hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-mono">Page {page} of {totalPages}</span>
              <button onClick={() => changePage(page + 1)} disabled={page === totalPages} className="p-2 rounded-lg bg-surface disabled:opacity-30 hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
      <MovieModal movie={selected} onClose={() => setSelected(null)} onPlay={() => setPlaying(selected)} />
      <VideoPlayer movie={playing} onClose={() => setPlaying(null)} />
    </div>
  )
}