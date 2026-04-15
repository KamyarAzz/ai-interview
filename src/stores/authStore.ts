import {create} from "zustand";
import {type UserDoc} from "@/types/user";

interface AuthState {
  user: UserDoc | null;
  setUser: (user: UserDoc | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({user}),
  loading: false,
  setLoading: (loading) => set({loading}),
}));
