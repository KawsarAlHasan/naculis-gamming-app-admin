import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Test from "../pages/test/Test";
import Users from "../pages/users/Users";
import FlaggedContent from "../pages/flaggedContent/FlaggedContent";
import Payouts from "../pages/payouts/Payouts";
import Tasks from "../pages/tasks/Tasks";
import Leaderboard from "../pages/leaderboard/Leaderboard";
import Profile from "../pages/profile/Profile";
import TermsConditions from "../pages/termsConditions/TermsConditions";
import NotFound from "../components/NotFound";
import PrivacyPolicy from "../pages/privacyPolicy/PrivacyPolicy";
import ForgotPassword from "../pages/login/ForgotPassword";
import CheckCode from "../pages/login/CheckCode";
import SetNewPassword from "../pages/login/SetNewPassword";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/check-code",
    element: <CheckCode />,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/flagged-content",
        element: <FlaggedContent />,
      },
      {
        path: "/payouts",
        element: <Payouts />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },

      {
        path: "/test",
        element: <Test />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
