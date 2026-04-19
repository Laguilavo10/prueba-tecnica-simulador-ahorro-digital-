import { Module } from "@nestjs/common";

import { RegisterOnboardingUseCase } from "./application/use-cases/register-onboarding.use-case";
import { OnboardingController } from "./presentation/onboarding.controller";

@Module({
  controllers: [OnboardingController],
  providers: [RegisterOnboardingUseCase],
})
export class OnboardingModule {}
