import { create } from 'zustand';

interface AuthenticationState {
  isAuthenticated: boolean;
}

interface AuthenticationActions {
  setAuthenticationState: () => void;
}

export const useAuthStore = create<AuthenticationState & AuthenticationActions>((set) => ({
  isAuthenticated: false,
  setAuthenticationState: () =>
    set((state) => ({ isAuthenticated: !state.isAuthenticated })), 
}));