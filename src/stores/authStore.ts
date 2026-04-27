import {create} from "zustand";
import {type AppUser} from "@/types/user";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/lib/firebase";

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  setUser: (user: AppUser | null) => void;
  setLoading: (value: boolean) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({user}),
  setLoading: (loading) => set({loading}),
  initializeAuth: () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser: AppUser = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        set({user: appUser, loading: false});
      } else {
        set({user: null, loading: false});
      }
    });
  },
}));
