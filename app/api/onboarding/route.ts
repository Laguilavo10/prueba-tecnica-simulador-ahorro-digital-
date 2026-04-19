import { NextResponse } from 'next/server'

import {
  generateRequestCode,
  isRecaptchaTokenValid,
  type OnboardingFormValues
} from '@/app/onboarding/lib/onboarding'

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<OnboardingFormValues>

  const fullName = payload.fullName ?? ''
  const document = payload.document ?? ''
  const email = payload.email ?? ''
  const recaptcha = payload.recaptcha ?? ''

  if (!fullName || !document || !email) {
    return NextResponse.json(
      {
        success: false,
        message: 'Debes completar nombre, documento y correo.'
      },
      { status: 400 }
    )
  }

  if (!isRecaptchaTokenValid(recaptcha)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Token de reCAPTCHA invalido. Debe ser OK.'
      },
      { status: 400 }
    )
  }

  return NextResponse.json({
    success: true,
    code: generateRequestCode(),
    fullName
  })
}
