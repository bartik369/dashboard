import React, { useEffect, useState, useRef } from "react";
import { useGetProfileQuery } from "../../../store/features/auth/authApi";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
  useGetMessagesMediaQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetMessageMutation,
} from "../../../store/features/messenger/messengerApi";
import * as formConstants from "../../../utils/constants/form.constants";
import * as uiConstants from "../../../utils/constants/ui.constants";
import { useForm } from "react-hook-form";
import moment from "moment";
import { FileIcon, defaultStyles } from 'react-file-icon';
import ENV from "../../../env.config";

function Messages({ conversationId, user, recipientId, recipientInfo }) {
  const [messageMenu, setMessageMenu] = useState("");
  const [messageId, setMessageId] = useState("")
  const { data: messages } = useGetMessagesQuery(conversationId);
  const { data: medias } = useGetMessagesMediaQuery(conversationId);
  const { data: profile } = useGetProfileQuery(user.id);
  const [addMessage] = useAddMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation()
  const [updateMessage] = useUpdateMessageMutation()
  const [getMessage, {data: messageInfo}] = useGetMessageMutation()
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState({
    id: "",
    conversationId: "",
    senderId: "",
    content: "",
    replyTo: "",
  });
  const [replyId, setReplyId] = useState("")
  const [updateStatus,  setUpdateStatus] = useState(false)
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
  }); 
  const messageMenuRef = useRef({});
  const messageEl = useRef(null);
  const messageFileRef = useRef()

  useEffect(() => {
    messageInfo && setMessage({
      id: messageInfo._id,
      conversationId: messageInfo.conversationId,
      senderId: messageInfo.senderId,
      content: messageInfo.content,
    })
  }, [messageInfo]);

  console.log(medias)

  useEffect(() => {
    const outsideClickhandler = (e) => {

      if (messageMenuRef.current) {
        Object.values(messageMenuRef).map((item) => {
           if (item !== e.target) {
            setMessageMenu("")
            setMessage({content: ""});
            setReplyId("")
            setUpdateStatus(false)
           }
        })
      }
    } 
    document.addEventListener("click", outsideClickhandler);
  }, []);

  useEffect(() => {

    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', e => {
        const { currentTarget: target } = e;
        target.scroll({ top: target.scrollHeight});
      });
    }
  }, [])

  const pickMessageFile = () => {
    messageFileRef.current.click();
  };

  const selectMessageFile = (e) => {
    let file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async () => {
    const messageData = {
      ...message,
      id: messageId,
      conversationId: conversationId,
      senderId: user.id,
      recipientId: recipientId.recipientId,
      content: message.content,
      replyTo: replyId,
    };

    const formData = new FormData();
    for (let key in messageData) {
      formData.append(key, messageData[key])
    }
    formData.append('file', selectedFile)
  
    if (updateStatus) {
      console.log(formData)
      await updateMessage(formData).unwrap()
    } else {
      await addMessage(formData).unwrap();
      // const res = await fetch(`${ENV.HOSTNAME}api/add-message`, {
      //   method: "POST",
      //   body: formData,
      // });
      // let result = await res.json()  
    }
    setMessage({content: ""});
    setUpdateStatus(false);
    setMessageMenu("")
    setReplyId("")
    setSelectedFile(null)
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

  const replayMessageHandler = (id) => {
    setReplyId(id);
  }


  console.log("message test mem")
console.log(selectedFile)

  return (
    <div className="messages">
      <div className="messages__items" ref={messageEl}>
        {!messages && "nothing"}
        {messages &&
          messages.map((item, index) => {
            
            if (item.senderId !== user.id) {
              return (
                <div className="messages__to"
                key={index} 
                ref={elem => messageMenuRef.current[index] = elem} >
                  <div className="message" onClick={e => e.stopPropagation()}>
                  <div className={`message__replay-menu ${item._id === messageMenu 
                    ? "active" 
                    : "inactive"}`}>
                      <i className="bi bi-arrow-90deg-up" title={uiConstants.titleReplay}
                      onClick={() => replayMessageHandler(item._id)}/>
                  </div>
                  <div className="message-info" onClick={() => messageMenuHandler(item._id)}>
                  <div className="sender">{item.senderName}</div>
                  <div className="contents">
                      {medias && medias.map((media, index) => {
                        let fileType = media.file.split(".").pop()
                        if (item.mediaId === media._id) {
                          return <div className="fileinfo" key={index}>
                            <div className="icon">
                              <FileIcon 
                              extension={fileType} 
                              {...defaultStyles[fileType]}
                              color='#c5ced9'
                              glyphColor='white'
                              />
                            </div>
                            <a href={`${ENV.HOSTNAME}media/messenger/${conversationId}/${media.file}`}>{media.file}</a>
                          </div>
                        }              
                      })}
                      {item.replyTo && messages.map((message) => {
                        
                        if (message._id === item.replyTo) {

                        return ( 
                        <div className="reply" key={index}>
                          <div className="name">{profile.displayname}</div>
                          <div className="replay-text">{message.content}</div>
                        </div>)
                      } 
                    }
                    )}
                    <div className="send">{item.content}</div>
                  </div>
                  <div className="time">
                    {moment(item.updatedAt).format("DD.MM.YYYY HH:mm")}
                  </div>
                  </div>
                  </div>
                </div>
              ) 
            } else if (item.senderId === user.id) {
              return (
                <div className="messages__from" key={index} ref={elem => messageMenuRef.current[index] = elem}>
                  <div className="message" onClick={e => e.stopPropagation()}>
                    <div className={`message-menu ${item._id === messageMenu ? "active" : "inactive"}`}>
                      <i className="bi bi-trash3" title={uiConstants.titleDelete}
                      onClick={() => deleteMessageHandler(item._id)}/>
                      <i className="bi bi-pencil" title={uiConstants.titleUpdate}
                      onClick={() => editeMessageHandler(item._id)}/>
                  </div>

                  <div className="message-info" onClick={() => messageMenuHandler(item._id)}>

                    <div className="sender">{item.senderName}</div>
                    <div className="contents">
                   
                      {item.replyTo && messages.map((message, index) => {
                        
                        if (message._id === item.replyTo) {
                        return ( 
                        <div className="reply" key={index}>
                          <div className="name">{recipientInfo.displayname}</div>
                          <div className="replay-text">{message.content}</div>
                        </div>)
                      } 
                    }
                    )}
                     {/* // console.log(media.file.split(".")[1]) */}
                    {medias && medias.map((media, index) => {
                    
                      const fileType = media.file.split(".").pop()
                        if (item.mediaId === media._id) {
                          return <div className="fileinfo" key={index}>
                            <div className="icon">
                              <FileIcon 
                              extension={fileType} 
                              {...defaultStyles[fileType]}
                              gradientColor='white'
                              gradientOpacity={1}
                              />
                            </div>
                            <a href={`${ENV.HOSTNAME}media/messenger/${conversationId}/${media.file}`}>{media.file}</a>
                            </div>
                        }              
                      })}
                    <div className="send">{item.content}</div>
                  </div>
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
        <form className="messages__form" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}  onClick={(e) => e.stopPropagation()}>
          {replyId && messages.map((message, index) => {
                          
            if (replyId === message._id) {
              return (
              <div className="reply-to" key={index}>
                <i className="bi bi-arrow-90deg-up"/>
                {message.content}
              </div>
              )
            }
          })}
          <input type="text" name="content" value={message.content}
            {...register("content", {
              onChange: (e) => { updateMessageHandler(e) },
            }, {
              required: formConstants.requiredText,
            })} />
             <input
                accept="file/.pdf, .txt, .xlsx, .docx, .jpg, .jpeg, .png, .mp3, .mov, .avi, .mp4, .mov, .mkv"
                type="file"
                onChange={selectMessageFile}
                className="hidden-file-btn"
                ref={messageFileRef}
              />
            <i className="bi bi-paperclip" onClick={pickMessageFile} />
            <button className="send-btn">{updateStatus 
            ? <i className="bi bi-arrow-clockwise" title="Обновить"/> 
            : <i className="bi bi-send" title="Отправить" />}</button>
        </form>
    </div>
  );
}

export default Messages;