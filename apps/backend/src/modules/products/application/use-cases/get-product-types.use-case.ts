import { Inject, Injectable } from "@nestjs/common";

import type { ProductType } from "../../domain/product";
import {
  PRODUCTS_REPOSITORY,
  type ProductsRepository,
} from "../../domain/products.repository";

@Injectable()
export class GetProductTypesUseCase {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: ProductsRepository,
  ) {}

  execute(): ProductType[] {
    return this.productsRepository.getAvailableTypes();
  }
}
