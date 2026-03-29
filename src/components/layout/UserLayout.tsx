import {Navigate, Outlet} from "react-router";
import Navbar from "./navbar/Navbar";
import {useAuthStore} from "@/stores/authStore";
import Loading from "../ui/Loading";
import Sidebar from "./sidebar/Sidebar";

export default function UserLayout() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) return <Loading />;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex flex-col w-full h-full relative">
      <Navbar />
      <div className="flex justify-between w-full h-full">
        <div className="flex flex-col px-6 py-4 w-full h-full">
          <Outlet />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
