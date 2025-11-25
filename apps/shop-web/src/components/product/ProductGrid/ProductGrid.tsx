import type { ProductDTO } from '@e-shop/shared'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton'
import { useTranslation } from 'react-i18next'

interface ProductGridProps {
  products: ProductDTO[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
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
    // 结果为空
    // TODO: [Lv.3] 更改为 Empty 组件形式
    return (
      <div className="text-muted-foreground flex h-96 items-center justify-center">
        <p>{t('noProducts')}</p>
      </div>
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
