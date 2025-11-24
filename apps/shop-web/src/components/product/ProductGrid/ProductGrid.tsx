import { ProductCard } from '../ProductCard'
import type { ProductDTO } from '@e-shop/shared'

interface ProductGridProps {
  products: ProductDTO[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    // TODO: [Lv.2] 更改为 Spinner 组件形式
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-muted h-96 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    // 结果为空
    // TODO: [Lv.3] 更改为 Empty 组件形式
    return (
      <div className="text-muted-foreground flex h-96 items-center justify-center">
        <p>No products found</p>
      </div>
    )
  }

  // TODO: [Lv. 2] 支持每页展示个数的修改
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
