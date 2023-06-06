import React from 'react';
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png";
import "../../../components/pages/Messanger/messenger.css"

function RecipientInfo({recipientInfo}) {
    if (recipientInfo) {
        return (
           <div className="recipient-info">
               <div className="avatar">
               <img src={recipientInfo.profilePictureUrl ? recipientInfo.profilePictureUrl : defaultAvatar} alt="" />
               </div>
               <div className="displayname">{recipientInfo.displayname}</div>
           </div>
            
          )
    }
}

export default RecipientInfo