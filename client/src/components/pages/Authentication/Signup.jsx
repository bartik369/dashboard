import React, { useRef, useState, useEffect } from "react";
import SuccessRegister from "../../notifications/SuccessRegister";
import SubmitButton from "../../UI/buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../../store/features/auth/authApi";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import * as infoConstants from "../../../utils/constants/information.constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import paperAirplane from "../../../assets/portal/paper_airplane.png";


export default function Signup() {
  const [passwordType, setPasswordType] = useState(false);
  const [repeatPasswordType, setRepeatPasswordType] = useState(false);
  const [animationPaperAirplane, setAnimationPaperAirplane] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [formStatus, setFormStatus] = useState(true);


  const [userInfo, setUserInfo] = useState({
    displayname: "",
    email: "",
    password: "",
    description: "",
    city: "",
    birthday: "",
    phone: "",
    work: {
      departament: "",
      workPhone: "",
      vocation: "",
    },
    avatar: "",
  });

  const [signup, {isLoading, error}] = useSignupMutation()

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

  const password = useRef({});
  password.current = watch("password", "");
  const watchFields = watch({
    displayname: "displayname",
    email: "email",
    password: "password",
    confirmPassword: "confirmPassword",
  });

  const animationSignup = () => {
    setAnimationPaperAirplane(true);
    setTimeout(() => {
      setNotificationStatus(true);
      setFormStatus(false);
    }, 1000);
    reset();
  };

  const onSubmit = async (data) => {
    const newUser = {
      ...userInfo,
      displayname: data.displayname,
      email: data.email,
      password: data.password,
      description: "",
      city: "",
      birthday: "",
      phone: "",
      work: {
      departament: "",
      workPhone: "",
      vocation: "",
    },
    avatar: "",
    };
    // setUserInfo(newUser);
    await signup(newUser).unwrap()
    animationSignup()
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
      <div className={notificationStatus ? "notification-active" : "notification"}>
        <SuccessRegister
          title={infoConstants.titleRigistration}
          text={infoConstants.textRigistration}
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
          {/* <div className="auth-sidebar__info">
           <div className="auth-sidebar__title">
           </div>
          </div> */}
        </div>
        <div className="auth-info">
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="auth-form__title">
              {formConstants.titleRegistrationForm}
            </div>
            <div className="input-layer">
              <div className="auth-form__input">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
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
                      message: formConstants.minLengthOfDisplayName,
                    },
                  })}
                />
                <span className={watchFields.displayname ? "lable-span" : ""}>
                  {formConstants.yourName}
                </span>
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
                <span className={watchFields.email ? "lable-span" : ""}>
                  {formConstants.yourEmail}
                </span>
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
                <span className={watchFields.password ? "lable-span" : ""}>
                  {formConstants.yourPassword}
                </span>
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
                <span
                  className={watchFields.confirmPassword ? "lable-span" : ""}
                >
                  {formConstants.repeatPassword}
                </span>
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
              <Link to="/">{formConstants.enter}</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
