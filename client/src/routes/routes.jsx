import { Navigate } from "react-router-dom";
import Homepage from "../components/pages/Homepage";
import Devices from "../components/pages/Devices/Devices";
import Statistics from "../components/pages/Statistic";
import Users from "../components/pages/Users";
import Todos from "../components/pages/Todos/Todos";
import Calendar from "../components/pages/Calendar";
import Settings from "../components/pages/Settings";
import NotFoundPage from "../components/pages/NotFoundPage/NotFoundPage";
import Login from "../components/pages/Authentication/Login";
import Signup from "../components/pages/Authentication/Signup";
import ResetPassword from "../components/pages/Authentication/ResetPassword";
import SetNewPassword from "../components/pages/Authentication/SetNewPassword";
import Profile from "../components/pages/Profile/Profile";

export const privateRoute = [
  { path: "/", element: <Navigate to={"/dashboard"} />},
  { path: "/dashboard", element: <Homepage /> },
  { path: "/devices", element: <Devices /> },
  { path: "/statistic", element: <Statistics /> },
  { path: "/users", element: <Users /> },
  { path: "/todos", element: <Todos /> },
  { path: "/calendar", element: <Calendar /> },
  { path: "/settings", element: <Settings /> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <NotFoundPage /> },
];

export const authRoutes = [
  { path: "/", element: <Login /> },
  { path: "/singup", element: <Signup /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/setpassword/:link", element: <SetNewPassword /> },
];
