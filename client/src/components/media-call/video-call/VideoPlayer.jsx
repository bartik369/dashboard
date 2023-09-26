import React, { useEffect } from 'react'


const VideoPlayer = ({name, callAccepted, myVideo, userVideo, call,
   callEnded, videoHandler, audioHandler }) => {

  return (
    <div className="video-layer">
     { (
        <div className="myvideo">
          <p>{name || 'Name'}</p>
          <video className="video-stream" playsInline muted ref={myVideo} autoPlay >
          </video>
          <div className="media-options">
          <button onClick={videoHandler} className="video-call-btn">
          <i className="bi bi-camera-video-off"></i>
          </button>
          <button onClick={audioHandler} className="audio-call-btn">
          <i className="bi bi-mic-mute"></i>
          </button>
          </div>
        </div>
        
     )}
     {callAccepted && !callEnded && (
       <div className="uservideo">
         user video here
        <p>{call.name }</p>
        <video playsInline ref={userVideo} autoPlay ></video>
       </div>
     )}
    </div>
  )
}

export default VideoPlayer
