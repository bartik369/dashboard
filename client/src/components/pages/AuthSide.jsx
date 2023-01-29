import React from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import ResetPassword from './Authentication/ResetPassword';
import SetNewPassword from './Authentication/SetNewPassword';
import Signup from './Authentication/Signup';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Layout from './Layout/Layout';
import PublicRoutes from "../../routes/PublicRoutes";

export default function AuthSide() {
  return (
    <div className="before-login">
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PublicRoutes />}>
              <Route path='/' element={<Login />}></Route>
              <Route path='/singup' element={<Signup />}></Route>
              <Route path='/reset-password' element={<ResetPassword />}></Route>
              <Route path='/setpassword/:link' element={<SetNewPassword/>}></Route>
            </Route>
          </Route>
        </Routes>
    </div>
  )
}
