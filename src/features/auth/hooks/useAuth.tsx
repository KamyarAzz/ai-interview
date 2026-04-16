import {auth, db} from "@/lib/firebase";
import {useAuthStore} from "@/stores/authStore";
import type {UserDocWrite} from "@/types/user";
import {FirebaseError} from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

export function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const setGlobalLoading = useAuthStore((state) => state.setLoading);

  const loginValidation = ({
    email,
    password,
  }: {
    email: string | null;
    password: string | null;
  }): boolean => {
    if (typeof email !== "string" || typeof password !== "string") {
      toast("Invalid form submission");
      return false;
    }

    if (!email) {
      toast("Please enter your email");
      return false;
    }

    if (!password) {
      toast("Please enter your password");
      return false;
    }
    return true;
  };

  const fetchUserData = async (userData: User) => {
    const userRef = doc(db, "users", userData.uid);
    const userDoc = await getDoc(userRef);

    let profile;

    if (!userDoc.exists()) {
      profile = {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        subscription: "free",
        role: "user",
        interviewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      };

      await setDoc(userRef, profile);
    } else {
      profile = userDoc.data();
      // update last login
      await setDoc(userRef, {lastLoginAt: serverTimestamp()}, {merge: true});
    }

    setUser({
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      subscription: profile?.subscription ?? "free",
      role: profile?.role ?? "user",
      interviewCount: profile?.interviewCount ?? 0,
      createdAt: profile?.createdAt?.toDate?.() ?? new Date(),
      updatedAt: profile?.updatedAt?.toDate?.() ?? new Date(),
      lastLoginAt: profile?.lastLoginAt?.toDate?.() ?? new Date(),
    });
  };

  const login = async (email: string, password: string, remember: boolean) => {
    if (!loginValidation({email, password})) {
      return;
    }
    try {
      setLoading(true);
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence,
      );
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      await fetchUserData(firebaseUser);
      toast("Login successful");
    } catch (error) {
      if (error instanceof FirebaseError) {
        await signOut(auth);
        toast(error.message);
      } else {
        // @ts-expect-error error message
        toast(error.message || "Unexpected error occurred");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUpValidation = ({
    email,
    password,
    passwordRepeat,
  }: {
    email: string;
    password: string;
    passwordRepeat: string;
  }): boolean => {
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof passwordRepeat !== "string"
    ) {
      toast("Invalid form submission");
      return false;
    }

    if (!email) {
      toast("Please enter an email");
      return false;
    }

    if (!password) {
      toast("Please enter a password");
      return false;
    }

    if (password.length < 8) {
      toast("Password length is too weak");
      return false;
    }

    if (password !== passwordRepeat) {
      toast("Passwords don't match");
      return false;
    }

    return true;
  };

  const createUserProfile = async (user: User) => {
    const userRef = doc(db, "users", user.uid);

    const userData: UserDocWrite = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      interviewCount: 0,
      subscription: "free",
      role: "user",
    };

    await setDoc(userRef, userData, {merge: true});
  };

  const signUp = async (
    email: string,
    password: string,
    passwordRepeat: string,
  ) => {
    if (!signUpValidation({email, password, passwordRepeat})) {
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await createUserProfile(user);
      toast("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast(error.message);
      } else {
        toast("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setGlobalLoading(true);
      await signOut(auth);
      setUser(null);
      navigate("/login");
      toast("Logout successful");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast(error.message);
      } else {
        toast("Unexpected error occurred");
      }
    } finally {
      setGlobalLoading(false);
    }
  };

  return {login, loading, signUp, logout};
}
