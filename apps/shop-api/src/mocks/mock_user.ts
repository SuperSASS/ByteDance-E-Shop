import { faker } from '@faker-js/faker'
import { UserEntity } from '../models/user'

faker.seed(123)

export const generateUsers = (count: number): UserEntity[] => {
  let id = 100
  return Array.from({ length: count }).map(() => {
    return {
      id: id++,
      email: faker.internet.email(),
      name: faker.person.firstName(),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
    }
  })
}
