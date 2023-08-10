import React, { useContext } from 'react'
import { SocketContext } from './SocketContext'
import './call.css'

export default function VideoPlayer() {
  const {stream, name, callAccepted, myVideo, userVideo, call, callEnded} = useContext(SocketContext)


  console.log(stream)
  return (
    <div className="video-layer">
     { (
        <div className="myvideo">
          <p>{name || 'Name'}</p>
          <video playsInline muted ref={myVideo} autoPlay ></video>
        </div>
        
     )}
     {callAccepted && !callEnded && (
       <div className="uservideo">
        <p>{call.name }</p>
        <video playsInline ref={userVideo} autoPlay ></video>
       </div>
     )}
    </div>
  )
}
