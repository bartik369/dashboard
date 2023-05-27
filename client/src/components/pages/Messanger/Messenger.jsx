import React, { useState } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useCreateChatMutation } from "../../../store/features/messenger/messengerApi";
import "./messenger.css";
import Chats from "./Chats";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";
import Messages from "./Messages";

const Messenger = () => {
    const user = useSelector(selectCurrentUser)
    const [switchLeftInfo, setSwitchLeftInfo] = useState(false)
    const [createChat] = useCreateChatMutation()
    const [newChat, setNewChat] = useState({
      id: "",
      sender: "",
      recipient: "",
    })

    const newChatHandler = () => {
        setSwitchLeftInfo(true)
    }
    const createChatHandler = async (recipientId) => {
      const newChatInfo = {
        ...newChat,
        id: Date.now(),
        sender: user.id,
        recipient: recipientId,
      }
      await createChat(newChatInfo).unwrap()
    }

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
            <Chats />
          </div>
          <div className={switchLeftInfo ? "contacts" : "switch-disable"}>
            <Contacts recipientId={createChatHandler}/>
          </div>
        </div>
        <div className="left-main__bottom">
          <div className="create-chat">
            <button className="add" onClick={() => newChatHandler()}>New chat</button>
          </div>
        </div>
      </div>
      <div className="right-main">
        <div className="right-main__top"></div>
        <div className="right-main__middle">
          <div className="messages">
            <Messages />
          </div>
        </div>
        <div className="right-main__bottom"></div>
      </div>
    </div>
  );
};

export default Messenger;
