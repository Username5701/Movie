'use client'
import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume, Settings, Maximize, SkipForward, Download, X } from 'lucide-react'

export default function VideoPlayer({ movie, onClose }: { movie: any, onClose: () => void }) {
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (playing) {
      const i = setInterval(() => setProgress(p => p >= 100 ? 100 : p + 0.5), 500)
      return () => clearInterval(i)
    }
  }, [playing])

  useEffect(() => {
    const handleMove = () => { setShowControls(true); clearTimeout(timer.current); timer.current = setTimeout(() => setShowControls(false), 3000) }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="fixed inset-0 z-[60] bg-black">
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-deep">
        <div className="text-white/20 text-9xl font-heading font-black select-none">▶</div>
        <button onClick={onClose} className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-5 h-5" /></button>
        
        <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-3" onClick={(e) => setProgress((e.clientX / e.currentTarget.offsetWidth) * 100)}>
            <div className="h-full bg-accent rounded-full relative" style={{ width: `${progress}%` }}><div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" /></div>
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button onClick={() => setPlaying(!playing)} className="hover:text-accent"><Play className={`w-6 h-6 ${playing ? 'hidden' : ''}`} fill="white" /><Pause className={`w-6 h-6 ${!playing ? 'hidden' : ''}`} /></button>
              <button className="hover:text-accent"><Volume className="w-5 h-5" /></button>
              <span className="text-sm font-medium ml-2">{movie?.title || 'Now Playing'}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-3 py-1.5 bg-cta/90 hover:bg-cta rounded-md text-sm font-bold flex items-center gap-2"><Download className="w-4 h-4" /> Download</button>
              <button className="hover:text-accent"><Settings className="w-5 h-5" /></button>
              <button className="hover:text-accent"><Maximize className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
        <button className="absolute bottom-24 right-8 px-4 py-2 bg-white/10 border border-white/30 rounded-full text-sm hover:bg-cta hover:border-cta transition-all">Skip Intro ↷</button>
      </div>
    </div>
  )
}