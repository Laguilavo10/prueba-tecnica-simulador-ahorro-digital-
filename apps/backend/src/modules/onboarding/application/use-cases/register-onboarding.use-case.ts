import { BadRequestException, Injectable } from "@nestjs/common";

import {
  generateRequestCode,
  isRecaptchaTokenValid,
  type OnboardingRequest,
  type OnboardingResponse,
} from "../../domain/onboarding";

@Injectable()
export class RegisterOnboardingUseCase {
  execute(request: Partial<OnboardingRequest>): OnboardingResponse {
    const fullName = request.fullName ?? "";
    const document = request.document ?? "";
    const email = request.email ?? "";
    const recaptcha = request.recaptcha ?? "";

    if (!fullName || !document || !email) {
      throw new BadRequestException({
        success: false,
        message: "Debes completar nombre, documento y correo.",
      });
    }

    if (!isRecaptchaTokenValid(recaptcha)) {
      throw new BadRequestException({
        success: false,
        message: "Token de reCAPTCHA invalido. Debe ser OK.",
      });
    }

    return {
      success: true,
      code: generateRequestCode(),
      fullName,
    };
  }
}
