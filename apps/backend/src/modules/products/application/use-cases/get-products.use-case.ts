import { Inject, Injectable } from "@nestjs/common";

import type { SavingsProduct } from "../../domain/product";
import {
  PRODUCTS_REPOSITORY,
  type ProductsRepository,
} from "../../domain/products.repository";

interface GetProductsInput {
  name?: string;
  type?: string;
}

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private readonly productsRepository: ProductsRepository,
  ) {}

  execute(input: GetProductsInput): SavingsProduct[] {
    return this.productsRepository.findByFilters(input);
  }
}
