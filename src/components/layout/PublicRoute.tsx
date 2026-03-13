import {Outlet, useNavigate} from "react-router";
import {useAuthStore} from "@/stores/authStore";
import Loading from "../ui/Loading";
import {useEffect} from "react";

export default function PublicRoute() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    console.log("changed");
    if (!loading && user) {
      console.log("Redirecting to dashboard");
      navigate("/dashboard", {replace: true});
    }
  }, [user, loading, navigate]);

  if (loading) return <Loading />;

  return <Outlet />;
}
