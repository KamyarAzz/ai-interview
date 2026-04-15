import type {FieldValue, Timestamp} from "firebase/firestore";

type BaseUser = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  subscription: "free" | "pro";
  role: "user" | "admin";
  interviewCount: number;
};
export type UserDoc = BaseUser & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
};

export type UserDocWrite = Omit<
  UserDoc,
  "createdAt" | "updatedAt" | "lastLoginAt"
> & {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  lastLoginAt: FieldValue;
};
