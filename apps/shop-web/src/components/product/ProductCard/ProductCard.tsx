import type { ProductDTO } from '@e-shop/shared'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { HeartIcon, ShoppingCartIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'
import { getTagColor } from './ProductCard.util'

interface ProductCardProps {
  product: ProductDTO
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation()
  const currentLang = (
    i18n.language in product.name ? i18n.language : 'zh'
  ) as keyof typeof product.name

  return (
    <Card className="group overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name[currentLang]}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.tags.map((tag) => (
            <Badge
              key={tag}
              className={cn('border-none px-1.5 py-0.5 text-[10px] text-white', getTagColor(tag))}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-3 pb-2">
        <div className="mb-1">
          <h3 className="line-clamp-1 text-sm font-medium" title={product.name[currentLang]}>
            {product.name[currentLang]}
          </h3>
          <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
            {product.description[currentLang]}
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-2 p-3 pt-0">
        {/* Price & Sold Row */}
        <div className="flex w-full items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-primary text-lg font-bold">${product.price.toFixed(0)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-xs line-through">
                ${product.originalPrice.toFixed(0)}
              </span>
            )}
          </div>
          <span className="text-muted-foreground text-xs">
            {
              t('product.sold', {
                count: product.sales > 1000 ? '1k+' : product.sales,
              } as any) as string
            }
          </span>
        </div>

        {/* Action Row */}
        <div className="flex w-full gap-2">
          <Button className="h-9 flex-1 gap-2 text-xs font-medium" size="sm">
            <ShoppingCartIcon className="h-3.5 w-3.5" />
            {t('product.addToCart')}
          </Button>
          <Button size="icon" variant="outline" className="h-9 w-9 shrink-0">
            <HeartIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
