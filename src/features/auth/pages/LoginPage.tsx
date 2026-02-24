import {useEffect} from "react";
import {useNavigate} from "react-router";
import LoginForm from "../components/LoginForm";
import PageLayout from "../layout/PageLayout";
import {useAuthStore} from "@/stores/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <PageLayout>
      <LoginForm />
    </PageLayout>
  );
}
