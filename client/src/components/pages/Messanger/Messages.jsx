import React, { useEffect, useState } from "react";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "../../../store/features/messenger/messengerApi";
import * as formConstants from "../../../utils/constants/form.constants";
import { useForm } from "react-hook-form";
import moment from "moment";

function Messages({ conversationId, user, recipientId }) {

  const [message, setMessage] = useState({
    conversationId: "",
    senderId: "",
    content: "",
  });

  const [messageMenu, setMessageMenu] = useState("");
  const { data: messages } = useGetMessagesQuery(conversationId);
  const [addMessage] = useAddMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation()

  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    const messageData = {
      ...message,
      conversationId: conversationId,
      senderId: user.id,
      recipientId: recipientId.recipientId,
      content: data.message,
    };
    console.log(messageData)
    await addMessage(messageData).unwrap();
    reset();
  };
  const messageMenuHandler = (id) => {
    setMessageMenu(id)
  }

  const deleteMessageHandler = (id) => {
    deleteMessage(id)
  }
  const editeMessageHandler = (id) => {
    console.log("update", id)
  }


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
                    {moment(item.time).format("DD.MM.YYYY HH:mm")}
                  </div>
                </div>
              );
            } else if (item.senderId === user.id) {
              return (
                <div className="messages__from" key={index}>
                    <div className={
                    item._id === messageMenu 
                    ? "actions" 
                    : "hidden-message-menu"}
                    >
                      <div className="delete">
                      <i className="bi bi-trash3" onClick={() => deleteMessageHandler(item._id)}/>
                      </div>
                      <div className="edite">
                      <i className="bi bi-pencil" onClick={() => editeMessageHandler(item._id)}/>
                      </div>
                  </div>
                  <div className="message-info" onClick={() => messageMenuHandler(item._id)}>
                    <div className="sender">{item.senderName}</div>
                    <div className="text">{item.content}</div>
                    <div className="time">
                      {moment(item.time).format("DD.MM.YYYY HH:mm")}
                    </div>
                  </div>
                  <div className="read-status">
                    <i className={item.read ? "bi bi-check-all" : "bi bi-check"} />
                  </div>
                </div>
              );
            }
          })}
      </div>
      <form className="messages__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="message"
          {...register("message", {
            required: formConstants.requiredText,
          })}
        />
        <button className="send-btn">Send</button>
      </form>
    </div>
  );
}

export default Messages;
