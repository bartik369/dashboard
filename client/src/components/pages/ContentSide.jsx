import React, {useState} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from "../header/Header";
import Sidebar from '../sidebar/SideBar';
import Calendar from './Calendar';
import Devices from './Devices/Devices';
import Homepage from './Homepage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import Profile from './Profile/Profile';
import Settings from './Settings';
import Statistics from './Statistic';
import Todos from './Todos/Todos';
import Users from './Users';
import PrivateRoutes from '../../routes/PrivateRoutes';

export default function ContentSide() {
    const [slideStateContainer, setSlideStateContainer] = useState(false);

  return (
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
                <Route path='/' element={<Navigate to={"/dashboard"} />}></Route>
                <Route path='/dashboard' element={<PrivateRoutes><Homepage /></PrivateRoutes>}></Route>
                <Route path='/devices' element={<PrivateRoutes><Devices /></PrivateRoutes>}></Route>
                <Route path='/statistic' element={<PrivateRoutes><Statistics /></PrivateRoutes>}></Route>
                <Route path='/users' element={<PrivateRoutes><Users /></PrivateRoutes>}></Route>
                <Route path='/todos' element={<PrivateRoutes><Todos /></PrivateRoutes>}></Route>
                <Route path='/calrndar' element={<PrivateRoutes><Calendar /></PrivateRoutes>}></Route>
                <Route path='/settings' element={<PrivateRoutes><Settings /></PrivateRoutes>}></Route>
                <Route path='/profile' element={<PrivateRoutes><Profile /></PrivateRoutes>}></Route>
                <Route path='*' element={<NotFoundPage />}></Route>
              </Routes>
            </div>
          </div>
        </div>
  )
}





// return (
//     <div className="afterlogin">
//           <div className="menu-container">
//             <Sidebar slideContentContainer={setSlideStateContainer} />
//           </div>
//           <div
//             className={`content-wrapper slided-content${
//               slideStateContainer === false ? "slided-content" : ""
//             }`}
//           >
//             <Header moveHeader={slideStateContainer} />
//             <div className="content-container">
//               <Routes>
//                 {privateRoute.map((route) => (
//                   <Route
//                     key={route.path}
//                     path={route.path}
//                     // element={<PrivateRoutes>{route.element}</PrivateRoutes>}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </div>
//         </div>
//   )
// }
