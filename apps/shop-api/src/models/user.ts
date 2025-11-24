/**
 * 用户实体 - 数据库存储
 */
export interface UserEntity {
  id: number
  email: string
  name: string
  password: string // 实际应用中应该是 hash
  avatar?: string
}
