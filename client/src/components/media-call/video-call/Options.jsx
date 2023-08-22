import React, { useContext, useState } from 'react';
import { SocketContext } from './SocketContext';

export default function Options({ me, callAccepted, name, setName, leaveCall, callEnded,  callUser, socketId}) {

  const [idToCall, setIdToCall] = useState('');
  return (
  
    <div>
        <p>Optiond</p>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <p>dsds</p>
        <input type="text" value={me}/>
        <input type="text" 
        placeholder='Id to call' 
        value={socketId} />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}> Hand Up</button>
        ) : (
        <button onClick={callUser(socketId)}>
          Call
        </button>
        )}
    </div>
    
  )
}
