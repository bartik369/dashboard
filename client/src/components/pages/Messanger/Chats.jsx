import React, { useState } from "react";
import "./messenger.css";

export default function Chats({ active, chats, activeChat }) {

  return (
    <div>
      <div className="chats__items">
        {chats &&
          chats.map((item, index) => {
            return (
              <div
                className={`chats__item ${
                  activeChat.id == index && "active__chat"
                }`}
                key={index}
                onClick={() => active(item.email, index)}
              >
                <div className="name">{item.displayname}</div>
                <div className="email">{item.email}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
