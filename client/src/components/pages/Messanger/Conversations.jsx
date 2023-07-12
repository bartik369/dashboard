import React from "react";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../../store/features/auth/authApi";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png"
import "./messenger.css";

export default function Conversations({ active, participants, activeConversation}) {
  console.log(participants)
  const user = useSelector(selectCurrentUser);
  const { data: profile } = useGetProfileQuery(user.id);

  console.log("conversations test mem")


  return (
    <div>
      <div className="chats__items">
        {participants && participants.map((item, index) => { 
            return (
              <div
                className={activeConversation.recipientId !== item.userId ? "chats__item" : "active__chat"}
                key={index}
                onClick={() => active(item.userId)}
              >
                <div className="avatar"><img src={item.avatar ? item.avatar : defaultAvatar} alt="" /></div>
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
