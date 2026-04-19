import { Controller, Get, Query } from "@nestjs/common";

import { GetProductsUseCase } from "../application/use-cases/get-products.use-case";
import { GetProductTypesUseCase } from "../application/use-cases/get-product-types.use-case";
import type { ProductType, SavingsProduct } from "../domain/product";
import { FindProductsQueryDto } from "./dto/find-products-query.dto";

interface ProductsResponse {
  data: SavingsProduct[];
  total: number;
}

interface ProductTypesResponse {
  data: ProductType[];
  total: number;
}

@Controller("products")
export class ProductsController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductTypesUseCase: GetProductTypesUseCase,
  ) {}

  @Get()
  getProducts(@Query() query: FindProductsQueryDto): ProductsResponse {
    const products = this.getProductsUseCase.execute({
      name: query.name,
      type: query.type,
    });

    return {
      data: products,
      total: products.length,
    };
  }

  @Get("types")
  getProductTypes(): ProductTypesResponse {
    const types = this.getProductTypesUseCase.execute();

    return {
      data: types,
      total: types.length,
    };
  }
}
