import React from 'react'
import "../../media-call/call.css";

export default function DestinationInfo({callStarted, callAccepted, recipientInfo}) {
  return (
    <div className={(callStarted && !callAccepted) ? "outcall" : "outcall-hide"}>
    {`calling to: ${recipientInfo.displayname}`}
  </div>
  )
}
