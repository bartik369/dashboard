import React, { useState, useEffect, useContext, useRef } from "react";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useSetSocketMutation } from "../../../store/features/messenger/messengerApi";
import {
  useCreateConversationMutation,
  useGetConversationMutation,
  useGetParticipantsQuery,
  useGetLastMessagesMutation,
  useDeleteConversationMutation,
  useMarkMessageMutation,
  useGetActiveConversationUserQuery,
} from "../../../store/features/messenger/messengerApi";
import { useGetProfileQuery} from "../../../store/features/auth/authApi";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import ConversationMenu from "./ConversationMenu";
import VideoCall from "../../media-call/video-call/VideoCall";
import "./messenger.css";
import RecipientInfo from "./RecipientInfo";
import CallMenu from "./CallMenu";
import { CallContext } from "../../media-call/video-call/CallContext";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:5001/");

const Messenger = () => {
  const user = useSelector(selectCurrentUser);
  const {data: userProfile} = useGetProfileQuery(user.id)
  const { data: participants} = useGetParticipantsQuery(user.id);
  const{ data: activeConversationUserId } = useGetActiveConversationUserQuery(user.id)
  const [getConversation, {data: conversationId, isLoading}] = useGetConversationMutation();
  const [getLastMessages, {data: lastMessages}] = useGetLastMessagesMutation()
  const [markAsRead] = useMarkMessageMutation()
  const [createConversation] = useCreateConversationMutation();
  const [deleteConversation] = useDeleteConversationMutation()
  const [switchLeftInfo, setSwitchLeftInfo] = useState(false);
  const [dropMenu, setDropMenu] = useState(false);
  const [activeConversation, setActiveConversation] = useState({
    recipientId: "",
    creatorId: "",
  });
  const {data: recipientInfo} = useGetProfileQuery(activeConversation.recipientId)
  const [setSocketInfo] = useSetSocketMutation()
  const [callWindow, setCallWindow] = useState(false)
  const [callNotification, setCallNotification] = useState(false)

  useEffect(() => {
    setSocketInfo({
      userId: user.id,
      socketId: socket.id,
    })
  }, [])

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

  useEffect(() => {
      if (user) {
        getLastMessages({id: user.id})
      }
    
  }, [])

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
    await markAsRead(conversationData).unwrap() 
  };


  const deleteHandler = async() => {
    const chatData = {
      conversationId: conversationId,
      initiatorEmail: user.email
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
            <input type="text" placeholder="Поиск..."/>
          </div>
        </div>
        <div className="left-main__middle">
          <div className={!switchLeftInfo ? "chats" : "switch-disable"}>
            <Conversations
              active={activeConversationHandler}
              participants={participants}
              activeConversation={activeConversation}
              lastMessages={lastMessages && lastMessages}
            />
          </div>
          <div className={switchLeftInfo ? "contacts" : "switch-disable"}>
            <Contacts
            setSwitchLeftInfo={setSwitchLeftInfo}
            recipientId={createConversationHandler} />
          </div>
        </div>
        <div className="left-main__bottom">
          <div className="create-chat">
            <i className="bi bi-plus-square-fill" title="Новый чат" onClick={() => newConversationHandler()}/>
          </div>
        </div>
      </div>
      <div className="right-main">
        <div className="right-main__top">
            <RecipientInfo recipientInfo={recipientInfo}/>
            <CallMenu setCallWindow={setCallWindow} callWindow={callWindow}  />
          <div className="drop-menu">
          <div className="menu-btn" onClick={(e) => ConversationHandler(e)}>
            <i className="bi bi-three-dots-vertical" />
          </div>
          <ConversationMenu dropMenu={dropMenu} deleteChat={deleteHandler} setDropMenu={setDropMenu}/>
          </div>
        </div>
        <div className="right-main__middle">
          <Messages 
          conversationId={conversationId} 
          user={user} 
          recipientId={activeConversation} 
          recipientInfo={recipientInfo}
          />
        </div>
      </div>
      <CallContext.Provider value={{
            activeConversationUserId,
            callWindow,
            setCallWindow,
            callNotification,
            setCallNotification,
            userProfile,
            recipientInfo,
          }}> 
      <VideoCall/>
    </CallContext.Provider>
    </div>
  );
};

export default Messenger;
