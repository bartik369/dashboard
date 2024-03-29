import React, {useRef, useState, useEffect}from 'react';
import SubmitButton from '../../UI/buttons/SubmitButton';
import SetUserPassword from '../../notifications/SetUserPassword';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCheckLinkQuery } from '../../../store/features/auth/authApi';
import { useSetNewPasswordMutation } from '../../../store/features/auth/authApi';
import {useForm} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock} from "@fortawesome/free-solid-svg-icons";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import * as infoConstants from "../../../utils/constants/information.constants";
import "../Authentication/Authentication.css"


function SetNewPassword() {

  const [passwordType, setPasswordType] = useState(false);
  const [repeatPasswordType, setRepeatPasswordType] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [formStatus, setFormStatus] = useState(true);
  const [newPassword, setNewPassword] = useState({
    link: "",
    password: "",
  });

  const [updatePassword] = useSetNewPasswordMutation();

  const {
    register,
    formState: {errors},
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const params = useParams();
  const {data} = useCheckLinkQuery(params.link)
  const navigate = useNavigate(); 
  const password = useRef({});
  password.current = watch("password", "");
  const watchFields = watch({password: "password", confirmPassword: "confirmPassword"});

  useEffect(() => {
    if (data === null) {
      navigate("/reset-password")
    }
  }, [data])

  const showPassword = (e) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  }

  const showConfirmPassword = (e) => {
    e.preventDefault();
    setRepeatPasswordType(repeatPasswordType ? false : true);
  }

  const onSubmit = async (data) => {
    console.log(data)
    const newUserPassword = {
      ...newPassword,
      link: params.link,
      password: data.password,
    }
    await updatePassword(newUserPassword).unwrap()
    setFormStatus(false);
    setNotificationStatus(true);
    reset();
  }

  return (
    <div className="main">
      <div className={notificationStatus ? "notification-active" : "notification"}>
        <SetUserPassword 
        title={infoConstants.titleSetPassword} 
        text={infoConstants.textSetPassword}
        />
      </div>
      <div className={formStatus ? "auth" : "auth-disabled"}>
        <div className="auth-sidebar">
          <div className="auth-sidebar__info">
            <div className="auth__notification">
            </div>
          </div>
        </div>
        <div className="auth-info">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form__title">{formConstants.titleSetNewPasswordForm}</div>
          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={passwordType ? "text" : "password"}
                {...register("password", {
                  required: formConstants.fillPassword,
                  minLength: {
                    value: 3,
                    message: formConstants.minSymbolsOfPassword,
                  },
                  pattern: {
                    value: REGEX.isValidPassword,
                    message: formConstants.onlyLatinCharacters,
                  },
                })}
              />
              <span className={watchFields.password ? "lable-span" : ""}>{formConstants.yourPassword}</span>
              <button className="show-password" onClick={showPassword}>
                {passwordType ? (
                  <i
                    className="bi bi-eye-slash"
                    title={formConstants.hidePassword}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye"
                    title={formConstants.openPassword}
                  ></i>
                )}
              </button>
            </div>
            <div className="form-error">
              {errors.password && <p>{errors.password.message || "Error"}</p>}
            </div>
          </div>

          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={repeatPasswordType ? "text" : "password"}
                {...register("confirmPassword", {
                  required: formConstants.fillPassword,
                  validate: (value) =>
                    value === password.current ||
                    formConstants.passwordsDoNotMatch,
                })}
              />
              <span className={watchFields.confirmPassword ? "lable-span" : ""}>{formConstants.repeatPassword}</span>
              <button className="show-password" onClick={showConfirmPassword}>
                {repeatPasswordType ? (
                  <i
                    className="bi bi-eye-slash"
                    title={formConstants.hidePassword}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye"
                    title={formConstants.openPassword}
                  ></i>
                )}
              </button>
            </div>
            <div className="form-error">
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message || "Error"}</p>
              )}
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
  )
}

export default SetNewPassword