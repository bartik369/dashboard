import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as uiConstants from "../../../utils/constants/ui.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import { deviceTypes } from "../../../utils/data-arrays/arrays";
import "../forms.css";

export default function AddDevice({create}) {

  const [device, setDevice] = useState({
    id: "",
    type: "",
    name: "",
    number: "",
    user: "",
    addTime: "",
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "all",
  })

  const watchFields = watch({name: "name", number: "number", user: "user"});

  const onSubmit = (data) => {

    console.log(data)
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
    create(newDevice);
    // dispatch(addDevice(newDevice));
    reset();
  }

  console.log("check memory");

  return (
    <div className="main">
      <form className="device-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="device-form__title">{formConstants.newDeviceTitle}</div>
        <select
          className="device-form__select"
          defaultValue=""
          {...register("type", {
            required: formConstants.requiredText,
          })}
        >
          <option className="disabled-option" value="" disabled>
            {formConstants.typeDevices}
          </option>
          {deviceTypes.map((item, index) => (
            <option key={index} name={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
         <div className="form-error">
          {errors.type && (
            <p>{errors.type.message || formConstants.unknownError}</p>
          )}
        </div>

        <div className="device-form__input">
        <input
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
        <span className={watchFields.name ? "lable-span" : ""}>{formConstants.fillDeviceName}</span>
        </div>

        <div className="form-error">
          {errors.name && (
            <p>{errors.name.message || formConstants.unknownError}</p>
          )}
        </div>
        <div className="device-form__input">
        <input
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
       <span className={watchFields.number ? "lable-span" : ""}>{formConstants.fillDeviceNumber}</span>
        </div>
        <div className="form-error">
          {errors.number && (
            <p>{errors.number.message || formConstants.unknownError}</p>
          )}
        </div>
        <div className="device-form__input">
        <input
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
        <span className={watchFields.user ? "lable-span" : ""}>{formConstants.fillUserName}</span>
        </div>
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
