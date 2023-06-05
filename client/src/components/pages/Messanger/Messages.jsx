import React, {useEffect, useState} from "react";
import {
  useAddMessageMutation, 
  useGetMessagesQuery,
} from "../../../store/features/messenger/messengerApi"
import * as formConstants from "../../../utils/constants/form.constants"
import {useForm} from "react-hook-form"
import moment from "moment";

function Messages({chatId, user, to}) {

  const [message, setMessage] = useState({
    id: "",
    to: "",
    senderName: "",
    senderName: "",
    content: "",
  })
  const {data: messages} = useGetMessagesQuery(chatId)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit"
  })

  const [addMessage] = useAddMessageMutation()


const onSubmit = async(data) => {
  const messageData = {
    ...message,
    id: chatId,
    to:to.emailTo,
    senderName: user.displayname,
    senderEmail: user.email,
    content: data.message,
  }
  await addMessage(messageData).unwrap();
  reset()
}

  return (
    <div className="messages">
      <div className="messages__items">
          {!messages && "nothing"}
          {messages && messages.map((item, index) => {

            if (item.senderEmail !== user.email) {
              return (
                <div className="messages__to" key={index}>
                  <div className="sender">{item.senderName}</div>
                  <div className="text">{item.content}</div>
                  <div className="time">{moment(item.time).format("DD.MM.YYYY HH:mm")}</div>
                </div>
              )
            } else if (item.senderEmail === user.email) {
              return (
                <div className="messages__from" key={index}>
                  <div className="sender">{item.senderName}</div>
                  <div className="text">{item.content}</div>
                  <div className="time">{moment(item.time).format("DD.MM.YYYY HH:mm")}</div>
                </div>
              )
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
  )
}

export default Messages