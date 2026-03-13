import {RouterProvider} from "react-router";
import {ToastContainer} from "react-toastify";
import {router} from "./app/router";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
