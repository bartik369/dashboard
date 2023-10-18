import React from "react";
import "../../media-call/call.css";

export default function Notifications({ answerCall, rejectCall, call }) {
  return (
    <>
      <div className="caller-info">
        <div className="caller">
          <div className="avatar">
          <img src={call.avatar} alt="" />
          </div>
          <div className="name">
          <div className="dispayname">{call.name}</div>
          <span>Вызывает...</span>
          </div>
        </div>
        <div className="call-btns">
          <i className="bi bi-telephone" onClick={answerCall} />
          <i className="bi bi-telephone-x" onClick={rejectCall} />
        </div>
      </div>
    </>
  );
}
