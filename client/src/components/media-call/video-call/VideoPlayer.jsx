import React  from 'react'
import "../../media-call/call.css";

const VideoPlayer = ({name, callAccepted, myVideo, userVideo, callEnded, fullScreenHandler, videoMute, audioMute, videoFullScreen}) => {

  return (
    <div className="video-layer">
     {<video className={callAccepted ? "resize-video" : "video-stream"} playsInline muted ref={myVideo} autoPlay />}
     {callAccepted && !callEnded && (
       <div className="uservideo">
        <div className="fullscreen_btn" onClick={fullScreenHandler}>
          {!videoFullScreen 
          ? <i className="bi bi-arrows-angle-expand" />
          : <i className="bi bi-arrows-angle-contract"/>
          }
        </div>
        <video className="user-stream" playsInline ref={userVideo} autoPlay />
       </div>
     )}
    </div>
  )
}

export default VideoPlayer
