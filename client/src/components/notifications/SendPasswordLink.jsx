import React from 'react';
import SubmitButton from '../UI/buttons/SubmitButton';
import * as formConstants from "../../utils/constants/form.constants"
import { Link } from 'react-router-dom';
import "../notifications/notifications.css";

export default function SendPasswordLink(props) {


  return (
      <div className="auth-notification">
          <div className="auth-notification__title">
              {props.title}
          </div>
          <div className="auth-notification__content">
              {props.text}
          </div>
          <Link to="/" >
            <SubmitButton className={"submit-btn-small"} title={formConstants.go} />
          </Link>
      </div>
  )
}