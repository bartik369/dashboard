import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const isAuth = useSelector((state) => state.users.isAuth);

  return isAuth ? children : <Navigate to={"/login"} />;
}
