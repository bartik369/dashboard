import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useGetChatsQuery, useGetChatMutation } from "../../../store/features/messenger/messengerApi";
import "./messenger.css";

export default function Chats() {
  const user = useSelector(selectCurrentUser);
  const { data: chats, isLoading } = useGetChatsQuery(user.email);
  const [activeChat, setActiveChat] = useState({
    id: 0,
    emailFrom: "",
    emailTo: "",
  });
  const [getChat, {data: chat}] = useGetChatMutation()

  useEffect(() => {
    chats && chats.map((email, index) => {
      if (index === 0) {
        setActiveChat({
          ...activeChat,
          id: index,
          emailFrom: user.email,
          emailTo: email,
        })
        const chatData = {
          emailFrom: user.email,
          emailTo: email,
        }
        getChat(chatData)
      }
    })
  }, [chats]);

  const activeChatHandler = async(email, index) => {
    setActiveChat({
      ...activeChat,
      id : index,
      emailFrom: email,
      emailTo: user.email
    })
    const chatData = {
      emailFrom: email,
      emailTo: user.email
    }
    await getChat(chatData).unwrap()
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
