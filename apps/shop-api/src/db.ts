import { generateProducts } from './mocks/mock_products'
import { generateUsers } from './mocks/mock_user'

export const DB = {
  products: generateProducts(100),
  users: generateUsers(10),
}
