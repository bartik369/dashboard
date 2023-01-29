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
import Private from '../../routes/Private';
import Layout from './Layout/Layout';

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
                <Route path='/' element={<Layout />}>
                  <Route element={<Private/>}>
                  <Route path='/' element={<Navigate to={"/dashboard"} />}/>
                  <Route path='/dashboard' element={<Homepage />}/>
                  <Route path='/devices' element={<Devices />}/>
                  <Route path='/statistic' element={<Statistics/>}/>
                  <Route path='/users' element={<Users />}/>
                  <Route path='/todos' element={<Todos />}/>
                  <Route path='/calrndar' element={<Calendar />}/>
                  <Route path='/settings' element={<Settings />}/>
                </Route>
                </Route>
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
