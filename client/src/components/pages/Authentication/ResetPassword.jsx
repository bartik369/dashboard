import React, { useState, useEffect } from "react";
import SubmitButton from "../../UI/buttons/SubmitButton";
import SendPasswordLink from "../../notifications/SendPasswordLink";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../../../store/features/auth/authApi";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import * as infoConstants from "../../../utils/constants/information.constants";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import paperAirplane from "../../../assets/portal/paper_airplane.png";



function ResetPassword() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm({
    mode: "onSumbit",
  });

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [animationPaperAirplane, setAnimationPaperAirplane] = useState(false);
  const [formStatus, setFormStatus] = useState(true);
  const [sendLinkToResetPass, {error}] = useResetPasswordMutation()
  const watchFields = watch({ email: "email" });

  useEffect(() => {

    if (error) {
      error.data.errors.map((item) => {
        if (item.email) {
          setError("email", {
            type: "manual",
            message: item.email,
          });
        } 
      })
    }
  }, [error])

  const animationSignup = () => {
    setAnimationPaperAirplane(true);
    setTimeout(() => {
      setNotificationStatus(true);
      setFormStatus(false);
    }, 1000);
    reset();
  };

  const onSubmit = async (data) => {
    const resetPasswordData = {
      email: data.email,
    };
    await sendLinkToResetPass(resetPasswordData).unwrap()
    animationSignup()
  };

  return (
    <div className="main">
      <div
        className={notificationStatus ? "notification-active" : "notification"}
      >
        <SendPasswordLink
          title={infoConstants.titleResetPasswordLink}
          text={infoConstants.textResetPasswordLink}
        />
      </div>
      <div className={formStatus ? "auth" : "auth-disabled"}>
        <div className="auth-sidebar">
          <div className="auth__notification">
            <CSSTransition
              in={animationPaperAirplane}
              timeout={1000}
              classNames="paperAirplane-animation"
            >
              <div className="paperAirplane">
                <img src={paperAirplane} alt="" />
              </div>
            </CSSTransition>
          </div>
        </div>
        <div className="auth-info">
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
                <span className={watchFields.email ? "lable-span" : ""}>
                  {formConstants.yourEmail}
                </span>
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
    </div>
  );
}

export default ResetPassword;
