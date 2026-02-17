import {Link, useNavigate} from "react-router";
import {toast} from "react-toastify";
import {FirebaseError} from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {Button} from "@/components/ui/Button";
import FormWrapper from "@/components/ui/FormWrapper";
import {Input} from "@/components/ui/Input";
import {auth} from "@/lib/firebase";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async (data: FormData) => {
    const email = data.get("email");
    const password = data.get("password");
    const remember = data.get("remember");

    if (typeof email !== "string" || typeof password !== "string") {
      toast("Invalid form submission");
      return;
    }

    if (!email) {
      toast("Please enter your email");
      return;
    }

    if (!password) {
      toast("Please enter your password");
      return;
    }

    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence,
      );

      await signInWithEmailAndPassword(auth, email, password);

      toast("Login successful");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast(error.message);
      } else {
        toast("Unexpected error occurred");
      }
    }
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
      <Button>Login</Button>
      <p className="text-gray-500 text-sm text-center">
        Dont have an account?{" "}
        <Link
          className="hover:text-gray-900 duration-75 cursor-pointer"
          to="/signup"
        >
          Signin
        </Link>
      </p>
    </FormWrapper>
  );
}
