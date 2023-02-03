import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const MenuItem = ({...props}) => {

  return (
    <li className={!props.isAdmin ? "menu__item" : "hiden-li"}>
      <Link to={props.to}>
        <div className="icon">
          <i className={props.icon}></i>
        </div>
      </Link>
      <Link to={props.to} className="menu__link">
          {props.name}
      </Link>
    </li>
  );
};

export default MenuItem;
// "menu__item"