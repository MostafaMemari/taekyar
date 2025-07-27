// src/store/useAuthStore.ts
import { create } from 'zustand'

import type { UserState } from '@/types/user.types'

interface AuthStore {
  isLogin: boolean
  user: UserState | null
  isLoading: boolean
  error: string | null

  // Actions
  loginStart: () => void
  loginSuccess: (user: UserState) => void
  loginFailure: (error: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

const useAuthStore = create<AuthStore>(set => ({
  isLogin: false,
  user: null,
  isLoading: true,
  error: null,

  loginStart: () => set({ isLoading: true, error: null }),
  loginSuccess: (user: UserState) => set({ isLogin: true, user, isLoading: false }),
  loginFailure: (error: string) => set({ isLoading: false, error }),
  logout: () => set({ isLogin: false, user: null, isLoading: false, error: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading })
}))

export default useAuthStore
