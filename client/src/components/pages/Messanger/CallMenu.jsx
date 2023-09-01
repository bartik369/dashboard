import React from 'react'
import './messenger.css'
import '../../media-call/call.css'

export default function CallMenu({setCallWindow, callWindow}) {
  return (
    <>
    <div className="call-menu">
        <div className="icon">
        <i onClick={() => setCallWindow(!callWindow)} className="bi bi-camera-video"/>
        </div>
        <div className="icon">
        <i className="bi bi-telephone"/>
        </div>
    </div>
    </>
  )
}
