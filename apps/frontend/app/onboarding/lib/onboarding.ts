export interface OnboardingFormValues {
  fullName: string
  document: string
  email: string
  recaptcha: string
}

export function simulateRecaptchaToken(successRate = 0.7) {
  return Math.random() < successRate ? 'OK' : 'INVALID'
}
