import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../../pages/Profile/profile.css";
import SubmitButton from "../../UI/buttons/SubmitButton";
import * as uiConstants from "../../../utils/constants/ui.constants";
import * as formConstants from "../../../utils/constants/form.constants";
import { userRoles } from "../../../utils/data-arrays/arrays";
import { useRolesRequestMutation } from "../../../store/features/auth/authApi";
import { selectCurrentUser } from "../../../store/features/auth/authSlice";
import "../../../components/form/forms.css"

export default function RequestRoles({profile}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const user = useSelector(selectCurrentUser);
  const [makeRolesRequest] = useRolesRequestMutation();

  const onSubmit = (data) => {
    const roleRequestInfo = {
      id: user.id,
      displayname: profile.displayname,
      email: user.email,
      role: data.role,
    };
    makeRolesRequest(roleRequestInfo).unwrap();
    reset();
  };

  return (
    <div className="roles">
      <div className="roles__title">Запросить роль</div>
      <form action="" className="roles-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="role-form__input">
          {/* <i className="bi bi-hdd-stack" /> */}
          <select
            className="role-form__select"
            defaultValue=""
            {...register("role", {
              required: formConstants.requiredText,
            })}
          >
            <option value="" disabled>
              {formConstants.selectUserRole}
            </option>
            {userRoles
              .filter((role) => !user.roles.includes(role))
              .map((item, index) => (
                  <option key={index} name={item} value={item}>
                    {item}
                  </option>
                ))
            }
          </select>
        </div>
        <SubmitButton
          className={"submit-btn-small"}
          title={formConstants.request}
        />
      </form>
    </div>
  );
}
