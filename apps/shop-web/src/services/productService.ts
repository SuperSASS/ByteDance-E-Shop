import type { ProductDTO, ProductFilterParams, ProductListResponse } from '@e-shop/shared'

const API_URL = '/api'

export const productService = {
  async getProducts(params: ProductFilterParams): Promise<ProductListResponse> {
    const query = new URLSearchParams()

    if (params.keyword) query.append('keyword', params.keyword)
    if (params.category) query.append('category', params.category)
    if (params.minPrice) query.append('minPrice', params.minPrice.toString())
    if (params.maxPrice) query.append('maxPrice', params.maxPrice.toString())
    if (params.minRating) query.append('minRating', params.minRating.toString())
    if (params.sort) query.append('sort', params.sort)
    if (params.page) query.append('page', params.page.toString())
    if (params.pageSize) query.append('pageSize', params.pageSize.toString())

    if (params.tags) {
      params.tags.forEach((tag) => query.append('tags', tag))
    }

    if (params.attributes) {
      Object.entries(params.attributes).forEach(([key, value]) => {
        if (value) query.append(key, value)
      })
    }

    const response = await fetch(`${API_URL}/products?${query.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  async getProductById(id: string): Promise<ProductDTO | undefined> {
    const response = await fetch(`${API_URL}/products/${id}`)
    if (!response.ok) {
      return undefined
    }
    return response.json()
  },
}
