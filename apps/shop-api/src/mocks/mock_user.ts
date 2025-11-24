import { faker } from '@faker-js/faker'

export const generateUsers = (count: number) => {
  let id = 1
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
