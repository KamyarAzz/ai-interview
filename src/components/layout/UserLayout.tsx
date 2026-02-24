import {Outlet} from "react-router";
import Navbar from "./Navbar";

export default function UserLayout() {
  return (
    <div className="flex flex-col w-full h-full relative">
      <Navbar />
      <div className="flex flex-col px-6 py-4 w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
