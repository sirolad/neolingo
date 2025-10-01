'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ResponsiveNavigation } from './ResponsiveNavigation'

export interface LayoutProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'auth' | 'home'
  backgroundGradient?: boolean
  showNavigation?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  variant = 'default',
  backgroundGradient = false,
  showNavigation = true,
}) => {
  const pathname = usePathname()
  
  // Determine if navigation should be shown based on current route
  const hideNavigationRoutes = ['/signin', '/signup', '/splash']
  const shouldShowNavigation = showNavigation && 
    !hideNavigationRoutes.some(route => pathname?.startsWith(route)) &&
    !pathname?.startsWith('/onboarding') &&
    !pathname?.startsWith('/email-verification')

  const getVariantClasses = () => {
    switch (variant) {
      case 'auth':
        return [
          'min-h-screen bg-white',
          'flex flex-col',
          'relative overflow-hidden',
        ]
      case 'home':
        return [
          'min-h-screen bg-neutral-50',
          'flex flex-col',
        ]
      default:
        return [
          'min-h-screen bg-white',
          'flex flex-col',
        ]
    }
  }

  const backgroundClasses = backgroundGradient ? [
    'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  ] : []

  return (
    <div className={cn(
      getVariantClasses(),
      backgroundClasses,
      className
    )}>
      {/* Responsive Navigation */}
      {shouldShowNavigation && <ResponsiveNavigation />}

      {/* Main Content */}
      <main className={cn(
        'flex-1 flex flex-col',
        variant === 'auth' && 'px-6 py-8',
        variant === 'home' && !shouldShowNavigation && 'px-4 py-4',
        variant === 'home' && shouldShowNavigation && 'md:px-0 md:py-0',  // Remove padding on desktop when nav is present
        shouldShowNavigation && 'pb-20 md:pb-0', // Add bottom padding for mobile nav
      )}>
        {children}
      </main>

      {/* Background Pattern for Auth Pages */}
      {variant === 'auth' && (
        <>
          {/* Subtle background decoration */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-30 -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-50 rounded-full blur-3xl opacity-20 translate-y-24 -translate-x-24" />
          </div>
        </>
      )}
    </div>
  )
}

export { Layout }
export default Layout
