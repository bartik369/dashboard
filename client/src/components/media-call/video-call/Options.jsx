import React, { useContext, useState } from 'react';
import '../../media-call/call.css'

export default function Options({ callAccepted, name, setName, leaveCall, callEnded,  callUser, socketId}) {

  return (
  
    <div>
        <p>Optiond</p>
        {callAccepted && !callEnded ? (
          <button className='videocall_btn' onClick={leaveCall}> Hand Up</button>
        ) : (
        <button onClick={callUser}>
          Call
        </button>
        )}
    </div>
    
  )
}
