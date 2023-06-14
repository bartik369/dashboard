import React, { useState, useEffect } from "react";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png"
import "./messenger.css";

export default function Conversations({ active, participants, activeConversation}) {

  return (
    <div>
      <div className="chats__items">
        {participants && participants.map((item, index) => { 
            return (
              <div
                className={activeConversation.recipientId !== item._id ? "chats__item" : "active__chat"}
                key={index}
                onClick={() => active(item._id)}
              >
                <div className="avatar"><img src={item.profilePictureUrl ? item.profilePictureUrl : defaultAvatar} alt="" /></div>
                <div className="user-info">
                  <div className="name">{item.displayname}</div>
                  <div className="email">{item.email}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
