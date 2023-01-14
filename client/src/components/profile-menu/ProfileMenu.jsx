import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions/usersActions";
import {Link} from "react-router-dom";
import "./profilemenu.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProfileMenu() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  const logoutHandler = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <div className="profile-menu">
      <div className="profile__userinfo">
        <div className="username">Fergus Roderic</div>
        <div className="description">web designer</div>
      </div>
      <ul className="profile__items">
        <li className="profile__item">
        <i className="bi bi-person-check"></i>
          <Link className="profile__link" to="">Мой профиль</Link>
        </li>
        <li className="profile__item">
        <i className="bi bi-chat-square"></i>
          <Link className="profile__link" to="">Сообщения</Link>
        </li>
        <li className="profile__item">
        <i className="bi bi-pencil"></i>
          <Link className="profile__link" to="">Настройки</Link>
        </li>
        <li className="profile__item">
        <i className="bi bi-box-arrow-right"></i>
          <Link className="profile__link" to="#" onClick={logoutHandler}>Выйти</Link>
        </li>
      </ul>
    </div>
  );
}
