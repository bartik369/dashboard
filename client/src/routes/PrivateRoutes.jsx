import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/SideBar";

export default function PrivateRoutes({ allowedRoles }) {

  const isAuth = useSelector((state) => state.auth.auth.isAuth);
  const user = useSelector((state) => state.auth.auth.user);
  const [slideStateContainer, setSlideStateContainer] = useState(false);

  return (
    isAuth &&
        <div className="afterlogin">
        <div className="menu-container">
          <Sidebar slideContentContainer={setSlideStateContainer} />
        </div>
        <div
          className={`content-wrapper slided-content${
            slideStateContainer === false ? "slided-content" : ""
          }`}
        >
          <Header moveHeader={slideStateContainer} />
          <div className="content-container">
            {user?.roles?.find(role => allowedRoles?.includes(role)) 
              ? <Outlet /> 
              : <Navigate to={"/"} />
            }
          </div>
        </div>  
      </div>
      /* user?.roles?.find(role => allowedRoles?.includes(role)) */

  )
}
