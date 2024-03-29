import React from 'react'
import "../../media-call/call.css";

export default function DestinationInfo({callStarted, callAccepted, recipientInfo}) {
  return (
    <div className={(callStarted && !callAccepted) ? "destination" : "destination-hide"}>
      <div className="destination-info">
        <span>Звоним:</span>
        <div className="recipientinfo">
        {recipientInfo.displayname}
        </div>
      </div>
      <div className="arrows-body">
        <div className="arrow"></div>
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
  </div>
  )
}
