import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { compareAccessToken } from "./store/actions/usersActions";
import Sidebar from "./components/sidebar/SideBar";
import Header from "./components/header/Header";
import { routes, authRoutes } from "./routes/routes.js";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.users.isAuth);
  const token = localStorage.getItem("token");
  const [slideStateContainer, setSlideStateContainer] = useState(false);
  console.log("check memory");

  useEffect(() => {

    if (isAuth || token) {
      dispatch(compareAccessToken());
    }
  }, [isAuth, token]);

  return (
    <div className={isAuth ? "App" : "App-out"}>
      {isAuth ? (
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
              <Routes>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />))}
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          {authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={ isAuth ? <Navigate to={"/dashboard"} /> : route.element} />))}
        </Routes>
      )}
    </div>
  );
}

export default App;

