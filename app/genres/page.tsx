'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const genres = [
  { icon: '💥', name: 'Action', color: 'from-red-600 to-orange-600', count: 450 },
  { icon: '😂', name: 'Comedy', color: 'from-yellow-400 to-green-400', count: 380 },
  { icon: '🎭', name: 'Drama', color: 'from-purple-600 to-pink-600', count: 520 },
  { icon: '👻', name: 'Horror', color: 'from-gray-800 to-black', count: 210 },
  { icon: '❤️', name: 'Romance', color: 'from-pink-500 to-rose-600', count: 290 },
  { icon: '🚀', name: 'Sci-Fi', color: 'from-cyan-500 to-blue-600', count: 180 },
  { icon: '🔪', name: 'Thriller', color: 'from-red-800 to-gray-900', count: 340 },
  { icon: '🗺️', name: 'Adventure', color: 'from-green-500 to-teal-600', count: 270 },
  { icon: '🔫', name: 'Crime', color: 'from-gray-600 to-black', count: 190 },
  { icon: '🎨', name: 'Animation', color: 'from-yellow-500 to-purple-500', count: 150 },
  { icon: '📹', name: 'Documentary', color: 'from-blue-500 to-indigo-600', count: 230 },
  { icon: '🐉', name: 'Fantasy', color: 'from-indigo-500 to-purple-700', count: 160 }
]

export default function Genres() {
  return (
    <div>
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-heading font-bold mb-8 bg-gradient-to-r from-primary-start to-accent text-transparent bg-clip-text w-fit">Browse by Genre</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map(g => (
            <div key={g.name} className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer bg-gradient-to-br ${g.color} group hover:scale-[1.02] transition-transform`}>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10">
                <span className="text-4xl block mb-3">{g.icon}</span>
                <h3 className="text-lg font-bold text-white">{g.name}</h3>
                <p className="text-white/80 text-sm">{g.count} titles</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}