import React, { useContext, useState } from 'react';
import { SocketContext } from './SocketContext';

export default function Options({ me, callAccepted, name, setName, leaveCall, callEnded,  callUser, socketId}) {

  const [idToCall, setIdToCall] = useState('');
  return (
  
    <div>
        <p>Optiond</p>
        <input type="text" placeholder='Name' defaultValue={name} onChange={(e) => setName(e.target.value)} />
        <p>me</p>
        <input type="text" defaultValue={me}/>
        <p>you</p>
        <input type="text" 
        placeholder='Id to call' 
        defaultValue={socketId} />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}> Hand Up</button>
        ) : (
        <button onClick={callUser()}>
          Call
        </button>
        )}
    </div>
    
  )
}
