'use client'

import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  leftIcon?: 'email' | 'password' | React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  showPasswordToggle?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      variant = 'default',
      size = 'lg',
      showPasswordToggle,
      type: initialType,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const type = initialType === 'password' && showPassword ? 'text' : initialType

    const renderIcon = (icon: 'email' | 'password' | React.ReactNode) => {
      if (React.isValidElement(icon)) return icon

      switch (icon) {
        case 'email':
          return <Mail className="w-4 h-4 text-neutral-400" />
        case 'password':
          return <Lock className="w-4 h-4 text-neutral-400" />
        default:
          return null
      }
    }

    const sizeClasses = {
      sm: 'h-10 px-3 text-sm',
      md: 'h-11 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    }

    const labelSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
    }

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className={cn(
            'block mb-2 font-medium text-neutral-700',
            labelSizeClasses[size],
            disabled && 'text-neutral-400'
          )}>
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              {renderIcon(leftIcon)}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              // Base styles
              'w-full border transition-all duration-200 outline-none',
              'placeholder:text-neutral-400 text-neutral-900',
              'focus:ring-0',
              
              // Size variations
              sizeClasses[size],
              
              // Border radius from Figma
              'rounded-lg',
              
              // Left icon spacing
              leftIcon && 'pl-10',
              
              // Right icon/content spacing
              (rightIcon || showPasswordToggle || initialType === 'password') && 'pr-10',
              
              // Variant styles
              variant === 'default' && [
                'bg-white border-neutral-200',
                'hover:border-neutral-300',
                'focus:border-primary-500 focus:bg-white',
                isFocused && 'border-primary-500',
              ],
              
              variant === 'filled' && [
                'bg-neutral-50 border-neutral-200',
                'hover:bg-neutral-100 hover:border-neutral-300',
                'focus:bg-white focus:border-primary-500',
                isFocused && 'bg-white border-primary-500',
              ],
              
              // State styles
              error && 'border-error-500 focus:border-error-500',
              success && 'border-success-500 focus:border-success-500',
              disabled && 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed',
              
              className
            )}
            {...props}
          />

          {/* Right Icon or Password Toggle */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            {initialType === 'password' && showPasswordToggle !== false ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-0.5"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            ) : rightIcon ? (
              renderIcon(rightIcon)
            ) : null}
          </div>
        </div>

        {/* Helper Text or Error */}
        {(helperText || error) && (
          <div className={cn(
            'mt-1.5 text-xs',
            error ? 'text-error-600' : 'text-neutral-500'
          )}>
            {error || helperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export default Input