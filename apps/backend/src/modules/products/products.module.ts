import { Module } from "@nestjs/common";

import { GetProductsUseCase } from "./application/use-cases/get-products.use-case";
import { GetProductTypesUseCase } from "./application/use-cases/get-product-types.use-case";
import { PRODUCTS_REPOSITORY } from "./domain/products.repository";
import { InMemoryProductsRepository } from "./infrastructure/repositories/in-memory-products.repository";
import { ProductsController } from "./presentation/products.controller";

@Module({
  controllers: [ProductsController],
  providers: [
    GetProductsUseCase,
    GetProductTypesUseCase,
    InMemoryProductsRepository,
    {
      provide: PRODUCTS_REPOSITORY,
      useExisting: InMemoryProductsRepository,
    },
  ],
})
export class ProductsModule {}
