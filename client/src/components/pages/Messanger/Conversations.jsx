import React from "react";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png";
import moment from "moment";
import "./messenger.css";

export default function Conversations({ active, participants, activeConversation, lastMessages}) {

  console.log(participants && participants)

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
                key={index}
                onClick={() => active(item.userId)}
              >
                <div className="avatar">
                  <img src={item.avatar ? item.avatar : defaultAvatar} alt="" />
                </div>
                <div className="user-info">
                  <div className="name">{item.displayname}</div>
                  {/* <div className="email">{item.email}</div> */}
                 
                  {lastMessages && lastMessages.map((message) => {
                    if ((message.senderId  === item.userId) || ((message.recipientId  === item.userId))) {
                      return (
                        <div className="message-info">
                          <div className="text">{message.content}</div>
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
    return <div class="chats-loader">
      <p>Загрузка</p>
      <div class="custom-loader"></div>
    </div>;
  }
}
