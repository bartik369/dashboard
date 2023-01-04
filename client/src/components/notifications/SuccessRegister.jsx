import React from 'react';
import SubmitButton from '../UI/buttons/SubmitButton';
// import { useDispatch } from 'react-redux';
// import { updateModal } from '../../store/actions/modalActions';
import * as formConstants from "../../utils/constants/form.constants"
import { Link } from 'react-router-dom';
import "../notifications/notifications.css";

export default function SuccessRegister(props) {


  return (
      <div className="auth-notification">
          <div className="auth-notification__title">
              {props.title}
          </div>
          <div className="auth-notification__content">
              {props.text}
          </div>
          <Link to="/" >
            <SubmitButton className={"submit-btn-small"} title={formConstants.enter} />
          </Link>
      </div>
  )
}