export interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  max?: number
  readOnly?: boolean
  className?: string
  iconClassName?: string
}
