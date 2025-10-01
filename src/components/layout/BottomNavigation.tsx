import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { TrendingUp, Vote, Lightbulb, Book } from 'lucide-react'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  onClick: () => void
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
        active 
          ? 'text-primary-800 bg-primary-50' 
          : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Home',
      href: '/home'
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      label: 'Suggest',
      href: '/suggest'
    },
    {
      icon: <Vote className="w-5 h-5" />,
      label: 'Vote',
      href: '/vote'
    },
    {
      icon: <Book className="w-5 h-5" />,
      label: 'Dictionary',
      href: '/dictionary'
    }
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-around"
    >
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          icon={item.icon}
          label={item.label}
          href={item.href}
          active={pathname === item.href}
          onClick={() => handleNavigation(item.href)}
        />
      ))}
    </motion.nav>
  )
}