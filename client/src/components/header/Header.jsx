import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchData from "../UI/search/SearchData";
import { setSearchQuery } from "../../store/actions/searchDataAction";
import { useDispatch } from "react-redux";
import ProfileMenu from "../profile-menu/ProfileMenu";
import useravatar from "../../assets/users/profile-avatar.jpg";
import "./header.css";
import TodosAlert from "./notifications/TodosAlert";
import { useLocation } from "react-router-dom";

const Header = ({ moveHeader }) => {
  const [searchData, setSearchData] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [todosDropMenu, setTodosDropMenu] = useState(false);
  const [countMessages, setCountMessages] = useState(5);
  const [countTodos, setCountTodos] = useState(0);
  const { todos } = useSelector((state) => state.todos);
  const user = useSelector((state) => state.user.user);
  const overTodos = [];
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    todos.map((todo) => {
      if (Date.parse(todo.endTime) <= Date.now() && todo.status !== "done") {
        overTodos.push(todo);
      }
      setCountTodos(overTodos.length);
    })
  }, [])

  useEffect(() => {
    dispatch(setSearchQuery(searchData));
  }, [searchData]);

  const userMenuHandler = () =>
    userMenu ? setUserMenu(false) : setUserMenu(true);

  const todosNotificationHandler = () =>
    todosDropMenu ? setTodosDropMenu(false) : setTodosDropMenu(true);

  window.addEventListener("click", () => {
    setUserMenu(false);
    setTodosDropMenu(false);
  });

  return (
    <header className="header">
      <div className={!moveHeader ? "header__inner" : "header__slided"}>
        <div className="header__search">
          {location.pathname === "/devices" && (
            <SearchData
              placeholder="Поиск..."
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          )}
        </div>
        <div className="header__menu">
          {/* <ul>
            <li>menu 1</li>
            <li>menu 2</li>
            <li>menu 3</li>
            <li>menu 4</li>
          </ul> */}
        </div>
        <div
          className="header__user-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header__user-panel--notification">
            <div
              className="todos-notification"
              onClick={todosNotificationHandler}
            >
              <div className="todos-notification_count">{countTodos}</div>
              <i className="bi bi-clipboard-check"></i>
              <div
                className={
                  todosDropMenu
                    ? "todos-notification__dropmenu"
                    : "todos-notification__dropmenu-disabled"
                }
              >
                <TodosAlert
                  todos={todos}
                  className={
                    todosDropMenu
                      ? "todos-notification__dropmenu"
                      : "todos-notification__dropmenu-disabled"
                  }
                />
              </div>
            </div>
            <div className="chat-messagess">
              <div className="chat-messagess__count">{countMessages}</div>
              <i className="bi bi-chat"></i>
            </div>
          </div>
          <img
            className="user-avatar"
            src={useravatar}
            alt=""
            onClick={userMenuHandler}
          />
          <div className="drop-menu">{userMenu && <ProfileMenu user={user} />}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
