import { faker } from '@faker-js/faker'
import { v1 as uuid } from 'uuid'

export const generateFakeUser = () => {
  return {
    _id: uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
  }
}
