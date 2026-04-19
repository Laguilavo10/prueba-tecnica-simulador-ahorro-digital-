'use client'

import { Button, Card, Chip, Input } from '@heroui/react'

import type { ProductType, SavingsProduct } from '@/types/products'

import { ProductCard } from './product-card'
import { useProductsCatalog } from '../hooks/use-products-catalog'

interface ProductsCatalogProps {
  products: SavingsProduct[]
  availableTypes: ProductType[]
  currentNameFilter: string
  currentTypeFilter: ProductType | null
}

export function ProductsCatalog({
  products,
  availableTypes,
  currentNameFilter,
  currentTypeFilter
}: ProductsCatalogProps) {
  const { nameFilter, setNameFilter, typeFilter, setTypeFilter, typeLabel } =
    useProductsCatalog({ currentNameFilter, currentTypeFilter })

  return (
    <section className='space-y-6'>
      <Card className='glass-card overflow-hidden'>
        <Card.Content className='p-5 md:p-6'>
          <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'>
            <div className='space-y-2'>
              <label className='field-label' htmlFor='search-name'>
                Buscar por nombre
              </label>
              <Input
                id='search-name'
                placeholder='Ej. digital, joven, meta...'
                value={nameFilter}
                onChange={(event) => setNameFilter(event.target.value)}
                aria-label='Buscar cuentas por nombre'
                className='w-full'
              />
            </div>

            <div className='rounded-xl border border-slate-200/80 bg-slate-50/80 p-3'>
              <div className='mb-2 flex items-center justify-between gap-3 lg:mb-1'>
                <p className='field-label'>Filtrar por tipo</p>
                <Button
                  isDisabled={!typeFilter}
                  onPress={() => setTypeFilter(null)}
                  className='h-8 min-w-0 gap-1.5 border border-rose-200 bg-rose-50 px-2.5 text-xs font-medium text-rose-700 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400'
                >
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 20 20'
                    fill='none'
                    className='h-3.5 w-3.5'
                  >
                    <path
                      d='M5 5L15 15M15 5L5 15'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      strokeLinecap='round'
                    />
                  </svg>
                </Button>
              </div>
              <div className='flex flex-wrap gap-2 lg:max-w-110'>
                {availableTypes.map((type) => (
                  <Button
                    key={type}
                    onPress={() => setTypeFilter(type)}
                    className={
                      typeFilter === type
                        ? 'btn-brand'
                        : 'bg-white text-slate-800'
                    }
                  >
                    {typeLabel[type]}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200/80 pt-4'>
            <Chip color='default' variant='primary'>
              {products.length} resultados
            </Chip>
          </div>
        </Card.Content>
      </Card>

      {products.length === 0 ? (
        <Card className='border border-amber-200 bg-amber-50'>
          <Card.Content className='p-5 text-amber-900'>
            No encontramos productos para los filtros seleccionados.
          </Card.Content>
        </Card>
      ) : null}

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            typeLabel={typeLabel}
          />
        ))}
      </div>
    </section>
  )
}
