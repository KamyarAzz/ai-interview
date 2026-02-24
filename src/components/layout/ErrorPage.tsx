import {useRouteError, isRouteErrorResponse, Link} from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Oops 👀</h1>
      <p>{message}</p>
      <Link
        className="underline hover:text-blue-500 duration-150"
        to="/dashboard"
      >
        Go back home
      </Link>
    </div>
  );
}
