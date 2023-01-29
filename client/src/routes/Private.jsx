import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Private({ }) {

  const isAuth = useSelector((state) => state.users.isAuth);

  return (
    isAuth ? <Outlet/> : <Navigate to={"/"} />
  )
}
