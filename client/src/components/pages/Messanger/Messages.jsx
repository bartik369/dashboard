import React, {useState} from "react";
import {useAddMessageMutation} from "../../../store/features/messenger/messengerApi"
import * as formConstants from "../../../utils/constants/form.constants"
import {useForm} from "react-hook-form"

function Messages({chatId, user}) {

  const [message, setMessage] = useState({
    id: "",
    senderName: "",
    senderName: "",
    content: "",
  })
  
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
    senderName: user.displayname,
    senderEmail: user.email,
    content: data.message,
  }
  await addMessage(messageData).unwrap();
}

  console.log(chatId)
  return (
    <div>
      <div className="messages__items">
        список сообщений
      </div>
      <form className="messages__ form" onSubmit={handleSubmit(onSubmit)}>
        <textarea
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