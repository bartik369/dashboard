import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as uiConstants from "../../../utils/constants/ui.constants";
import SubmitButton from "../../UI/buttons/SubmitButton";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useUpdateProfileMutation, useUpdateUserPasswordMutation, useGetProfileQuery } from "../../../store/features/auth/authApi";
import RequestRoles from "../../form/roles/RequestRoles";
import profileImage from "../../../assets/users/developer-profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock} from "@fortawesome/free-solid-svg-icons";
import "../../form/forms.css";
import "./profile.css";

export default function Profile() {
  const user = useSelector(selectCurrentUser);
  const {data: profile} = useGetProfileQuery(user.id)
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdateUserPasswordMutation();
  const [passwordType, setPasswordType] = useState(false);
  const [repeatPasswordType, setRepeatPasswordType] = useState(false)

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const {
    register: registerPass,
    watch,
    formState: { errors:  errorsPass},
    handleSubmit: handleSubmitPass,
    reset: resetPass,
  } = useForm({
    mode: "onSubmit",
  });

  const password = useRef({});
  password.current = watch("password", "");
  const watchFields = watch({password: "password", confirmPassword: "confirmPassword"});


  
  const showPassword = (e) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  }

  const showConfirmPassword = (e) => {
    e.preventDefault();
    setRepeatPasswordType(repeatPasswordType ? false : true);
  }

  const onSubmit = async (data) => {
    const updatedProfileInfo = {
      ...profile,
      id: profile._id,
      displayname: data.displayname,
      email: data.email,
      description: data.description,
      city: data.city,
      birthday: data.birthday,
      phone: data.phone,
      work: {
        departament: data.departament,
        workPhone: data.workPhone,
        vocation: data.vocation,
      },
    };
    await updateProfile(updatedProfileInfo).unwrap();
    reset();
  };
  const changePassword = async (data) => {
    const updatedPassword = {
      email: user.email,
      password: data.password,
    };
    await updatePassword(updatedPassword).unwrap()
    reset();
  };

  if (profile) return (
    <div className="profile">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__main-info">
          <div className="profile__image">
            <img src={profileImage} />
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.yourName}
            type="text"
            name="displayname"
            defaultValue={user.displayname}
            {...register("displayname", {})}
          />
          <div className="form-error">
            {errors.displayname && (
              <p>{errors.displayname.message || formConstants.unknownError}</p>
            )}
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.yourEmail}
            type="text"
            name="email"
            defaultValue={user.email}
            {...register("email", {})}
          />
          <div className="form-error">
            {errors.email && (
              <p>{errors.email.message || formConstants.unknownError}</p>
            )}
          </div>
        </div>
        <div className="profile__additional-info">
          <textarea
            className="content-form__input"
            placeholder={formConstants.profileDescription}
            type="text"
            name="description"
            defaultValue={profile.description}
            {...register("description", {})}
          />
          <div className="form-error">
            {errors.description && (
              <p>{errors.description.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.profileCity}
            type="text"
            name="city"
            defaultValue={profile.city}
            {...register("city", {})}
          />
          <div className="form-error">
            {errors.city && (
              <p>{errors.city.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.profileBirthday}
            type="text"
            name="birthday"
            defaultValue={profile.birthday}
            {...register("birthday", {})}
          />
          <div className="form-error">
            {errors.birthday && (
              <p>{errors.birthday.message || formConstants.unknownError}</p>
            )}
          </div>

          <InputMask
            className="content-form__input"
            placeholder={formConstants.profilePhone}
            control={control}
            mask="+7(999)999-99-99"
            name="phone"
            defaultValue={profile.phone}
            {...register("phone", {})}
          />
          <div className="form-error">
            {errors.phone && (
              <p>{errors.phone.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.profileWorkDepartament}
            type="text"
            name="departament"
            defaultValue={profile.work.departament}
            {...register("departament", {})}
          />
          <div className="form-error">
            {errors.departament && (
              <p>{errors.departament.message || formConstants.unknownError}</p>
            )}
          </div>

          <InputMask
            className="content-form__input"
            placeholder={formConstants.profilePhone}
            control={control}
            mask="+7(999)999-99-99"
            name="workPhone"
            defaultValue={profile.work.workPhone}
            {...register("workPhone", {})}
          />
          <div className="form-error">
            {errors.workPhone && (
              <p>{errors.workPhone.message || formConstants.unknownError}</p>
            )}
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.profileWorkVocation}
            type="text"
            name="vocation"
            defaultValue={profile.work.vocation}
            {...register("vocation", {})}
          />
          <div className="form-error">
            {errors.vocation && (
              <p>{errors.vocation.message || formConstants.unknownError}</p>
            )}
          </div>
          <SubmitButton
            className={"submit-btn-small"}
            title={formConstants.save}
          />
        </div>
      </form>
      <div className="ext-info">
      <form className="common-form" onSubmit={handleSubmitPass(changePassword)}>
        <div className="ext-info__title">{formConstants.resetPasswordTitle}</div>
          <div className="input-layer">
            <div className="common-form__input">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={passwordType ? "text" : "password"}
                {...registerPass("password", {
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
            <div className="common-form__input">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type={repeatPasswordType ? "text" : "password"}
                {...registerPass("confirmPassword", {
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
          <SubmitButton
            className={"submit-btn-small"}
            title={formConstants.reset}
          />
        </form>
        <div className="roles">
          <RequestRoles />
        </div>
      </div>
    </div>
  );
}