import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/features/auth/authSlice";
import { useGetUnreadMessagesQuery } from "../../store/features/messenger/messengerApi";
import "./Sidebar.css"


const MenuItem = ({...props}) => {

  const user = useSelector(selectCurrentUser);
  const {data: unreadMessages} = useGetUnreadMessagesQuery(user.id)

  return (
    <li className={"menu__item"}> 
      <Link to={props.to}>
        <div className="icon">
          {props.icon === "bi bi-chat-left-text" && (unreadMessages && unreadMessages.length) > 0
          ? <div className={props.icon}>
            <div className="unread-count">
              {unreadMessages && unreadMessages.length}
            </div>
          </div>
          : <div className={props.icon}></div>}
        </div>
      </Link>
      <Link to={props.to} className="menu__link">
          {props.name}
      </Link>

    </li>
  );
};

export default MenuItem;