import React, { useState, useEffect } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import {
  useCreateConversationMutation,
  useGetConversationMutation,
  useGetParticipantsQuery,
  useDeleteConversationMutation,
  useMarkMessageMutation,
  useGetActiveConversationUserQuery,
} from "../../../store/features/messenger/messengerApi";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import ConversationMenu from "./ConversationMenu";
import "./messenger.css";
import RecipientInfo from "./RecipientInfo";



const Messenger = () => {
  const user = useSelector(selectCurrentUser);
  const { data: participants} = useGetParticipantsQuery(user.id);
  const{ data: activeConversationUserId } = useGetActiveConversationUserQuery(user.id)
  const [getConversation, {data: conversationId, isLoading}] = useGetConversationMutation();
  const [markAsRead] = useMarkMessageMutation()
  const [createConversation, {data: newIdInfo}] = useCreateConversationMutation();
  const [deleteConversation] = useDeleteConversationMutation()
  const [switchLeftInfo, setSwitchLeftInfo] = useState(false);
  // const {data: recipientInfo} = useGetUserQuery(activeChat.emailTo)
  // const [addActiveConversation] = useSetActiveConversationMutation()
  const [dropMenu, setDropMenu] = useState(false);
  const [activeConversation, setActiveConversation] = useState({
    recipientId: "",
    creatorId: "",
  });
  const [activeConversationId, setActiveConversationId] = useState("")

  console.log("conversationId", conversationId)
  console.log("newIdInfo", newIdInfo)

  useEffect(() => {

    if (activeConversationUserId) {
      setActiveConversation({recipientId: activeConversationUserId})
    }
    const conversationData = {
      ...activeConversation,
      recipientId: activeConversationUserId,
      creatorId: user.id,
    }
    getConversation(conversationData);
  }, [activeConversationUserId])

  const newConversationHandler = () => {
    setSwitchLeftInfo(true);
  };

  // Create conversation 

  const createConversationHandler = async (id) => {
    const newConversationInfo = {
      creatorId: user.id,
      recipientId: id,
    };
    await createConversation(newConversationInfo).unwrap();
    setActiveConversation({recipientId: id})
    setSwitchLeftInfo(false);
    const conversationData = {
          ...activeConversation,
          recipientId: id,
          creatorId: user.id,
    }
    await getConversation(conversationData).unwrap();
  };

  // Set active conversation

  const activeConversationHandler = async (id) => {
    setActiveConversation({recipientId: id})
    const conversationData = {
      ...activeConversation,
      recipientId: id,
      creatorId: user.id,
    }
    await getConversation(conversationData).unwrap();
    // await markAsRead(chatData).unwrap() 
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
              activeConversation={activeConversation}
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
          <Messages conversationId={conversationId} user={user} recipientId={activeConversation} />

        </div>
      </div>
    </div>
  );
};

export default Messenger;
