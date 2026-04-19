const copCurrencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
})

const percentFormatter = new Intl.NumberFormat('es-CO', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export function formatCurrencyCOP(value: number) {
  return copCurrencyFormatter.format(value)
}

export function formatPercent(value: number) {
  return percentFormatter.format(value)
}
