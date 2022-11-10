import { faker } from '@faker-js/faker';
faker.locale = 'es'

export default function generateProduct() {
  return {
    title: faker.commerce.productName(),
    price: faker.random.numeric(6),
    thumbnail: faker.image.business(320, 240, true),
  }
}