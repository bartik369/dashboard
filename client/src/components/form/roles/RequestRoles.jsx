import React from "react";
import { useForm } from "react-hook-form";
import "../../pages/Profile/profile.css";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as uiConstants from "../../../utils/constants/ui.constants";
import * as formConstants from "../../../utils/constants/form.constants"
import { userRoles } from "../../../utils/data-arrays/arrays";

export default function RequestRoles() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {};

  return (
    <div className="roles">
      <div className="roles__titile">Запросить роль</div>
      <form action="" className="roles-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="device-form__input">
          <i className="bi bi-hdd-stack" />
          <select
            className="device-form__select"
            defaultValue=""
            {...register("type", {
              required: formConstants.requiredText,
            })}
          >
            <option value="" disabled>
              {formConstants.selectUserRole}
            </option>
            {userRoles.map((item, index) => (
              <option key={index} name={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <SubmitButton
        className={"submit-btn-medium"}
        title={uiConstants.titleAdd}
      />
    </div>
  );
}
