import { API_URL } from '@/const/env-variables'
import { ProductsCatalog } from './components/products-catalog'

import type { ProductType, SavingsProduct } from '@/types/products'

interface ProductsApiResponse {
  data: SavingsProduct[]
  total: number
}

interface ProductTypesApiResponse {
  data: ProductType[]
  total: number
}

interface ProductsPageProps {
  searchParams?: Promise<{
    name?: string
    type?: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage({
  searchParams
}: ProductsPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined
  const nameFilter = resolvedParams?.name?.trim().toLowerCase() ?? ''
  const requestedType = resolvedParams?.type?.trim().toLowerCase() ?? ''

  const typesResponse = await fetch(`${API_URL}/api/products/types`, {
    cache: 'no-store'
  })

  const typesPayload = (await typesResponse.json()) as ProductTypesApiResponse
  const availableTypes = typesPayload.data

  const paramsProduct = new URLSearchParams()

  if (nameFilter) {
    paramsProduct.set('name', nameFilter)
  }
  if (requestedType) {
    paramsProduct.set('type', requestedType)
  }

  const productsUrl = `${API_URL}/api/products${
    paramsProduct.toString() ? `?${paramsProduct.toString()}` : ''
  }`

  const productsResponse = await fetch(productsUrl, { cache: 'no-store' })
  const productsPayload = (await productsResponse.json()) as ProductsApiResponse

  return (
    <main className='page-shell'>
      <div className='page-content max-w-6xl'>
        <header className='page-header'>
          <p className='page-kicker kicker-sky'>Productos Financieros</p>
          <h1 className='page-title'>
            Elige la cuenta de ahorro ideal para tu meta
          </h1>
          <p className='page-subtitle'>
            Explora cuentas de ahorro digitales, tradicionales y programadas.
            Usa los filtros para comparar opciones rapido y encontrar la mejor
            alternativa segun tus necesidades.
          </p>
        </header>

        <ProductsCatalog
          products={productsPayload.data}
          availableTypes={availableTypes}
          currentNameFilter={nameFilter}
          currentTypeFilter={requestedType as ProductType}
        />
      </div>
    </main>
  )
}
