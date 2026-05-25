import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-start to-accent flex items-center justify-center"><span className="font-bold">▶</span></div>
            <span className="text-xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-accent">MOVIEVERSE</span>
          </div>
          <p className="text-text-secondary text-sm mb-4">Your Universe of Unlimited Entertainment. Stream & download thousands of movies and TV shows for free.</p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((I, i) => <a key={i} href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary-start transition-colors"><I className="w-4 h-4" /></a>)}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm text-text-secondary">
            {['Home','Movies','TV Shows','Genres','Request'].map(l => <a key={l} href="#" className="block hover:text-accent transition-colors">{l}</a>)}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-4">Help</h4>
          <div className="space-y-2 text-sm text-text-secondary">
            {['FAQ','Contact Us','DMCA','Privacy Policy','Terms'].map(l => <a key={l} href="#" className="block hover:text-accent transition-colors">{l}</a>)}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-4">Stay Updated</h4>
          <p className="text-sm text-text-secondary mb-3">Get notified when new movies drop.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-start transition-colors" />
            <button className="px-4 bg-cta hover:bg-red-700 rounded-lg text-sm font-bold transition-colors">Join</button>
          </div>
        </div>
      </div>
      <div className="text-center text-text-secondary text-xs border-t border-white/5 pt-6">© 2026 MOVIEVERSE. All rights reserved.</div>
    </footer>
  )
}