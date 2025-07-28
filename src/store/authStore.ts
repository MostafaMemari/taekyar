import { create } from 'zustand'

import type { UserState } from '@/types/apps/user.types'
import { getUserProfile } from '@/libs/api/endpoints/user.api'

interface AuthStore {
  isLogin: boolean
  user: UserState | null
  isLoading: boolean
  error: string | null

  loginStart: () => void
  loginSuccess: (user: UserState) => void
  loginFailure: (error: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  checkAuth: () => Promise<void>
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
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  checkAuth: async () => {
    try {
      set({ isLoading: true })
      const res = await getUserProfile()
      const user = res.data

      set({ isLogin: true, user, isLoading: false })
    } catch (err) {
      set({ isLogin: false, user: null, isLoading: false })
    }
  }
}))

export default useAuthStore
