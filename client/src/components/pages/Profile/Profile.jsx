import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileInfo } from "../../../store/actions/usersActions";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as uiConstants from "../../../utils/constants/ui.constants";
import Modal from "../../UI/modal/Modal";
import SubmitButton from "../../UI/buttons/SubmitButton";
import ChangePassword from "../../form/change-password/ChangePassword";
import profileImage from "../../../assets/users/developer-profile.jpg";
import "../../form/forms.css";
import "./profile.css";
import { selectCurrentUser, selectUserProfile } from "../../../store/features/auth/authSlice";
import { useUserProfileQuery, useUpdateProfileMutation } from "../../../store/features/auth/authApi";

export default function Profile() {
  const user = useSelector(selectCurrentUser);
  const profile = useSelector(selectUserProfile);


  console.log(user);
  console.log(profile)

  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation()
  const [activeModal, setActiveModal] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    description: "",
    city: "",
    birthday: "",
    phone: "",
    work: {
      departament: "",
      workPhone: "",
      vocation: "",
    },
  });


  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    // defaultValues: {
    //   displayname: user.displayname,
    //   email: user.email,
    //   description: profileInfo.description,
    //   city: profileInfo.city,
    //   birthday: profileInfo.birthday,
    //   phone: profileInfo.phone,
    //   departament: profileInfo.work.departament,
    //   workPhone: profileInfo.work.workPhone,
    //   vocation: profileInfo.work.vocation,
    // },
  });

  const changePassword = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const onSubmit = (data) => {
    console.log(data);
    const updatedProfileInfo = {
      ...profileInfo,
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
    console.log(updatedProfileInfo)
    dispatch(updateProfile(updatedProfileInfo));
    reset();
  };

  return (
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
          <Modal active={activeModal} close={closeModal}>
            <ChangePassword email={user.email} />
          </Modal>
          <div className="change-password">
            <Link to="#" onClick={changePassword}>
              Изменить пароль
            </Link>
          </div>
        </div>
        <div className="profile__additional-info">
          <textarea
            className="content-form__input"
            placeholder={formConstants.profileDescription}
            type="text"
            name="description"
            defaultValue={profileInfo.description}
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
            as={InputMask}
            control={control}
            mask="+7(999)999-99-99"
            name="phone"
            {...register("phone", {
              // required: formConstants.requiredText,
              //   pattern: {
              //     value: REGEX.isValidDisplayName,
              //     message: formConstants.wrongDeviceNumber,
              // },
            })}
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
            as={InputMask}
            control={control}
            mask="+7(999)999-99-99"
            name="workPhone"
            defaultValue={profile.work.workPhone}
            {...register("workPhone", {
              // required: formConstants.requiredText,
              //   pattern: {
              //     value: REGEX.isValidDisplayName,
              //     message: formConstants.wrongDeviceNumber,
              // },
            })}
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
      <div className="ext-info">fsfsfsdfs</div>
    </div>
  );
}
