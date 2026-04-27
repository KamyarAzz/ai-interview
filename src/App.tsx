import {RouterProvider} from "react-router";
import {ToastContainer} from "react-toastify";
import {router} from "./app/router";
import {useEffect} from "react";
import {useAuthStore} from "./stores/authStore";

function App() {
  useEffect(() => {
    useAuthStore.getState().initializeAuth();
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
