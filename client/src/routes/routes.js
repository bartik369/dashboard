import { Navigate } from "react-router-dom";
import Homepage from "../components/pages/Homepage";
import EditDevice from "../components/pages/EditDevice";
import DeviceSearch from "../components/pages/DeviceSearch";
import Statistics from "../components/pages/Statistic";
import Users from "../components/pages/Users";
import Todos from "../components/pages/Todos";
import Calendar from "../components/pages/Calendar";
import Settings from "../components/pages/Settings";
import NotFoundPage from "../components/pages/NotFoundPage/NotFoundPage";
import Login from "../components/pages/Authentication/Login";
import Signup from "../components/pages/Authentication/Signup";
import ResetPassword from "../components/pages/Authentication/ResetPassword";
import SetNewPassword from "../components/pages/Authentication/SetNewPassword";

export const routes = [
    { path: "/", element: < Navigate to = "/dashboard" / > },
    { path: "/dashboard", element: < Homepage / > },
    { path: "/edit_device", element: < EditDevice / > },
    { path: "/search", element: < DeviceSearch / > },
    { path: "/statistic", element: < Statistics / > },
    { path: "/users", element: < Users / > },
    { path: "/todos", element: < Todos / > },
    { path: "/calendar", element: < Calendar / > },
    { path: "/settings", element: < Settings / > },
    { path: "*", element: < NotFoundPage / > },
];
export const authRoutes = [
    { path: "/", element: < Login / > },
    { path: "/singup", element: < Signup / > },
    { path: "/reset-password", element: < ResetPassword / > },
    { path: "/setpassword/:link", element: < SetNewPassword / > },
]