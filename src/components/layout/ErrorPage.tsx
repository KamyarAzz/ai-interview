import {isRouteErrorResponse, Link, useRouteError} from "react-router";

export default function ErrorPage({propError}: {propError?: unknown}) {
  const routeError = useRouteError();
  const error = propError ?? routeError;
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
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
