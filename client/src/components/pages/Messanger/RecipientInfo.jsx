import React from 'react'

function RecipientInfo({recipientInfo}) {
    if (recipientInfo) {
        return (
           <div>
               <div className="avatar"></div>
               <div className="displayname">{recipientInfo.displayname}</div>
           </div>
            
          )
    }
}

export default RecipientInfo