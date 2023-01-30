import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../sidebar/SideBar';
import Header from '../../header/Header';
import { Outlet } from 'react-router-dom';

export default function () {
  
  const isAuth = useSelector((state) => state.users.isAuth);
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
      <Outlet />
      </div>
    </div>
  </div>
  )
}
