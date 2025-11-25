import { PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface EmptyProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function Empty({ title, description, actionLabel, onAction, className }: EmptyProps) {
  return (
    <div
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg p-8 text-center',
        className
      )}
    >
      <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
        <PackageOpen className="text-muted-foreground h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
