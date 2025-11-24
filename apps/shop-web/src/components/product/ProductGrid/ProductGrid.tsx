import type { Product } from '@/models/Product'
import { ProductCard } from '../ProductCard/ProductCard'
import { useTranslation } from 'react-i18next'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  const { t } = useTranslation('product')

  // TODO: [Lv.2] 更改为 Spinner 组件形式
  if (isLoading) {
    return <div>{t('loadingProducts')}</div>
  }

  return products.length === 0 ? (
    // 结果为空
    // TODO: [Lv.3] 更改为 Empty 组件形式
    <div className="py-12 text-center">
      <p className="text-muted-foreground text-lg">{t('noProducts')}</p>
    </div>
  ) : (
    // TODO: [Lv. 2] 支持每页展示个数的修改
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
