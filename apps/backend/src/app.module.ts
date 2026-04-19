import { Module } from "@nestjs/common";

import { OnboardingModule } from "./modules/onboarding/onboarding.module";
import { ProductsModule } from "./modules/products/products.module";

@Module({
  imports: [ProductsModule, OnboardingModule],
})
export class AppModule {}
