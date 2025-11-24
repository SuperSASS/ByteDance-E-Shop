import type { LocalizedString } from '../common/types'

// ==================== 常量定义 ====================

export const MAIN_CATEGORIES = ['PC', 'Phone', 'Tablet', 'Audio', 'Accessories'] as const

export const PC_TYPES = ['Gaming', 'Business', 'Ultrabook', 'Workstation'] as const
export const PC_CPUS = [
  'Intel i5',
  'Intel i7',
  'Intel i9',
  'AMD Ryzen 5',
  'AMD Ryzen 7',
  'AMD Ryzen 9',
  'Apple M2',
  'Apple M3',
] as const
export const PC_RAMS = ['8GB', '16GB', '32GB', '64GB'] as const
export const PC_GPUS = [
  'NVIDIA RTX 3060',
  'NVIDIA RTX 4060',
  'NVIDIA RTX 4070',
  'NVIDIA RTX 4080',
  'Integrated',
] as const

export const PHONE_BRANDS = ['Apple', 'Samsung', 'Google', 'Xiaomi'] as const
export const PHONE_SERIES = ['Air', 'Pro', 'Ultra', 'Fold'] as const
export const PHONE_STORAGE = ['128GB', '256GB', '512GB', '1TB'] as const

export const TABLET_BRANDS = ['Apple', 'Samsung', 'Lenovo'] as const
export const TABLET_SIZES = ['8-inch', '10-inch', '11-inch', '12.9-inch'] as const
export const TABLET_CONNECTIVITY = ['Wi-Fi', 'Wi-Fi + Cellular'] as const

export const AUDIO_TYPES = ['Headphones', 'Earbuds', 'Speakers'] as const
export const AUDIO_CONNECTIVITY = ['Bluetooth', 'Wired'] as const
export const AUDIO_FEATURES = ['Noise Cancelling', 'Standard'] as const

export const ACCESSORY_TYPES = ['Case', 'Charger', 'Cable', 'Keyboard', 'Mouse'] as const
export const ACCESSORY_COMPATIBILITY = ['Universal', 'Apple', 'USB-C'] as const

export const TAGS = ['New', 'Hot', 'Sale'] as const

// ==================== 类型定义 ====================

export type MainCategory = (typeof MAIN_CATEGORIES)[number]

export type SubCategories = {
  PC: {
    type: (typeof PC_TYPES)[number]
    cpu: (typeof PC_CPUS)[number]
    ram: (typeof PC_RAMS)[number]
    gpu?: (typeof PC_GPUS)[number]
  }
  Phone: {
    brand: (typeof PHONE_BRANDS)[number]
    series: (typeof PHONE_SERIES)[number]
    storage: (typeof PHONE_STORAGE)[number]
  }
  Tablet: {
    brand: (typeof TABLET_BRANDS)[number]
    size: (typeof TABLET_SIZES)[number]
    connectivity: (typeof TABLET_CONNECTIVITY)[number]
  }
  Audio: {
    type: (typeof AUDIO_TYPES)[number]
    connectivity: (typeof AUDIO_CONNECTIVITY)[number]
    features: (typeof AUDIO_FEATURES)[number]
  }
  Accessories: {
    type: (typeof ACCESSORY_TYPES)[number]
    compatibility: (typeof ACCESSORY_COMPATIBILITY)[number]
  }
}

export type Attributes = SubCategories[MainCategory]

export type Tag = (typeof TAGS)[number]

// ==================== DTO (API 传输) ====================

/**
 * 商品 DTO - API 传输使用
 * 包含计算后的字段 (如 tags)
 */
export interface ProductDTO {
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
  attributes:
    | SubCategories['PC']
    | SubCategories['Phone']
    | SubCategories['Tablet']
    | SubCategories['Audio']
    | SubCategories['Accessories']
  stock: number
  createdAt: string
  tags: Tag[] // 由后端根据 sales, createdAt, originalPrice 等计算
}

// ==================== Request/Response ====================

/**
 * 商品筛选参数
 */
export interface ProductFilterParams {
  keyword?: string
  category?: MainCategory
  tags?: Tag[]
  attributes?: Record<string, string>
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sort?: 'price_asc' | 'price_desc' | 'sales_asc' | 'sales_desc' | 'newest' | 'oldest'
  page?: number
  pageSize?: number
}

/**
 * 商品列表响应
 */
export interface ProductListResponse {
  items: ProductDTO[]
  total: number
  page: number
  pageSize: number
}
