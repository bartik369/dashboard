import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compareAccessToken } from "./store/actions/usersActions";
import "./styles/App.css";
import ContentSide from "./components/pages/ContentSide";
import AuthSide from "./components/pages/AuthSide";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.users.isAuth);
  const token = localStorage.getItem("token");

  console.log("check memory");

  useEffect(() => {
    if (isAuth || token) {
      dispatch(compareAccessToken());
    }
  }, [isAuth, token]);

  return (
    <div className={isAuth ? "App" : "App-out"}>
      {isAuth ? <ContentSide /> : <AuthSide />}
    </div>
  );
}

export default App;