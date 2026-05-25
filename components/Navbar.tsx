'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Moon, Sun, Download, Menu, X, Home, Film, Tv, Tag, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/browse?type=movie', label: 'Movies', icon: Film },
  { href: '/browse?type=tv', label: 'TV Shows', icon: Tv },
  { href: '/genres', label: 'Genres', icon: Tag },
  { href: '/faq', label: 'FAQ', icon: HelpCircle }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-deep/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-primary-start to-accent flex items-center justify-center shadow-lg shadow-primary-start/40">
            <Film className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-accent hidden sm:block">MOVIEVERSE</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors relative group ${pathname === link.href ? 'text-accent' : 'text-text-secondary hover:text-white'}`}>
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 text-text-secondary" />
          </div>
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cta rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2"><Menu className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-64 bg-surface z-50 p-6 pt-20 shadow-2xl">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-2"><X className="w-6 h-6" /></button>
            <div className="space-y-4">
              {links.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${pathname === link.href ? 'bg-primary-start/20 text-accent' : 'text-text-secondary hover:bg-white/5'}`}>
                  <link.icon className="w-5 h-5" /> {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </nav>
  )
}