import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../store/api/apiSlice";
import { logOut } from "../../store/features/auth/authSlice";
import "./profilemenu.css";

export default function ProfileMenu({user, token}) {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    await signout()
    dispatch(logOut())
    navigate("/")
  };

  return (
    <div>
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
