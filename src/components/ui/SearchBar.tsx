import React from 'react'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  onClear?: () => void
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = "",
  onClear 
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-neutral-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-3 border border-neutral-200 rounded-2xl bg-white text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-neutral-400 hover:text-neutral-600" />
        </button>
      )}
    </div>
  )
}