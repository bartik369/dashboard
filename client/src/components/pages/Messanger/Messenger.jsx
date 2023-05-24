import React from "react";
import './messenger.css'

const Messenger = () => {
    return (
        <div className="messenger">
         <div className="messenger__chats">
            список чатов
         </div>
         <div className="messenger__messages">
            сообщения
         </div>
        </div>
    )
}

export default Messenger;