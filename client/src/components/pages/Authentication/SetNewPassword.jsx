import React, {useRef, useState}from 'react';
import { comparePasswordLink, setNewUserPassword } from '../../../store/actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from '../../UI/buttons/SubmitButton';
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import { useEffect } from 'react';

function SetNewPassword() {

  const [passwordType, setPasswordType] = useState(false);
  const [repeatPasswordType, setRepeatPasswordType] = useState(false);
  const [newPassword, setNewPassword] = useState({
    link: "",
    password: "",
  });

  const resetPasswordLink = useSelector((state) => state.users.resetPasswordLink);

  const {
    register,
    formState: {errors},
    handleSubmit,
    watch,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(resetPasswordLink)
    dispatch(comparePasswordLink(params.link, navigate))
  }, [params.link])

  const password = useRef({});
  password.current = watch("password", "");
  const dispatch = useDispatch()

  const showPassword = (e) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };
  const showConfirmPassword = (e) => {
    e.preventDefault();
    setRepeatPasswordType(repeatPasswordType ? false : true);
  };

  const onSubmit = (data) => {
    dispatch(setNewUserPassword(data.password))
    const newUserPassword = {
      ...newPassword,
      link: resetPasswordLink,
      password: data.password,
    }
    dispatch(setNewUserPassword(newUserPassword))

  };

  return (
    <div className="main">
      <div className="auth">
        <div className="auth-sidebar">
          <div className="auth-sidebar__info">
            <div className="auth__notification">
            </div>
          </div>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form__title">{formConstants.titleSetNewPasswordForm}</div>

          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                placeholder={formConstants.yourPassword}
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
                placeholder={formConstants.repeatPassword}
                type={repeatPasswordType ? "text" : "password"}
                {...register("confirmPassword", {
                  required: formConstants.fillPassword,
                  validate: (value) =>
                    value === password.current ||
                    formConstants.passwordsDoNotMatch,
                })}
              />
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
  )
}

export default SetNewPassword