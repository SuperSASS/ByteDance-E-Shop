export interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  max?: number
  className?: string
  iconClassName?: string
}
