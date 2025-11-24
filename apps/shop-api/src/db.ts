import { generateProducts } from './mocks/mock_products'
import { generateUsers } from './mocks/mock_user'

/**
 * 模拟数据库
 */
export const DB = {
  products: generateProducts(100), // ProductEntity[]
  users: [
    {
      id: 1,
      email: 'admin@admin.com',
      name: 'Admin User',
      password: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
    ...generateUsers(10),
  ], // UserEntity[]
}
