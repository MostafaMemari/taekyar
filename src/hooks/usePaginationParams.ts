'use client'

import { useState, useEffect } from 'react'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const usePaginationParams = (defaultPage = 1, defaultSize = 10) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const initialPage = parseInt(searchParams.get('page') || `${defaultPage}`, 10)
  const initialSize = parseInt(searchParams.get('size') || `${defaultSize}`, 10)

  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  useEffect(() => {
    const urlPage = searchParams.get('page')
    const urlSize = searchParams.get('size')

    const isPageDifferent = urlPage !== (page !== defaultPage ? String(page) : null)
    const isSizeDifferent = urlSize !== (size !== defaultSize ? String(size) : null)

    if (isPageDifferent || isSizeDifferent) {
      const params = new URLSearchParams()

      if (page !== defaultPage) params.set('page', String(page))
      if (size !== defaultSize) params.set('size', String(size))

      const query = params.toString()

      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    }
  }, [page, size, pathname, router, searchParams, defaultPage, defaultSize])

  return { page, size, setPage, setSize }
}
