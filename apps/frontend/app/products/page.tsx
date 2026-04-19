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
    <main className='min-h-screen bg-[radial-gradient(circle_at_top_left,#e0f2fe,#f8fafc_55%,#fefce8)] px-4 py-10 md:px-8'>
      <div className='mx-auto w-full max-w-6xl space-y-8'>
        <header className='space-y-3'>
          <p className='inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700'>
            Productos Financieros
          </p>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900 md:text-4xl'>
            Elige la cuenta de ahorro ideal para tu meta
          </h1>
          <p className='max-w-3xl text-base leading-7 text-slate-700 md:text-lg'>
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
