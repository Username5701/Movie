import type { Metadata } from 'next'
import { Inter, Montserrat, Poppins, Space_Mono } from 'next/font/google'
import './globals.css'
import StarField from '@/components/StarField'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['700','800','900'], variable: '--font-heading' })
const poppins = Poppins({ subsets: ['latin'], weight: ['600'], variable: '--font-title' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400','700'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'MOVIEVERSE | Your Universe of Unlimited Entertainment',
  description: 'Stream and download thousands of movies and TV shows for free.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${spaceMono.variable} bg-deep text-white font-body antialiased`}>
        <StarField />
        {children}
      </body>
    </html>
  )
}