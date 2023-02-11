import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as uiConstants from "../../../utils/constants/ui.constants";
import Modal from "../../UI/modal/Modal";
import AddButton from "../../UI/buttons/AddButton";
import ChangePassword from "../../form/change-password/ChangePassword";
import profileImage from "../../../assets/users/developer-profile.jpg"
import "../../form/forms.css";
import "./profile.css"

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.auth.user);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [activeModal, setActiveModal] = useState(null);
  const [userMainInfo, setUserMainInfo] = useState({
    displayname: "",
    email: "",
    roles: "",
  });

  const [userAdditionalInfo, setUserAdditionalInfo] = useState({
    description: "",
    city: "",
    birthday: "",
    phone: "",
    work: {
      departament: "",
      phone: "",
      vocation: "",
    },
    avatar: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      displayname: user.displayname,
      email: user.email,
      description: userInfo.description,
      city: userInfo.city,
      birthday: userInfo.birthday,
      phone: userInfo.phone,
      departament: userInfo.work.departament,
      workPhone: userInfo.work.phone,
      vocation: userInfo.work.vocation,
    }
  });

  const changePassword = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const onSubmit = (data) => {
    const mainInfo = {
      ...userMainInfo,
      displayname: data.displayname,
      email: data.email,
      roles: data.roles,
    };
    const additionalInfo = {
      ...userAdditionalInfo,
      description: data.description,
      city: data.city,
      birthday: data.birthday,
      phone: data.phone,
      work: data.work,
    };
  };

  const updateUserInfoHandler = () => {
    
  }

  return (
    <div className="profile">
      {/* <Modal active={activeModal} close={closeModal}>
            <ChangePassword email={user.email} />
        </Modal>
        <div className="user-info">
        <h1>User Info</h1>
        <div className="name">{user.displayname}</div>
        <div className="email">{user.email}</div>
        <div className="description">{userInfo.description}</div>
        <div className="city">{userInfo.city}</div>
        <div className="birthday">{userInfo.birthday}</div>
        <div className="phone">{userInfo.phone}</div>
        <div className="departament">{userInfo.work.departament}</div>
        <div className="phone">{userInfo.work.phone}</div>
        <div className="vocation">{userInfo.work.vocation}</div>


        <div className="change-password">
        <Link to="#" onClick={changePassword}>Изменить пароль</Link>
        </div>
        </div> */}
      <form className="profile" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__main-info">
          <div className="profile__image">
            <img src={profileImage} />
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="displayname"
            {...register("displayname", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
          />
          <div className="form-error">
            {errors.displayname && (
              <p>{errors.displayname.message || formConstants.unknownError}</p>
            )}
          </div>
          <input
            className="content-form__input"
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="email"
            {...register("email", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
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
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="description"
            {...register("description", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
          />
          <div className="form-error">
            {errors.description && (
              <p>{errors.description.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="city"
            {...register("city", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
          />
          <div className="form-error">
            {errors.city && (
              <p>{errors.city.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="birthday"
            {...register("birthday", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
          />
          <div className="form-error">
            {errors.birthday && (
              <p>{errors.birthday.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="phone"
            {...register("phone", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
          />
          <div className="form-error">
            {errors.phone && (
              <p>{errors.phone.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="departament"
            {...register("departament", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
          />
          <div className="form-error">
            {errors.departament && (
              <p>{errors.departament.message || formConstants.unknownError}</p>
            )}
          </div>

          <input
            className="content-form__input"
            placeholder={formConstants.fillDeviceName}
            type="text"
            name="workPhone"
            {...register("workPhone", {
              required: formConstants.requiredText,
              pattern: {
                value: REGEX.isValidDisplayName,
                message: formConstants.wrongDeviceName,
              },
            })}
          />
          <div className="form-error">
            {errors.workPhone && (
              <p>{errors.workPhone.message || formConstants.unknownError}</p>
            )}
          </div>
          <AddButton
          className={"add-todo-btn"}
          icon={"bi bi-plus"}
          action={() => updateUserInfoHandler()}
          title={uiConstants.newTask}
        />
        </div>
      </form>
    </div>
  );
}
