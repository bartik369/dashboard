import React, { useState } from "react";
import "./messenger.css";
import Chats from "./Chats";
import Contacts from "./Contacts";

const Messenger = () => {

    const [switchLeftInfo, setSwitchLeftInfo] = useState(false)

    const newChatHandler = (e) => {
        e.preventDefault()
        setSwitchLeftInfo(true)
        console.log("click")
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
            <Contacts />
          </div>
        </div>
        <div className="left-main__bottom">
          <div className="create-chat">
            <button className="add" onClick={(e) => newChatHandler(e)}>New chat</button>
          </div>
        </div>
      </div>
      <div className="right-main">
        <div className="right-main__top"></div>
        <div className="right-main__middle">
          <div className="messages"></div>
        </div>
        <div className="right-main__bottom"></div>
      </div>
    </div>
  );
};

export default Messenger;
