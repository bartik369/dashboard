import React from 'react';
import '../../media-call/call.css'


export default function Notifications({answerCall, rejectCall, call}) {
  
  return (
    <div>
        <div className="call-notification__inner">
          <h2>{call.name}: is caling</h2>
          <button onClick={answerCall}>answer call</button>
         <p></p>
          <button onClick={rejectCall}>reject call</button>
        </div>
    </div>
  )
}
