import React  from 'react'
import "../../media-call/call.css";

const VideoPlayer = ({
  name, 
  callAccepted, 
  myVideo, 
  userVideo, 
  callEnded, 
  fullScreenHandler, 
  videoMute, 
  audioMute, 
  videoFullScreen,
  clickFullScreenHandler,
}) => {

  return (
    <>
     {<video className={callAccepted ? "resized-local-stream" : "local-stream"} playsInline muted ref={myVideo} autoPlay />}
     {callAccepted && !callEnded && (
       <div className="video-wrapper">
        <div className="fullscreen_btn" onClick={fullScreenHandler}>
          {!videoFullScreen 
          ? <i className="bi bi-arrows-angle-expand" />
          : <i className="bi bi-arrows-angle-contract"/>
          }
        </div>
        <video className={videoFullScreen ? "user-stream-full" : "user-stream"} onClick={(e) => clickFullScreenHandler(e) } playsInline ref={userVideo} autoPlay />
       </div>
     )}
    </>
  )
}

export default VideoPlayer
