import { Body, Controller, Post } from "@nestjs/common";

import { RegisterOnboardingUseCase } from "../application/use-cases/register-onboarding.use-case";
import { RegisterOnboardingDto } from "./dto/register-onboarding.dto";

@Controller("onboarding")
export class OnboardingController {
  constructor(
    private readonly registerOnboardingUseCase: RegisterOnboardingUseCase,
  ) {}

  @Post()
  register(@Body() payload: RegisterOnboardingDto) {
    return this.registerOnboardingUseCase.execute(payload);
  }
}
