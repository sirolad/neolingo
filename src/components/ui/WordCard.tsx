import React from 'react'
import { Button } from './Button'
import type { WordCardProps } from '@/types'

export function WordCard({
  word,
  translation,
  definition,
  bgColor = 'bg-neutral-50',
  borderColor = 'border-neutral-200',
  tagColor = 'bg-neutral-100 text-neutral-800',
  tagText,
  votes,
  onAction,
  actionText,
  actionIcon,
  className = ''
}: WordCardProps) {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {tagText && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${tagColor}`}>
              {tagText}
            </div>
          )}
          {votes !== undefined && (
            <div className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
              {votes} votes
            </div>
          )}
        </div>
        {onAction && actionText && (
          <Button
            variant="primary"
            size="sm"
            onClick={onAction}
            leftIcon={actionIcon}
            className="h-8 px-4 rounded-2xl text-xs font-medium"
          >
            {actionText}
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-neutral-950">
          {word}
        </h3>
        {translation && (
          <p className="text-lg text-neutral-700 font-medium">
            {translation}
          </p>
        )}
        {definition && (
          <p className="text-sm text-neutral-600">
            {definition}
          </p>
        )}
      </div>
    </div>
  )
}