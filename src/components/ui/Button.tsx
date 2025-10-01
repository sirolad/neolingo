'use client'

import React, { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'social'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const baseClasses = [
      'inline-flex items-center justify-center',
      'font-semibold transition-all duration-200',
      'focus:outline-none focus:ring-0',
      'relative overflow-hidden',
      'active:scale-[0.98]',
    ]

    const variantClasses = {
      primary: [
        'bg-primary-600 text-white shadow-lg',
        'hover:bg-primary-700 hover:shadow-xl',
        'focus:bg-primary-700 focus:shadow-xl',
        'disabled:bg-neutral-300 disabled:text-neutral-500',
        'disabled:shadow-none disabled:cursor-not-allowed',
      ],
      secondary: [
        'bg-neutral-100 text-neutral-900 border border-neutral-200',
        'hover:bg-neutral-200 hover:border-neutral-300',
        'focus:bg-neutral-200 focus:border-neutral-300',
        'disabled:bg-neutral-100 disabled:text-neutral-400',
        'disabled:border-neutral-200 disabled:cursor-not-allowed',
      ],
      outline: [
        'bg-transparent text-primary-800 border border-primary-800',
        'hover:bg-primary-50 hover:border-primary-900',
        'focus:bg-primary-50 focus:border-primary-900',
        'disabled:text-neutral-400 disabled:border-neutral-300',
        'disabled:cursor-not-allowed',
      ],
      ghost: [
        'bg-transparent text-neutral-700',
        'hover:bg-neutral-100',
        'focus:bg-neutral-100',
        'disabled:text-neutral-400 disabled:cursor-not-allowed',
      ],
      social: [
        'bg-white text-neutral-900 border border-neutral-200 shadow-sm',
        'hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-md',
        'focus:bg-neutral-50 focus:border-neutral-300 focus:shadow-md',
        'disabled:bg-neutral-100 disabled:text-neutral-400',
        'disabled:border-neutral-200 disabled:cursor-not-allowed',
      ],
    }

    const sizeClasses = {
      sm: 'h-9 px-4 text-sm rounded-lg gap-2',
      md: 'h-10 px-4 text-sm rounded-lg gap-2',
      lg: 'h-12 px-6 text-base rounded-xl gap-3', // Matches Figma button height
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          // Force text to be visible
          variant === 'primary' && '!text-white btn-primary',
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        )}

        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="flex-shrink-0">
            {leftIcon}
          </span>
        )}

        {/* Button text */}
        {children}

        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export default Button