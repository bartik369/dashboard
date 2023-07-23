import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import SubmitButton from "../../UI/buttons/SubmitButton";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import { useUpdateUserPasswordMutation, useGetProfileQuery,
} from "../../../store/features/auth/authApi";
import RequestRoles from "../../form/roles/RequestRoles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faRoute } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../../assets/users/avatars/default-avatar.png";
import "../../form/forms.css";
import "./profile.css";
import ENV from "../../../env.config";

export default function Profile() {
  const user = useSelector(selectCurrentUser);
  const { data: profile } = useGetProfileQuery(user.id);
  const [updatePassword] = useUpdateUserPasswordMutation();
  const [passwordType, setPasswordType] = useState(false);
  const [repeatPasswordType, setRepeatPasswordType] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const profilePicPickerRef = useRef(null);

  useEffect(() => {

    if (profile) {
      setSelectedFile(profile.avatar)
    }
 }, [profile])

 console.log("profile memory")

 const pickProfilePhoto = () => {
  profilePicPickerRef.current.click();
};

  const selectProfilePhoto = (e) => {
    let file = e.target.files[0];
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
        setSelectedFile(baseURL);
      };
    });
  };

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
    formState: { errors: errorsPass },
    handleSubmit: handleSubmitPass,
  } = useForm({
    mode: "onSubmit",
  });

  const password = useRef({});
  password.current = watch("password", "");
  const watchFields = watch({
    password: "password",
    confirmPassword: "confirmPassword",
  });

  const showPassword = (e) => {
    e.preventDefault();
    setPasswordType(passwordType ? false : true);
  };

  const showConfirmPassword = (e) => {
    e.preventDefault();
    setRepeatPasswordType(repeatPasswordType ? false : true);
  };

  const changePassword = async (data) => {
    const updatedPassword = {
      email: user.email,
      password: data.password,
    };
    await updatePassword(updatedPassword).unwrap();
    reset();
  };

  const onSubmit = async (data) => {
    const updatedProfileInfo = {
      ...profile,
      id: profile._id,
      displayname: data.displayname,
      // email: data.email,
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

      const formData = new FormData();
      formData.append("file", selectedFile)

      for (let dataKey in updatedProfileInfo) {
        
        if (dataKey === 'work') {
          for (let previewKey in updatedProfileInfo[dataKey]) {
            formData.append(previewKey, updatedProfileInfo[dataKey][previewKey]);
          }
        }
        else {
          formData.append(dataKey, updatedProfileInfo[dataKey]);
        }
      }
      const res = await fetch(`${ENV.HOSTNAME}api/update-profile`, {
        method: "POST",
        body: formData,
      });  
     reset();
}

  if (profile)
    return (
      <div className="profile">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__main-info">
            <div className="profile__image">
              <input
                accept="image/*"
                type="file"
                onChange={selectProfilePhoto}
                className="hidden-btn"
                ref={profilePicPickerRef}
              />
              <img onClick={pickProfilePhoto} src={selectedFile ? selectedFile : defaultAvatar} alt=""/>
            </div>
            <div>
            <input
              className="content-form__input"
              placeholder={formConstants.yourName}
              type="text"
              name="displayname"
              defaultValue={profile.displayname}
              {...register("displayname", {})}
            />
            <div className="form-error">
              {errors.displayname && (
                <p>
                  {errors.displayname.message || formConstants.unknownError}
                </p>
              )}
            </div>
            <textarea
              className="content-form__input"
              placeholder={formConstants.profileDescription}
              type="text"
              name="description"
              defaultValue={profile.description}
              {...register("description", {})}
            />
            </div>
            <div className="form-error">
              {errors.description && (
                <p>
                  {errors.description.message || formConstants.unknownError}
                </p>
              )}
            </div>
            {/* <input
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
            </div> */}
          </div>
          <div className="profile__additional-info">
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
                <p>
                  {errors.departament.message || formConstants.unknownError}
                </p>
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
          <form
            className="common-form"
            onSubmit={handleSubmitPass(changePassword)}
          >
            <div className="ext-info__title">
              {formConstants.resetPasswordTitle}
            </div>
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
            <SubmitButton
              className={"submit-btn-small"}
              title={formConstants.reset}
            />
          </form>
          <div className="roles">
            <RequestRoles profile={profile}/>
          </div>
        </div>
      </div>
    );
}
