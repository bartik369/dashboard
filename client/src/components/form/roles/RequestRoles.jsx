import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../../pages/Profile/profile.css";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as uiConstants from "../../../utils/constants/ui.constants";
import * as formConstants from "../../../utils/constants/form.constants"
import { userRoles } from "../../../utils/data-arrays/arrays";
import { useRolesRequestMutation } from "../../../store/features/auth/authApi";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";

export default function RequestRoles() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const user = useSelector(selectCurrentUser)
  const[makeRolesRequest] = useRolesRequestMutation();

  const onSubmit = async (data) => {
    const roleRequestInfo = {
      id: user.id,
      role: data.role,
    }
    await makeRolesRequest(roleRequestInfo).unwrap()
    reset()
  };

  return (
    <div className="roles">
      <div className="roles__titile">Запросить роль</div>
      <form action="" className="roles-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="device-form__input">
          {/* <i className="bi bi-hdd-stack" /> */}
          <select
            className="device-form__select"
            defaultValue=""
            {...register("role", {
              required: formConstants.requiredText,
            })}
          >
            <option value="" disabled>
              {formConstants.selectUserRole}
            </option>
            {userRoles.map((item, index) => (
              <option key={index} name={item.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <SubmitButton
        className={"submit-btn-medium"}
        title={uiConstants.titleAdd}
      />
      </form>
    </div>
  );
}
