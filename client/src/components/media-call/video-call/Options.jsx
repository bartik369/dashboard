import React, { useContext, useState } from 'react';
import '../../media-call/call.css'

export default function Options({ 
  callAccepted, 
  leaveCall, 
  callEnded,  
  callUser, 
  videoHandler, 
  audioHandler,
  audioMute,
  videoMute,
}) {

  return (
  
    <div className="media-options">
       <div className="media-options__btn">
          <i className={videoMute ? "bi bi-camera-video-off" : "bi bi-camera-video"} onClick={videoHandler}/>
          <i className={audioMute ? "bi bi-mic-mute" : "bi bi-mic"} onClick={audioHandler}/>
        </div>
        {callAccepted && !callEnded ? (
          <i className="bi bi-telephone-x" onClick={leaveCall}/>
        ) : (
          <i className="bi bi-telephone" onClick={callUser}/>
        )}
    </div>
    
  )
}
