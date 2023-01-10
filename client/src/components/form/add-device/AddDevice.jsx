import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addDevice } from "../../../store/actions/devicesActions";
import { useDispatch } from "react-redux";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as uiConstants from "../../../utils/constants/ui.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import { deviceTypes } from "../../../utils/data-arrays/arrays";
import "../forms.css";

export default function AddDevice({create}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [device, setDevice] = useState({
    id: "",
    type: "",
    name: "",
    number: "",
    user: "",
    addTime: "",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const date = new Date();
    const deviceTime =
      date.toLocaleDateString() + " " + date.toLocaleTimeString("ru-RU");
    const newDevice = {
      ...device,
      id: Date.now(),
      type: data.type,
      name: data.name,
      number: data.number,
      user: data.user,
      addTime: deviceTime,
    };
    create(newDevice)
    // dispatch(addDevice(newDevice));
    reset();
  };

  console.log("check memory");

  return (
    <div className="main">
      <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="content-form__title">{formConstants.newDeviceTitle}</div>
        <select
          className="main-form__select"
          defaultValue=""
          {...register("type")}
        >
          <option value="" disabled>
            {formConstants.typeDevices}
          </option>
          {deviceTypes.map((item, index) => (
            <option key={index} name={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          className="main-form__input"
          placeholder={formConstants.fillDeviceName}
          type="text"
          name="name"
          {...register("name", {
            required: formConstants.requiredText,
            pattern: {
              value: REGEX.isValidDisplayName,
              message: formConstants.wrongDeviceName,
            },
          })}
        />
        <div className="form-error">
          {errors.name && (
            <p>{errors.name.message || formConstants.unknownError}</p>
          )}
        </div>

        <input
          className="main-form__input"
          placeholder={formConstants.fillDeviceNumber}
          type="text"
          name="number"
          {...register("number", {
            required: formConstants.requiredText,
            pattern: {
              value: REGEX.isValidDisplayName,
              message: formConstants.wrongDeviceNumber,
            },
          })}
        />
        <div className="form-error">
          {errors.number && (
            <p>{errors.number.message || formConstants.unknownError}</p>
          )}
        </div>

        <input
          className="main-form__input"
          placeholder={formConstants.fillUserName}
          type="text"
          name="user"
          {...register("user", {
            required: formConstants.requiredText,
            pattern: {
              value: REGEX.isValidDisplayName,
              message: formConstants.wrongUserName,
            },
          })}
        />
        <div className="form-error">
          {errors.user && (
            <p>{errors.user.message || formConstants.unknownError}</p>
          )}
        </div>
        <div className="content-action-btn">
        <SubmitButton className={"submit-btn-medium"} title={uiConstants.titleAdd} />
        </div>
      </form>
    </div>
  );
}
