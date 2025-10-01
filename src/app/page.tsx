'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to splash screen
    router.push('/splash')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-800 mx-auto mb-4"></div>
        <p className="text-neutral-600">Redirecting to Neolingo...</p>
      </div>
    </div>
  )
}
