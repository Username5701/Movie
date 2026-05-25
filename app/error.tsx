// app/error.tsx
'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => console.error(error), [error])
  return (
    <div className="min-h-screen flex items-center justify-center bg-deep">
      <div className="text-center p-8 bg-surface rounded-2xl max-w-md">
        <h2 className="text-2xl font-heading font-bold mb-2">Something went wrong</h2>
        <p className="text-text-secondary mb-4">{error.message}</p>
        <button onClick={reset} className="px-6 py-2 bg-primary-start hover:bg-primary-end rounded-full font-bold transition-colors">Try Again</button>
      </div>
    </div>
  )
}