import type { LoginRequest, LoginResponse, UserDTO } from '@e-shop/shared'

const API_URL = '/api'

export const authService = {
  /**
   * 登录
   *
   * 这里简化了流程，明文传输密码。
   * 后续需要考虑加密。
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return response.json()
  },

  /**
   * 获取当前用户信息
   */
  async getCurrentUser(token: string): Promise<UserDTO> {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get current user')
    }

    return response.json()
  },
}
