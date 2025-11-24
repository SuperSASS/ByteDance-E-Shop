import type { Product } from '@/models/Product'

/**
 * 获取商品的 Tag
 */
export const getTags = (product: Product) => {
  const tags = []
  const now = new Date()
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))

  if (new Date(product.createdAt) > oneMonthAgo) tags.push({ label: 'New', color: 'bg-blue-500' })
  if (product.sales > 100) tags.push({ label: 'Hot', color: 'bg-red-500' })
  if (product.originalPrice && product.originalPrice > product.price)
    tags.push({ label: 'Sale', color: 'bg-orange-500' })

  return tags
}
