import React, { useEffect } from 'react'


const VideoPlayer = ({name, callAccepted, myVideo, userVideo, callEnded, videoMute, audioMute}) => {


  return (
    <div className="video-layer">
        {/* {<div className={(videoMute && myVideo) ? "videoicon-mute" : "videoicon-unmute"}>
          sasasasasasasasasa
         </div>} */}
     {<video className={callAccepted ? "resize-video" : "video-stream"} playsInline muted ref={myVideo} autoPlay />}
     {callAccepted && !callEnded && (
       <div className="uservideo">
        <video className="user-stream" playsInline ref={userVideo} autoPlay />
       </div>
     )}
    </div>
  )
}

export default VideoPlayer
