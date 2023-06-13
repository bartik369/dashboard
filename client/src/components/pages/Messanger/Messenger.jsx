import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useGetConversationMutation,
  useGetParticipantsQuery,
  useDeleteConversationMutation,
  useMarkMessageMutation,
  useSetActiveConversationMutation,
  useGetActiveConversationQuery,
} from "../../../store/features/messenger/messengerApi";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import ConversationMenu from "./ConversationMenu";
import "./messenger.css";
import RecipientInfo from "./RecipientInfo";
import { get } from "react-hook-form";

const Messenger = () => {
  const user = useSelector(selectCurrentUser);
  const { data: participants, isLoading } = useGetParticipantsQuery(user.id);
  const {data: conversations } = useGetConversationsQuery(user.id);
  const { data: activeConversationId } = useGetActiveConversationQuery(user.id)
  const [getConversation, { data: conversationId }] = useGetConversationMutation();
  const [markAsRead] = useMarkMessageMutation()
  const [createConversation] = useCreateConversationMutation();
  const [deleteConversation] = useDeleteConversationMutation()
  const [switchLeftInfo, setSwitchLeftInfo] = useState(false);
  const [newChat, setNewChat] = useState({
    creatorId: "",
    recipientId: "",
  });
  const [activeChat, setActiveChat] = useState({
    id: 0,
    recipientId: "",
    creatorId: "",
  });
  // const {data: recipientInfo} = useGetUserQuery(activeChat.emailTo)
  const [addActiveConversation] = useSetActiveConversationMutation()
  const [dropMenu, setDropMenu] = useState(false);

  console.log("last edited", activeConversationId)


  // useEffect(() => {
  //   participants && participants.map((item) => {

  //     if (item.active) {
  //       setActiveChat(item._id)
  //     }
  //   })
  // }, [participants]);

  console.log(activeChat)
  console.log(conversationId)


  // useEffect(() => {
  //   conversations &&
  //   conversations.map((item, index) => {
  //       if (index === 0) {
  //         setActiveChat({
  //           ...activeChat,
  //           id: conversationId,
  //           creatorId: user.id,
  //           recipientId: item._id,
  //         });
  //         const chatData = {
  //           conversationId: conversationId,
  //           creatorId: user.id,
  //           recipientId: item._id,
  //         };
  //         getConversation(chatData);
  //       }
  //     });
  // }, [conversations]);

  const newConversationHandler = () => {
    setSwitchLeftInfo(true);
  };

  const createConversationHandler = async (id) => {
    const newConversationInfo = {
      ...newChat,
      creatorId: user.id,
      recipientId: id,
    };
    await createConversation(newConversationInfo).unwrap();
    setSwitchLeftInfo(false);
    await addActiveConversation(conversationId).unwrap()
  };

  const activeConversationHandler = async (id) => {
    setActiveChat({
      ...activeChat,
      recipientId: id,
      creatorId: user.id,
    });
    const chatData = {
      recipientId: id,
      creatorId: user.id,
      conversationId: conversationId,
    };
    await getConversation(chatData).unwrap();
    await addActiveConversation(chatData).unwrap()
    await markAsRead(chatData).unwrap()
  };


  const deleteHandler = async() => {
    const chatData = {
      conversationId: conversationId,
      email: user.email
    }
    await deleteConversation(chatData).unwrap()
  }
  

  const ConversationHandler = (e) => {
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
            <Conversations
              active={activeConversationHandler}
              participants={participants}
              activeChat={activeChat}
            />
          </div>
          <div className={switchLeftInfo ? "contacts" : "switch-disable"}>
            <Contacts recipientId={createConversationHandler} />
          </div>
        </div>
        <div className="left-main__bottom">
          <div className="create-chat">
            <button className="add" onClick={() => newConversationHandler()}>
              New chat
            </button>
          </div>
        </div>
      </div>
      <div className="right-main">
        <div className="right-main__top">
            <RecipientInfo />
            {/* <RecipientInfo recipientInfo={recipientInfo}/> */}
          <div className="drop-menu">
          <div className="menu-btn" onClick={(e) => ConversationHandler(e)}>
            <i className="bi bi-three-dots-vertical" />
          </div>
          <ConversationMenu dropMenu={dropMenu} deleteChat={deleteHandler} setDropMenu={setDropMenu}/>
          </div>
        </div>
        <div className="right-main__middle">
          <Messages conversationId={conversationId} user={user} recipientId={activeChat} />

        </div>
      </div>
    </div>
  );
};

export default Messenger;
