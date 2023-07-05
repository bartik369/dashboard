import React, { useEffect, useState, useRef } from "react";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetMessageMutation,
} from "../../../store/features/messenger/messengerApi";
import * as formConstants from "../../../utils/constants/form.constants";
import { useForm } from "react-hook-form";
import moment from "moment";

function Messages({ conversationId, user, recipientId }) {
  const [messageMenu, setMessageMenu] = useState("");
  const [messageId, setMessageId] = useState("")
  const { data: messages } = useGetMessagesQuery(conversationId);
  const [addMessage] = useAddMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation()
  const [updateMessage] = useUpdateMessageMutation()
  const [getMessage, {data: messageInfo}] = useGetMessageMutation()
  const [message, setMessage] = useState({
    id: "",
    conversationId: "",
    senderId: "",
    content: "",
  });
  const [updateStatus,  setUpdateStatus] = useState(false)
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
  }); 
  const messageMenuRef = useRef({});

  console.log("message menu", messageMenu)
  console.log("message Id", messageId)

  useEffect(() => {
    messageInfo && setMessage({
      id: messageInfo._id,
      conversationId: messageInfo.conversationId,
      senderId: messageInfo.senderId,
      content: messageInfo.content,
    })
  }, [messageInfo]);

  useEffect(() => {
    const outsideClickhandler = (e) => {

      if (messageMenuRef.current) {
        Object.values(messageMenuRef).map((item) => {
           if (item !== e.target) {
            setMessageMenu("")
           }
        })
      }
    } 
    document.addEventListener("click", outsideClickhandler);
  }, []);


  const onSubmit = async () => {
    const messageData = {
      ...message,
      id: messageId,
      conversationId: conversationId,
      senderId: user.id,
      recipientId: recipientId.recipientId,
      content: message.content,
    };

    if (updateStatus) {
      await updateMessage(messageData).unwrap()
    } else {
      await addMessage(messageData).unwrap();
    }
    setMessage({content: ""});
    setUpdateStatus(false);
  };

  const updateMessageHandler = (e) => {
    setMessage({content: e.target.value})
  }

  const messageMenuHandler = (id) => {
    setMessageMenu(id)
  }

  const deleteMessageHandler = async(id) => {
    await deleteMessage(id).unwrap()
    setMessage({content: ""});
    setMessageMenu("")
  }
  const editeMessageHandler = async (id) => {
    setUpdateStatus(true)
    setMessageId(id)
    await getMessage({ id: id }).unwrap()
  }

  console.log("message test mem")

  return (
    <div className="messages">
      <div className="messages__items">
        {!messages && "nothing"}
        {messages &&
          messages.map((item, index) => {
            if (item.senderId !== user.id) {
              return (
                <div className="messages__to" key={index}>
                  <div className="sender">{item.senderName}</div>
                  <div className="text">{item.content}</div>
                  <div className="time">
                    {moment(item.updatedAt).format("DD.MM.YYYY HH:mm")}
                  </div>
                </div>
              );
            } else if (item.senderId === user.id) {
              return (
                <div className="messages__from"
                key={index} 
                ref={elem => messageMenuRef.current[index] = elem}>
                  <div onClick={e => e.stopPropagation()}>
                    <div className={`message-menu ${item._id === messageMenu 
                    ? "active" 
                    : "inactive"}`}>
                      <i className="bi bi-trash3" 
                      onClick={() => deleteMessageHandler(item._id)}/>
                      <i className="bi bi-pencil"
                      onClick={() => editeMessageHandler(item._id)}/>
                  </div>
                  <div className="message-info" onClick={() => messageMenuHandler(item._id)}>
                    <div className="sender">{item.senderName}</div>
                    <div className="text">{item.content}</div>
                    <div className="time">
                      {moment(item.updatedAt).format("DD.MM.YYYY HH:mm")}
                    </div>
                  </div>
                  <div className="read-status">
                    <i className={item.read ? "bi bi-check-all" : "bi bi-check"} />
                  </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <form className="messages__form" 
      onSubmit={handleSubmit(onSubmit)}  onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          name="content"
          value={message.content}
          {...register("content", {
            onChange: (e) => { updateMessageHandler(e) },
          }, {
            required: formConstants.requiredText,
          })}
        />
        <button className="send-btn">{updateStatus ? formConstants.update : formConstants.send}</button>
      </form>
    </div>
  );
}

export default Messages;
