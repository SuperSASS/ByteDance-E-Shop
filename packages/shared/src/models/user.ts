// ==================== DTO (API 传输) ====================

/**
 * 用户 DTO - API 传输使用
 */
export interface UserDTO {
  id: number
  email: string
  name: string
  avatar?: string
}

// ==================== Request/Response ====================

/**
 * 登录请求
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * 登录响应
 */
export interface LoginResponse {
  user: UserDTO
  token: string
}

/**
 * 认证错误响应
 */
export interface AuthErrorResponse {
  message: string
}
