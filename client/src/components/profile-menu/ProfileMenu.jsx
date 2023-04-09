import React from "react";
import {Link} from "react-router-dom";
import "./profilemenu.css";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({user}) {

  const navigate = useNavigate();

  const logoutHandler = () => {
    
    navigate("/")
  
  };

  return (
    <div className="profile-menu">
      <div className="profile__userinfo">
        <div className="username">{user.email}</div>
        <div className="description">web designer</div>
      </div>
      <ul className="profile__items">
        <li className="profile__item">
        <i className="bi bi-person-check"></i>
          <Link className="profile__link" to="/profile">Мой профиль</Link>
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
        <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </div>
  );
}
