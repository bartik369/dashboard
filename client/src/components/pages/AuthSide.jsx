import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes } from '../../routes/routes';
import Login from './Authentication/Login';
import ResetPassword from './Authentication/ResetPassword';
import SetNewPassword from './Authentication/SetNewPassword';
import Signup from './Authentication/Signup';
import PublicRoutes from '../../routes/PublicRoutes';
import NotFoundPage from './NotFoundPage/NotFoundPage';

export default function AuthSide() {
  return (
    <div className="before-login">
        <Routes>
            <Route path='/' element={<PublicRoutes><Login /></PublicRoutes>}></Route>
            <Route path='/singup' element={<PublicRoutes><Signup /></PublicRoutes>}></Route>
            <Route path='/reset-password' element={<PublicRoutes><ResetPassword /></PublicRoutes>}></Route>
            <Route path='/setpassword/:link' element={<PublicRoutes><SetNewPassword/></PublicRoutes>}></Route>
            <Route path='*' element={<Navigate to={"/"} />}></Route>
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
