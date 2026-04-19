import { NextResponse } from 'next/server'

import { getAvailableTypes } from '@/lib/products'

export async function GET() {
  const availableTypes = getAvailableTypes()

  return NextResponse.json({
    data: availableTypes,
    total: availableTypes.length
  })
}
