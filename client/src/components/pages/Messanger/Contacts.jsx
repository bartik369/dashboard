import React from "react";
import { useGetUsersQuery } from "../../../store/features/auth/authApi";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png"
import "./messenger.css";

function Contacts({recipientId}) {

  const { data: contacts } = useGetUsersQuery();
  const contactHandler = (id) => {
    recipientId(id)
  };

  console.log("contacts test mem")
 
  return (
    <div>
      <h1>Contacts</h1>
      <div className="contacts__items">
        {contacts &&
          contacts.map((item, index) => {
            return (
              <div
                className="contacts__item"
                key={index}
                onClick={() => contactHandler(item._id)}>
                <div className="avatar">
                <img src= {contacts.profilePictureUrl ? contacts.profilePictureUrl : defaultAvatar } alt="" />
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
