export type AppUser = {
  id: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: "free" | "pro";
  createdAt?: string;
};
