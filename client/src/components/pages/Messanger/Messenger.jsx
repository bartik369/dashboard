import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import {
  useCreateChatMutation,
  useGetChatMutation,
  useGetChatsQuery,
  useDeleteChatMutation,
} from "../../../store/features/messenger/messengerApi";
import Chats from "./Chats";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import ChatMenu from "./ChatMenu";
import "./messenger.css";

const Messenger = () => {
  const user = useSelector(selectCurrentUser);
  const { data: chats, isLoading } = useGetChatsQuery(user.email);
  const [getChat, { data: chat }] = useGetChatMutation();
  const [switchLeftInfo, setSwitchLeftInfo] = useState(false);
  const [createChat] = useCreateChatMutation();
  const [delChat] = useDeleteChatMutation()
  const [newChat, setNewChat] = useState({
    sender: "",
    recipient: "",
  });
  const [activeChat, setActiveChat] = useState({
    id: 0,
    emailFrom: "",
    emailTo: "",
  });
  const [dropMenu, setDropMenu] = useState(false);

  useEffect(() => {
    chats &&
      chats.map((item, index) => {
        if (index === 0) {
          setActiveChat({
            ...activeChat,
            id: index,
            emailFrom: user.email,
            emailTo: item.email,
          });
          const chatData = {
            emailFrom: user.email,
            emailTo: item.email,
          };
          getChat(chatData);
        }
      });
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
    setSwitchLeftInfo(false);
  };

  const activeChatHandler = async (email, index) => {
    setActiveChat({
      ...activeChat,
      id: index,
      emailFrom: email,
      emailTo: user.email,
    });
    const chatData = {
      emailFrom: email,
      emailTo: user.email,
    };
    await getChat(chatData).unwrap();
  };

  const deleteHandler = async() => {
    await delChat(chat).unwrap()
  }
  

  const chatHandler = (e) => {
    e.stopPropagation();
    setDropMenu(!dropMenu);
  };

  // window.addEventListener("click", () => {
  //   setDropMenu(false);
  // });

  return (
    <div className="messenger">
      <div className="left-main">
        <div className="left-main__top">
          <div className="search">
            <input type="text" />
          </div>
        </div>
        <div className="left-main__middle">
          <div className={!switchLeftInfo ? "chats" : "switch-disable"}>
            <Chats
              active={activeChatHandler}
              chats={chats}
              activeChat={activeChat}
            />
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
        <div className="right-main__top">
          <div className="right-main__drop">
          <div className="menu-btn" onClick={(e) => chatHandler(e)}>
            <i className="bi bi-three-dots-vertical" />
          </div>
          <ChatMenu dropMenu={dropMenu} deleteChat={deleteHandler} />
          </div>
        </div>
        <div className="right-main__middle">
          <Messages chatId={chat} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
