import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png";
import moment from "moment";
import "./messenger.css";

export default function Conversations({ active, participants, activeConversation, lastMessages}) {

  const user = useSelector(selectCurrentUser)

  if (participants) {
    return (
      <div>
        <div className="chats__items">
          {participants.map((item, index) => {
            return (
              <div
                className={
                  activeConversation.recipientId !== item.userId
                    ? "chats__item"
                    : "active__chat"
                }
                key={item._id}
                onClick={() => active(item.userId)}
              >
                <div className="avatar">
                  <img src={item.avatar ? item.avatar : defaultAvatar} alt="" />
                </div>
                <div className="user-info">
                  <div className="name">{item.displayname}</div>
                  {lastMessages && lastMessages.map((message) => {
      
                    if ((message.senderId  === item.userId) || ((message.recipientId  === item.userId))) {
                     
                      console.log(item.userId)
                      return (
                        <div className="message-info" key={message._id}>
                          <div className={(!message.read && message.recipientId === user.id) ? "bold-text" : "text"}>{`${message.content}...`}</div>
                          <div className="date"> {moment(message.updatedAt).format("DD.MM HH:mm")}</div>
                        </div>
                       )
                    }
                  })}
           
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
    <div className="chats-loader">
      <span>Загрузка</span>
      <div className="custom-loader"></div>
    </div>
    )
  }
}
