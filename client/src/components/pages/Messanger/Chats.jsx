import React from "react";
import "./messenger.css";

export default function Chats({active, chats, activeChat}) {

  return (
    <div>
      <ul className="chats__items">
        {chats &&
          chats.map((email, index) => {
            return (
              <li
                className={`chats__item ${activeChat.id == index && 'active__chat'}`}
                key={index}
                onClick={() => active(email, index)}
              >
                {email}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
