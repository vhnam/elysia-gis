import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User } from '@/models';

type AuthState = {
  token: string | null;
  user: User | null;
};

type AuthActions = {
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
};

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  token: null,
  user: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);

export default useAuthStore;
