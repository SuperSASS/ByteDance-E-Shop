import { faker, fakerEN, fakerZH_CN } from '@faker-js/faker'
import {
  type Product,
  type MainCategory,
  type SubCategories,
  MAIN_CATEGORIES,
  PC_TYPES,
  PC_CPUS,
  PC_RAMS,
  PC_GPUS,
  PHONE_BRANDS,
  PHONE_SERIES,
  PHONE_STORAGE,
  TABLET_BRANDS,
  TABLET_SIZES,
  TABLET_CONNECTIVITY,
  AUDIO_TYPES,
  AUDIO_CONNECTIVITY,
  AUDIO_FEATURES,
  ACCESSORY_TYPES,
  ACCESSORY_COMPATIBILITY,
} from '../../../shop-web/src/models/Product'

faker.seed(123)

// 根据 mainCategory 随机生成对应 attributes
const generateAttributes = (category: MainCategory): Product['attributes'] => {
  switch (category) {
    case 'PC':
      return {
        type: faker.helpers.arrayElement(PC_TYPES),
        cpu: faker.helpers.arrayElement(PC_CPUS),
        ram: faker.helpers.arrayElement(PC_RAMS),
        gpu: faker.helpers.arrayElement(PC_GPUS),
      } as SubCategories['PC']
    case 'Phone':
      return {
        brand: faker.helpers.arrayElement(PHONE_BRANDS),
        series: faker.helpers.arrayElement(PHONE_SERIES),
        storage: faker.helpers.arrayElement(PHONE_STORAGE),
      } as SubCategories['Phone']
    case 'Tablet':
      return {
        brand: faker.helpers.arrayElement(TABLET_BRANDS),
        size: faker.helpers.arrayElement(TABLET_SIZES),
        connectivity: faker.helpers.arrayElement(TABLET_CONNECTIVITY),
      } as SubCategories['Tablet']
    case 'Audio':
      return {
        type: faker.helpers.arrayElement(AUDIO_TYPES),
        connectivity: faker.helpers.arrayElement(AUDIO_CONNECTIVITY),
        features: faker.helpers.arrayElement(AUDIO_FEATURES),
      } as SubCategories['Audio']
    case 'Accessories':
      return {
        type: faker.helpers.arrayElement(ACCESSORY_TYPES),
        compatibility: faker.helpers.arrayElement(ACCESSORY_COMPATIBILITY),
      } as SubCategories['Accessories']
    default:
      throw new Error(`Unknown category: ${category}`)
  }
}

// 生成 mock 商品数据
const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }).map(() => {
    const mainCategory = faker.helpers.arrayElement(MAIN_CATEGORIES)
    const price = parseFloat(faker.commerce.price({ min: 20, max: 3000 }))

    return {
      id: faker.string.uuid(),
      name: {
        zh: fakerZH_CN.commerce.productName(),
        en: fakerEN.commerce.productName(),
      },
      description: {
        zh: fakerZH_CN.commerce.productDescription(),
        en: fakerEN.commerce.productDescription(),
      },
      price: price,
      originalPrice: faker.datatype.boolean()
        ? price * faker.helpers.arrayElement([1.2, 1.4, 1.6])
        : undefined,
      rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
      sales: faker.number.int({ min: 0, max: 2000 }),
      image: faker.image.url(),
      images: [faker.image.url(), faker.image.url()],
      mainCategory,
      attributes: generateAttributes(mainCategory),
      stock: faker.number.int({ min: 0, max: 100 }),
      createdAt: faker.date.past().toISOString(),
    }
  })
}

export { generateProducts }
