// app/page.tsx
import { Suspense } from 'react'
import { api, TMDBMedia } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'
import SkeletonRow from '@/components/SkeletonRow'

// Server Component: Fetches data on server, hydrates client UI
export default async function Home() {
  const [trending, newReleases, tvPopular, action, drama] = await Promise.all([
    api.trending(),
    api.nowPlaying(),
    api.popularTV(),
    api.byGenre(28, 'movie'), // Action
    api.byGenre(18, 'movie')  // Drama
  ]);

  // app/page.tsx (UPDATE rows array)
const rows = [
  { title: '🔥 Trending Now', movies: trending.slice(0, 12) },
  { title: '⭐ Top Picks For You', movies: newReleases.slice(0, 15).map(m => ({...m, badge: 'TOP'})) },
  { title: '🇳🇬 Nollywood', movies: trending.slice(12, 22).map(m => ({...m, badge: 'HD'})) },
  { title: '📺 Popular TV Series', movies: tvPopular.slice(0, 10) },
  { title: '💥 Action & Adventure', movies: action.slice(0, 11).map(m => ({...m, badge: 'NEW'})) },
  { title: '🎬 New Releases', movies: newReleases.slice(0, 9) }
];

  return (
    <main className="relative z-10">
      <Navbar />
      <Hero featured={trending.slice(0, 5)} />
      <Suspense fallback={<SkeletonRow />}>
        {rows.map((row, i) => (
          <ContentSection key={i} title={row.title} movies={row.movies} />
        ))}
      </Suspense>
      <Footer />
    </main>
  )
}