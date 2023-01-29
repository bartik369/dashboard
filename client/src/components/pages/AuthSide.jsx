import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import ResetPassword from './Authentication/ResetPassword';
import SetNewPassword from './Authentication/SetNewPassword';
import Signup from './Authentication/Signup';
import NotFoundPage from './NotFoundPage/NotFoundPage';

export default function AuthSide() {
  return (
    <div className="before-login">
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/singup' element={<Signup />}></Route>
            <Route path='/reset-password' element={<ResetPassword />}></Route>
            <Route path='/setpassword/:link' element={<SetNewPassword/>}></Route>
        </Routes>
    </div>
  )
}


// return (
//     <div className="before-login">
//         <Routes>
//           {authRoutes.map((route) => (
//             <Route
//               key={route.path}
//               path={route.path}
//               element={route.element}
//             />
//           ))}
//         </Routes>
//     </div>
//   )
