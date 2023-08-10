import React, { useContext } from 'react';
import { SocketContext } from './SocketContext';

export default function Notifications() {
  const {answerCall, call, callAccepted} = useContext(SocketContext)
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
