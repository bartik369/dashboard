import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoutes({ children }) {
  const isAuth = useSelector((state) => state.users.isAuth);
  return !isAuth ? children : <Navigate to={"/5"} />;
}
