import React, {useEffect, useRef} from "react";
import { useGetProfilesQuery } from "../../../store/features/auth/authApi";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png"
import "./messenger.css";

function Contacts({recipientId, setSwitchLeftInfo}) {
  const {data: profiles} = useGetProfilesQuery()
  const contactHandler = (id) => {
    recipientId(id)
  };
  const contactsListRef = useRef()

  useEffect(() => {
    const outsideClickhandler = (e) => {
       if (!contactsListRef.current.contains(e.target)) {
        setSwitchLeftInfo(false)
       }
    }
    document.addEventListener("mousedown", outsideClickhandler)
  }, [])
 
  return (
    <div>
      <div className="contacts__list">Ваши контакты</div>
      <div className="contacts__items" ref={contactsListRef}>
        {profiles &&
          profiles.map((item, index) => {
            return (
              <div
                className="contacts__item"
                key={index}
                onClick={() => contactHandler(item.userId)}>
                <div className="avatar">
                <img src= {item.avatar ? item.avatar : defaultAvatar } alt="" />
                </div>
                <div className="info">
                <span className="name">{item.displayname}</span>
                <span className="email">{item.email}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Contacts;
