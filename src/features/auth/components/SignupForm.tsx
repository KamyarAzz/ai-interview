import {Link} from "react-router";
import {Button} from "@/components/ui/Button";
import FormWrapper from "@/components/ui/FormWrapper";
import {Input} from "@/components/ui/Input";
import {useAuth} from "../hooks/useAuth";

export default function SignupForm() {
  const {loading, signUp} = useAuth();

  const handleSingup = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const passwordRepeat = data.get("password-repeat") as string;

    signUp(email, password, passwordRepeat);
  };

  return (
    <FormWrapper action={handleSingup}>
      <h2 className="text-2xl font-bold text-center">Signup</h2>
      <label htmlFor="email">Email</label>
      <Input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <Input type="password" name="password" id="password" />
      <label htmlFor="password-repeat">Repeat Password</label>
      <Input type="password" name="password-repeat" id="password-repeat" />
      <Button disabled={loading} className="mt-5">
        Signup
      </Button>
      <p className="text-gray-500 text-sm text-center">
        Already have an account?{" "}
        <Link
          className="hover:text-gray-900 duration-75 cursor-pointer"
          to="/login"
        >
          Login
        </Link>
      </p>
    </FormWrapper>
  );
}
