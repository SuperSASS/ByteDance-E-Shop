import { LocalizedString, MainCategory, Attributes } from '@e-shop/shared'

export interface ProductEntity {
  id: string
  name: LocalizedString
  description: LocalizedString
  price: number
  originalPrice?: number
  rating: number
  sales: number
  image: string
  images: string[]
  mainCategory: MainCategory
  attributes: Attributes
  stock: number
  createdAt: string
}
