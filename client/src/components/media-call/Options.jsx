import React, { useContext, useState } from 'react';
import { SocketContext } from './SocketContext';

export default function Options({ children }) {

  const {me, callAccepted, name, setName, leaveCall, callEnded,  callUser} = useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('');
  console.log("meeeeee", me)
  return (
  
    <div>
        <p>Optiond</p>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <p>dsds</p>
        <input type="text" value={me}/>
        <input type="text" 
        placeholder='Id to call' 
        value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}> Hand Up</button>
        ) : (
        <button onClick={callUser(idToCall)}>
          Call
        </button>
        )}
        {children}
    </div>
    
  )
}
