// lib/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Movie {
  id: number
  title: string
  year: string
  rating: string
  poster: string
  type: 'movie' | 'tv'
}

interface AppState {
  watchlist: Movie[]
  loading: boolean
  addToWatchlist: (movie: Movie) => Promise<void>
  removeFromWatchlist: (id: number) => Promise<void>
  isInWatchlist: (id: number) => boolean
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      loading: false,
      addToWatchlist: async (movie) => {
        set({ loading: true })
        try {
          await fetch('/api/watchlist', { method: 'POST', body: JSON.stringify({ movieId: movie.id, action: 'add' }) })
          set((state) => ({ watchlist: [...state.watchlist, movie] }))
        } catch (err) {
          console.error('Sync failed:', err)
        } finally {
          set({ loading: false })
        }
      },
      removeFromWatchlist: async (id) => {
        set({ loading: true })
        try {
          await fetch('/api/watchlist', { method: 'POST', body: JSON.stringify({ movieId: id, action: 'remove' }) })
          set((state) => ({ watchlist: state.watchlist.filter(m => m.id !== id) }))
        } catch (err) {
          console.error('Sync failed:', err)
        } finally {
          set({ loading: false })
        }
      },
      isInWatchlist: (id) => get().watchlist.some(m => m.id === id)
    }),
    { name: 'movieverse-watchlist' }
  )
)