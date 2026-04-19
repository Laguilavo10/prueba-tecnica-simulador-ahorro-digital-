export interface OnboardingRequest {
  fullName: string;
  document: string;
  email: string;
  recaptcha: string;
}

export interface OnboardingResponse {
  success: boolean;
  code: string;
  fullName: string;
}

export function isRecaptchaTokenValid(token: string): boolean {
  return token.trim() === "OK";
}

export function generateRequestCode(): string {
  return crypto.randomUUID();
}
