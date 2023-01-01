import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../store/actions/usersActions";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import { Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import SubmitButton from "../../UI/buttons/SubmitButton";
import "../Authentication/Authentication.css"
import paperAirplane from "../../../assets/portal/paper_airplane.png";

export default function Signup() {

  const [passwordType, setPasswordType] = useState(false);
  const [repeatPasswordType, setRepeatPasswordType] = useState(false);
  const [animationPaperAirplane, setAnimationPaperAirplane] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [userInfo, setUserInfo] = useState({
    displayname: "",
    email: "",
    password: "",
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = useRef({});
  password.current = watch("password", "");

  const animationSignup = () => {
     setAnimationPaperAirplane(true);
     setShowInfo(true);
     setTimeout(() => navigate("/"), 9000);
     reset()
  }


  const onSubmit = (data) => {
    const newUser = {
      ...userInfo,
      displayname: data.displayname,
      email: data.email,
      password: data.password,
    };
    setUserInfo(newUser);
    dispatch(createUser(newUser, animationSignup, setError));
  };

  const showPassword = (e) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };
  const showConfirmPassword = (e) => {
    e.preventDefault();
    setRepeatPasswordType(repeatPasswordType ? false : true);
  };

  console.log("check memmory");

  return (
    <div className="main">
      <div className="auth">
        <div className="auth-sidebar">
          <div className="auth-sidebar__info">
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
              <div
                className={animationPaperAirplane ? "back-notification" : ""}
              >
                <div
                  className={showInfo ? "completed" : "completion-registration"}
                >
                  <div className="title">{formConstants.confirmRegistration}</div>
                  <span>{formConstants.registrationInfo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__title">{formConstants.titleRegistrationForm}</div>

          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                placeholder={formConstants.yourName}
                type="text"
                name="displayname"
                {...register("displayname", {
                  required: formConstants.fillName,
                  pattern: {
                    value: REGEX.isValidDisplayName,
                    message: formConstants.wrongNameFormat,
                  },
                  minLength: {
                    value: 3,
                    message:formConstants.minLengthOfDisplayName,
                  }
                })}
              />
            </div>
            <div className="form-error">
              {errors.displayname && (
                <p>{errors.displayname.message || "Error"}</p>
              )}
            </div>
          </div>

          <div className="input-layer">
            <div className="auth-form__input">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                placeholder={formConstants.yourEmail}
                type="email"
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
            {formConstants.accountExist}
            <Link to="/">
              {formConstants.enter}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
