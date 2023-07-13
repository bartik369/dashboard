import React from "react";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png";
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
                  <div className="chat-text">
                  {lastMessages && lastMessages.map((text) => {
              

                    if ((text.senderId  === item.userId) || ((text.recipientId  === item.userId))) {
                      return (
                        <div>{text.content}</div>
                       )
                    }
                  })}
                  </div>
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
