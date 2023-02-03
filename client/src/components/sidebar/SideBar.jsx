import React, { useEffect, useState } from "react";
import MenuItem from './MenuItem';
import { useSelector } from "react-redux";
import '../sidebar/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBarsStaggered} from '@fortawesome/free-solid-svg-icons';
import { menuItem } from "../../utils/data-arrays/arrays";

const Sidebar = ({ slideContentContainer, getLinkName}) => {
  const [inActive, setInactive] = useState(false);
  const [isDisabled, setDisabled] = useState(false)
  const user = useSelector((state) => state.auth.auth.user);

  useEffect(() => {
    user?.roles?.map((role) => {
      console.log(role)
      if (role === "Administrator") {
        setDisabled(true)
      }
    })
  }, [user])

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
            isAdmin={item.isAdmin}
            name={item.name}
            icon={item.iconClassName}
            to={item.to}
            getLinkName={getLinkName}
             />
          ))}
        </ul>
        {/* item.iconClassName */}
      </nav>
    </div>
  );
};

export default Sidebar;
