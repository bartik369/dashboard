import React, {useState, useRef} from "react";
import {useForm} from "react-hook-form";
import { useDispatch } from "react-redux";
import { assignNewPassword } from "../../../store/actions/usersActions";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock} from "@fortawesome/free-solid-svg-icons";
import "../../form/forms.css"
import "../../../styles/App.css"



export default function ChangePassword({email}) {

    const [passwordType, setPasswordType] = useState(false);
    const [repeatPasswordType, setRepeatPasswordType] = useState(false);
    const [newPassword, setNewPassword] = useState({
      email: "",
      password: "",
    })

    const dispatch = useDispatch()

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset,
        watch,
    } = useForm({
        mode: "onBlur"
    })

    const password = useRef({});
    password.current = watch("password", "");

    const showPassword = (e) => {
        e.preventDefault();
        setPasswordType(passwordType ? false : true);
      }
    
      const showConfirmPassword = (e) => {
        e.preventDefault();
        setRepeatPasswordType(repeatPasswordType ? false : true);
      }

    const onSubmit = (data) => {
      const newUserPassword = {
        ...newPassword,
        email: email,
        password: data.password,
      };
      reset()
      dispatch(assignNewPassword(newUserPassword));
    }

    const watchFields = watch({password: "password", confirmPassword: "confirmPassword"});

  return (
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
        </form>
  )
}
