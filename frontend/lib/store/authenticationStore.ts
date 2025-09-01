import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStore = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  setUser: (userData: PartialUser) => void
  user: PartialUser
  cleanAuth: () => void
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

type PartialUser = {
  email: string
  username: string
}

const initialUserData: PartialUser = {
  email: '',
  username: '',
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: initialUserData,
      isAuthenticated: false,
      setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
      setUser: (userData: PartialUser) => set({ user: userData, isAuthenticated: true }),
      cleanAuth: () => set({ user: initialUserData, isAuthenticated: false }),
      _hasHydrated: false, 
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
