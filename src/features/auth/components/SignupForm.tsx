import {createUserWithEmailAndPassword} from "firebase/auth";
import {FirebaseError} from "firebase/app";
import {doc, setDoc} from "firebase/firestore";
import {Link, useNavigate} from "react-router";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/Button";
import FormWrapper from "@/components/ui/FormWrapper";
import {Input} from "@/components/ui/Input";
import {db} from "@/lib/firebase";
import {auth} from "@/lib/firebase";

export default function SignupForm() {
  const navigate = useNavigate();

  const handleSingup = async (data: FormData) => {
    const email = data.get("email");
    const password = data.get("password");
    const passwordRepeat = data.get("password-repeat");

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof passwordRepeat !== "string"
    ) {
      toast("Invalid form submission");
      return;
    }

    if (!email) {
      toast("Please enter an email");
      return;
    }

    if (!password) {
      toast("Please enter a password");
      return;
    }

    if (password.length < 8) {
      toast("Password length is too weak");
      return;
    }

    if (password !== passwordRepeat) {
      toast("Passwords don't match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "free",
        createdAt: new Date(),
      });
      toast("Account created successfully");
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
    <FormWrapper action={handleSingup}>
      <h2 className="text-2xl font-bold text-center">Signup</h2>
      <label htmlFor="email">Email</label>
      <Input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <Input type="password" name="password" id="password" />
      <label htmlFor="password-repeat">Repeat Password</label>
      <Input type="password" name="password-repeat" id="password-repeat" />
      <Button className="mt-5">Signup</Button>
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
