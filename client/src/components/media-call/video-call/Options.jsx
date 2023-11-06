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
  callWindow,
  call,
}) {

  return (
  
    <div className={(!call.isReceivedCall || callAccepted) ? "media-options" : "options-hide"}>
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
           <i className="bi bi-box-arrow-right" />
           <span>Выйти</span>
        </div>
        }
    </div>
  )
}
