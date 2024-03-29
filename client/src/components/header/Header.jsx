import React, { useState, useEffect, useRef } from "react";
import SearchData from "../UI/search/SearchData";
import {useSelector } from "react-redux";
import ProfileMenu from "../profile-menu/ProfileMenu";
import TodosAlert from "./notifications/TodosAlert";
import SystemAlert from "./notifications/SystemAlert";
import { useGetTodosQuery } from "../../store/features/todos/todoApi";
import { useGetProfileQuery } from "../../store/features/auth/authApi";
import { selectCurrentUser, selectCurrentToken } from "../../store/features/auth/authSlice";
import defaultA from "../../assets/users/avatars/default-avatar.png";
import "./header.css";

const Header = ({ moveHeader }) => {
  const [searchData, setSearchData] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [todosDropMenu, setTodosDropMenu] = useState(false);
  const [systemDropMenu, setSystemDropMenu] = useState(false);
  // const [profileDropMenu, setProfileDropMenu] = useState(false);
  const [countMessages, setCountMessages] = useState(5);
  const [countTodos, setCountTodos] = useState(0);
  const [overdueTodos, setOverdueTodos] = useState([]);
  const overTodos = [];
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const {data: profile} = useGetProfileQuery(user.id)
  const { data = [] } = useGetTodosQuery();
  const todoMenuRef = useRef();
  const systemMenuRef = useRef();
  const profileMenuRef = useRef();

  useEffect(() => {
    data.map((todo) => {
      if (
        Date.parse(todo.endTime) <= Date.now() &&
        todo.status !== "done" &&
        todo.user === user.id
      ) {
        overTodos.push(todo);
      }
      setOverdueTodos(overTodos);
      setCountTodos(overTodos.length);
    });
  }, [data]);

  useEffect(() => {
    const outsideClickhandler = (e) => {

      if (!todoMenuRef.current.contains(e.target)) {
        setTodosDropMenu(false);
      }
      if (!systemMenuRef.current.contains(e.target)) {
        setSystemDropMenu(false);
      } 
      if (!profileMenuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", outsideClickhandler);
  }, []);

  const userMenuHandler = () =>
    userMenu ? setUserMenu(false) : setUserMenu(true);

  const todosNotificationHandler = () => {
    todosDropMenu ? setTodosDropMenu(false) : setTodosDropMenu(true);
  }

  const systemNotificationHandler = () => {
    systemDropMenu ? setSystemDropMenu(false) : setSystemDropMenu(true);
  }
    

  return (
    <header className="header">
      <div className={!moveHeader ? "header__inner" : "header__slided"}>
        <div className="header__search">
          {/* {location.pathname === "/devices" && ( */}
          {<SearchData
              placeholder="Поиск..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />}
        </div>

        {/* <div className="header__menu"></div> */}

        <div className="header__user-panel" onClick={(e) => e.stopPropagation()}>
          <div className="header__user-panel--notification">

            <div className="todos-notification" onClick={todosNotificationHandler}>
              <div className="todos-notification_count">{countTodos}</div>
              <i className="bi bi-clipboard-check"/>
              <div className={todosDropMenu
                    ? "header-notification__dropmenu"
                    : "header-notification__dropmenu-disabled"}
                ref={todoMenuRef}
                onClick={(e) => e.stopPropagation()}>
                <TodosAlert todos={overdueTodos} user={user} className={todosDropMenu
                      ? "header-notification__dropmenu"
                      : "header-notification__dropmenu-disabled"
                  }
                />
              </div>
            </div>

            <div className="system-messagess" onClick={systemNotificationHandler}>
              <div className="system-messagess__count">{countMessages}</div>
              <i className="bi bi-chat"/>
              <div className={systemDropMenu
                    ? "header-notification__dropmenu"
                    : "header-notification__dropmenu-disabled"
                }
                ref={systemMenuRef}
                onClick={(e) => e.stopPropagation()}>
                <SystemAlert
                  className={
                    systemDropMenu
                      ? "header-notification__dropmenu"
                      : "header-notification__dropmenu-disabled"
                  }
                />
              </div>
            </div>
          </div>
          <div className="user-avatar" onClick={userMenuHandler}>
          <img src={profile ? profile.avatar : defaultA} alt=""/>
          </div>
          <div
            className={userMenu ? "profile-menu": "profile-menu-disabled"}
            ref={profileMenuRef}
            onClick={(e) => e.stopPropagation()}
          >
          <ProfileMenu user={user} token={token} />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
