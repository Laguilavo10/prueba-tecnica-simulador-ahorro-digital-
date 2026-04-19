export interface OnboardingFormValues {
  fullName: string
  document: string
  email: string
  recaptcha: string
}

export function isRecaptchaTokenValid(token: string) {
  return token.trim() === 'OK'
}

export function simulateRecaptchaToken(successRate = 0.7) {
  return Math.random() < successRate ? 'OK' : 'INVALID'
}

export function generateRequestCode() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }

  return `REQ-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
}
