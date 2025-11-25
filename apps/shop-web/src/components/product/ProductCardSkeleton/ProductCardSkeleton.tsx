import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function ProductCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden border-none py-0 shadow-sm">
      {/* Image Skeleton */}
      <CardHeader className="p-0">
        <Skeleton className="aspect-[4/3] w-full rounded-none" />
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="p-3">
        {/* Title & Description */}
        <div className="mb-2">
          <Skeleton className="mb-1 h-4 w-3/4" />
          <Skeleton className="mb-1 h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        {/* Rating & Date */}
        <div className="flex flex-wrap items-center justify-between gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="flex flex-col gap-2 p-3 pt-0">
        {/* Price & Sold */}
        <div className="flex w-full items-baseline justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9 shrink-0" />
        </div>
      </CardFooter>
    </Card>
  )
}
