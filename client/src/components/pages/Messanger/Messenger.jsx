import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import {
  useCreateChatMutation,
  useGetChatMutation,
  useGetChatsQuery,
} from "../../../store/features/messenger/messengerApi";
import "./messenger.css";
import Chats from "./Chats";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";
import Messages from "./Messages";

const Messenger = () => {
  const user = useSelector(selectCurrentUser);
  const { data: chats, isLoading } = useGetChatsQuery(user.email);
  const [getChat, {data: chat}] = useGetChatMutation()
  const [switchLeftInfo, setSwitchLeftInfo] = useState(false);
  const [createChat] = useCreateChatMutation();
  const [newChat, setNewChat] = useState({
    sender: "",
    recipient: "",
  });
  const [activeChat, setActiveChat] = useState({
    id: 0,
    emailFrom: "",
    emailTo: "",
  });

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

  const newChatHandler = () => {
    setSwitchLeftInfo(true);
  };
  const createChatHandler = async (recipientEmail) => {
    const newChatInfo = {
      ...newChat,
      sender: user.email,
      recipient: recipientEmail,
    };
    await createChat(newChatInfo).unwrap();
  };

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
    <div className="messenger">
      <div className="left-main">
        <div className="left-main__top">
          <div className="menu"></div>
          <div className="search">
            <input type="text" />
          </div>
        </div>
        <div className="left-main__middle">
          <div className={!switchLeftInfo ? "chats" : "switch-disable"}>
            <Chats active={activeChatHandler} chats={chats} activeChat={activeChat}/>
          </div>
          <div className={switchLeftInfo ? "contacts" : "switch-disable"}>
            <Contacts recipientEmail={createChatHandler} />
          </div>
        </div>
        <div className="left-main__bottom">
          <div className="create-chat">
            <button className="add" onClick={() => newChatHandler()}>
              New chat
            </button>
          </div>
        </div>
      </div>
      <div className="right-main">
        <div className="right-main__top"></div>
        <div className="right-main__middle">
          <div className="messages">
            <Messages chatId={chat} user={user}/>
          </div>
        </div>
        <div className="right-main__bottom"></div>
      </div>
    </div>
  );
};

export default Messenger;
