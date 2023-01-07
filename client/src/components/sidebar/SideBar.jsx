import React, { useEffect, useState } from "react";
import MenuItem from './MenuItem';
import '../sidebar/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBarsStaggered} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ slideContentContainer, getLinkName}) => {
  const [inActive, setInactive] = useState(false);

  const menuItem = [
    {name: 'Главная', to: '/dashboard', iconClassName: 'bi bi-speedometer'},
    {name: 'Устройства', to: '/devices', iconClassName: 'bi bi-binoculars'},
    {name: 'Статистика', to: '/statistic', iconClassName: 'bi bi-bar-chart'},
    {name: 'Пользователи', to: '/users', iconClassName: 'bi bi-people'},
    {name: 'Задачи', to: '/todos', iconClassName: 'bi bi-check2-square'},
    {name: 'Календарь', to: '/calendar', iconClassName: 'bi bi-calendar-date'},
    {name: 'Настройки', to: '/settings', iconClassName: 'bi bi-gear'},
  ]

  useEffect(() => {
    if (inActive) {
      slideContentContainer(true);
    } else {
      slideContentContainer(false);
    }
  });

  return (
    <div className={`sidebar inactive${inActive ? "inactive"  : ""}`}>
      <div className="top-section">
        <div className="logo"></div>
        <button
          onClick={() => setInactive(!inActive)}
          className="toggle-menu-btn"
        >
          {inActive ? (
            <FontAwesomeIcon icon={faBarsStaggered} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </div>
      <nav className="menu">
        <ul className="menu__list">
          {menuItem.map((item, index) => (
            <MenuItem
            key={index}
            name={item.name}
            icon={item.iconClassName}
            to={item.to}
            getLinkName={getLinkName}
             />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
