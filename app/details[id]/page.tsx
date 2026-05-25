// app/details/[id]/page.tsx
import { notFound } from 'next/navigation'
import { api, getImageUrl } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MovieModal from '@/components/MovieModal'

export default async function DetailsPage({ params, searchParams }: { params: { id: string }, searchParams: { type?: string } }) {
  const id = parseInt(params.id)
  const type = searchParams.type === 'tv' ? 'tv' : 'movie'
  
  let details
  try {
    details = await api.details(id, type)
  } catch { notFound() }

  if (!details) notFound()

  const cast = details.credits?.cast?.slice(0, 6) || []
  const trailer = details.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')?.key

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4">
        {/* Hero Backdrop */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          <img src={getImageUrl(details.backdrop_path, 'original')} alt={details.title || details.name} className="w-full h-full object-cover brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 -mt-32 relative z-10">
          <img src={getImageUrl(details.poster_path)} alt="Poster" className="w-64 rounded-xl shadow-2xl border border-white/10" />
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">{details.title || details.name}</h1>
            <div className="flex gap-4 text-text-secondary mb-4">
              <span>{(details.release_date || details.first_air_date)?.split('-')[0]}</span>
              <span>⭐ {details.vote_average?.toFixed(1)}</span>
              <span>{details.runtime ? `${details.runtime}m` : `${details.number_of_seasons} Seasons`}</span>
            </div>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">{details.overview}</p>
            
            <MovieModal movie={details} onPlay={() => {}} onClose={() => {}} />
            
            {trailer && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Trailer</h3>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe src={`https://www.youtube.com/embed/${trailer}`} frameBorder="0" allowFullScreen className="w-full h-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}