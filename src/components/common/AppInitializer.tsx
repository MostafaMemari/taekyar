'use client'

import { useEffect } from 'react'

import { useAuthStore } from '@/store'

const AppInitializer = () => {
  const checkAuth = useAuthStore(state => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return null
}

export default AppInitializer
