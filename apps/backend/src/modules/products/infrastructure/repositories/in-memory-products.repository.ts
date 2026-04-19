import { Injectable } from "@nestjs/common";

import type {
  ProductFilters,
  ProductType,
  SavingsProduct,
} from "../../domain/product";
import type { ProductsRepository } from "../../domain/products.repository";
import productsData from "../data/products.json";

const PRODUCT_TYPES: ProductType[] = ["digital", "tradicional", "programado"];

@Injectable()
export class InMemoryProductsRepository implements ProductsRepository {
  private readonly products = productsData as SavingsProduct[];

  findAll(): SavingsProduct[] {
    return this.products;
  }

  getAvailableTypes(): ProductType[] {
    return PRODUCT_TYPES;
  }

  findByFilters(filters: ProductFilters): SavingsProduct[] {
    const normalizedName = filters.name?.trim().toLowerCase() ?? "";
    const normalizedType = filters.type?.trim().toLowerCase() ?? "";

    return this.products.filter((product) => {
      const matchesName =
        normalizedName.length === 0 ||
        product.name.toLowerCase().includes(normalizedName);

      const matchesType =
        normalizedType.length === 0 ||
        product.type.toLowerCase() === normalizedType;

      return matchesName && matchesType;
    });
  }
}
