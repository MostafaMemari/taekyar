import { create } from 'zustand'

import type { UserState } from '@/types/user.types'

interface AuthStore {
  isLogin: boolean
  user: UserState | null

  // Actions
  /** * Actions to manage authentication state */
  // These actions will be used to update the authentication state

  loginSuccess: (user: UserState) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>(set => ({
  isLogin: false,
  user: null,
  loginSuccess: (user: UserState) => set({ isLogin: true, user }),
  logout: () => set({ isLogin: false, user: null })
}))

export default useAuthStore
