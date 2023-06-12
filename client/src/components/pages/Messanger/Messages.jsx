import React, { useEffect, useState } from "react";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
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
  const { data: messages } = useGetMessagesQuery(conversationId);

  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const [addMessage] = useAddMessageMutation();
  console.log(user)

  console.log(messages);

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

  return (
    <div className="messages">
      <div className="messages__items">
        {!messages && "nothing"}
        {messages &&
          messages.map((item, index) => {
            console.log(item)
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
                  <div className="message-info">
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
