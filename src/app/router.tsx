import {createBrowserRouter} from "react-router";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  // {
  //   path: "/",
  //   element: <DashboardLayout />, // sidebar layout
  //   children: [
  //     {index: true, element: <DashboardPage />},
  //     {path: "interview", element: <InterviewPage />},
  //     {path: "feedback", element: <FeedbackPage />},
  //   ],
  // },
]);
