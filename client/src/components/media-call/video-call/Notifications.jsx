import React, { useContext } from 'react';
import '../../media-call/call.css'

export default function Notifications({answerCall, call, callAccepted, setCallWindow}) {

  if (call.isReceivedCall)  {
    setCallWindow(true)
  }
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div className="call-notification">
          <h2>{call.name}: is caling</h2>
          <button onClick={answerCall}>answer call</button>
        </div>
      )}
    </>
  )
}
