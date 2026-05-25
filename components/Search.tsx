// components/Search.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, Loader2 } from 'lucide-react'
import { api, mapToAppMedia, TMDBMedia } from '@/lib/api'
import Link from 'next/link'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const inputRef = useRef<HTMLInputElement>(null)

  const fetchResults = async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const data = await api.search(q)
      setResults(data.slice(0, 6))
    } catch (err) {
      console.error('Search failed:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => fetchResults(query), 400) // 400ms debounce
    return () => clearTimeout(timer.current)
  }, [query])

  return (
    <div className="relative">
      <div className="flex items-center bg-white/10 rounded-full px-3 py-2 focus-within:ring-2 ring-primary-start transition-all">
        <SearchIcon className="w-4 h-4 text-text-secondary mr-2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search movies, shows..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="bg-transparent outline-none text-sm w-48 md:w-64 placeholder:text-text-secondary"
        />
        {loading && <Loader2 className="w-4 h-4 animate-spin text-accent ml-2" />}
      </div>

      {open && query && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          {results.length > 0 ? (
            results.map(item => (
              <Link href={`/details/${item.id}?type=${item.type}`} key={item.id} className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors cursor-pointer">
                <img src={item.poster} alt={item.title} className="w-10 h-15 object-cover rounded" />
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-text-secondary">{item.year} • {item.type === 'movie' ? 'Movie' : 'TV'}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-text-secondary text-sm">No results found</p>
          )}
        </div>
      )}
    </div>
  )
}