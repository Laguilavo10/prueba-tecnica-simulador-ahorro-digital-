import { Card, Chip } from '@heroui/react'

import type { ProductType, SavingsProduct } from '@/types/products'

interface ProductCardProps {
  product: SavingsProduct
  typeLabel: Record<ProductType, string>
}

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
})

export function ProductCard({ product, typeLabel }: ProductCardProps) {
  return (
    <Card className='border border-white/70 bg-white/80 backdrop-blur transition-transform duration-200 hover:-translate-y-1'>
      <Card.Header className='space-y-2 pb-2'>
        <Card.Title className='text-lg text-slate-900'>
          {product.name}
        </Card.Title>
        <Card.Description className='text-sm text-slate-600'>
          {product.description}
        </Card.Description>
      </Card.Header>

      <Card.Content className='space-y-3 pt-2'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-500'>Tipo</span>
          <Chip variant='primary'>{typeLabel[product.type]}</Chip>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-500'>Tasa anual estimada</span>
          <span className='font-semibold text-slate-900'>
            {product.annualRate}%
          </span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-slate-500'>Monto minimo</span>
          <span className='font-semibold text-slate-900'>
            {currencyFormatter.format(product.minAmount)}
          </span>
        </div>
      </Card.Content>
    </Card>
  )
}
