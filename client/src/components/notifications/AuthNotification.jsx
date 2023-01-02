import React from 'react';
import "../notifications/notifications.css"

export default function AuthNotification(props) {
  return (
      <div className="auth-notification">
          <div className="auth-notification__title">
              {props.title}
          </div>
          <div className="auth-notification__content">
              {props.text}
          </div>
      </div>
  )
}
