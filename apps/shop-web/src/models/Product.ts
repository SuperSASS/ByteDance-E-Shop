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

// Helper type to get sub-category keys for a given main category
export type SubCategoryKeys<T extends MainCategory> = keyof SubCategories[T]

export type Tag = (typeof TAGS)[number]

// i18n
import config from '@/i18n/config.json'

export type LanguageCode = (typeof config.languages)[number]['code']
export type LocalizedString = Record<LanguageCode, string>

// 商品模型
export interface Product {
  id: string
  name: LocalizedString // 名称 (i18n)
  description: LocalizedString // 描述 (i18n)
  price: number // 当前价格
  originalPrice?: number // 原始价格（如果当前为折扣价，则存在该属性）
  rating: number // 评分
  sales: number // 销量（当月）
  image: string // 主图
  images: string[] // 详情图

  mainCategory: MainCategory // 主类别
  attributes:
    | SubCategories['PC']
    | SubCategories['Phone']
    | SubCategories['Tablet']
    | SubCategories['Audio']
    | SubCategories['Accessories'] // 主类别下的属性

  createdAt: string // 上架时间
}

// 商品筛选参数
export interface ProductFilterParams {
  keyword?: string
  category?: MainCategory
  tags?: Tag[]
  // 属性筛选（例如，{ cpu: 'Intel i7' }）
  attributes?: Record<string, string>
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sort?: 'price_asc' | 'price_desc' | 'sales_asc' | 'sales_desc' | 'newest' | 'oldest'
  page?: number
  pageSize?: number
}

// 商品查询响应
export interface ProductResponse {
  items: Product[]
  total: number
  page: number
  pageSize: number
}
