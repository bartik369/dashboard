import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser, selectCurrentToken } from "../store/features/auth/authSlice";

export default function PrivateRoutes({ }) {
  
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  return (
    token ? <Navigate to={"/dashboard"}/> : <Outlet/> 
  )
}
