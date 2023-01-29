import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes({ }) {

  const isAuth = useSelector((state) => state.users.isAuth);
  const user = useSelector((state) => state.user.user);

  return (
    !user?.roles ? <Outlet/> : <Navigate to={"/555"}/>
  )
}
