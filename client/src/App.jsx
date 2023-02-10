import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Devices from "./components/pages/Devices/Devices";
import Statistics from "./components/pages/Statistic";
import Users from "./components/pages/Users";
import Todos from "./components/pages/Todos/Todos";
import Calendar from "./components/pages/Calendar";
import Settings from "./components/pages/Admin/Settings";
import Homepage from "./components/pages/Homepage";
import Profile from "./components/pages/Profile/Profile";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import Login from "./components/pages/Authentication/Login";
import Signup from "./components/pages/Authentication/Signup";
import ResetPassword from "./components/pages/Authentication/ResetPassword";
import SetNewPassword from "./components/pages/Authentication/SetNewPassword";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useSelector, useDispatch } from "react-redux";
import { compareAccessToken } from "./store/actions/usersActions";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.auth.isAuth);
  const token = localStorage.getItem("token");

  console.log("check memory");

  useEffect(() => {
    if (isAuth || token) {
      dispatch(compareAccessToken());
    }
  }, [isAuth, token]);

  return (
    <div className={isAuth ? "App" : "App-out"}>
      <Routes>
        <Route element={<PrivateRoutes allowedRoles={["User"]} />}>
          <Route path="/dashboard" element={<Homepage />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/statistic" element={<Statistics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoutes allowedRoles={["Administrator"]} />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/setpassword/:link" element={<SetNewPassword />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
