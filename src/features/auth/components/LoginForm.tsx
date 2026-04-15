import {Link} from "react-router";
import {Button} from "@/components/ui/Button";
import FormWrapper from "@/components/ui/FormWrapper";
import {Input} from "@/components/ui/Input";
import {useAuth} from "../hooks/useAuth";

export default function LoginForm() {
  const {login, loading} = useAuth();

  const handleLogin = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const remember = Boolean(data.get("remember"));

    login(email, password, remember);
  };

  return (
    <FormWrapper action={handleLogin}>
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <label htmlFor="email">Email</label>
      <Input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <Input type="password" name="password" id="password" />
      <div className="flex gap-2 items-center mt-3">
        <Input
          className="w-min shadow-none min-w-4 cursor-pointer"
          type="checkbox"
          name="remember"
          id="remember"
        />
        <label htmlFor="remember">Remember me</label>
      </div>
      <Button disabled={loading}>Login</Button>
      <p className="text-gray-500 text-sm text-center">
        Dont have an account?{" "}
        <Link
          className="hover:text-gray-900 duration-75 cursor-pointer"
          to="/signup"
        >
          Signup
        </Link>
      </p>
    </FormWrapper>
  );
}
