import React, { useEffect } from "react";
import "./notifications.css";

export default function SystemAlert() {
  return (
    <div className="system-alert">
      <div className="system-alert__items">
        <div className="system-alert__item">
          <div className="icon"></div>
          <div className="sender-info">
            <div className="taskname">deleteMessageHandler</div>
            <div className="message">dsds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
