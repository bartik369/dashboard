import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenuItem from './MenuItem';
import '../sidebar/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBarsStaggered} from '@fortawesome/free-solid-svg-icons';
import { menuItem } from "../../utils/data-arrays/arrays";

const Sidebar = ({ slideContentContainer, getLinkName}) => {
  const [inActive, setInactive] = useState(false);
  const user = useSelector((state) => state.user.user);


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
            icon={
              user.roles.map((role) => {
                
                if (role === "Administrator" && item.to === "/settings") {
                  console.log("dennay")
                }
                return item.iconClassName
              })
            }
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
