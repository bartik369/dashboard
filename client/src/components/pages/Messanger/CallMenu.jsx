import React, {useEffect, useState, useRef} from 'react'
import VideoCall from '../../media-call/video-call/VideoCall'
import './messenger.css'
import '../../media-call/call.css'

export default function CallMenu() {
  const callMenuRef = useRef() 
  const [callWindow, setCallWindow] = useState(false)
  return (
    <>
    <div className="call-menu">
        <div className="icon">
        <i ref={callMenuRef} onClick={() => setCallWindow(!callWindow)} className="bi bi-camera-video"/>
        </div>
        <div className="icon">
        <i className="bi bi-telephone"/>
        </div>
    </div>
    <div className={callWindow ? 'call-window' : 'end-call'}>
      <VideoCall callWindow={callWindow} setCallWindow={setCallWindow}/>
    </div>
    </>
  )
}
