import React from 'react'


const VideoPlayer = ({stream, name, callAccepted, myVideo, userVideo, call, callEnded}) => {

  return (
    <div className="video-layer">
      sdadsadasd
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

export default VideoPlayer
