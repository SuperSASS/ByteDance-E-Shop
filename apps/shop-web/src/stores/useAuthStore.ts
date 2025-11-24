import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserDTO } from '@e-shop/shared'

interface AuthState {
  user: UserDTO | null
  token: string | null
  isAuthenticated: boolean
  login: (user: UserDTO, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: UserDTO, token: string) => {
        set({ user, token, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)
