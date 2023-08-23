import React, { useContext } from 'react';

export default function Notifications({answerCall, call, callAccepted}) {


  console.log(call && call.isReceivedCall)
  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div>
          <h2>{call.name}: is caling</h2>
          <button onClick={answerCall}>answer call</button>
        </div>
      )}
    </>
  )
}
