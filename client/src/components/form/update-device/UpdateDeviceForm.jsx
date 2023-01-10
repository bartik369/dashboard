import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loadDevices, updateDevice} from "../../../store/actions/devicesActions";
import { updateModal } from "../../../store/actions/modalActions";
import { deviceTypes } from "../../../utils/data-arrays/arrays";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as formConstants from "../../../utils/constants/form.constants";
import * as REGEX from "../../../utils/constants/regex.constants";
import * as uiConstants from "../../../utils/constants/ui.constants";
import "../../form/forms.css";

const UpdateDeviceForm = () => {

  let dispatch = useDispatch();
  const device = useSelector((state) => state.device.device);

  const [updateDev, setUpdateDev] = useState({
    id: "",
    type: "",
    name: "",
    number: "",
    user: "",
    addTime: "",
  });

  useEffect(() => {
    reset(device)
  }, [device]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: device,
  });

  const onSubmit = (data) => {
    console.log(data)
    const date = new Date();
    const deviceTime = date.toLocaleDateString() + " " + date.toLocaleTimeString("en-GB");
    const updateDeviceData = {
      ...updateDev,
      id: data._id,
      type: data.type,
      name: data.name,
      number: data.number,
      user: data.user,
      addTime: deviceTime,
    };

    dispatch(updateDevice(updateDeviceData, updateDeviceData.id));
    dispatch(updateModal(false));
    reset();
  };

  return (
    <form className="content-form" onSubmit={handleSubmit(onSubmit)}>
      <select className="content-form__input" {...register("type")}>
        <option>{formConstants.typeDevices}</option>
        {deviceTypes.map((item, index) => (
          <option key={index} name={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="form-error">
        {errors.name && (
          <p>{errors.name.message || formConstants.unknownError}</p>
        )}
      </div>

      <input
        className="content-form__input"
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
        {errors.number && (
          <p>{errors.number.message || formConstants.unknownError}</p>
        )}
      </div>

      <input
        className="content-form__input"
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
        {errors.user && (
          <p>{errors.user.message || formConstants.unknownError}</p>
        )}
      </div>

      <input
        className="content-form__input"
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
      <div className="content-action-btn">
        <SubmitButton
          className={"submit-btn-medium"}
          title={uiConstants.titleAdd}
        />
      </div>
    </form>
  );
};

export default UpdateDeviceForm;
