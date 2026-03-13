import Container from "@/components/ui/Container";
import {useAuthStore} from "@/stores/authStore";
import {useEffect} from "react";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    console.log("user", user);
  }, [user]);
  return (
    <div className="flex flex-col w-full h-full">
      <Container className="w-full!">Hi</Container>
    </div>
  );
}
