import type { ProductDTO } from '@e-shop/shared'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import { Empty } from '@/components/ui/Empty'
import { useTranslation } from 'react-i18next'

interface ProductGridProps {
  products: ProductDTO[]
  isLoading?: boolean
  onResetFilters?: () => void
}

export function ProductGrid({ products, isLoading, onResetFilters }: ProductGridProps) {
  const { t } = useTranslation('product')

  // 加载状态，展示骨架屏
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <Empty
        title={t('noProductsTitle')}
        description={t('noProductsDescription')}
        actionLabel={t('resetFilters')}
        onAction={onResetFilters}
      />
    )
  }

  // TODO: [Lv. 2] 支持每页展示个数的修改
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
