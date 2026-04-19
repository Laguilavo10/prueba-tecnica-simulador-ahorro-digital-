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
    <Card className='glass-card transition-transform duration-200 hover:-translate-y-1'>
      <Card.Header className='space-y-2 pb-2'>
        <Card.Title className='text-primary text-lg'>{product.name}</Card.Title>
        <Card.Description className='text-muted text-sm'>
          {product.description}
        </Card.Description>
      </Card.Header>

      <Card.Content className='space-y-3 pt-2'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted'>Tipo</span>
          <Chip variant='primary'>{typeLabel[product.type]}</Chip>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted'>Tasa anual estimada</span>
          <span className='text-primary font-semibold'>
            {product.annualRate}%
          </span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted'>Monto minimo</span>
          <span className='text-primary font-semibold'>
            {currencyFormatter.format(product.minAmount)}
          </span>
        </div>
      </Card.Content>
    </Card>
  )
}
