import type { ReactNode } from 'react'
import type { WordCard as DictionaryWordCard } from './dictionary'

// Button component props
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

// Badge component props
export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
  children: ReactNode
}

// Word card component props
export interface WordCardProps {
  word: string
  translation?: string
  definition?: string
  type: 'suggestion' | 'voting' | 'dictionary'
  bgColor?: string
  borderColor?: string
  tagColor?: string
  tagText?: string
  votes?: number
  onAction?: () => void
  actionText?: string
  actionIcon?: React.ReactNode
  className?: string
}

// Search bar component props
export interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (query: string) => void
  className?: string
}

// Social button component props
export interface SocialButtonProps {
  provider: 'google' | 'apple' | 'facebook'
  type: 'signin' | 'signup'
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  className?: string
}

// Navigation item props
export interface NavItemProps {
  href: string
  label: string
  icon?: ReactNode
  isActive?: boolean
  onClick?: () => void
}

// Layout component props
export interface LayoutProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'auth' | 'home'
  backgroundGradient?: boolean
  showNavigation?: boolean
}

// Protected route props
export interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
}

// Responsive navigation props
export interface ResponsiveNavigationProps {
  items: NavItemProps[]
  className?: string
}

// Form field context value
export type FormFieldContextValue<
  TFieldValues extends Record<string, any> = Record<string, any>,
  TName extends string = string,
> = {
  name: TName
}

// Form item context value
export type FormItemContextValue = {
  id: string
}

// Toaster props
export type ToasterProps = {
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  toastOptions?: any
  richColors?: boolean
  closeButton?: boolean
  className?: string
}

// Verification state type
export type VerificationState = 'initial' | 'error' | 'resent'
