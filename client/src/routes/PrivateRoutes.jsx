import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/SideBar";

export default function PrivateRoutes({ allowedRoles }) {

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const location = useLocation();
  const [slideStateContainer, setSlideStateContainer] = useState(false);

  

  return (
    user &&
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
              : <Navigate to="/" state={{ from: location }} replace />
            }
          </div>
        </div>  
      </div>
      /* user?.roles?.find(role => allowedRoles?.includes(role)) */

  )
}
