'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card, Input } from '@heroui/react'

import {
  simulateRecaptchaToken,
  type OnboardingFormValues
} from '../lib/onboarding'

interface SubmissionSuccess {
  code: string
  fullName: string
}

const defaultValues: OnboardingFormValues = {
  fullName: '',
  document: '',
  email: '',
  recaptcha: ''
}

export function OnboardingForm() {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
    'http://localhost:3001'

  const [submissionSuccess, setSubmissionSuccess] =
    useState<SubmissionSuccess | null>(null)

  const {
    control,
    register,
    setValue,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<OnboardingFormValues>({
    mode: 'onBlur',
    defaultValues
  })

  const onSubmit = async (data: OnboardingFormValues) => {
    clearErrors('recaptcha')
    setSubmissionSuccess(null)

    // Simulacion del reCAPTCHA
    const recaptchaToken = simulateRecaptchaToken()
    setValue('recaptcha', recaptchaToken)

    const response = await fetch(`${apiUrl}/api/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        recaptcha: recaptchaToken
      })
    })

    const payload = (await response.json()) as {
      success: boolean
      code?: string
      fullName?: string
      message?: string
    }

    if (
      !response.ok ||
      !payload.success ||
      !payload.code ||
      !payload.fullName
    ) {
      setError('recaptcha', {
        type: 'manual',
        message:
          payload.message ??
          'No fue posible registrar la solicitud. Intenta de nuevo.'
      })
      return
    }

    setSubmissionSuccess({
      code: payload.code,
      fullName: payload.fullName
    })

    reset(defaultValues)
  }

  return (
    <section className='space-y-6'>
      <Card className='border border-white/70 bg-white/85 backdrop-blur'>
        <Card.Content className='space-y-5 p-5 md:p-6'>
          <form
            className='grid gap-5'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <input type='hidden' {...register('recaptcha')} />

            <Controller
              name='fullName'
              control={control}
              rules={{
                required: 'Ingresa tu nombre completo.',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres.'
                }
              }}
              render={({ field }) => (
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-slate-700'>
                    Nombre completo
                  </label>
                  <Input
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    onBlur={field.onBlur}
                    aria-label='Nombre completo'
                    placeholder='Ej. Maria Fernanda Diaz'
                    aria-invalid={Boolean(errors.fullName)}
                    className={'w-full'}
                  />
                  {errors.fullName ? (
                    <p className='text-xs text-rose-600'>
                      {errors.fullName.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              name='document'
              control={control}
              rules={{
                required: 'Ingresa tu numero de documento.',
                pattern: {
                  value: /^[0-9]{6,12}$/,
                  message:
                    'El documento debe tener solo numeros (6 a 12 digitos).'
                }
              }}
              render={({ field }) => (
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-slate-700'>
                    Documento
                  </label>
                  <Input
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    onBlur={field.onBlur}
                    aria-label='Documento'
                    placeholder='Ej. 1020304050'
                    aria-invalid={Boolean(errors.document)}
                    className={'w-full'}
                  />
                  {errors.document ? (
                    <p className='text-xs text-rose-600'>
                      {errors.document.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Ingresa tu correo electronico.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingresa un correo valido.'
                }
              }}
              render={({ field }) => (
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-slate-700'>
                    Correo electronico
                  </label>
                  <Input
                    type='email'
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    onBlur={field.onBlur}
                    aria-label='Correo electronico'
                    placeholder='Ej. nombre@correo.com'
                    aria-invalid={Boolean(errors.email)}
                    className={'w-full'}
                  />
                  {errors.email ? (
                    <p className='text-xs text-rose-600'>
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <div className='flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3'>
              <p className='text-xs text-slate-600'>
                Completa tus datos para enviar la solicitud. La verificacion
                anti-bot se realiza automaticamente en segundo plano.
              </p>
              <Button
                type='submit'
                className='bg-slate-900 text-white'
                isDisabled={isSubmitting}
              >
                Registrar intencion
              </Button>
            </div>

            {errors.recaptcha ? (
              <p className='text-xs text-rose-600'>
                {errors.recaptcha.message}
              </p>
            ) : null}
          </form>
        </Card.Content>
      </Card>

      {submissionSuccess && (
        <Card className='border border-sky-200 bg-sky-50/70'>
          <Card.Content className='space-y-2 p-5 md:p-6'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Solicitud registrada con exito
            </h2>
            <p className='text-sm text-slate-700'>
              Gracias, <strong>{submissionSuccess.fullName}</strong>. Tu codigo
              de solicitud es <strong>{submissionSuccess.code}</strong>.
            </p>
          </Card.Content>
        </Card>
      )}
    </section>
  )
}
