/**
 * 通用类型定义
 */

/**
 * 国际化字符串
 * 键为语言代码,值为对应语言的文本
 */
export type LocalizedString = Record<string, string>

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page?: number
  pageSize?: number
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
