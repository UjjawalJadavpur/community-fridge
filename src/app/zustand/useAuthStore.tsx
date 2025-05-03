import { create } from "zustand";

type AuthState = {
  token: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
  role: string | null;
  setToken: (token: string | null) => void;
  setId: (id: number | null) => void; 
  setName: (name: string | null) => void;
  setEmail: (email: string | null) => void;
  setRole: (role: string | null) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  id: null,
  name: null,
  email: null,
  role: null,
  setToken: (token) => set({ token }),
  setId: (id) => set({ id }),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setRole: (role) => set({ role }),
  reset: () =>
    set({
      token: null,
      id: null,
      name: null,
      email: null,
      role: null,
    }),
}));