import {create} from "zustand";
import {type AppUser} from "@/types/user";

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  setUser: (user: AppUser | null) => void;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({user}),
  setLoading: (loading) => set({loading}),
}));
