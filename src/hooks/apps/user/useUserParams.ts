'use client'

import { useState, useEffect } from 'react'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const useUserParams = (paramKey = 'search', defaultValue = '') => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const initialValue = searchParams.get(paramKey) || defaultValue
  const [search, setSearch] = useState(initialValue)

  useEffect(() => {
    const currentSearch = searchParams.get(paramKey) || ''

    if (search !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString())

      if (search) {
        params.set(paramKey, search)
      } else {
        params.delete(paramKey)
      }

      const query = params.toString()

      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    }
  }, [search, paramKey, pathname, router, searchParams])

  return { search, setSearch }
}
