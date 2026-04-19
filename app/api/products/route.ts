import { NextRequest, NextResponse } from 'next/server'

import { filterProducts } from '@/lib/products'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get('name') ?? ''
  const type = searchParams.get('type') ?? ''

  const filteredProducts = filterProducts({ name, type })

  return NextResponse.json({
    data: filteredProducts,
    total: filteredProducts.length
  })
}
