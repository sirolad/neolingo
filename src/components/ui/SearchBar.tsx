import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onClear,
  iconPosition = 'left',
  rounded = false,
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      {iconPosition === 'left' && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
      )}
      {iconPosition === 'right' && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
      )}
      <input
        type="text"
        className={`block w-full pl-10 pr-10 py-3 border border-neutral-200 dark:border-neutral-700 ${rounded ? 'rounded-full' : 'rounded-2xl'} bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
        </button>
      )}
    </div>
  );
}
