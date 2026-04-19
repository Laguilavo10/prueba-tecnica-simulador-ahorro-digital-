import type { ProductFilters, ProductType, SavingsProduct } from "./product";

export const PRODUCTS_REPOSITORY = Symbol("PRODUCTS_REPOSITORY");

export interface ProductsRepository {
  findAll(): SavingsProduct[];
  findByFilters(filters: ProductFilters): SavingsProduct[];
  getAvailableTypes(): ProductType[];
}
