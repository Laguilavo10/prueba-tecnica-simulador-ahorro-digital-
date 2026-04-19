'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Card } from '@heroui/react'

import { formatCurrencyCOP, formatPercent } from '@/lib/formatters'

import { NumberField } from './number-field'
import {
  ANNUAL_RATE,
  calculateProjection,
  type SimulationResult,
  type SimulatorFormValues
} from '../lib/simulator'

export function SimulatorForm() {
  const [result, setResult] = useState<SimulationResult | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<SimulatorFormValues>({
    mode: 'onBlur',
    defaultValues: {
      initialAmount: 1000000,
      monthlyContribution: 200000,
      months: 12
    }
  })

  const hasErrors = Boolean(
    errors.initialAmount || errors.monthlyContribution || errors.months
  )
  const isSubmitDisabled = isSubmitting || hasErrors
  const disabledSubmitHint = isSubmitting
    ? 'Estamos procesando la simulacion.'
    : 'No puedes continuar hasta corregir los errores del formulario.'

  const helperText = `Tasa anual fija usada para la proyeccion: ${formatPercent(ANNUAL_RATE)}`

  const onSubmit = (data: SimulatorFormValues) => {
    clearErrors('initialAmount')

    if (data.monthlyContribution === 0 && data.initialAmount < 100000) {
      setError('initialAmount', {
        type: 'manual',
        message:
          'Con aporte mensual en 0, te recomendamos un monto inicial mayor para ver un resultado representativo.'
      })
      return
    }

    setResult(calculateProjection(data))
  }

  return (
    <section className='space-y-6'>
      <Card className='border border-white/70 bg-white/85 backdrop-blur'>
        <Card.Content className='space-y-5 p-5 md:p-6'>
          <form
            className='grid gap-4 md:grid-cols-3'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Controller
              name='initialAmount'
              control={control}
              rules={{
                required: 'Ingresa un monto inicial.',
                min: {
                  value: 10000,
                  message: 'El monto inicial debe ser mayor a COP 10.000.'
                },
                max: {
                  value: 1000000000,
                  message:
                    'El monto inicial no puede superar COP 1.000.000.000.'
                }
              }}
              render={({ field }) => (
                <NumberField
                  id='simulator-initial-amount'
                  label='Monto inicial'
                  value={field.value}
                  placeholder='Ej. 1000000'
                  ariaLabel='Monto inicial'
                  min={0}
                  step='1000'
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={errors.initialAmount?.message}
                />
              )}
            />

            <Controller
              name='monthlyContribution'
              control={control}
              rules={{
                required: 'Ingresa un aporte mensual.',
                min: {
                  value: 0,
                  message: 'El aporte mensual no puede ser negativo.'
                },
                max: {
                  value: 100000000,
                  message:
                    'El aporte mensual es demasiado alto para esta simulacion.'
                }
              }}
              render={({ field }) => (
                <NumberField
                  id='simulator-monthly-contribution'
                  label='Aporte mensual'
                  value={field.value}
                  placeholder='Ej. 200000'
                  ariaLabel='Aporte mensual'
                  min={0}
                  step='1000'
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={errors.monthlyContribution?.message}
                />
              )}
            />

            <Controller
              name='months'
              control={control}
              rules={{
                required: 'Ingresa el numero de meses.',
                min: {
                  value: 1,
                  message: 'El plazo minimo es 1 mes.'
                },
                max: {
                  value: 360,
                  message: 'El plazo maximo es 360 meses.'
                },
                validate: (value) =>
                  Number.isInteger(value) ||
                  'El numero de meses debe ser entero.'
              }}
              render={({ field }) => (
                <NumberField
                  id='simulator-months'
                  label='Numero de meses'
                  value={field.value}
                  placeholder='Ej. 12'
                  ariaLabel='Numero de meses'
                  min={1}
                  max={360}
                  step='1'
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={errors.months?.message}
                />
              )}
            />
            <div className='md:col-span-3 flex flex-wrap items-center gap-3 pt-1 justify-end'>
              <p className='text-xs text-slate-600'>{helperText}</p>
              <span
                title={isSubmitDisabled ? disabledSubmitHint : ''}
                className={
                  isSubmitDisabled
                    ? 'inline-flex cursor-not-allowed'
                    : 'inline-flex'
                }
              >
                <Button
                  type='submit'
                  className='bg-slate-900 text-white'
                  isDisabled={isSubmitDisabled}
                >
                  Calcular rentabilidad
                </Button>
              </span>
            </div>
          </form>
        </Card.Content>
      </Card>

      {result ? (
        <Card className='border border-emerald-100 bg-emerald-50/70'>
          <Card.Content className='space-y-4 p-5 md:p-6'>
            <div className='flex items-center justify-between gap-4'>
              <h2 className='text-lg font-semibold text-slate-900'>
                Resultado estimado
              </h2>
              <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700'>
                {result.months} meses
              </span>
            </div>

            <p className=' text-sm text-slate-700'>
              Para un monto inicial de{' '}
              <strong>{formatCurrencyCOP(result.initialAmount)}</strong>, con un
              aporte mensual de{' '}
              <strong>{formatCurrencyCOP(result.monthlyContribution)}</strong>{' '}
              durante <strong>{result.months} meses</strong>, la proyeccion es
              la siguiente:
            </p>

            <div className='grid gap-3 md:grid-cols-3'>
              <div className='rounded-lg bg-white p-4'>
                <p className='text-xs text-slate-500'>Valor futuro estimado</p>
                <p className='mt-1 text-xl font-semibold text-slate-900'>
                  {formatCurrencyCOP(result.futureValue)}
                </p>
              </div>
              <div className='rounded-lg bg-white p-4'>
                <p className='text-xs text-slate-500'>Total aportado</p>
                <p className='mt-1 text-xl font-semibold text-slate-900'>
                  {formatCurrencyCOP(result.totalContributions)}
                </p>
              </div>
              <div className='rounded-lg bg-white p-4'>
                <p className='text-xs text-slate-500'>Interes estimado</p>
                <p className='mt-1 text-xl font-semibold text-emerald-700'>
                  {formatCurrencyCOP(result.estimatedInterest)}
                </p>
              </div>
            </div>

            <p className='text-xs text-slate-600'>
              Formula aplicada: valor futuro = aporte inicial x (1 + r)^n +
              aporte mensual x (((1 + r)^n - 1) / r), donde r es la tasa mensual
              y n el numero de meses.
            </p>
          </Card.Content>
        </Card>
      ) : null}
    </section>
  )
}
