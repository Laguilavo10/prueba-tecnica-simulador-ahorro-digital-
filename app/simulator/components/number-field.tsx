import { Input } from '@heroui/react'

interface NumberFieldProps {
  id: string
  label: string
  value: number
  placeholder: string
  ariaLabel: string
  errorMessage?: string
  min?: number
  max?: number
  step?: string
  onChange: (nextValue: number) => void
  onBlur: () => void
}

export function NumberField({
  id,
  label,
  value,
  placeholder,
  ariaLabel,
  errorMessage,
  min,
  max,
  step,
  onChange,
  onBlur
}: NumberFieldProps) {
  return (
    <div className='space-y-2'>
      <label
        className='block text-sm font-semibold text-slate-700'
        htmlFor={id}
      >
        {label}
      </label>
      <Input
        id={id}
        type='number'
        min={min}
        max={max}
        step={step}
        value={String(value ?? '')}
        onChange={(event) => onChange(Number(event.target.value))}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-invalid={Boolean(errorMessage)}
        placeholder={placeholder}
      />
      {errorMessage ? (
        <p className='text-xs text-rose-600'>{errorMessage}</p>
      ) : null}
    </div>
  )
}
