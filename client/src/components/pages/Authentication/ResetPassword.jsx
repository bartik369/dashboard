import React, { useState } from "react";
import SubmitButton from "../../UI/buttons/SubmitButton";
import SendPasswordLink from "../../notifications/SendPasswordLink";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../../../store/actions/usersActions";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import * as infoConstants from "../../../utils/constants/information.constants";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ResetPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [formStatus, setFormStatus] = useState(true);

  const dispatch = useDispatch();
  const watchFields = watch({email: "email"});

  const onSubmit = (data) => {
    console.log("chick chick");
    const resetPasswordData = {
      email: data.email,
    };
    dispatch(
      updateUserPassword(
        resetPasswordData,
        setError,
        setNotificationStatus,
        setFormStatus
      )
    );
  }

  return (
    <div className="main">
      <div className={notificationStatus ? "notification-active" : "notification"}>
          <SendPasswordLink
            title={infoConstants.titleResetPasswordLink}
            text={infoConstants.textResetPasswordLink}
          />
        </div>
        <div className={formStatus ? "auth" : "auth-disabled"}>
          <div className="auth-sidebar"></div>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="auth-form__title">
              {formConstants.titleResetPasswordForm}
            </div>
            <div className="input-layer">
              <div className="auth-form__input">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
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
                <span className={watchFields.email ? "lable-span" : ""}>{formConstants.yourEmail}</span>
              </div>
              <div className="form-error">
                {errors.email && <p>{errors.email.message || "Error"}</p>}
              </div>
            </div>
            <SubmitButton className={"submit-btn"} title={formConstants.send} />
            <div className="auth-links">
              <Link to="/">{formConstants.enter}</Link>
              <Link to="/singup">{formConstants.register}</Link>
            </div>
          </form>
        </div>
      </div>
  );
}

export default ResetPassword;
