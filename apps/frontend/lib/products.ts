import productsData from '@/data/products.json'
import type { ProductType, SavingsProduct } from '@/types/products'

const PRODUCT_TYPES: ProductType[] = ['digital', 'tradicional', 'programado']

const PRODUCTS: SavingsProduct[] = productsData as SavingsProduct[]

export function getAvailableTypes(): ProductType[] {
  return PRODUCT_TYPES
}

export function getAllProducts(): SavingsProduct[] {
  return PRODUCTS
}

interface ProductFilters {
  name?: string
  type?: string
}

export function filterProducts(filters: ProductFilters): SavingsProduct[] {
  const normalizedName = filters.name?.trim().toLowerCase() ?? ''
  const normalizedType = filters.type?.trim().toLowerCase() ?? ''

  return PRODUCTS.filter((product) => {
    const matchesName =
      normalizedName.length === 0 ||
      product.name.toLowerCase().includes(normalizedName)

    const matchesType =
      normalizedType.length === 0 ||
      product.type.toLowerCase() === normalizedType

    return matchesName && matchesType
  })
}
