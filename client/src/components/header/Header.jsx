import React, { useState, useEffect } from "react";
import SearchData from "../UI/search/SearchData";
// import { setSearchQuery } from "../../store/actions/searchDataAction";
import { setSearchQuery } from "../../store/features/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../profile-menu/ProfileMenu";
import useravatar from "../../assets/users/profile-avatar.jpg";
import "./header.css";
import TodosAlert from "./notifications/TodosAlert";
import { useLocation } from "react-router-dom";
import { useGetTodosQuery } from "../../store/features/todos/todoApi";
import { selectCurrentUser, selectCurrentToken} from "../../store/features/auth/authSlice";


const Header = ({ moveHeader }) => {
  const [searchData, setSearchData] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [todosDropMenu, setTodosDropMenu] = useState(false);
  const [countMessages, setCountMessages] = useState(5);
  const [countTodos, setCountTodos] = useState(0);
  const overTodos = [];
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const {data = [], isLoading} = useGetTodosQuery();

  useEffect(() => {
    data.map((todo) => {
      if (Date.parse(todo.endTime) <= Date.now() && todo.status !== "done" && todo.user === user.id) {
        overTodos.push(todo);
      }
      setCountTodos(overTodos.length);
    })
    console.log("check memory")
  }, [data])

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
                  todos={data}
                  user={user}
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
          <div className="drop-menu">{userMenu && <ProfileMenu user={user} token={token} />}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
