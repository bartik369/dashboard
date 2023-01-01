import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/actions/usersActions";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Authentication/Authentication.css"
import SubmitButton from "../../UI/buttons/SubmitButton";

export default function Login() {
  const [passwordType, setPasswordType] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    const userLoginData = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginUser(userLoginData, setError, navigate));
  };

  const showPassword = (e) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };

  console.log("check memory");

  return (
    <div className="main">
      <div className="auth">
        <div className="auth-sidebar"></div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__title">{formConstants.titleLogin}</div>
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

          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                placeholder={formConstants.yourPassword}
                type={passwordType ? "text" : "password"}
                {...register("password", {
                  required: formConstants.fillPassword,
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

          <div className="restore-password">
            <Link to="/reset-password">{formConstants.forgotPassword}</Link>
          </div>
          <SubmitButton className={"submit-btn"} title={formConstants.send} />
          <div className="auth-links">
            {formConstants.accountNotExist}
            <Link to="/singup">{formConstants.register}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
