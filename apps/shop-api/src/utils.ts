import { ProductDTO, Tag, UserDTO } from '@e-shop/shared'
import { UserEntity } from './models/user'
import { ProductEntity } from './models/product'

/**
 * 将 ProductEntity 转换为 ProductDTO
 * 计算动态 tags 字段
 */
export function toProductDTO(entity: ProductEntity): ProductDTO {
  const tags: Tag[] = []
  const now = new Date()
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))

  // New: 上架时间 < 1个月
  if (new Date(entity.createdAt) < oneMonthAgo) {
    tags.push('New')
  }

  // Hot: 销量 > 100
  if (entity.sales > 100) {
    tags.push('Hot')
  }

  // Sale: 有原价且原价 > 现价
  if (entity.originalPrice && entity.originalPrice > entity.price) {
    tags.push('Sale')
  }

  return { ...entity, tags }
}

/**
 * 将 UserEntity 转换为 UserDTO
 * 移除敏感信息 (password)
 */
export function toUserDTO(entity: UserEntity): UserDTO {
  const { password, ...dto } = entity
  return dto
}
