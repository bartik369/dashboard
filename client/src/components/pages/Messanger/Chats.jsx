import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useGetChatsQuery } from "../../../store/features/messenger/messengerApi";
import "./messenger.css";

export default function Chats() {
  const user = useSelector(selectCurrentUser);
  const { data: chats, isLoading } = useGetChatsQuery(user.email);
  const [activeChat, setActiveChat] = useState({
    id: 0,
    email: ""
  })

  useEffect(() => {
    chats && chats.map((email, index) => {

      if (index === 0) {
        setActiveChat({
          ...activeChat,
          id: index,
          email: email,
        })
      }
    })
  }, [chats]);

  console.log(activeChat)

  const activeChatHandler = (email, index) => {
    setActiveChat({
      ...activeChat,
      id : index,
      email: email,
    })
  };

  return (
    <div>
      <ul className="chats__items">
        {chats &&
          chats.map((email, index) => {
            return (
              <li
                className={`chats__item ${activeChat.id == index && 'active__chat'}`}
                key={index}
                onClick={() => activeChatHandler(email, index)}
              >
                {email}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
