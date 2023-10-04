import React, { useEffect } from 'react'


const VideoPlayer = ({name, callAccepted, myVideo, userVideo, call,
   callEnded}) => {

  return (
    <div className="video-layer">
     { (
        <div className="myvideo">
          <video className={callAccepted ? "resize-video" : "video-stream"} playsInline muted ref={myVideo} autoPlay >
          </video>
        </div>
        
     )}
     {callAccepted && !callEnded && (
       <div className="uservideo">
        <p>{call.name }</p>
        <video className="user-stream" playsInline ref={userVideo} autoPlay ></video>
       </div>
     )}
    </div>
  )
}

export default VideoPlayer
