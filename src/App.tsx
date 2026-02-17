import {useEffect} from "react";
import {RouterProvider} from "react-router";
import {ToastContainer} from "react-toastify";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {router} from "./app/router";
import {useAuthStore} from "./stores/authStore";
import {auth, db} from "./lib/firebase";

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        const data = docSnap.exists() ? docSnap.data() : {};

        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          role: data.role ?? "free",
          createdAt: data.createdAt?.toDate().toISOString(),
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
