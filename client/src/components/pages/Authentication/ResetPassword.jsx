import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../../store/actions/usersActions";
import { updateModal } from "../../../store/actions/modalActions";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "../../UI/buttons/SubmitButton";
import "../Authentication/Authentication.css"
import SendPasswordLink from "../../notifications/SendPasswordLink";

function ResetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const [notificationStatus, setNotificationStatus] = useState(false)
  const [formStatus, setFormStatus] = useState(true)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log("chick chick")
    const resetPasswordData = {
        email: data.email,
    }
    dispatch(updateUserPassword(resetPasswordData, setError, setNotificationStatus, setFormStatus));
    // navigate("/")
  }

  return (
    <div className="main">
      <div className="auth">
      <div className={notificationStatus ? "notification-active" : "notification"}>
      <SendPasswordLink />
      </div>
      <div className={formStatus ? "auth" : "auth-disabled"}>
        <div className="auth-sidebar"></div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__title">{formConstants.titleResetPasswordForm}</div>
          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                placeholder={formConstants.yourEmail}
                type="text"
                name="email"
                {...register("email", {
                  required: formConstants.fillEmail,
                  pattern: {
                    value: REGEX.isValidEmail,
                    message: formConstants.wrongEmailFormat,
                  },
                })}
              />
            </div>
            <div className="form-error">
              {errors.email && <p>{errors.email.message || "Error"}</p>}
            </div>
          </div>
          <SubmitButton className={"submit-btn"} title={formConstants.send} />
          <div className="auth-links">
          <Link to="/">
              {formConstants.enter}
          </Link>
          <Link to="/singup">
              {formConstants.register}
          </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default ResetPassword;
