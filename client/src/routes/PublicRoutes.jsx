import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes({ }) {

  const isAuth = useSelector((state) => state.auth.auth.isAuth);
  const user = useSelector((state) => state.auth.auth.user);


  return (
    isAuth ? <Navigate to={"/dashboard"}/> : <Outlet/> 
  )
}
