import React from 'react';
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
  callStarted,
  call,
}) {

  return (
  
    <div className="media-options">
       <div className="media-options__btn">
          <i className={videoMute ? "bi bi-camera-video-off" : "bi bi-camera-video"} onClick={videoHandler}/>
          <i className={audioMute ? "bi bi-mic-mute" : "bi bi-mic"} onClick={audioHandler}/>
        </div>
        {callAccepted && !callEnded || callStarted ? (
          <div className="drop-call" onClick={leaveCall}>
             <i className="bi bi-telephone"/>
             <span>Завершить</span>
          </div>
        ) : (
          !call.isReceivedCall && <div className="make-call" onClick={callUser}>
          <i className="bi bi-telephone"/>
          <span>Позвонить</span>
       </div>
        )}
        {(!callAccepted && !call.isReceivedCall && !callStarted) && 
        <div className="drop-call" onClick={leaveCall}>
           <i className="bi bi-telephone-x" />
           <span>Отмена</span>
        </div>
        }
    </div>
  )
}
