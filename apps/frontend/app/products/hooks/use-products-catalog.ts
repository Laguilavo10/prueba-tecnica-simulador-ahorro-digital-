'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useDebounce } from '@/hooks/use-debounce'
import type { ProductType } from '@/types/products'

export type ProductTypeFilter = ProductType | null

const typeLabel: Record<ProductType, string> = {
  digital: 'Digital',
  tradicional: 'Tradicional',
  programado: 'Programado'
}

interface UseProductsCatalogParams {
  currentNameFilter: string
  currentTypeFilter: ProductTypeFilter
}

export function useProductsCatalog({
  currentNameFilter,
  currentTypeFilter
}: UseProductsCatalogParams) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [nameFilter, setNameFilter] = useState(currentNameFilter)
  const debouncedNameFilter = useDebounce(nameFilter, 350)

  useEffect(() => {
    const query = new URLSearchParams(searchParams.toString())

    if (debouncedNameFilter.trim()) {
      query.set('name', debouncedNameFilter.trim())
    } else {
      query.delete('name')
    }

    const nextQuery = query.toString()
    const currentQuery = searchParams.toString()

    if (nextQuery === currentQuery) {
      return
    }

    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false
    })
  }, [debouncedNameFilter, pathname, router, searchParams])

  const setTypeFilter = (type: ProductTypeFilter) => {
    const query = new URLSearchParams(searchParams.toString())

    if (!type) {
      query.delete('type')
    } else {
      query.set('type', type)
    }

    const nextQuery = query.toString()
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false
    })
  }


  return {
    nameFilter,
    setNameFilter,
    typeFilter: currentTypeFilter,
    setTypeFilter,
    typeLabel
  }
}
