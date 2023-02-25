import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/actions/usersActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../form/forms.css"
import { useSigninMutation } from "../../../store/api/authApi";

export default function Login() {

  const [signin, {data, isLoading}] = useSigninMutation()
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
  const watchFields = watch({email: "email", password: "password"});

  const onSubmit = (data) => {
    const userLoginData = {
      email: data.email,
      password: data.password,
    };
    // dispatch(loginUser(userLoginData, setError, navigate));
    signin(userLoginData)
  }

  const showPassword = (e) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  }

  console.log("check memory");

  return (
    <div className="main">
      <div className="auth">
        <div className="auth-sidebar">
        
        </div>
        <div className="auth-info">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__title">{formConstants.titleLogin}</div>
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

          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={passwordType ? "text" : "password"}
                {...register("password", {
                  required: formConstants.fillPassword,
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

          <div className="restore-password">
            <Link to="/reset-password">{formConstants.forgotPassword}</Link>
          </div>
          <SubmitButton className={"submit-btn"} title={formConstants.send} isLoading={isLoading} />
          <div className="auth-links">
            {formConstants.accountNotExist}
            <Link to="/singup">{formConstants.register}</Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
