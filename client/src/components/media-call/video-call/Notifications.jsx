import React from "react";
import "../../media-call/call.css";

export default function Notifications({ answerCall, rejectCall, call }) {
  return (
    <div>
      <div className="call-notification__inner">
        <div className="caller-info">
          <div className="avatar">
          <img src={call.avatar} alt="" />
          </div>
          <h2>Входящий вызов от: {call.name}</h2>
        </div>
        <div className="call-btns">
          <i className="bi bi-telephone" onClick={answerCall} />
          <i className="bi bi-telephone-x" onClick={rejectCall} />
        </div>
      </div>
    </div>
  );
}
