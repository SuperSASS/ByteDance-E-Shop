import { useState } from 'react'
import { StarIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { StarRatingProps } from './StarRating.types'

export function StarRating({
  value,
  onChange,
  max = 5,
  readOnly = false,
  className,
  iconClassName,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const displayValue = hoverValue !== null ? hoverValue : value

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (readOnly) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isHalf = x < rect.width / 2
    setHoverValue(index + (isHalf ? 0.5 : 1))
  }

  const handleClick = (index: number, isHalf: boolean) => {
    if (readOnly || !onChange) return
    onChange(index + (isHalf ? 0.5 : 1))
  }

  return (
    <div className={cn('flex items-center', className)} onMouseLeave={() => setHoverValue(null)}>
      {Array.from({ length: max }).map((_, index) => {
        const filled = displayValue >= index + 1
        const half = displayValue === index + 0.5

        return (
          <div
            key={index}
            role="button"
            aria-label={`${index + 1} stars`}
            className={cn('relative p-0.5', !readOnly && 'cursor-pointer')}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              handleClick(index, x < rect.width / 2)
            }}
          >
            <StarIcon
              className={cn(
                'h-5 w-5 transition-colors',
                filled ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30',
                iconClassName
              )}
            />
            {half && (
              <div className="absolute inset-0 top-0.5 left-0.5 w-[10px] overflow-hidden">
                <StarIcon
                  className={cn('h-5 w-5 fill-yellow-400 text-yellow-400', iconClassName)}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
