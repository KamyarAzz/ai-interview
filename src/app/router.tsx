import {createBrowserRouter} from "react-router";
import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import UserLayout from "@/components/layout/UserLayout";
import ErrorPage from "@/components/layout/ErrorPage";
import PublicRoute from "@/components/layout/PublicRoute";
import InterviewHistoryPage from "@/features/interview-history/pages/InterviewHistoryPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import SubsriptionsPage from "@/features/subscriptions/pages/SubsriptionsPage";
import ConfigurationPage from "@/features/interview/pages/ConfigurationPage";
import InterviewPage from "@/features/interview/pages/InterviewPage";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
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
    ],
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/interview/configuration",
        element: <ConfigurationPage />,
      },
      {
        // Todo: Change this to /interview once the configuration page is integrated into the interview page
        path: "/interview/:interviewId/chat",
        element: <InterviewPage />,
      },
      {
        path: "/interview/history",
        element: <InterviewHistoryPage />,
      },
      {
        path: "/subscriptions",
        element: <SubsriptionsPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
