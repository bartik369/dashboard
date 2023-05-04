import React from 'react';
import {useGetRolesRequestsQuery} from "../../../../store/features/auth/authApi";
import "../../Admin/admin.css"
export default function RoleManagement() {

    const {data: getRolesRequest, isLoading, isError} = useGetRolesRequestsQuery();

    const approve = (email) => {
        console.log("yes")
        console.log(email)
    }
    const denay = (email) => {
        console.log("no")
        console.log(email)
    }
  return (
    <div className="role-management">
        {isLoading 
        ? "" 
        : getRolesRequest.map((request, index) => (
          <div className="info" key={index}>
            <span>{request.displayname}</span>
            <span>{request.email}</span>
            <span>{request.role}</span>
            <button className="btn_role" onClick={() =>approve(request.email)}>Ok</button>
            <button className="btn_role" onClick={() => denay(request.email) }>No</button>
          </div>
        ))
        }
      </div>
  )
}