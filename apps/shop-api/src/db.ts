import { generateProducts } from './mocks/mock_products'
import { generateUsers } from './mocks/mock_user'

/**
 * 模拟数据库
 */
export const DB = {
  products: generateProducts(100), // ProductEntity[]
  users: generateUsers(), // UserEntity[]
}
