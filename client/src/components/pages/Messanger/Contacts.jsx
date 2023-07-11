import React from "react";
import { useGetUsersQuery, useGetProfilesQuery } from "../../../store/features/auth/authApi";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png"
import "./messenger.css";

function Contacts({recipientId}) {

  const { data: contacts } = useGetUsersQuery();
  const {data: profiles} = useGetProfilesQuery()
  const contactHandler = (id) => {
    recipientId(id)
  };

  console.log("contacts test mem")
 
  return (
    <div>
      <h1>Contacts</h1>
      <div className="contacts__items">
        {profiles &&
          profiles.map((item, index) => {
            return (
              <div
                className="contacts__item"
                key={index}
                onClick={() => contactHandler(item.userId)}>
                <div className="avatar">
                <img src= {profiles.avatar ? profiles.avatar : defaultAvatar } alt="" />
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
