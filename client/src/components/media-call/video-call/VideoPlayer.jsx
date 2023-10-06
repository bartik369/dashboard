import React, { useEffect } from 'react'


const VideoPlayer = ({name, callAccepted, myVideo, userVideo, call, callEnded}) => {


  return (
    <div className="video-layer">
     { (
          <video className={callAccepted ? "resize-video" : "video-stream"} playsInline muted ref={myVideo} autoPlay />
     )}
     {callAccepted && !callEnded && (
       <div className="uservideo">
        <video className="user-stream" playsInline ref={userVideo} autoPlay />
       </div>
     )}
    </div>
  )
}

export default VideoPlayer
