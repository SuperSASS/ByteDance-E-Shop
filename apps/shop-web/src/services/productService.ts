import type { ProductDTO, ProductListResponse } from '@e-shop/shared'

const API_URL = '/api'

export const productService = {
  async getProducts(params: URLSearchParams): Promise<ProductListResponse> {
    const response = await fetch(`${API_URL}/products?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return response.json()
  },

  async getProductById(id: string): Promise<ProductDTO | undefined> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    if (!response.ok) {
      return undefined
    }
    return response.json()
  },
}
