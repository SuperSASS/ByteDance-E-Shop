import { create } from 'zustand'
import { User } from '../models/User'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user: User) => {
    set({ user: user, isAuthenticated: true })
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
}))
